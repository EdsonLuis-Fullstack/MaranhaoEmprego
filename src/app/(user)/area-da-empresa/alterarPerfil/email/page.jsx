'use client';
import './email.css'
import { useState } from 'react';
import Link from 'next/link';
export default function AlterarNome(){
    const [captchaValidado, setCaptchaValidado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nome = formData.get('nome');
    const email = formData.get('email');
    if (!nome && !email) {
      alert('Por favor, preencha pelo menos um campo para atualizar.');
      return;
    }

    if (!captchaValidado) {
      alert('Por favor, valide o CAPTCHA antes de enviar.');
      return;
    }


    console.log('Dados atualizados:', { nome, email });
    alert('Dados atualizados com sucesso!');
  };
    return(
        <main className="alterar-dados-wrapper">
      <section className="alterar-dados-box">
        <h1>Alterar nome da conta</h1>
        <form onSubmit={handleSubmit} className="alterar-dados-form">
          <div className="form-group">
            <label htmlFor="nome">Novo Email</label>
            <input type="text" id="nome" name="nome"  />
          </div>
          <div className="captcha-simulado">
            <input
              type="checkbox"
              id="captcha"
              onChange={(e) => setCaptchaValidado(e.target.checked)}
            />
            <label htmlFor="captcha">Não sou um robô</label>
          </div>

          <button type="submit" className="btn-submit">Salvar alterações</button>
        </form>
      </section>
    </main>
    )
}