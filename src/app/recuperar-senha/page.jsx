import './RecuperarSenha.css'

export default function RecuperarSenha(){

    return(
        <section className='RecuperarSenha'>
            <div>
                <h2>Recuperar senha</h2>
                <form className="form-recuperar-senha">
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="input-email"
                        required
                    />
                    <button type="submit" className="botao-enviar">
                        Redefinir senha
                    </button>
                    </form>
                    </div>
        </section>
    )
}