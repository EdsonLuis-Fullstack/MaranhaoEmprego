'use client';
import PlanoStart from '@/components/botoes/planos/PlanoStart';
import './planos.css';
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { useEffect } from 'react';
import {pegarInfomacao} from '@/components/services/planos/informacaoPlanos'
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function PlanosSimples() {
    const router = useRouter()
    const [Planosinfo, setPlanosinfo] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPlanos = async () => {
            const resposta = await pegarInfomacao()
            if(resposta.code !== 200){
                return router.refresh()
            }
            console.log(resposta.planos[0])
            setPlanosinfo(resposta.planos[0])
            setLoading(false);
        }
        fetchPlanos()
    }, [])
  return (
    <section className="secao-planos">
        <div className="planos-container">
            <div className="plano-start">
                <div className='plano-header'>
                    <h2 className='plano-title'>{Planosinfo.titulo_Planos}</h2>
                    <span className='plano-desconto'>de R$ {Planosinfo.valor_promocional_Planos}</span>
                    <div className='plano-price-container'>
                        por <span className='plano-price'>R$ {Planosinfo.valor_Plano}</span>
                        <div className='plano-price-off'>90% OFF</div>
                    </div>
                    <p style={{textAlign: 'center', padding: '10px'}}>Ganhe 1 credito para impulsionar sua vaga por {Planosinfo.cobrado_Plano} </p>
                <div className='plano-header-footer'>
                    <span className='plano-features'>Suporte 24h</span>
                </div>
                </div>
                <div className="plano-conteudo">
                    <div className="conteudo-do-plano">
                        <ul className="lista-beneficios">
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Sua vaga será destacada e exibida com prioridade nas buscas, alcançando mais candidatos qualificados.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Com mais alcance, você atrai candidatos em menos tempo, reduzindo o tempo da vaga em aberto.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> O anúncio impulsionado pode ser exibido para perfis mais alinhados com os requisitos da vaga.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Uma vaga destacada transmite profissionalismo e seriedade, atraindo talentos mais engajados.</li>
                        </ul>
                        </div>
                </div>
                <div className='plano-selecionar' onClick={() => {
                    router.push('pagamento')
                }}>
                    <PlanoStart  />
                </div>
            </div>
            </div>
    </section>
  );
}
