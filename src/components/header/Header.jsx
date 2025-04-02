import NavBar from '../layout/NavBar';
import Link  from "next/link";
import Logo from '../Logoblue';
import './Header.css'
import Image from 'next/image';

function Header() {

    return (
        <header>
            <div className="logo">
          <Logo/>
        </div>
            <NavBar/>
        
        <div className="btnss">
                <button id="buttonLogi"> <Image src='/icons/IconLogin.png' alt='dfasd' width={25} height={25}/>Cadastre-se</button>
                <Link href="/login" id='Cadastro'><button id="buttonEnviarVag">Enviar vaga</button></Link>
        </div> 
        </header>
    );
}

export default Header;
