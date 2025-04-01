'use client'
import { useState } from "react";
import  Link  from "next/link";
import Image from "next/image";
function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <i className="ri-menu-line"></i>
            </div>
            <nav className={menuOpen ? "nav-active" : ""}>
            <div class="buttons">
                    <button id="buttonLogin"> <Image src='/icons/IconLogin.png' width={25} height={25}/> Login</button>
                    <button id="buttonEnviarVaga">Enviar vaga</button>
             </div> 
                <ul>
                    <li><Link  href="/">Home</Link></li>
                    <li><Link href="/Vagas">Vagas</Link></li>
                    <li><Link href="/Noticias">Noticias</Link></li>
                    <li><Link href="/Cursos">Cursos</Link></li>
                </ul>
                
            </nav>
        </>
    );
}

export default NavBar;
