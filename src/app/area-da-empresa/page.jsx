'use client';
import ButtonDivulgarVaga from '@/components/botoes/ButtonDivulgarVaga';
import '@/components/AbasCards/cards/CardStyle.css';
import './AreaDaEmpresa.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function AreaDaEmpresa() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('authToken');
    router.push('/login');
  };

  return (
    <section className="AreaEmpresa">
      <div className="DivulgarVaga">
        <h2>Encontre os melhores talentos do Maranhão para sua empresa</h2>
        <p>Conecte sua vaga aos profissionais mais qualificados do estado em poucos cliques.</p>
        <Link href="/area-da-empresa/formularioVaga"><ButtonDivulgarVaga /></Link>
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
