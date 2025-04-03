'use client';
import { useState } from 'react';
import './Cadastro.css'
import Link  from "next/link";

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    empresa: '',
    email: '',
    senha: '',
    whatsapp: '',
    termos: false,
    privacidade: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
  };

  return (
    <section className='Cadastro'>
        <div className='FormularioCadastro'>
            <h1 id="TituloCadastro">Cadastro</h1>
        <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="empresa">Nome da Empresa</label>
                    <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        placeholder="Digite o nome da empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="whatsapp">Número do WhatsApp</label>
                    <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        placeholder="Exemplo: 98999999999 (Para candidatos entrar em contato)"
                        pattern="[0-9]{9}"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="privacidade"
                        name="privacidade"
                        checked={formData.privacidade}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="privacidade">Aceito os Termos de Uso e a Política de Privacidade</label>
                </div>

                <button type="submit" className="submit-btn">Cadastrar</button>
            </form>
            <p id='LoginConta'>Ja tem conta? <Link href="/login" id="LogarConta">Faça seu Login.</Link></p>
    </div>
    </section>
  );
};

export default CadastroForm;
