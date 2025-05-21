'use client';
import ButtonDivulgarVaga from '@/components/botoes/ButtonDivulgarVaga';
import '@/components/AbasCards/cards/CardStyle.css';
import './AreaDaEmpresa.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
    EnvironmentFilled,
    ShoppingFilled,
    LogoutOutlined
} from '@ant-design/icons';
import Link from 'next/link';

export default function AreaDaEmpresa() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (!token) {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        Cookies.remove('authToken');
        router.push('/login');
    };

    if (loading) {
        return <p>Verificando autenticação...</p>;
    }

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
                <div className='CardVagasPublicadas'>
                    <div id='CardVagasDivulgadas'>
                        <h1 id='tituloCard'>Comercial como prospecção e atendimento ao cliente em eventos de cenografia</h1>
                        <div id="statusTempo">Recém publicado</div>
                        <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }}/>São Paulo - SP</p>
                        <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }}/>Comercial</p>
                        <p id='SobreVaga'>Prospectar e gerir carteira de clientes de cenografia e stands para eventos</p>
                        <div id="SalarioPreço">
                            <p id='Salario'>Salário:</p>
                            <span id='SalarioP'>R$1512,00</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="LogoutButton" onClick={handleLogout}>
                <LogoutOutlined /> Sair
            </button>
        </section>
    );
}
