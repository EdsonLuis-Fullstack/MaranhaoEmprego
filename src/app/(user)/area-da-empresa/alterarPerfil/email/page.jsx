"use client";
import "./email.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {SolicitarCodigo_EMAIL_NOVO} from "@/components/services/auth/redefinirDados"
import Cookies from "js-cookie"
// Componente de Modal/Popup
const Modal = ({ isOpen, onClose, title, message, type = "info" }) => {
  if (!isOpen) return null;

  const getModalStyle = () => {
    switch (type) {
      case "error":
        return "modal-error";
      case "success":
        return "modal-success";
      case "confirm":
        return "modal-confirm";
      default:
        return "modal-info";
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${getModalStyle()}`}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn-modal-ok">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Modal de Confirmação
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-confirm">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-modal-confirm">
            Sim
          </button>
          <button onClick={onClose} className="btn-modal-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AlterarEmail() {
  const [captchaValidado, setCaptchaValidado] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Estados para controlar os modais
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const showModal = (title, message, type = "info") => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: "",
      message: "",
      type: "info",
    });
  };

  const showConfirmModal = (title, message, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showModal("Erro", "Por favor, insira um email.", "error");
      return;
    }

    if (!validarEmail(email)) {
      showModal("Erro", "Por favor, insira um email válido.", "error");
      return;
    }

    if (!captchaValidado) {
      showModal(
        "Erro",
        "Por favor, valide o CAPTCHA antes de enviar.",
        "error"
      );
      return;
    }

    // Mostrar confirmação antes de proceder
    showConfirmModal(
      "Confirmar alteração",
      `Tem certeza que deseja alterar o email para: ${email}?`,
      async () => {
        closeConfirmModal();
        await processarAlteracaoEmail();
      }
    );
  };

  const processarAlteracaoEmail = async () => {
    try {
      setLoading(true);
      const Token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`)
      const salvar = Cookies.set("emIaLEWrewwf",email)
      const data = await SolicitarCodigo_EMAIL_NOVO(email,Token)
      if (data.code == 201) {
        showModal(
          "Sucesso",
          "Email disponível! Redirecionando para verificação...",
          "success"
        );
        // Redirecionar após fechar o modal
        return setTimeout(() => {
          router.push("/area-da-empresa/alterarPerfil/email/VerificarEmail");
        }, 2000);
      } else {
        showModal(
          "Erro",
          data.msg ,
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      showModal(
        "Erro",
        `Erro ao verificar email. Tente novamente. ${error.message}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="alterar-dados-wrapper">
        <section className="alterar-dados-box">
          <h1>Alterar email da conta</h1>
          <form onSubmit={handleSubmit} className="alterar-dados-form">
            <div className="form-group">
              <label htmlFor="email">Novo Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="captcha-simulado">
              <input
                type="checkbox"
                id="captcha"
                onChange={(e) => setCaptchaValidado(e.target.checked)}
              />
              <label htmlFor="captcha">Não sou um robô</label>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Verificando..." : "Salvar alterações"}
            </button>
          </form>
        </section>
      </main>

      {/* Modais */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />


    </>
  );
}
