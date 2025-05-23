'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Cadastro.css';
import Link from "next/link";

const CadastroForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    empresa: '',
    email: '',
    senha: '',
    telefone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

    if (error) setError(null);
  };

  const processErrorResponse = async (response) => {
    const errorData = await response.json();
    if (errorData.msg) {
      return { message: 'Erro no cadastro', details: errorData.msg };
    }

    const errorMessages = {
      400: 'Dados inválidos.',
      401: 'Não autorizado.',
      403: 'Acesso negado.',
      404: 'Recurso não encontrado.',
      409: 'Este e-mail já está cadastrado.',
      422: 'Dados inválidos.',
      429: 'Muitas solicitações.',
      500: 'Erro interno do servidor.',
      503: 'Serviço indisponível.',
    };

    return {
      message: errorMessages[response.status] || 'Erro desconhecido',
      details: `Código: ${response.status}`,
    };
  };

  const handle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const cleanedData = {
      nome: formData.empresa,
      email: formData.email,
      senha: formData.senha,
      telefone: formData.telefone.replace(/\D/g, ''),
    };

    try {
      const response = await fetch('http://localhost:8080/accessv4/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c=',
        },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        router.push('/login');
      } else {
        const errorData = await processErrorResponse(response);
        setError(errorData);
      }
    } catch (error) {
      setError({
        message: 'Erro de conexão',
        details: 'Verifique sua conexão com a internet.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="Cadastro">
      <div className="FormularioCadastro">
        <h1 id="TituloCadastro">Cadastro</h1>

        {error && (
          <div className="custom-alert">
            <strong>{error.message}</strong>
            <p>{error.details}</p>
          </div>
        )}

        <form onSubmit={handle} className="form">
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
              minLength={8}
              pattern=".{8,}"
              title="A senha deve ter pelo menos 8 caracteres"
            />
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="privacidade" name="privacidade" required />
            <label htmlFor="privacidade">
              Aceito os <Link href="/termo-de-uso">Termos de Uso</Link> e a{' '}
              <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p id="LoginConta">
          Já tem conta? <Link href="/login">Faça seu Login.</Link>
        </p>
      </div>
    </section>
  );
};

export default CadastroForm;
