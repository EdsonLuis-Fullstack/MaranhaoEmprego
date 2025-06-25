"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import "./style_cartao.css";
import Cookies from "js-cookie";
import enviarCartao from "@/components/services/payment/pagamentoCartao";
import { enviarPix } from "@/components/services/payment/pagamentoPix";
import { pegarInfomacao } from "@/components/services/planos/informacaoPlanos";
import { useRouter } from "next/navigation";

export default function PaymentForm() {
  const router = useRouter();
  
  const [mpLoaded, setMpLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [selectedTab, setSelectedTab] = useState<"cartao" | "pix">("cartao");
  const [amount, setAmount] = useState("10"); // Agora é um state
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error"); // "error" ou "success"
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar carregamento

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
    router.refresh(); // Recarrega a página para limpar o formulário
  };

  // UseEffect para buscar o valor do plano apenas uma vez
  useEffect(() => {
    const fetchPlanValue = async () => {
      try {
        setIsLoading(true);
        const response = await pegarInfomacao();
        const valor = response.valor;
        
        setAmount(valor);
        
        // Atualizar o elemento do DOM se existir
        const plano = document.getElementById("valor_plano");
        if (plano) {
          plano.textContent = `R$ ${valor}`;
        }
      } catch (error) {
        console.error("Erro ao buscar informações do plano:", error);
        showPopupMessage("Erro ao carregar informações do plano");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanValue();
  }, []); // Executa apenas uma vez na montagem do componente

  // UseEffect para inicializar o MercadoPago
  useEffect(() => {
    if (selectedTab === "cartao" && mpLoaded && window.MercadoPago && !isLoading) {
      try {
        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MP_KEY
        );
        if(cardFormRef.current) {
          cardFormRef.current.unmount(); // Desmonta o formulário anterior, se existir
        }

        cardFormRef.current = mp.cardForm({
          amount: `${parseFloat(amount)}`,
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

                const token_AUTH = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
                completeData.token_AUTH = token_AUTH;

                // Enviar dados do cartão e tratar resposta
                const response = await enviarCartao(completeData);
                
                // Verificar se a resposta tem o formato esperado
                if (response && typeof response === 'object') {
                  if (response.code === 200) {
                    showPopupMessage(response.msg || "Pagamento processado com sucesso!", "success");
                    setInterval(() => {
                      router.push("/")
                    }, 3000);
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
        router.refresh();
      }
    }
  }, [mpLoaded, paymentMethod, amount, selectedTab, isLoading]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Função para gerar QR Code usando canvas
  const generateQRCode = (text, size = 200) => {
    return new Promise((resolve, reject) => {
      // Importar QRCode.js dinamicamente
      if (typeof window !== 'undefined' && !window.QRCode) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js';
        script.onload = () => {
          generateQR();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      } else {
        generateQR();
      }

      function generateQR() {
        const canvas = document.createElement('canvas');
        window.QRCode.toCanvas(canvas, text, {
          width: size,
          height: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        }, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(canvas.toDataURL());
          }
        });
      }
    });
  };

  // Mostrar loading enquanto busca as informações
  if (isLoading) {
    return (
      <div className="conteinerPay">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Carregando informações do plano...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="conteinerPay">
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpLoaded(true)}
      />
      
      {/* Script do QRCode.js */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js"
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
            Preço do plano: <span id="valor_plano" className="PrecoPlano">R$ {amount}</span>
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
              
              if (data.pixData.qr_code) {
                // Remover QR code anterior se existir
                const existingQR = document.querySelector('.qr-code-container');
                if (existingQR) {
                  existingQR.remove();
                }
                
                try {
                  // Gerar QR Code usando a string retornada do backend
                  const qrCodeDataURL = await generateQRCode(data.pixData.qr_code, 250);
                  
                  // Criar container para o QR code
                  const qrContainer = document.createElement("div");
                  qrContainer.className = "qr-code-container";
                  qrContainer.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    z-index: 1001;
                    text-align: center;
                    max-width: 90vw;
                    max-height: 90vh;
                  `;
                  
                  // Título
                  const title = document.createElement("h3");
                  title.textContent = "Escaneie o QR Code para pagar";
                  title.style.marginBottom = "15px";
                  title.style.color = "#333";
                  
                  // QR Code gerado
                  const qrCodeImage = document.createElement("img");
                  qrCodeImage.src = qrCodeDataURL;
                  qrCodeImage.alt = "QR Code Pix";
                  qrCodeImage.style.cssText = `
                    width: 250px;
                    height: 250px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    margin-bottom: 15px;
                  `;
                  
                  // Instruções
                  const instructions = document.createElement("p");
                  instructions.textContent = "Use o app do seu banco para escanear o código";
                  instructions.style.cssText = `
                    color: #666;
                    margin-bottom: 20px;
                    font-size: 14px;
                  `;
                  
                  // Botão de copiar código PIX
                  const copyBtn = document.createElement("button");
                  copyBtn.textContent = "Copiar código PIX";
                  copyBtn.style.cssText = `
                    margin-right: 10px;
                    padding: 10px 20px;
                    background: #32BCAD;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                  `;
                  copyBtn.onclick = () => {
                    navigator.clipboard.writeText(data.pixData.qr_code);
                    copyBtn.textContent = "Copiado!";
                    setTimeout(() => {
                      copyBtn.textContent = "Copiar código PIX";
                    }, 2000);
                  };
                  
                  // Botão de fechar
                  const closeBtn = document.createElement("button");
                  closeBtn.textContent = "Fechar";
                  closeBtn.style.cssText = `
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                  `;
                  closeBtn.onclick = () => qrContainer.remove();
                  
                  // Montar o modal
                  qrContainer.appendChild(title);
                  qrContainer.appendChild(qrCodeImage);
                  qrContainer.appendChild(instructions);
                  qrContainer.appendChild(copyBtn);
                  qrContainer.appendChild(closeBtn);
                  document.body.appendChild(qrContainer);
                  
                  showPopupMessage(data.msg || "QR Code PIX gerado com sucesso!", "success");
                  
                } catch (qrError) {
                  console.error("Erro ao gerar QR Code:", qrError);
                  showPopupMessage("QR Code gerado, mas houve erro na exibição. Use o código PIX copiado.");
                }
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