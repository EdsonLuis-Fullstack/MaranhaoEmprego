'use client';
import { useState } from 'react';
import './Cadastro.css'
import Link from "next/link";
import cadastrarUsuario from "@/components/services/auth/cadastro";

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    empresa: '',
    email: '',
    senha: '',
    telefone: '',
    termos: false,
    privacidade: false,
  });

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const maxLength = 11;
    let formatted = cleaned.slice(0, maxLength);

    if (formatted.length > 10) {
      formatted = formatted.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (formatted.length > 6) {
      formatted = formatted.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (formatted.length > 2) {
      formatted = formatted.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (formatted.length > 0) {
      formatted = `(${formatted}`;
    }

    return formatted;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (name === 'telefone') {
      processedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Limpa a formatação do telefone antes de enviar
    const cleanedData = {
      ...formData,
      telefone: formData.telefone.replace(/\D/g, '')
    };

    cadastrarUsuario(cleanedData);
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
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              placeholder="(XX) XXXXX-XXXX"
              value={formData.telefone}
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