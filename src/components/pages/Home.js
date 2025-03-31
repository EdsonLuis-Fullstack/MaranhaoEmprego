import '../css components/Home.css'
import MapaMaranhao from '../images components/mapaMaranhao.png'

function Home(){
    return(
        <>
        <section class="mainSection">
            <div class="overlayBlack">
            </div>
            <div class="headline">
                <h1 id="headline">O maior portal  de emprego do  maranhão </h1>
            </div>
            <div class="mapaMaranhao">
                <img src={MapaMaranhao} alt="ilustraçao mapa do maranhao" height="450px" id="imagemaranhao"/>
            </div>
            <div class="subheadline">
                <h2 id="subheadline">Mantenha-se atualizado</h2>
                <p id="paragrafHeadline">Notícias, pesquisa salariais e tudo sobre o mercado de trabalho</p>
                <div class="PesquisaDeVaga"></div>
            </div>
        </section>
        <section class="secondrySection">
            
        </section>
        </>
    )
}

export default Home