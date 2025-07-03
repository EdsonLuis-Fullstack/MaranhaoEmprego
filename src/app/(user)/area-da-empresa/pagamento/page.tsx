"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import "./style_cartao.css";
import Cookies from "js-cookie";
import enviarCartao from "@/components/services/payment/pagamentoCartao";
import { enviarPix } from "@/components/services/payment/pagamentoPix";
import { pegarInfomacao } from "@/components/services/planos/informacaoPlanos";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import "./PagamentoPix.css";

export function PixQrCode({ Pix_code, value, Onback }) {
  const [pixCode, setPixCode] = useState(null);
  const [valor, setValor] = useState(`R$ ${parseFloat(value).toFixed(2)}`);
  const [copy, setCopy] = useState("");

  useEffect(() => {
    setCopy(Pix_code);
    setValor(`R$ ${parseFloat(value).toFixed(2)}`);
    async function generateQRCode() {
      const data_QRCODE = await QRCode.toDataURL(Pix_code);
      setPixCode(data_QRCODE);
    }
    generateQRCode();
  }, [Pix_code]);

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(copy);
      const botao = document.getElementById("botao_copiar");
      if (botao) {
        botao.innerText = "Copiado Com sucesso!";
        setTimeout(() => {
          botao.innerText = "Copiar código";
        }, 2000);
      }
    } catch (err) {
      alert("Erro ao copiar o código.");
    }
  };

  return (
    <div className="pagina-pix">
      <div className="pix-box">
        <h2 className="titulo">Pagamento via Pix</h2>
        <p className="descricao">
          Valor a pagar: <strong>{valor}</strong>
        </p>

        <div className="qrcode-container">
          {pixCode ? (
            <Image
              src={pixCode}
              alt="QR Code Pix"
              className="qrcode-img"
              width={240}
              height={240}
            />
          ) : (
            <p>Gerando QR Code...</p>
          )}
        </div>

        <div className="codigo-container">
          <label htmlFor="pixCode">Código Pix (copia e cola):</label>
          <textarea
            id="pixCode"
            readOnly
            value={copy}
            rows={4}
            className="pix-textarea"
          />
          <button
            id="botao_copiar"
            className="btn-copiar"
            onClick={copiarCodigo}
          >
            Copiar código
          </button>
          <button id="botao_voltar" className="btn-voltar" onClick={Onback}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentForm() {
  const router = useRouter();
  const [mpLoaded, setMpLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [selectedTab, setSelectedTab] = useState("cartao");
  const [amount, setAmount] = useState("7");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
  const [uuid_plano, setUuid_Plano] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);
  const [cardFormMounted, setCardFormMounted] = useState(false);
  const [formReady, setFormReady] = useState(false);

  const cardFormRef = useRef(null);
  const mountTimeoutRef = useRef(null);

  // Função para mostrar popup
  const showPopupMessage = (message, type = "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
  };

  // Função para fechar popup
  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Função para voltar ao formulário PIX
  const handleBackToForm = () => {
    setQrCodeData(null);
  };

  // Função para limpar formulário do MercadoPago de forma segura
  const safeUnmountCardForm = () => {
    if (mountTimeoutRef.current) {
      clearTimeout(mountTimeoutRef.current);
      mountTimeoutRef.current = null;
    }

    if (cardFormRef.current && cardFormMounted) {
      try {
        const formElement = document.getElementById("form-checkout");
        if (formElement) {
          cardFormRef.current.unmount();
        }
      } catch (error) {
        console.warn("Erro ao desmontar formulário:", error);
      } finally {
        cardFormRef.current = null;
        setCardFormMounted(false);
      }
    }
  };

  // Função para aguardar elemento no DOM
  const waitForElement = (selector, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const element = document.getElementById(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver((mutations, obs) => {
        const element = document.getElementById(selector);
        if (element) {
          obs.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Elemento ${selector} não encontrado`));
      }, timeout);
    });
  };

  // UseEffect para buscar o valor do plano apenas uma vez
  useEffect(() => {
    const fetchPlanValue = async () => {
      try {
        setIsLoading(true);
        const response = await pegarInfomacao();
        const valor = response.planos[0].valor_Plano;
        
        setUuid_Plano(response.planos[0].uuid_Planos);
        setAmount(valor);

        // Atualizar o elemento do DOM se existir
        const plano = document.getElementById("valor_plano");
        if (plano) {
          plano.textContent = `R$ ${valor}`;
        }
      } catch (error) {
        showPopupMessage("Erro ao carregar informações do plano");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanValue();
  }, []);

  // UseEffect para controlar quando o formulário está pronto
  useEffect(() => {
    if (selectedTab === "cartao" && !isLoading) {
      // Aguarda um pouco antes de marcar como pronto
      const timer = setTimeout(() => {
        setFormReady(true);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setFormReady(false);
    }
  }, [selectedTab, isLoading]);

  // UseEffect para inicializar o MercadoPago
  useEffect(() => {
    if (
      selectedTab === "cartao" &&
      mpLoaded &&
      window.MercadoPago &&
      formReady &&
      !cardFormMounted
    ) {
      const initializeCardForm = async () => {
        try {
          // Aguarda o elemento estar disponível no DOM
          await waitForElement("form-checkout");

          // Limpa qualquer formulário anterior
          safeUnmountCardForm();

          // Aguarda um pouco mais antes de criar o novo formulário
          mountTimeoutRef.current = setTimeout(async () => {
            try {
              const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_KEY);

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
                  identificationType: {
                    id: "form-checkout__identificationType",
                  },
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
                  onFormMounted: () => {
                    console.log("Formulário montado com sucesso");
                    setCardFormMounted(true);
                  },
                  onSubmit: async (event) => {
                    event.preventDefault();
                    try {
                      setIsLoading(true);

                      const formElement =
                        document.getElementById("form-checkout");
                      const formData = new FormData(formElement);

                      const cardData = cardFormRef.current.getCardFormData();

                      const completeData = {
                        ...cardData,
                        cardholderName:
                          formData.get("cardholderName") ||
                          document.getElementById(
                            "form-checkout__cardholderName"
                          )?.value,
                        cardholderEmail:
                          formData.get("cardholderEmail") ||
                          document.getElementById(
                            "form-checkout__cardholderEmail"
                          )?.value,
                        identificationType:
                          formData.get("identificationType") ||
                          cardData.identificationType,
                        identificationNumber:
                          formData.get("identificationNumber") ||
                          cardData.identificationNumber,
                      };

                      console.log("Dados completos do cartão:", completeData);

                      if (!completeData.cardholderName) {
                        showPopupMessage(
                          "Por favor, preencha o nome no cartão"
                        );
                        setIsLoading(false);
                        return;
                      }

                      const token_AUTH = Cookies.get(
                        `${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`
                      );
                      completeData.token_AUTH = token_AUTH;
                      completeData.uuid_plan = uuid_plano;

                      const response = await enviarCartao(completeData);

                      if (response.code == 407) {
                        showPopupMessage(
                          "Seu cartão foi recusado pelo provedor"
                        );
                      }
                      if (response && typeof response === "object") {
                        if (response.code === 200) {
                          showPopupMessage(
                            response.msg || "Pagamento processado com sucesso!",
                            "success"
                          );
                          setTimeout(() => {
                            router.push("/");
                          }, 3000);
                        } else {
                          showPopupMessage(
                            response.msg || "Erro no processamento do pagamento"
                          );
                        }
                      } else {
                        showPopupMessage(
                          "Erro inesperado na resposta do servidor"
                        );
                      }
                    } catch (error) {
                      console.error("Erro ao processar pagamento:", error);
                      showPopupMessage("Erro no pagamento. Tente novamente.");
                    } finally {
                      setIsLoading(false);
                    }
                  },
                  onFetching: (resource) =>
                    console.log(`Buscando recurso: ${resource}`),
                  onError: (error) => {
                    console.error("Erro no formulário:", error);
                    showPopupMessage(
                      "Erro no formulário. Verifique os dados inseridos."
                    );
                  },
                },
              });
            } catch (error) {
              console.error("Erro ao inicializar formulário:", error);
              showPopupMessage(
                "Erro ao carregar formulário. Recarregando página..."
              );
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          }, 300);
        } catch (error) {
          console.error("Erro ao aguardar elemento:", error);
          showPopupMessage("Erro ao carregar formulário. Tente novamente.");
        }
      };

      initializeCardForm();
    }

    // Cleanup function
    return () => {
      if (selectedTab !== "cartao") {
        safeUnmountCardForm();
      }
    };
  }, [
    mpLoaded,
    paymentMethod,
    amount,
    selectedTab,
    formReady,
    uuid_plano,
    cardFormMounted,
  ]);

  // Cleanup ao desmontar o componente
  useEffect(() => {
    return () => {
      safeUnmountCardForm();
    };
  }, []);

  // Cleanup ao mudar de aba
  useEffect(() => {
    if (selectedTab !== "cartao") {
      safeUnmountCardForm();
      setFormReady(false);
    }
  }, [selectedTab]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    // Re-monta o formulário quando muda o método de pagamento
    if (cardFormMounted) {
      safeUnmountCardForm();
      setFormReady(false);
      setTimeout(() => {
        setFormReady(true);
      }, 500);
    }
  };

  return (
    <div className="conteinerPay">
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => {
          console.log("MercadoPago SDK carregado");
          setMpLoaded(true);
        }}
        onError={(error) => {
          console.error("Erro ao carregar MercadoPago SDK:", error);
          showPopupMessage("Erro ao carregar SDK de pagamento");
        }}
      />

      {/* Popup de Mensagem */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className={`popup-content ${popupType}`}
            onClick={(e) => e.stopPropagation()}
          >
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
          onClick={() => {
            if (selectedTab !== "cartao") {
              safeUnmountCardForm();
              setSelectedTab("cartao");
            }
          }}
        >
          Cartão
        </button>
        <button
          className={`tab-btn ${selectedTab === "pix" ? "active" : ""}`}
          onClick={() => {
            if (selectedTab !== "pix") {
              safeUnmountCardForm();
              setSelectedTab("pix");
            }
          }}
        >
          Pix
        </button>
      </div>

      {/* Formulário de Cartão */}
      {selectedTab === "cartao" && (
        <div>
          {!formReady || isLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>Carregando formulário...</p>
            </div>
          ) : (
            <form id="form-checkout" className="form-checkout">
              <h2>Cartão</h2>
              <div className="Preço">
                Preço do plano:{" "}
                <span id="valor_plano" className="PrecoPlano">
                  R$ {amount}
                </span>
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
                <label htmlFor="form-checkout__cardNumber">
                  Número do cartão
                </label>
                <input id="form-checkout__cardNumber" name="cardNumber" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-checkout__securityCode">CVV</label>
                  <input id="form-checkout__securityCode" name="securityCode" />
                </div>
                <div className="form-group">
                  <label htmlFor="form-checkout__expirationDate">
                    Validade
                  </label>
                  <input
                    id="form-checkout__expirationDate"
                    name="expirationDate"
                  />
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

              <button
                type="submit"
                className="btn-submit"
                disabled={isLoading || !cardFormMounted}
              >
                {isLoading ? "Carregando Pagamento..." : "Pagar"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Seção PIX - Formulário ou QR Code */}
      {selectedTab === "pix" && (
        <>
          {qrCodeData ? (
            <PixQrCode
              Pix_code={qrCodeData}
              value={amount}
              Onback={handleBackToForm}
            />
          ) : (
            <form
              className="form-pix"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setIsLoading(true);
                  const nome = e.target.nome.value;
                  const token = Cookies.get(
                    `${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`
                  );
                  const tipo_documento = e.target.tipo_documento.value;
                  const documento_numero = e.target.documento_numero.value;

                  const data = await enviarPix({
                    nome,
                    documento_tipo: tipo_documento,
                    documento_numero,
                    token: token,
                  });

                  if (data.code !== 200) {
                    showPopupMessage(
                      data.msg || "Erro ao processar pagamento via PIX"
                    );
                    return;
                  }

                  if (data.pixData.qr_code) {
                    setQrCodeData(data.pixData.qr_code);
                  } else {
                    showPopupMessage("Erro ao gerar QR Code. Tente novamente.");
                    return;
                  }
                } catch (error) {
                  console.error("Erro ao processar PIX:", error);
                  showPopupMessage(
                    "Erro ao processar pagamento via PIX. Tente novamente."
                  );
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              <h2>Pagamento via Pix</h2>
              <div className="Preço">
                Preço do plano: <span className="PrecoPlano">R$ {amount}</span>
              </div>
              <div className="form-group">
                <label htmlFor="nome">Nome completo</label>
                <input
                  id="nome"
                  name="nome"
                  required
                  placeholder="Insira seu nome completo"
                />
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
                <label
                  id="documento-texto"
                  htmlFor="form-checkout__identificationNumber"
                >
                  Insira seu Documento aqui
                </label>
                <input
                  id="form-checkout__identificationNumber"
                  name="documento_numero"
                  placeholder="Número do documento"
                  required
                />
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Carregando..." : "Gerar QR Code"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
