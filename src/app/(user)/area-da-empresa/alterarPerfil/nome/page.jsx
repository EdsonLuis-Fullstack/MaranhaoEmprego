"use client";
import "./name.css";
import { useState } from "react";
import Link from "next/link";
import { MudarNome } from "@/components/services/auth/alterarNome";
import Cookies from "js-cookie";

// Componente do Popup
const PopupConfirmacao = ({ isOpen, onClose, tipo, mensagem }) => {
  if (!isOpen) return null;

  const getIcone = () => {
    switch (tipo) {
      case "sucesso":
        return "✓";
      case "erro":
        return "⚠";
      case "aviso":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  const getCorTema = () => {
    switch (tipo) {
      case "sucesso":
        return "#4CAF50";
      case "erro":
        return "#f44336";
      case "aviso":
        return "#ff9800";
      default:
        return "#2196F3";
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header" style={{ backgroundColor: getCorTema() }}>
          <span className="popup-icone">{getIcone()}</span>
        </div>
        <div className="popup-conteudo">
          <p className="popup-mensagem">{mensagem}</p>
          <button
            onClick={onClose}
            className="popup-botao"
            style={{ backgroundColor: getCorTema() }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AlterarNome() {
  const [captchaValidado, setCaptchaValidado] = useState(false);
  const [popup, setPopup] = useState({
    isOpen: false,
    tipo: "",
    mensagem: "",
  });

  const mostrarPopup = (tipo, mensagem) => {
    setPopup({
      isOpen: true,
      tipo,
      mensagem,
    });
  };

  const fecharPopup = () => {
    setPopup({
      isOpen: false,
      tipo: "",
      mensagem: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nome = formData.get("nome");
    const email = formData.get("email");

    if (!nome && !email) {
      mostrarPopup(
        "aviso",
        "Por favor, preencha pelo menos um campo para atualizar."
      );
      return;
    }

    if (!captchaValidado) {
      mostrarPopup("aviso", "Por favor, valide o CAPTCHA antes de enviar.");
      return;
    }

    try {
      const Token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
      const resposta = await MudarNome(Token, nome);

      console.log("Dados atualizados:", { nome, email });
      mostrarPopup("sucesso", "Dados atualizados com sucesso!");

      // Limpar formulário após sucesso
      e.target.reset();
      setCaptchaValidado(false);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      mostrarPopup("erro", "Erro ao atualizar dados. Tente novamente.");
    }
  };

  return (
    <main className="alterar-dados-wrapper">
      <section className="alterar-dados-box">
        <h1>Alterar nome da conta</h1>
        <form onSubmit={handleSubmit} className="alterar-dados-form">
          <div className="form-group">
            <label htmlFor="nome">Novo nome</label>
            <input type="text" id="nome" name="nome" />
          </div>
          <div className="captcha-simulado">
            <input
              type="checkbox"
              id="captcha"
              checked={captchaValidado}
              onChange={(e) => setCaptchaValidado(e.target.checked)}
            />
            <label htmlFor="captcha">Não sou um robô</label>
          </div>

          <button type="submit" className="btn-submit">
            Salvar alterações
          </button>
        </form>
      </section>

      <PopupConfirmacao
        isOpen={popup.isOpen}
        onClose={fecharPopup}
        tipo={popup.tipo}
        mensagem={popup.mensagem}
      />


    </main>
  );
}
