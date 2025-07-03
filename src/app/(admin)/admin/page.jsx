'use client';
import './admin.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserShield } from 'react-icons/fa';

export default function LoginAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@empresa.com' && senha === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      setErro('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <section className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <div className="admin-login-icon"><FaUserShield size={40} /></div>
        <h2>Login Administrativo</h2>
        {erro && <p className="login-error">{erro}</p>}
        <input
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}
