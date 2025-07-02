import './Home.css'
import AbasCards from '@/components/AbasCards/AbasCards'
import Image from 'next/image'
import FiltroVagas from '@/components/filtro/Filtro'

function Home(){
    return(
<>
    
                <section className="mainSection">
                    <div className="overlayBlack">
                    </div>
                    <div className="headline">
                        <h1 id="headline">O maior portal  de emprego do  maranhão </h1>
                    </div>
                    <div className="mapaMaranhao">
                        <Image src='/icons/mapaMaranhao.png' alt="ilustraçao mapa do maranhao" height={450} width={600}  />
                    </div>
                    <div className="subheadline">
                        <h2 id="subheadline">Mantenha-se atualizado</h2>
                        <p id="paragrafHeadline">Notícias, pesquisa salariais e tudo sobre o mercado de trabalho</p>
                        <div className="PesquisaDeVaga">
                            <FiltroVagas/>
                        </div>
                    </div>
                </section>
                <section className='AllVagas'>
                    <AbasCards/>
                </section>
                
    </>

    )
}

export default Home