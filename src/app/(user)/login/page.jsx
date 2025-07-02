'use client'
import './Login.css'
import LoginForm from '@/components/Login/LoginForm'
import Link  from "next/link"

export default function Login(){
    return(
        <section className="Login">
            <div className='Formulario'>
                <h1 id='TituloLogin'>Login</h1>
                <LoginForm />
                <p id="RecuperarSenha">Esqueceu a senha? <Link href="/recuperar" id='CriarConta'>Recupere aqui.</Link></p>
                <p id="FaçaCadastro">Não tem login? <Link href="/cadastro" id="CriarConta">Faça seu cadastro.</Link></p>
            </div>
        </section>
    )
}