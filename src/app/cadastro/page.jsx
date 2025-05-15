'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Cadastro.css';
import Link from "next/link";
import { message } from 'antd'; // Para exibir mensagens de sucesso/erro

const CadastroForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    empresa: '',
    email: '',
    senha: '',
    telefone: '',
    
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const cleanedData = {
    nome: formData.empresa,
    email: formData.email,
    senha: formData.senha,
    telefone: formData.telefone.replace(/\D/g, ''),
  };

  console.log("Dados enviados:", cleanedData);

  try {
    const response = await fetch('http://localhost:8080/accessv4/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c=',
      },
      body: JSON.stringify(cleanedData),
    });

    console.log("Resposta da API:", response);

    switch (response.status) {
      case 200:
        message.success('Cadastro realizado com sucesso! Redirecionando para o login...');
        router.push('/login');
        break;
      case 201:
        message.success('Cadastro criado com sucesso! Redirecionando para o login...');
        router.push('/login');
        break;
      case 400:
        const error400 = await response.json();
        message.error(`Erro de validação: ${error400.message || 'Dados inválidos'}`);
        break;
      case 401:
        message.error('Não autorizado. Verifique suas credenciais.');
        break;
      case 404:
        message.error('Recurso não encontrado. Verifique a URL.');
        break;
      case 500:
        message.error('Erro interno do servidor. Tente novamente mais tarde.');
        break;
      default:
        message.error('Erro desconhecido. Tente novamente mais tarde.');
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    message.error('Não foi possível realizar o cadastro. Verifique sua conexão.');
  }
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
              minLength={8} // Definindo o mínimo de 8 caracteres
              pattern=".{8,}" // Garantindo que sejam no mínimo 8 caracteres
              title="A senha deve ter pelo menos 8 caracteres"
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="privacidade"
              name="privacidade"
              required
            />
            <label htmlFor="privacidade">Aceito os Termos de Uso e a Política de Privacidade</label>
          </div>

          <button type="submit" className="submit-btn">Cadastrar</button>
        </form>
        <p id='LoginConta'>Já tem conta? <Link href="/login" id="LogarConta">Faça seu Login.</Link></p>
      </div>
    </section>
  );
};

export default CadastroForm;
