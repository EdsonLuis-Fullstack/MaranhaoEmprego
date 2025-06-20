'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Cadastro.css';
import Link from "next/link";
import cadastrarUsuario from '@/components/services/auth/cadastro';
import { message, Alert } from 'antd'; // Adicionando Alert para exibir erros

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
    
    // Limpa o erro quando o usuário começa a digitar novamente
    if (error) setError(null);
  };

  const processErrorResponse = async (response) => {
    // Tenta extrair informações detalhadas do erro da resposta

      const errorData = response;
      
      // Verifica diferentes formatos possíveis de erro
      if (errorData.msg) {
        return {
          message: 'Erro no cadastro',
          details: errorData.msg,
          code: response.status
        };


      }

    // Mapeamento de códigos de erro para mensagens amigáveis
    const errorMessages = {
      400: 'Dados inválidos. Verifique as informações fornecidas.',
      401: 'Não autorizado. Verifique suas credenciais.',
      403: 'Acesso negado. Você não tem permissão para realizar esta operação.',
      404: 'Recurso não encontrado. Verifique a URL.',
      409: 'Conflito. Este email já pode estar cadastrado.',
      422: 'Dados inválidos. Verifique as informações fornecidas.',
      429: 'Muitas solicitações. Tente novamente mais tarde.',
      500: 'Erro interno do servidor. Tente novamente mais tarde.',
      503: 'Serviço indisponível no momento. Tente novamente mais tarde.'
    };
    
    return {
      message: errorMessages[response.status] || 'Erro desconhecido',
      details: `Código de status: ${response.status}`,
      code: response.status
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const cleanedData = {
      nome: formData.empresa,
      email: formData.email,
      senha: formData.senha,
      telefone: formData.telefone.replace(/\D/g, ''),
    };

    console.log("Dados enviados:", cleanedData);
      let response = await cadastrarUsuario(cleanedData);
      if (response.ok) {
        // Sucesso (200, 201)
        message.success('Cadastro realizado com sucesso! Redirecionando para o login...');
        setTimeout(() => {
          router.push('/login');
        }, 1200);
      } else {
        // Resposta de erro do servidor
        const errorData = await processErrorResponse(response);
        setError(errorData);
        message.error(errorData.message);
      }
       if(response.code == 500) {
      
      setError({
        message: 'Erro de conexão',
        details: 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
        code: 'network-error'
      });}
      

  };

  return (
    <section className='Cadastro'>
      <div className='FormularioCadastro'>
        <h1 id="TituloCadastro">Cadastro</h1>
        
        {error && (
          <Alert
            message={error.message}
            description={error.details}
            type="error"
            showIcon
            closable
            style={{ marginBottom: '15px', width: '85%', height: '15%', fontSize: '0.9rem' }}
          />
        )}
        
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
            <label htmlFor="privacidade">Aceito os <Link href="/termo-de-uso" id="LogarConta">Termos de Uso </Link> e a <Link href="/politica-de-privacidade" id="LogarConta">Política de Privacidade</Link></label>
          </div>

          <button 
            type="submit" 
            className="submit-btn" >
              Cadastrar
          </button>
        </form>
        <p id='LoginConta'>Já tem conta? <Link href="/login" id="LogarConta">Faça seu Login.</Link></p>
      </div>
    </section>
  );
};

export default CadastroForm;