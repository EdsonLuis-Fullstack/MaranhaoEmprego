'use client';
import PlanoStart from '../../../components/botoes/planos/PlanoStart';
import './planos.css';
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';

export default function PlanosSimples() {
  return (
    <section className="secao-planos">
        <div className="planos-container">
            <div className="plano-start">
                <div className='plano-header'>
                    <h2 className='plano-title'>Plano 1</h2>
                    <span className='plano-desconto'>de R$ 97,99</span>
                    <div className='plano-price-container'>
                        por <span className='plano-price'>R$ 29,99</span>
                        <div className='plano-price-off'>30% OFF</div>
                    </div>
                    <p> Até 5 vagas</p>
                <div className='plano-header-footer'>
                    <span className='plano-features'>Suporte 24h</span>
                </div>
                </div>
                <div className="plano-conteudo">
                    <div className="conteudo-do-plano">
                        <ul className="lista-beneficios">
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        </ul>
                        </div>
                </div>
                <div className='plano-selecionar'>
                    <PlanoStart/>
                </div>
            </div>
            <div className="plano-start">
                <div className='plano-header'>
                    <h2 className='plano-title'>Plano 1</h2>
                    <span className='plano-desconto'>de R$ 97,99</span>
                    <div className='plano-price-container'>
                        por <span className='plano-price'>R$ 29,99</span>
                        <div className='plano-price-off'>30% OFF</div>
                    </div>
                    <p> Até 5 vagas</p>
                <div className='plano-header-footer'>
                    <span className='plano-features'>Suporte 24h</span>
                </div>
                </div>
                <div className="plano-conteudo">
                    <div className="conteudo-do-plano">
                        <ul className="lista-beneficios">
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        </ul>
                        </div>
                </div>
                <div className='plano-selecionar'>
                    <PlanoStart/>
                </div>
            </div>
            <div className="plano-start">
                <div className='plano-header'>
                    <h2 className='plano-title'>Plano 1</h2>
                    <span className='plano-desconto'>de R$ 97,99</span>
                    <div className='plano-price-container'>
                        por <span className='plano-price'>R$ 29,99</span>
                        <div className='plano-price-off'>30% OFF</div>
                    </div>
                    <p> Até 5 vagas</p>
                <div className='plano-header-footer'>
                    <span className='plano-features'>Suporte 24h</span>
                </div>
                </div>
                <div className="plano-conteudo">
                    <div className="conteudo-do-plano">
                        <ul className="lista-beneficios">
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li><CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '18px'}}/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
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
