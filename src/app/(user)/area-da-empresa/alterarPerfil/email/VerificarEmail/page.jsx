import './VerificarEmail.css'

export default function VerificarEmail(){
    return(
        <section className='VerificarEmail'>
            <div className="input-verificacao-container">
            <label htmlFor="codigoVerificacao">Código de verificação de e-mail</label>
            <input
                type="text"
                id="codigoVerificacao"
                name="codigoVerificacao"
                placeholder="Digite o código recebido por e-mail"
                className="input-verificacao"
                maxLength={6}
            />
                        <button className="btn-enviar">Enviar</button>
            </div>
        </section>
    )
}