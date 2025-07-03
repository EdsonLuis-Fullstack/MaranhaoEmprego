'use client';
import './Dashboard.css';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {getAnalysis} from "@/components/services/admin/getAnalysis"
export default function AdminDashboard() {
  const [mostrarTudo, setMostrarTudo] = useState([]);
  const dadosVagas = [
    { mes: "Jan", vagas: 12 },
    { mes: "Fev", vagas: 18 },
    { mes: "Mar", vagas: 10 },
    { mes: "Abr", vagas: 22 },
    { mes: "Mai", vagas: 16 },
    { mes: "Jun", vagas: 20 },
    { mes: "Jul", vagas: 25 },
    { mes: "Ago", vagas: 19 },
    { mes: "Set", vagas: 14 },
    { mes: "Out", vagas: 23 },
    { mes: "Nov", vagas: 17 },
    { mes: "Dez", vagas: 21 },
  ];
  const vagas = [];

  const toggleDescricao = (index) => {
    const novaState = [...mostrarTudo];
    novaState[index] = !novaState[index];
    setMostrarTudo(novaState);
  };
const getAnalysisData=async () =>{

  console.log( await getAnalysis())
}
  useEffect(()=>{
    getAnalysisData()
  }, []);
  return (
    <div className="MainContainer">
      <div className="AnalysisContainer">
        <h2>Vagas por mês</h2>
        <div className="ChartWrapper">
          <div className="ChartResponsive">
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
          <input type="number" id="novoPreco" placeholder="R$ 0,00" />
          <button className="btn-enviar">Atualizar preço</button>
        </div>
      </div>

      <h2 className="SubTittle">Validação de vagas</h2>
      <div className="ContainerVagas">
        {vagas.length === 0 ? (
          <p>Nenhuma vaga para validar no momento.</p>
        ) : (
          vagas.map((vaga, index) => (
            <div className="CardVaga" key={vaga.id || index}>
              <h3>{vaga.titulo}</h3>
              <p>
                {mostrarTudo[index]
                  ? <>
                      {vaga.descricao} <br />
                      <strong>Endereço:</strong> {vaga.endereco} <br />
                      <strong>Telefone:</strong> {vaga.telefone} <br />
                      <strong>Rede social:</strong>{' '}
                      <a href={vaga.redeSocial} target="_blank" rel="noopener noreferrer">
                        {vaga.redeSocial}
                      </a>
                    </>
                  : vaga.descricao?.split('.')[0] + '.'}
              </p>
              <div className="BotoesVaga">
                <button className="btn-ver" onClick={() => toggleDescricao(index)}>
                  {mostrarTudo[index] ? 'Mostrar menos' : 'Ver tudo'}
                </button>
                <button className="btn-validar">Validar vaga</button>
                <button className="btn-rejeitar">Rejeitar vaga</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
