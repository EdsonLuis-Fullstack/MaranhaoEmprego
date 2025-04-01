import NavBar from '../layout/NavBar';
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
                <button id="buttonLogi"> <Image src='/icons/IconLogin.png' alt='dfasd' width={25} height={25}/> Login</button>
                 <button id="buttonEnviarVag">Enviar vaga</button>
        </div> 
        </header>
    );
}

export default Header;
