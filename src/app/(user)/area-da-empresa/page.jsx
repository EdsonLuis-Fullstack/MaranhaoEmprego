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
import { verificarCreditos } from "@/components/services/auth/verificarCreditos";
import { ImpulsionarVagas } from "@/components/services/auth/impulsionarVagas";

export default function AreaDaEmpresa() {
  const router = useRouter();
  const nome = Cookies.get(`${process.env.NEXT_PUBLIC_NOME_PERFIL}`);
  const email = Cookies.get(`${process.env.NEXT_PUBLIC_EMAIL_PERFIL}`);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [temCredito, setTemCredito] = useState(false);
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Estados para o popup personalizado
  const [popup, setPopup] = useState({
    mostrar: false,
    tipo: "",
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
      try {
        setLoading(true); // Inicia o carregamento
        const vagas = await getMinhasVagas(
          Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`)
        );
        const creditos = await verificarCreditos(
          Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`)
        );
        setVagas(vagas);
        setTemCredito(creditos.destaques);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
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
    window.location.reload();
  };

  const handleImpulsionarClick = (vaga) => {
    setVagaSelecionada(vaga);
    setMostrarPopup(true);
  };

  const confirmarImpulsionamento = async () => {
    setMostrarPopup(false);
    alert(vagaSelecionada.uuid);
    const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
    const resposta = await ImpulsionarVagas(token, vagaSelecionada.uuid);
    window.location.reload();

    if (resposta.code == 201) {
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
          window.location.reload();
    } else {
      mostrarPopupPersonalizado(
        "Um erro ocorreu",
        "Impulsionamento Nao foi reaizado!",
        `${resposta.msg}`,
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
          window.location.reload();
    }
  };

  const handleEditarVaga = (vaga) => {
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
            console.log("Editar vaga:", vaga);
          },
          classe: "btn-vaga editar",
        },
      ]
    );
  };

  const handleDeletarVaga = (vaga) => {
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
          acao: async () => {

            const data = await ApagarMinhasVagas(
              Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`),
              vaga.uuid
            );
            alert(data.code)
            console.log("Deletar vaga:", vaga);
            fecharPopup();
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
          },
          classe: "btn-vaga deletar",
        },
      ]
    );
  };

  // Componente de Loading
  const LoadingComponent = () => (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p className="loading-text">Carregando dados do perfil...</p>
    </div>
  );

  // Se estiver carregando, exibe apenas o loading
  if (loading) {
    return (
      <section className="AreaEmpresa">
        <LoadingComponent />
      </section>
    );
  }

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
                  {vaga.anuncio_destaque ? (
                    ""
                  ) : (
                    <button
                      className="btn-vaga impulsionar"
                      onClick={() => handleImpulsionarClick(vaga)}
                    >
                      Impulsionar
                    </button>
                  )}
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
