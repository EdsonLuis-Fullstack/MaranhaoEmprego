'use client';
import { useState } from 'react';
import Link from 'next/link';
import './alterar-dados.css';

export default function AlterarDadosPage() {
  const [captchaValidado, setCaptchaValidado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaValidado) {
      alert('Por favor, valide o CAPTCHA antes de enviar.');
      return;
    }

    const formData = new FormData(e.target);
    const nome = formData.get('nome');
    const email = formData.get('email');

    console.log('Dados atualizados:', { nome, email });
    alert('Dados atualizados com sucesso!');
  };

  return (
    <main className="alterar-dados-wrapper">
      <section className="alterar-dados-box">
        <h1>Alterar Dados da Conta</h1>
        <form onSubmit={handleSubmit} className="alterar-dados-form">
          <div className="form-group">
            <label htmlFor="nome">Novo nome</label>
            <input type="text" id="nome" name="nome" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Novo e-mail</label>
            <input type="email" id="email" name="email" required />
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
  );
}
