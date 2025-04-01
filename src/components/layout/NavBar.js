'use client'
import { useState } from "react";
import  Link  from "next/link";
import Image from "next/image";
import MenuToggle from "./MenuToggle";
function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <MenuToggle isOpen={menuOpen} />
            </div>
            <nav className={menuOpen ? "nav-active" : ""}>
            <div className="buttons">
                    <button id="buttonLogin"> <Image src='/icons/IconLogin.png' alt="imagem butao login" width={25} height={25}/> Login</button>
                    <button id="buttonEnviarVaga">Enviar vaga</button>
             </div> 
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/job">Vagas</Link></li>
                    <li><Link href="/news">Noticias</Link></li>
                    <li><Link href="/courses">Cursos</Link></li>
                </ul>
                
            </nav>
        </>
    );
}

export default NavBar;
