'use client';
import './email.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AlterarEmail() {
  const [captchaValidado, setCaptchaValidado] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Por favor, insira um email.');
      return;
    }

    if (!validarEmail(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    if (!captchaValidado) {
      alert('Por favor, valide o CAPTCHA antes de enviar.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/verificar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.disponivel) {
        alert('Email disponível! Redirecionando...');
        router.push('/area-da-empresa/alterarPerfil/email/VerificarEmail');
      } else {
        alert(data.mensagem || 'Este email já está em uso.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao verificar email. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="alterar-dados-wrapper">
      <section className="alterar-dados-box">
        <h1>Alterar email da conta</h1>
        <form onSubmit={handleSubmit} className="alterar-dados-form">
          <div className="form-group">
            <label htmlFor="email">Novo Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="captcha-simulado">
            <input
              type="checkbox"
              id="captcha"
              onChange={(e) => setCaptchaValidado(e.target.checked)}
            />
            <label htmlFor="captcha">Não sou um robô</label>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Salvar alterações'}
          </button>
        </form>
      </section>
    </main>
  );
}
