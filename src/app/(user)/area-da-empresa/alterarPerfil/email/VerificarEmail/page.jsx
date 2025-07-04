'use client';
import './VerificarEmail.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerificarEmail() {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerificar = async () => {
    if (!codigo || codigo.length < 6) {
      alert('Digite o código de 6 dígitos corretamente.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/verificar-codigo-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
      });

      const data = await response.json();

      if (response.ok && data.validado) {
        alert('Código validado com sucesso!');
        router.push('/area-da-empresa');
      } else {
        alert(data.mensagem || 'Código inválido.');
      }
    } catch (error) {
      console.error('Erro na verificação:', error);
      alert('Erro na verificação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="VerificarEmail">
      <div className="input-verificacao-container">
        <label htmlFor="codigoVerificacao">Código de verificação de e-mail</label>
        <input
          type="text"
          id="codigoVerificacao"
          name="codigoVerificacao"
          placeholder="Digite o código recebido por e-mail"
          className="input-verificacao"
          maxLength={6}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button className="btn-enviar" onClick={handleVerificar} disabled={loading}>
          {loading ? 'Verificando...' : 'Enviar'}
        </button>
      </div>
    </section>
  );
}
