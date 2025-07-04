"use client";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getAnalysis,
  vagasAprovacao,
  AprovarVagas,
  RejeitarVagas,
  AtualizarPlanos,
} from "@/components/services/admin/getAnalysis";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const [mostrarTudo, setMostrarTudo] = useState([]);
  const [dadosVagas, setDadosVagas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [vagas_data, setVagas_data] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [planosValor, setplanosValor] = useState(0);
  const [showPopupPlano, setShowPopupPlano] = useState(false);
  const [novoValorPlano, setNovoValorPlano] = useState("");
  const [popupConfig, setPopupConfig] = useState({
    titulo: "",
    mensagem: "",
    acao: null,
    vagaUuid: null,
    vagaTitulo: "",
  });

  const abrirPopupConfirmacaoPlano = () => {
    const valorInput = document.getElementsByName("plano_Valor")[0];


    setNovoValorPlano(valorInput.value);
    setShowPopupPlano(true);
  };

  const confirmarAtualizacaoPlano = async () => {
    const Token = Cookies.get(`${process.env.NEXT_PUBLIC_COOKIE_NMAJD_NAME}`);

    try {
      const resposta = await AtualizarPlanos(Token, novoValorPlano);

      console.log("Plano atualizado com sucesso:", resposta);

      // Limpar o campo após sucesso
      const valorInput = document.getElementsByName("plano_Valor")[0];
      if (valorInput) {
        valorInput.value = "";
      }

      setShowPopupPlano(false);
      setNovoValorPlano("");

    } catch (error) {
      console.error("Erro ao atualizar plano:", error);
    }
  };

  const cancelarAtualizacaoPlano = () => {
    setShowPopupPlano(false);
    setNovoValorPlano("");
  };

  const atualizarPlano = async () => {
    const Token = Cookies.get(`${process.env.NEXT_PUBLIC_COOKIE_NMAJD_NAME}`);

    // Correção: usar getElementsByName retorna NodeList, então acessar o primeiro elemento [0]
    const valorInput = document.getElementsByName("plano_Valor")[0];

    if (!valorInput || !valorInput.value) {
      console.error("Valor do plano não informado");
      return;
    }

    const valor = valorInput.value;

    try {
      // Correção: chamar AtualizarPlanos (função importada) em vez de atualizarPlano (recursão)
      const resposta = await AtualizarPlanos(Token, valor);

      console.log("Plano atualizado com sucesso:", resposta);

      // Opcional: limpar o campo após sucesso
      valorInput.value = "";
    } catch (error) {
      console.error("Erro ao atualizar plano:", error);
    }
  };

  // Nomes dos meses para conversão
  const nomesMeses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  // Função para aprovar vagas
  const aprovarVaga = async (uuid_vaga) => {
    const Token = Cookies.get(`${process.env.NEXT_PUBLIC_COOKIE_NMAJD_NAME}`);

    try {
      const resposta = await AprovarVagas(Token, uuid_vaga);

      // Atualiza a lista de vagas após a aprovação
      await pegarVagas_Aprovar();
      setShowPopup(false);

      console.log("Vaga aprovada com sucesso:", resposta);
    } catch (error) {
      console.error("Erro ao aprovar vaga:", error);
    }
  };

  // Função para rejeitar vagas
  const rejeitarVaga = async (uuid_vaga) => {
    const Token = Cookies.get(`${process.env.NEXT_PUBLIC_COOKIE_NMAJD_NAME}`);

    try {
      const resposta = await RejeitarVagas(Token, uuid_vaga);

      // Atualiza a lista de vagas após a rejeição
      await pegarVagas_Aprovar();
      setShowPopup(false);

      console.log("Vaga rejeitada com sucesso:", resposta);
    } catch (error) {
      console.error("Erro ao rejeitar vaga:", error);
    }
  };

  const abrirPopupConfirmacao = (acao, vagaUuid, vagaTitulo) => {
    const config = {
      vagaUuid,
      vagaTitulo,
      acao,
    };

    if (acao === "aprovar") {
      config.titulo = "Confirmar Aprovação";
      config.mensagem = `Tem certeza que deseja aprovar a vaga "${vagaTitulo}"?`;
    } else if (acao === "rejeitar") {
      config.titulo = "Confirmar Rejeição";
      config.mensagem = `Tem certeza que deseja rejeitar a vaga "${vagaTitulo}"?`;
    }

    setPopupConfig(config);
    setShowPopup(true);
  };

  const confirmarAcao = () => {
    if (popupConfig.acao === "aprovar") {
      aprovarVaga(popupConfig.vagaUuid);
    } else if (popupConfig.acao === "rejeitar") {
      rejeitarVaga(popupConfig.vagaUuid);
    }
  };

  const cancelarAcao = () => {
    setShowPopup(false);
    setPopupConfig({
      titulo: "",
      mensagem: "",
      acao: null,
      vagaUuid: null,
      vagaTitulo: "",
    });
  };

  const toggleDescricao = (index) => {
    const novaState = [...mostrarTudo];
    novaState[index] = !novaState[index];
    setMostrarTudo(novaState);
  };

  const pegarVagas_Aprovar = async () => {
    try {
      const Token = Cookies.get(`${process.env.NEXT_PUBLIC_COOKIE_NMAJD_NAME}`);
      const resposta = await vagasAprovacao(Token);
      setVagas_data(resposta.vagas);
    } catch {
      setVagas_data([]);
    }
  };

  const getAnalysisData = async () => {
    try {
      setCarregando(true);
      const Token = Cookies.get(`${process.env.NEXT_PUBLIC_COOKIE_NMAJD_NAME}`);
      const response = await getAnalysis(Token);
      console.log(response.msg);

      if (response && response.media) {
        // Converte os dados do backend para o formato esperado pelo gráfico
        const dadosFormatados = response.media.map((item) => ({
          mes: nomesMeses[item.mes - 1], // Converte número do mês para nome
          vagas: item.total,
        }));

        setDadosVagas(dadosFormatados);
      }
    } catch (error) {
      setDadosVagas([]);
      window.location.reload();
      // Em caso de erro, mantém array vazio ou dados padrão
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    getAnalysisData();
    pegarVagas_Aprovar();
  }, []);

  return (
    <div className="MainContainer">
      <div className="AnalysisContainer">
        <h2>Vagas por mês</h2>
        <div className="ChartWrapper">
          <div className="ChartResponsive">
            {carregando ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                }}
              >
                <p>Carregando dados...</p>
              </div>
            ) : dadosVagas.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dadosVagas}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="vagas"
                    stroke="#02539b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                }}
              >
                <p>Nenhum dado disponível para exibir</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <h2 className="SubTittle">Configurações gerais</h2>
      <div className="ConfigContainer">
        <div className="InputGroup">
          <label htmlFor="logo">Logo da empresa (imagem):</label>
          <input type="file" id="logo" accept="image/*" />
          <button className="btn-enviar">Enviar imagem</button>
        </div>

        <div className="InputGroup">
          <label htmlFor="novoPreco">Novo preço do plano:</label>
          <input
            type="number"
            id="novoPreco"
            placeholder="R$ 0,00"
            name="plano_Valor"
          />
          <button className="btn-enviar" onClick={abrirPopupConfirmacaoPlano}>
            Atualizar preço
          </button>
        </div>
      </div>

      <h2 className="SubTittle">Validação de vagas</h2>
      <div className="ContainerVagas">
        {vagas_data.length === 0 ? (
          <p>Nenhuma vaga para validar no momento.</p>
        ) : (
          vagas_data.map((vaga, index) => (
            <div className="CardVaga" key={vaga.id || index}>
              <h3>{vaga.titulo}</h3>
              <p>
                {mostrarTudo[index] ? (
                  <>
                    {vaga.requisitos} <br />
                    <strong>Proprietario:</strong> {vaga.proprietario} <br />
                    <strong>Telefone:</strong> {vaga.contato} <br />
                  </>
                ) : (
                  vaga.requisitos?.split(".")[0] + "."
                )}
              </p>
              <div className="BotoesVaga">
                <button
                  className="btn-ver"
                  onClick={() => toggleDescricao(index)}
                >
                  {mostrarTudo[index] ? "Mostrar menos" : "Ver tudo"}
                </button>
                <button
                  className="btn-validar"
                  onClick={() => {
                    abrirPopupConfirmacao("aprovar", vaga.uuid, vaga.titulo);
                  }}
                >
                  Validar vaga
                </button>

                <button
                  className="btn-rejeitar"
                  onClick={() => {
                    abrirPopupConfirmacao("rejeitar", vaga.uuid, vaga.titulo);
                  }}
                >
                  Rejeitar vaga
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Popup de Confirmação para Vagas */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <h3>{popupConfig.titulo}</h3>
            </div>
            <div className="popup-content">
              <p>{popupConfig.mensagem}</p>
            </div>
            <div className="popup-actions">
              <button className="btn-cancelar" onClick={cancelarAcao}>
                Cancelar
              </button>
              <button
                className={`btn-confirmar ${
                  popupConfig.acao === "aprovar"
                    ? "btn-aprovar"
                    : "btn-rejeitar"
                }`}
                onClick={confirmarAcao}
              >
                {popupConfig.acao === "aprovar" ? "Aprovar" : "Rejeitar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de Confirmação para Atualização de Planos */}
      {showPopupPlano && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <h3>Confirmar Atualização de Preço</h3>
            </div>
            <div className="popup-content">
              <p>
                Tem certeza que deseja alterar o valor do plano para R${" "}
                {novoValorPlano}?
              </p>
            </div>
            <div className="popup-actions">
              <button
                className="btn-cancelar"
                onClick={cancelarAtualizacaoPlano}
              >
                Cancelar
              </button>
              <button
                className="btn-confirmar btn-aprovar"
                onClick={confirmarAtualizacaoPlano}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
