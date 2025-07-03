"use client";
import ButtonDivulgarVaga from "@/components/botoes/ButtonDivulgarVaga";
import "@/components/AbasCards/cards/CardStyle.css";
import "./AreaDaEmpresa.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import Perfil from "@/components/botoes/perfil";
import AlterarDados from "@/components/botoes/AlterarDados";
import Planos from "@/components/botoes/Planos";
import getMinhasVagas from "@/components/services/allJob/getMinhasVagas";
import { ApagarMinhasVagas } from "@/components/services/auth/apagarVagasUsuario";

export default function AreaDaEmpresa() {
  const router = useRouter();
  const nome = Cookies.get(`${process.env.NEXT_PUBLIC_NOME_PERFIL}`);
  const email = Cookies.get(`${process.env.NEXT_PUBLIC_EMAIL_PERFIL}`);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [temCredito, setTemCredito] = useState(false); // Simulação de crédito
  const [vagas, setVagas] = useState([]);

  // Estados para o popup personalizado
  const [popup, setPopup] = useState({
    mostrar: false,
    tipo: "", // 'sucesso', 'confirmacao', 'erro'
    titulo: "",
    mensagem: "",
    botoes: [],
  });

  const handleLogout = () => {
    Cookies.remove(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
    router.push("/login");
  };

  useEffect(() => {
    const fetchVagas = async () => {
      const vagas = await getMinhasVagas(
        Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`)
      );
      setVagas(vagas);
    };

    fetchVagas();
  }, []);

  const togglePerfil = () => {
    setMostrarPerfil((prev) => !prev);
  };

  // Função para mostrar popup personalizado
  const mostrarPopupPersonalizado = (tipo, titulo, mensagem, botoes) => {
    setPopup({
      mostrar: true,
      tipo,
      titulo,
      mensagem,
      botoes,
    });
  };

  // Função para fechar popup
  const fecharPopup = () => {
    setPopup({
      mostrar: false,
      tipo: "",
      titulo: "",
      mensagem: "",
      botoes: [],
    });
  };

  const handleImpulsionarClick = (vaga) => {
    setVagaSelecionada(vaga);
    setMostrarPopup(true);
  };

  const confirmarImpulsionamento = () => {
    setMostrarPopup(false);

    // Mostrar popup de sucesso
    mostrarPopupPersonalizado(
      "sucesso",
      "Impulsionamento Realizado!",
      `A vaga "${vagaSelecionada.titulo}" foi impulsionada com sucesso!`,
      [
        {
          texto: "OK",
          acao: () => {
            fecharPopup();
            setVagaSelecionada(null);
          },
          classe: "btn-vaga editar",
        },
      ]
    );

    // Aqui você conecta com o back-end para descontar crédito ou registrar impulsionamento
  };

  const handleEditarVaga = (vaga) => {
    // Mostrar popup de informação
    mostrarPopupPersonalizado(
      "info",
      "Editar Vaga",
      `Você será redirecionado para editar a vaga "${vaga.titulo}".`,
      [
        {
          texto: "Cancelar",
          acao: fecharPopup,
          classe: "btn-vaga deletar",
        },
        {
          texto: "Continuar",
          acao: () => {
            fecharPopup();
            // Implementar lógica para editar vaga
            console.log("Editar vaga:", vaga);
            // router.push(`/area-da-empresa/editar-vaga/${vaga.uuid}`);
          },
          classe: "btn-vaga editar",
        },
      ]
    );
  };

  const handleDeletarVaga = (vaga) => {
    // Mostrar popup de confirmação
    mostrarPopupPersonalizado(
      "confirmacao",
      "Confirmar Exclusão",
      `Tem certeza que deseja deletar a vaga "${vaga.titulo}"? Esta ação não poderá ser desfeita.`,
      [
        {
          texto: "Cancelar",
          acao: fecharPopup,
          classe: "btn-vaga editar",
        },
        {
          texto: "Deletar",
          acao: () => {
            fecharPopup();
            ApagarMinhasVagas(
              Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`),
              vaga.uuid
            ); // Chamar função para deletar vaga
            // Implementar lógica para deletar vaga
            console.log("Deletar vaga:", vaga);

            // Mostrar popup de sucesso após deletar
            mostrarPopupPersonalizado(
              "sucesso",
              "Vaga Deletada!",
              `A vaga "${vaga.titulo}" foi deletada com sucesso.`,
              [
                {
                  texto: "OK",
                  acao: fecharPopup,
                  classe: "btn-vaga editar",
                },
              ]
            );

            // Aqui você faria a chamada para o back-end para deletar a vaga
          },
          classe: "btn-vaga deletar",
        },
      ]
    );
  };

  return (
    <section className="AreaEmpresa">
      <div className="DivulgarVaga">
        <h2>Encontre os melhores talentos do Maranhão para sua empresa</h2>
        <p>
          Conecte sua vaga aos profissionais mais qualificados do estado em
          poucos cliques.
        </p>
        <div className="AreaEmpresaButtons">
          <Link href="/area-da-empresa/formularioVaga">
            <ButtonDivulgarVaga />
          </Link>
          <button className="PerfilButton" onClick={togglePerfil}>
            <Perfil />
          </button>
          <Link href="/area-da-empresa/planos">
            <Planos />
          </Link>
        </div>
        {mostrarPerfil && (
          <div className="PerfilInfo">
            <p>
              <strong>Nome:</strong> {nome}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Crédito de impulsionamento:</strong> {temCredito ? 1 : 0}
            </p>
            <Link href="/area-da-empresa/alterarPerfil">
              <AlterarDados />
            </Link>
          </div>
        )}
      </div>

      {vagas.code !== 404 && vagas.vagas && vagas.vagas.length > 0 ? (
        <div className="VagasDivulgadas">
          <h2>Vagas divulgadas ({vagas.vagas.length})</h2>
          <hr />
          <div className="CardVagasPublicadas">
            {vagas.vagas.map((vaga, index) => (
              <div key={vaga.uuid || index} id="CardVagasDivulgadas">
                <h3 className="titulo-vaga">{vaga.titulo}</h3>
                <p className="descricao-vaga">{vaga.requisitos}</p>
                <span className="status-vaga">
                  Status:{" "}
                  <strong>
                    {vaga.aprovacao_Vagas ? "Aprovada" : "Pendente"}
                  </strong>
                </span>
                {vaga.anuncio_destaque && (
                  <span className="destaque-vaga">
                    <strong>🌟 Vaga em Destaque</strong>
                  </span>
                )}
                <div className="botoes-vaga">
                  <button
                    className="btn-vaga editar"
                    onClick={() => handleEditarVaga(vaga)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-vaga impulsionar"
                    onClick={() => handleImpulsionarClick(vaga)}
                  >
                    Impulsionar
                  </button>
                  <button
                    className="btn-vaga deletar"
                    onClick={() => handleDeletarVaga(vaga)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="VagasDivulgadas">
          <h2>Vagas divulgadas</h2>
          <hr />
          <div className="sem-vagas">
            <p>Você ainda não possui vagas divulgadas.</p>
            <Link href="/area-da-empresa/formularioVaga">
              <button className="btn-vaga editar">
                Divulgar primeira vaga
              </button>
            </Link>
          </div>
        </div>
      )}

      <button className="LogoutButton" onClick={handleLogout}>
        <LogoutOutlined /> Sair
      </button>

      {/* POP-UP DE IMPULSIONAMENTO */}
      {mostrarPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {temCredito ? (
              <>
                <p>
                  Tem certeza que deseja impulsionar a vaga "
                  {vagaSelecionada?.titulo}"?
                </p>
                <div className="popup-buttons">
                  <button
                    className="btn-vaga impulsionar"
                    onClick={confirmarImpulsionamento}
                  >
                    Sim
                  </button>
                  <button
                    className="btn-vaga deletar"
                    onClick={() => setMostrarPopup(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Você não possui créditos para impulsionar esta vaga.</p>
                <div className="popup-buttons">
                  <Link href="/area-da-empresa/planos">
                    <button className="btn-vaga editar">Ver Planos</button>
                  </Link>
                  <button
                    className="btn-vaga deletar"
                    onClick={() => setMostrarPopup(false)}
                  >
                    Fechar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* POP-UP PERSONALIZADO */}
      {popup.mostrar && (
        <div className="popup-overlay">
          <div className={`popup-box popup-${popup.tipo}`}>
            <div className="popup-header">
              <h3 className="popup-titulo">{popup.titulo}</h3>
              <div className={`popup-icon popup-icon-${popup.tipo}`}>
                {popup.tipo === "sucesso" && "✅"}
                {popup.tipo === "confirmacao" && "?"}
                {popup.tipo === "erro" && "❌"}
                {popup.tipo === "info" && "!"}
              </div>
            </div>
            <div className="popup-content">
              <p>{popup.mensagem}</p>
            </div>
            <div className="popup-buttons">
              {popup.botoes.map((botao, index) => (
                <button
                  key={index}
                  className={botao.classe}
                  onClick={botao.acao}
                >
                  {botao.texto}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
