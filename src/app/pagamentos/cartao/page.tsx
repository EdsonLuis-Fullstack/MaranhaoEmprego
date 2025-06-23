"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import "./style_cartao.css";
import Cookies from "js-cookie";
import enviarCartao from "@/components/services/payment/pagamentoCartao";
import { enviarPix } from "@/components/services/payment/pagamentoPix";

export default function PaymentForm() {
  const [mpLoaded, setMpLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [selectedTab, setSelectedTab] = useState<"cartao" | "pix">("cartao");
  const [amount] = useState("100.00"); // Preço fixo por enquanto
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error"); // "error" ou "success"

  const cardFormRef = useRef<any>(null); // Referência para o cardForm

  // Função para mostrar popup
  const showPopupMessage = (message: string, type: "error" | "success" = "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
  };

  // Função para fechar popup
  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  useEffect(() => {
    if (selectedTab === "cartao" && mpLoaded && window.MercadoPago) {
      try {
        const mp = new window.MercadoPago(
          "TEST-0c82a5f0-f1de-47ca-9020-8324dd0120b2"
        );

        cardFormRef.current = mp.cardForm({
          amount,
          autoMount: true,
          paymentMethod: { id: paymentMethod },
          form: {
            id: "form-checkout",
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Nome no cartão",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              hidden: true,
            },
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Número do cartão",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "CVV",
            },
            identificationType: { id: "form-checkout__identificationType" },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: "Documento",
            },
            issuer: { id: "form-checkout__issuer-hidden", hidden: true },
            installments: {
              id: "form-checkout__installments-hidden",
              hidden: true,
            },
          },
          callbacks: {
            onFormMounted: () => console.log("Formulário montado com sucesso"),
            onSubmit: async (event) => {
              event.preventDefault();
              try {
                // Capturar dados do formulário diretamente dos inputs
                const formElement = document.getElementById(
                  "form-checkout"
                ) as HTMLFormElement;
                const formData = new FormData(formElement);

                // Obter dados do MercadoPago SDK
                const cardData = cardFormRef.current.getCardFormData();

                // Combinar dados do formulário com dados do SDK
                const completeData = {
                  ...cardData,
                  cardholderName:
                    formData.get("cardholderName") ||
                    document.getElementById("form-checkout__cardholderName")
                      ?.value,
                  cardholderEmail:
                    formData.get("cardholderEmail") ||
                    document.getElementById("form-checkout__cardholderEmail")
                      ?.value,
                  identificationType:
                    formData.get("identificationType") ||
                    cardData.identificationType,
                  identificationNumber:
                    formData.get("identificationNumber") ||
                    cardData.identificationNumber,
                };

                console.log("Dados completos do cartão:", completeData);

                // Verificar se o nome foi capturado
                if (!completeData.cardholderName) {
                  showPopupMessage("Por favor, preencha o nome no cartão");
                  return;
                }

                const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
                completeData.token = token;

                // Enviar dados do cartão e tratar resposta
                const response = await enviarCartao(completeData);
                
                // Verificar se a resposta tem o formato esperado
                if (response && typeof response === 'object') {
                  if (response.code === 200) {
                    showPopupMessage(response.msg || "Pagamento processado com sucesso!", "success");
                  } else {
                    showPopupMessage(response.msg || "Erro no processamento do pagamento");
                  }
                } else {
                  showPopupMessage("Erro inesperado na resposta do servidor");
                }

              } catch (error) {
                console.error("Erro ao processar pagamento:", error);
                showPopupMessage("Erro no pagamento. Tente novamente.");
              }
            },
            onFetching: (resource) =>
              console.log(`Buscando recurso: ${resource}`),
            onError: (error) => {
              console.error("Erro no formulário:", error);
              showPopupMessage("Erro no formulário. Verifique os dados inseridos.");
            },
          },
        });
      } catch (error) {
        console.error("Erro ao inicializar MercadoPago:", error);
        showPopupMessage("Erro ao carregar o sistema de pagamento");
      }
    }
  }, [mpLoaded, paymentMethod, amount, selectedTab]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="conteinerPay">
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpLoaded(true)}
      />

      {/* Popup de Mensagem */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className={`popup-content ${popupType}`} onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{popupType === "error" ? "Erro" : "Sucesso"}</h3>
              <button className="popup-close" onClick={closePopup}>
                &times;
              </button>
            </div>
            <div className="popup-body">
              <p>{popupMessage}</p>
            </div>
            <div className="popup-footer">
              <button className="popup-btn" onClick={closePopup}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Abas */}
      <div className="tabs">
        <button
          className={`tab-btn ${selectedTab === "cartao" ? "active" : ""}`}
          onClick={() => setSelectedTab("cartao")}
        >
          Cartão
        </button>
        <button
          className={`tab-btn ${selectedTab === "pix" ? "active" : ""}`}
          onClick={() => setSelectedTab("pix")}
        >
          Pix
        </button>
      </div>

      {/* Formulário de Cartão */}
      {selectedTab === "cartao" && (
        <form id="form-checkout" className="form-checkout">
          <h2>Cartão</h2>
          <div className="Preço">
            Preço do plano: <span className="PrecoPlano">R$ {amount}</span>
          </div>

          <div className="form-group">
            <label htmlFor="form-checkout__cardholderName">
              Nome no cartão
            </label>
            <input
              id="form-checkout__cardholderName"
              name="cardholderName"
              type="text"
              
              placeholder="Nome completo como no cartão"
            />
          </div>

          <div style={{ display: "none" }} className="form-group">
            <label htmlFor="form-checkout__cardholderEmail">Email</label>
            <input id="form-checkout__cardholderEmail" type="email" />
          </div>

          <div className="form-group">
            <label htmlFor="form-checkout__cardNumber">Número do cartão</label>
            <input id="form-checkout__cardNumber" name="cardNumber" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="form-checkout__securityCode">CVV</label>
              <input id="form-checkout__securityCode" name="securityCode" />
            </div>
            <div className="form-group">
              <label htmlFor="form-checkout__expirationDate">Validade</label>
              <input id="form-checkout__expirationDate" name="expirationDate" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="form-checkout__identificationType">
              Tipo de documento
            </label>
            <select
              id="form-checkout__identificationType"
              name="identificationType"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="form-checkout__identificationNumber">
              Número do documento
            </label>
            <input
              id="form-checkout__identificationNumber"
              name="identificationNumber"
              required
            />
          </div>

          <div className="payment-method-group">
            <label>Tipo de cartão:</label>
            <select
              onChange={handlePaymentMethodChange}
              value={paymentMethod}
              className="payment-method"
            >
              <option value="credit">Crédito</option>
              <option value="debit">Débito</option>
            </select>
          </div>

          {/* Campos ocultos para o SDK */}
          <div style={{ display: "none" }}>
            <select id="form-checkout__issuer-hidden"></select>
            <select id="form-checkout__installments-hidden"></select>
          </div>

          <button type="submit" className="btn-submit">
            Pagar
          </button>
        </form>
      )}

      {/* Formulário de Pix */}
      {selectedTab === "pix" && (
        <form
          className="form-pix"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const nome = e.target.nome.value;
              const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
              const tipo_documento = e.target.tipo_documento.value;
              const documento_numero = e.target.documento_numero.value;
              
              const data = await enviarPix({
                nome, 
                documento_tipo: tipo_documento, 
                documento_numero, 
                token: token
              });
              
              if (data.code !== 200) {
                showPopupMessage(data.msg || "Erro ao processar pagamento via PIX");
                return;
              }
              
              if (data.qr_code) {
                // Remover QR code anterior se existir
                const existingQR = document.querySelector('.qr-code-container');
                if (existingQR) {
                  existingQR.remove();
                }
                
                // Criar container para o QR code
                const qrContainer = document.createElement("div");
                qrContainer.className = "qr-code-container";
                qrContainer.style.cssText = `
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  background: white;
                  padding: 20px;
                  border-radius: 12px;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                  z-index: 1001;
                  text-align: center;
                `;
                
                const qrCodeImage = document.createElement("img");
                qrCodeImage.src = data.qr_code;
                qrCodeImage.alt = "QR Code Pix";
                qrCodeImage.style.width = "200px";
                qrCodeImage.style.height = "200px";
                
                const closeBtn = document.createElement("button");
                closeBtn.textContent = "Fechar";
                closeBtn.style.cssText = `
                  margin-top: 10px;
                  padding: 8px 16px;
                  background: #007bff;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                `;
                closeBtn.onclick = () => qrContainer.remove();
                
                qrContainer.appendChild(qrCodeImage);
                qrContainer.appendChild(closeBtn);
                document.body.appendChild(qrContainer);
                
                showPopupMessage(data.msg || "QR Code PIX gerado com sucesso!", "success");
              } else {
                showPopupMessage(data.msg || "PIX processado com sucesso!", "success");
              }
              
            } catch (error) {
              console.error("Erro ao processar PIX:", error);
              showPopupMessage("Erro ao processar pagamento via PIX. Tente novamente.");
            }
          }} 
        >
          <h2>Pagamento via Pix</h2>
          <div className="Preço">
            Preço do plano: <span className="PrecoPlano">R$ {amount}</span>
          </div>
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input id="nome" name="nome" required placeholder="Insira seu nome completo" />
          </div>

          <div className="form-group">
            <label htmlFor="form-checkout__identificationType">
              Tipo de documento
            </label>
            <select
              id="form-checkout__identificationType"
              name="tipo_documento"
              required
            >
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
            </select>
            <label id="documento-texto" htmlFor="form-checkout__identificationNumber">Insira seu Documento aqui</label>
            <input
              id="form-checkout__identificationNumber"
              name="documento_numero"
              placeholder="Número do documento"
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Gerar QR Code Pix
          </button>
        </form>
      )}
    </div>
  );
}