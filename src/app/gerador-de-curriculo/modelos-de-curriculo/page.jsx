import './models.css'
import Image from 'next/image';
export default function models(){
    return(
        <section className='Models'>
            <h1 className='ModelsTitle'>Escolha o modelo do seu currículo</h1>
            <h2 className='ModelsSubtitle'>Selecione um dos modelos abaixo para personalizar o visual do seu currículo</h2>
                <div className='ModelsSection'>
                <div className='Model'>
                    <div className='ModelImage'>
                        <Image 
                            src="/icons/curriculo-black.jpg" 
                            alt="cuirriculo modelo 1"
                            fill 
                            quality={100}
                            priority 
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <button type="submit" className="btn-proximo">Selecionar</button>
                </div>
                <div className='Model'>
                    <div className='ModelImage'>
                        <Image 
                            src="/icons/curriculo-white.jpg" 
                            alt="cuirriculo modelo 1"
                            fill 
                            quality={100}
                            priority 
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <button type="submit" className="btn-proximo">Selecionar</button>
                </div>
                <div className='Model'>
                    <div className='ModelImage'>
                        <Image 
                            src="/icons/curriculo-white-version02.jpg" 
                            alt="cuirriculo modelo 1"
                            fill 
                            quality={100}
                            priority 
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <button type="submit" className="btn-proximo">Selecionar</button>
                </div>
                
            </div>
        </section>
    )
} 