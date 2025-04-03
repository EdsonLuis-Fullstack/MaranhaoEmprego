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
        <Link href="/cadastro" id='CadastroPage'><button id="buttonCadastr"> <Image src='/icons/IconLogin.png' alt='cadastrar' width={25} height={25}/>Cadastre-se</button></Link>
                <Link href="/login" id='LoginPage'><button id="buttonLogi">Enviar vaga</button></Link>
        </div> 
        </header>
    );
}

export default Header;
