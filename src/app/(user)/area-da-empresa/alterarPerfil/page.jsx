'use client';
import { useState } from 'react';
import Link from 'next/link';
import './alterar-dados.css';

export default function AlterarDadosPage() {
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

  return (
    <main className="alterar-dados-wrapper">
      <section className="alterar-dados-box">
        <h1>Alterar Dados da Conta</h1>
          <Link href="/area-da-empresa/alterarPerfil/email/"><button type="submit" className="btn-submit">Alterar Email</button></Link>
          <Link href="/area-da-empresa/alterarPerfil/nome/"><button type="submit" className="btn-submit">Alterar Nome</button></Link>
      </section>
    </main>
  );
}
