'use client';
import PlanoStart from '@/components/botoes/planos/PlanoStart';
import './planos.css';
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';

export default function PlanosSimples() {
  return (
    <section className="secao-planos">
        <div className="planos-container">
            <div className="plano-start">
                <div className='plano-header'>
                    <h2 className='plano-title'>Plano</h2>
                    <span className='plano-desconto'>de R$ 97,99</span>
                    <div className='plano-price-container'>
                        por <span className='plano-price'>R$ 20,00</span>
                        <div className='plano-price-off'>90% OFF</div>
                    </div>
                    <p style={{textAlign: 'center', padding: '10px'}}>Ganhe 1 credito para impulsionar sua vaga por 7 dias </p>
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
                <div className='plano-selecionar'>
                    <PlanoStart/>
                </div>
            </div>
            </div>
    </section>
  );
}
