'use client';
import './VerificarEmail.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {MudarEmail_Com_codigo} from "@/components/services/auth/alterarEmail"
import Cookies from "js-cookie"
export default function VerificarEmail() {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerificar = async () => {
    if (!codigo || codigo.length < 3) {
      alert('Digite o código de 4 dígitos corretamente.');
      return;
    }

    try {
      const Token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_AUTH_NAME}`)
      const Email = Cookies.get(`emIaLEWrewwf`)

      setLoading(true);
      const data = await MudarEmail_Com_codigo(Token,Email,codigo)
      Cookies.remove(`emIaLEWrewwf`)

     

      if (data.code == 200) {
        alert('Código validado com sucesso!');
        router.push('/area-da-empresa');
      } else {
        alert(data.mensagem || 'Código inválido.');
      }
    } catch (error) {
      console.error('Erro na verificação:', error);
      alert('Erro na verificação. Tente novamente.' + error);
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
