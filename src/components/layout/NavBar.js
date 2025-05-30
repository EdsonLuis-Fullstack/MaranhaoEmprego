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
            <Link href="/cadastro" id='CadastroMobile'><button id="buttonCadastro"> <Image src='/icons/IconLogin.png' alt="imagem butao login" width={25} height={25}/>Cadastre-se</button></Link>
                    <Link href="/login" id="LoginMobile"><button id="buttonLogin">Enviar vaga</button></Link>
             </div> 
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/allvagas">Vagas</Link></li>
                    <li><Link href="/news">Noticias</Link></li>
                    <li><Link href="/courses">Cursos</Link></li>
                </ul>
                
            </nav>
        </>
    );
}

export default NavBar;
