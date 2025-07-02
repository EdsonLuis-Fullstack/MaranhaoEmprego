"use client";
import { useState } from "react";
import "./RecuperarSenha.css";
import { SolicitarCodigo,EnviarCodigo_Senha } from "@/components/services/auth/redefinirDados";
import { useRouter } from "next/navigation";

export default function RecuperarSenha() {
  const [step, setStep] = useState("email"); // 'email' ou 'code'
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showCodeSentPopup, setShowCodeSentPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [senha_visivel, setVisivel] = useState(false);
  const [codigoVerificado, setCodigoVerificado] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const popupMessage = (nome_Campo, mensagem) => {
    setIsLoading(false);
    setErrors({ [nome_Campo]: mensagem });
    setTimeout(() => {
      setErrors({});
    }, 3000);
  };
  const verSenha = () => {
    if (senha_visivel) {
      setVisivel(false);
      return;
    }
    setVisivel(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      popupMessage("email", "Por favor, digite seu e-mail");
      return;
    }

    if (!validateEmail(email)) {
      popupMessage("email", "Por favor, digite um e-mail válido");
      return;
    }

    setIsLoading(true);

    let resposta = await SolicitarCodigo(email);

    if (resposta.code != 201) {
      popupMessage("email", resposta.msg);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setStep("code");
    setShowCodeSentPopup(true);
  };

  // Modificar a função handleCodeSubmit:
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (!code) {
      popupMessage("code", "Por favor, digite o código de verificação");
      return;
    }

    if (code.length !== 4) {
      popupMessage("code", "O código deve ter 4 dígitos");
      return;
    }

    if (!newPassword) {
      popupMessage("newPassword", "Por favor, digite sua nova senha");
      return;
    }

    if (newPassword.length < 5) {
      popupMessage("newPassword", "A senha deve ter pelo menos 5 caracteres");
      return;
    }
    const response = await EnviarCodigo_Senha(email,newPassword,code)
    if(response.code == 400){
      return popupMessage("code",response.msg)
    }
    if(response.code == 401){
      return popupMessage("email",response.msg)
    }
    if(response.code == 402){
      return popupMessage("newPassword",response.msg)
    }
    setIsLoading(false); 
    return setShowSuccessPopup(true);   

  };
  // Modificar a função handleBackToEmail:
  const handleBackToEmail = () => {
    setStep("email");
    setCode("");
    setNewPassword("");
    setErrors({});
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowCodeSentPopup(false);
  };
  const fecharPaginaLogin = () => {
    setShowSuccessPopup(false);
    setShowCodeSentPopup(false);
    router.push("/login");
  }

  const resendCode = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowCodeSentPopup(true);
    }, 1000);
  };

  return (
    <>
      <div className="recuperar-container">
        <div className="recuperar-card">
          <div className="header-section">
            <div className="icon-container">
              {step === "email" ? (
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              )}
            </div>
            <h2 className="title">
              {step === "email" ? "Recuperar Senha" : "Verificar Código"}
            </h2>
            <p className="subtitle">
              {step === "email"
                ? "Digite seu e-mail para receber o código de verificação"
                : `Enviamos um código de 6 dígitos para ${email}`}
            </p>
          </div>

          {step === "email" ? (
            <div className="form-section">
              <div className="input-group">
                <svg className="input-icon" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  value={email}
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className={`input-field ${errors.email ? "error" : ""}`}
                />
              </div>
              {errors.email && (
                <div className="error-message">
                  <svg className="error-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  {errors.email}
                </div>
              )}

              <button
                onClick={handleEmailSubmit}
                disabled={isLoading}
                className="button-primary"
                style={{ marginTop: "1.5rem" }}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Enviando...
                  </>
                ) : (
                  "Enviar Código"
                )}
              </button>
            </div>
          ) : (
            <>
              <div className="form-section">
                <div className="input-group">
                  <svg className="input-icon" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    type="number"
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="Digite o código de verificação"
                    className={`input-field code-input ${
                      errors.code ? "error" : ""
                    }`}
                    maxLength="4"
                    onKeyPress={(e) => e.key === "Enter" && handleCodeSubmit(e)}
                  />
                </div>
                {errors.code && (
                  <div className="error-message">
                    <svg className="error-icon" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {errors.code}
                  </div>
                )}

                <div className="input-group" style={{ marginTop: "1rem" }}>
                  {senha_visivel ? (
                    <svg
                      className="input-icon"
                      viewBox="0 0 24 24"
                      onClick={verSenha}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="input-icon"
                      viewBox="0 0 24 24"
                      onClick={verSenha}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}

                  <input
                    type={senha_visivel ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite sua nova senha"
                    className={`input-field ${
                      errors.newPassword ? "error" : ""
                    }`}
                    onKeyPress={(e) => e.key === "Enter" && handleCodeSubmit(e)}
                  />
                </div>
                {errors.newPassword && (
                  <div className="error-message">
                    <svg className="error-icon" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {errors.newPassword}
                  </div>
                )}

                {/* Resto do código permanece igual */}
              </div>
              <div className="button-group" style={{ marginTop: "1.5rem" }}>
                <button
                  onClick={handleBackToEmail}
                  className="button-secondary"
                >
                  <svg
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 12H5m0 0l7 7m-7-7l7-7"
                    />
                  </svg>
                  Voltar
                </button>
                <button
                  onClick={handleCodeSubmit}
                  disabled={isLoading}
                  className="button-primary"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Verificando...
                    </>
                  ) : (
                    "Verificar"
                  )}
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button
                  onClick={resendCode}
                  disabled={isLoading}
                  className="resend-link"
                >
                  Não recebeu o código? Reenviar
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Popup Código Enviado */}
      {showCodeSentPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon-container blue">
              <svg className="popup-icon blue" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="popup-title">Código Enviado!</h3>
            <p className="popup-text">
              Enviamos um código de verificação para seu e-mail. Verifique sua
              caixa de entrada.
            </p>
            <button onClick={closePopup} className="popup-button blue">
              Entendi
            </button>
          </div>
        </div>
      )}

      {/* Popup Sucesso */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon-container green">
              <svg className="popup-icon green" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="popup-title">Sucesso!</h3>
            <p className="popup-text">
              Código verificado com sucesso! Você pode agora redefinir sua
              senha.
            </p>
            <button onClick={codigoVerificado ? fecharPaginaLogin : closePopup} className="popup-button green">
              Continuar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
