'use client'
import './FormVaga.css'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import cadastroVagas from '../../../components/services/auth/cadastroVagas';

export default function FormVaga() {
  const [tipoSalario, setTipoSalario] = useState('valor');
  const [redeSocialTipo, setRedeSocialTipo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Ref para o componente de erro para rolagem automática
  const errorRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false); // Libera o acesso
    }
  }, [router]);

  // Limpa a notificação após 4 segundos
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '' });
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Efeito para rolar até o erro quando ele aparecer
  useEffect(() => {
    if (error && errorRef.current) {
      // Rola suavemente até o componente de erro
      errorRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, [error]);

  const handleTipoSalarioChange = (e) => {
    setTipoSalario(e.target.value);
  };

  const handleRedeSocialTipoChange = (e) => {
    setRedeSocialTipo(e.target.value);
  };

  // Função para formatar as mensagens de erro
  const formatErrorMessage = (errorMsg) => {
    // Se for um array de erros, formata como lista
    if (Array.isArray(errorMsg)) {
      return errorMsg;
    }
    
    // Se for um objeto, extrai as mensagens
    if (typeof errorMsg === 'object' && errorMsg !== null) {
      return Object.values(errorMsg).flat();
    }
    
    // Se for uma string, retorna como array para consistência
    return [errorMsg];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification({ type: '', message: '' });
    setError(null);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Converte os valores numéricos para números
      if (data['valor-salario']) {
        data['valor-salario'] = Number(data['valor-salario']);
      }
      if (data.vagas) {
        data.vagas = Number(data.vagas);
      }

      console.log('Dados do formulário a serem enviados:', data);
      
      // Chama a função com os dados do formulário
      const result = await cadastroVagas(data);
      console.log('Resultado da requisição:', result);
      
      if (result.code === 201) {
        // Sucesso - somente mostra a notificação de sucesso
        setNotification({
          type: 'success',
          message: result.msg
        });
        
        // Limpa o formulário após sucesso
        e.target.reset();
        setTipoSalario('valor');
        setRedeSocialTipo('instagram');
        
        // Opcional: redirecionar após alguns segundos
        setTimeout(() => {
          router.push('/area-da-empresa');
        }, 2000);
      } else {
        // Trata o erro retornado pelo backend
        const errorMessages = formatErrorMessage(result.msg);
        
        // Para erros, somente mostra o card de erro, sem notificação adicional
        setError({
          message: 'Erro ao cadastrar vaga',
          details: errorMessages
        });
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      
      // Trata erros de requisição ou outros erros não previstos
      const errorMessages = err.msg ? formatErrorMessage(err.msg) : ['Ocorreu um erro inesperado. Tente novamente mais tarde.'];
      
      // Para erros, somente mostra o card de erro, sem notificação adicional
      setError({
        message: 'Erro ao cadastrar vaga',
        details: errorMessages
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Verificando autenticação...</p>;
  }

  return (
    <div className="FormVaga">
      <h1 className="titulo-pagina">Cadastro de Vaga</h1>
      
      {/* Exibe o Alert de erro se houver um erro */}
      {error && (
        <div className="error-alert" ref={errorRef}>
          <div className="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div className="error-content">
            <h4 className="error-title">{error.message}</h4>
            {Array.isArray(error.details) ? (
              <ul className="error-details-list">
                {error.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            ) : (
              <p className="error-details">{error.details}</p>
            )}
          </div>
          <button 
            className="error-close-btn"
            onClick={() => setError(null)}
            aria-label="Fechar alerta de erro"
          >
            ×
          </button>
        </div>
      )}
      
      {/* Exibe a notificação SOMENTE quando não houver erro e tiver uma mensagem */}
      {!error && notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )}
          <span>{notification.message}</span>
          <button 
            onClick={() => setNotification({ type: '', message: '' })}
            className="notification-close"
            aria-label="Fechar notificação"
          >
            ×
          </button>
        </div>
      )}
      
      <form className="formulario-vaga" onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <label htmlFor="titulo" className="campo-label">Título da Vaga</label>
          <input type="text" id="titulo" name="titulo" className="campo-input titulo-vaga" required />
        </div>
        <div className="campo-grupo">
          <label htmlFor="nome_Empresa" className="campo-label">Nome da Empresa</label>
          <input type="text" id="nome_Empresa" name="nome_Empresa" className="campo-input nome_Empresa-vaga" required />
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="requisitos" className="campo-label">Requisitos</label>
          <textarea id="requisitos" name="requisitos" className="campo-textarea requisitos-vaga" rows="4" required></textarea>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="sobre" className="campo-label">Sobre a Empresa</label>
          <textarea id="sobre" name="sobre" className="campo-textarea sobre-vaga" rows="4" ></textarea>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="atividades" className="campo-label">Atividades</label>
          <textarea id="atividades" name="atividades" className="campo-textarea atividades-vaga" rows="4"></textarea>
        </div>
        
        <div className="campo-grupo">
          <label className="campo-label">Salário</label>
          <div className="opcoes-salario">
            <div className="opcao-radio">
              <input 
                type="radio" 
                id="salario-valor" 
                name="tipoSalario" 
                value="valor" 
                checked={tipoSalario === 'valor'} 
                onChange={handleTipoSalarioChange} 
                className="radio-input"
                required
              />
              <label htmlFor="salario-valor" className="radio-label">Valor</label>
            </div>
            <div className="opcao-radio">
              <input 
                type="radio" 
                id="salario-combinar" 
                name="tipoSalario" 
                value="combinar" 
                checked={tipoSalario === 'combinar'} 
                onChange={handleTipoSalarioChange} 
                className="radio-input"
                required
              />
              <label htmlFor="salario-combinar" className="radio-label">A Combinar</label>
            </div>
          </div>
          
          {tipoSalario === 'valor' && (
            <div className="campo-valor-salario">
              <input 
                type="number" 
                id="valor-salario" 
                name="valor-salario" 
                className="campo-input valor-salario" 
                placeholder="Digite o valor (apenas números)"
                required
              />
            </div>
          )}
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="beneficios" className="campo-label">Benefícios</label>
          <textarea id="beneficios" name="beneficios" className="campo-textarea beneficios-vaga" rows="3" placeholder='Ex.: Vale alimentação, Vale transporte, Plano de saúde'></textarea>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="tipo" className="campo-label">Tipo</label>
          <select id="tipo" name="tipo" className="campo-select tipo-vaga" required>
            <option value="">Selecione um Tipo de vaga</option>
            <option value="estagio">Estágio</option>
            <option value="clt">CLT</option>
            <option value="pcd">PCD</option>
            <option value="trainee">Trainee</option>
            <option value="diarista">Diarista</option>
            <option value="home_office">Home Office</option>
          </select>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="cidade" className="campo-label">Cidade</label>
          <select id="cidade" name="cidade" className="campo-select cidade-vaga" required>
            <option value="">Selecione uma cidade</option>
            <option value="sao-luis">São Luís</option>
            <option value="imperatriz">Imperatriz</option>
            <option value="caxias">Caxias</option>
            <option value="timon">Timon</option>
            <option value="santaines">Santa Inês</option>
            <option value="bacabal">Bacabal</option>
            <option value="balsas">Balsas</option>
            <option value="codó">Codó</option>
            <option value="pinheiro">Pinheiro</option>
            <option value="acailandia">Açailândia</option>
          </select>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="vagas" className="campo-label">Total de Vagas</label>
          <input type="number" id="vagas" name="vagas" className="campo-input total-vagas" min="1" defaultValue="1" required />
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="email" className="campo-label">Email de Contato</label>
          <input type="email" id="email" name="email" className="campo-input email-contato" required />
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="whatsapp" className="campo-label">WhatsApp</label>
          <input type="tel" id="whatsapp" name="whatsapp" className="campo-input whatsapp-contato" required />
        </div>
                
        <div className="campo-grupo">
          <label htmlFor="categoria" className="campo-label">Categoria</label>
          <select id="categoria" name="categoria" className="campo-select categoria-vaga" required>
            <option value="">Selecione uma categoria</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="saude">Saúde</option>
            <option value="educacao">Educação</option>
            <option value="comercio">Comércio</option>
            <option value="servicos">Serviços</option>
          </select>
        </div>
        
        <div className="campo-grupo botoes">
          <button 
            type="submit" 
            className="botao botao-enviar" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Cadastrar Vaga'}
          </button>
          <button 
            type="button" 
            className="botao botao-limpar" 
            disabled={isSubmitting}
            onClick={() => {
              document.querySelector('.formulario-vaga').reset();
              setTipoSalario('valor');
              setRedeSocialTipo('instagram');
              setError(null);
              setNotification({ type: '', message: '' });
            }}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}