import LogoWhite from '@/components/LogoWhite'
import './Footer.css'

export default function Footer(){
    return(
        <footer><section className="Footer">
        <div className='LogoFooter'>
            <LogoWhite />
        </div>
        <div className="Anuncio"></div>
    </section>
    <div className='Copyright'>© 2025 Emprego Maranhão<span>|</span><a href="https://github.com/EdsonLuis-Fullstack" className='Dev'>Feito por Edson luis - Dev Full Stack</a></div>
    </footer>
    )
}