'use client';
import ButtonDivulgarVaga from '@/components/botoes/ButtonDivulgarVaga';
import '@/components/AbasCards/cards/CardStyle.css';
import './AreaDaEmpresa.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Perfil from '../../components/botoes/perfil';
import AlterarDados from '../../components/botoes/AlterarDados';
import Planos from '../../components/botoes/Planos';

export default function AreaDaEmpresa() {
  const router = useRouter();
    var nome = Cookies.get(`${process.env.NEXT_PUBLIC_NOME_PERFIL}`);
    var email = Cookies.get(`${process.env.NEXT_PUBLIC_EMAIL_PERFIL}`);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const handleLogout = () => {
    Cookies.remove(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`);
    router.push('/login');
  };


  const togglePerfil = () => {
    setMostrarPerfil((prev) => !prev);
  };

  return (
    <section className="AreaEmpresa">
      <div className="DivulgarVaga">
        <h2>Encontre os melhores talentos do Maranhão para sua empresa</h2>
        <p>Conecte sua vaga aos profissionais mais qualificados do estado em poucos cliques.</p>
        <div className='AreaEmpresaButtons'>
          <Link href="/area-da-empresa/formularioVaga"><ButtonDivulgarVaga /></Link>
          <button className="PerfilButton" onClick={togglePerfil}>
            <Perfil/>
          </button>
          <Link href="/area-da-empresa/planos"><Planos /></Link>
        </div>
        {mostrarPerfil && (
          <div className="PerfilInfo">
            <p><strong>Nome:</strong> {nome}</p>
            <p><strong>Email:</strong> {email}</p>
            <Link href="/area-da-empresa/alterarPerfil"><AlterarDados /></Link>
          </div>
        )}
      </div>
      <div className="VagasDivulgadas">
        <h2>Vagas divulgadas</h2>
        <hr />
      </div>
      <button className="LogoutButton" onClick={handleLogout}>
        <LogoutOutlined /> Sair
      </button>
    </section>
  );
}
