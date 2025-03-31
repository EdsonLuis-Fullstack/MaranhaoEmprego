import { useState } from "react";
import { Link } from "react-router-dom";
import IconLogin from '../images components/icons/IconLogin.png'

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <i className="ri-menu-line"></i>
            </div>
            <nav className={menuOpen ? "nav-active" : ""}>
            <div class="buttons">
                    <button id="buttonLogin"> <img src={IconLogin} al="icone login da pagina principal" width="25px" height="25px"/> Login</button>
                    <button id="buttonEnviarVaga">Enviar vaga</button>
             </div> 
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Vagas">Vagas</Link></li>
                    <li><Link to="/Noticias">Noticias</Link></li>
                    <li><Link to="/Cursos">Cursos</Link></li>
                </ul>
                
            </nav>
        </>
    );
}

export default NavBar;
