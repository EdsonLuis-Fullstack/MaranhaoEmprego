'use client';
import ButtonDivulgarVaga from '@/components/botoes/ButtonDivulgarVaga';
import '@/components/AbasCards/cards/CardStyle.css';
import './AreaDaEmpresa.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Perfil from '@/components/botoes/perfil';
import AlterarDados from '@/components/botoes/AlterarDados';
import Planos from '@/components/botoes/Planos';

export default function AreaDaEmpresa() {
  const router = useRouter();
  const nome = Cookies.get(`${process.env.NEXT_PUBLIC_NOME_PERFIL}`);
  const email = Cookies.get(`${process.env.NEXT_PUBLIC_EMAIL_PERFIL}`);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [temCredito, setTemCredito] = useState(false); // Simulação de crédito

  const handleLogout = () => {
    Cookies.remove(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
    router.push('/login');
  };

  const togglePerfil = () => {
    setMostrarPerfil((prev) => !prev);
  };

  const handleImpulsionarClick = () => {
    setMostrarPopup(true);
  };

  const confirmarImpulsionamento = () => {
    setMostrarPopup(false);
    alert('Vaga impulsionada com sucesso!');
    // Aqui você conecta com o back-end para descontar crédito ou registrar impulsionamento
  };

  return (
    <section className="AreaEmpresa">
      <div className="DivulgarVaga">
        <h2>Encontre os melhores talentos do Maranhão para sua empresa</h2>
        <p>Conecte sua vaga aos profissionais mais qualificados do estado em poucos cliques.</p>
        <div className='AreaEmpresaButtons'>
          <Link href="/area-da-empresa/formularioVaga"><ButtonDivulgarVaga /></Link>
          <button className="PerfilButton" onClick={togglePerfil}>
            <Perfil />
          </button>
          <Link href="/area-da-empresa/planos"><Planos /></Link>
        </div>
        {mostrarPerfil && (
          <div className="PerfilInfo">
            <p><strong>Nome:</strong> {nome}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Crédito de impulsionamento:</strong> {temCredito ? 1 : 0}</p>
            <Link href="/area-da-empresa/alterarPerfil"><AlterarDados /></Link>
          </div>
        )}
      </div>

      <div className="VagasDivulgadas">
        <h2>Vagas divulgadas</h2>
        <hr />
        <div className="CardVagasPublicadas">
          <div id="CardVagasDivulgadas">
            <h3 className="titulo-vaga">Desenvolvedor Full Stack</h3>
            <p className="descricao-vaga">Buscamos um dev para atuar com Node.js, React e banco de dados PostgreSQL. Trabalho híbrido.</p>
            <span className="status-vaga">Status: <strong>Análise</strong></span>
            <div className="botoes-vaga">
              <button className="btn-vaga editar">Editar</button>
              <button className="btn-vaga impulsionar" onClick={handleImpulsionarClick}>Impulsionar</button>
              <button className="btn-vaga deletar">Deletar</button>
            </div>
          </div>
        </div>
      </div>

      <button className="LogoutButton" onClick={handleLogout}>
        <LogoutOutlined /> Sair
      </button>

      {/* POP-UP */}
      {mostrarPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {temCredito ? (
              <>
                <p>Tem certeza que deseja impulsionar esta vaga?</p>
                <div className="popup-buttons">
                  <button className="btn-vaga impulsionar" onClick={confirmarImpulsionamento}>Sim</button>
                  <button className="btn-vaga deletar" onClick={() => setMostrarPopup(false)}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <p>Você não possui créditos para impulsionar esta vaga.</p>
                <div className="popup-buttons">
                  <Link href="/area-da-empresa/planos">
                    <button className="btn-vaga editar">Ver Planos</button>
                  </Link>
                  <button className="btn-vaga deletar" onClick={() => setMostrarPopup(false)}>Fechar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
