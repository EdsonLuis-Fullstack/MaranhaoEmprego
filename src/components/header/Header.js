import NavBar from '../layout/NavBar';
import Logo from '../Logo';
import '../css components/Header.css'
import IconLogin from '../images components/icons/IconLogin.png'


function Header() {

    return (
        <header>
            <div class="logo">
          <Logo/>
        </div>
            <NavBar/>
        
        <div class="btnss">
                <button id="buttonLogi"> <img src={IconLogin} al="icone login da pagina principal" width="25px" height="25px"/> Login</button>
                 <button id="buttonEnviarVag">Enviar vaga</button>
        </div> 
        </header>
    );
}

export default Header;
