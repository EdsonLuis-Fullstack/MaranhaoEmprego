import './Login.css'
import LoginForm from '@/components/Login/LoginForm'

export default function Cadastro(){
    return(
        <section className="Login">
            <div className='Formulario'>
                <h1 id='TituloLogin'>Login</h1>
                <LoginForm />
            </div>
        </section>
    )
}