import LogoWhite from '@/components/LogoWhite'
import './Footer.css'
import Link from 'next/link'
import {
  EnvironmentFilled,
  ShoppingFilled,
  InstagramOutlined,
} from '@ant-design/icons';

export default function Footer(){
    return(
        <footer><section className="Footer">
        <div className='LogoFooter'>
            <LogoWhite />
        </div>
        <hr id='LinhaFooter'/>
        <div className="RodapeRedirect">
            <p><Link href="/termo-de-uso">Termos de Uso </Link></p>
            <p><Link href="/politica-de-privacidade">Política de Privacidade</Link></p>
            <p><Link href="/">Home</Link></p>
            <p><Link href="/cadastro">Cadastro</Link></p>
            <p><Link href="/login">Login</Link></p>
        </div>
        <hr id='LinhaFooter'/>
        <div className="RodapeRedeSocial">
            <p><Link href="https://www.instagram.com/maranhaoempregos/"><InstagramOutlined />instagram</Link></p>
        </div>
    </section>
    <div className='Copyright'>© 2025 Emprego Maranhão<span>|</span><a href="https://github.com/EdsonLuis-Fullstack" className='Dev'>Feito por Edson luis - Dev Full Stack</a></div>
    </footer>
    )
}