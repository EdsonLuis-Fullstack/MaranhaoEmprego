'use client'
import './FormVaga.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import cadastroVagas from '../../../components/services/auth/cadastroVagas';

export default function FormVaga() {
  const [tipoSalario, setTipoSalario] = useState('valor');
  const [redeSocialTipo, setRedeSocialTipo] = useState('instagram');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false); // Libera o acesso
    }
  }, [router]);

  const handleTipoSalarioChange = (e) => {
    setTipoSalario(e.target.value);
  };

  const handleRedeSocialTipoChange = (e) => {
    setRedeSocialTipo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification({ type: '', message: '' });

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      // Converte os valores numéricos para números
      if (data['valor-salario']) {
        data['valor-salario'] = Number(data['valor-salario']);
      }
      if (data['total-vagas']) {
        data['total-vagas'] = Number(data['total-vagas']);
      }

      console.log('Dados do formulário a serem enviados:', data);
      
      // Chama a função com os dados do formulário
      const result = await cadastroVagas(data);
      console.log('Cadastro realizado com sucesso:', result);
      
      setNotification({
        type: 'success',
        message: 'Vaga cadastrada com sucesso!'
      });
      
      // Limpa o formulário após sucesso
      e.target.reset();
      setTipoSalario('valor');
      setRedeSocialTipo('instagram');
      
      // Opcional: redirecionar após alguns segundos
      setTimeout(() => {
        router.push('/dashboard/vagas');
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao cadastrar vaga:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Erro ao cadastrar vaga. Tente novamente.'
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
      
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
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
          <label htmlFor="Cep" className="campo-label">Cep</label>
          <input type="number" id="cep" name="cep" className="campo-input cep-vaga" required />
        </div>
        <div className="campo-grupo">
          <label htmlFor="Sobre_empresa" className="campo-label">Sobre a Empresa</label>
          <input type="text" id="Sobre_empresa" name="sobre" className="campo-input Sobre_empresa-vaga" required />
          <textarea name="sobre" id="Sobre_empresa" className='campo-input Sobre_empresa-vaga' rows="4" required></textarea>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="atividades" className="campo-label">Atividades</label>
          <textarea id="atividades" name="atividades" className="campo-textarea atividades-vaga" rows="4" required></textarea>
        </div>
        
        <div className="campo-grupo">
          <label className="campo-label">Salário</label>
          <div className="opcoes-salario">
            <div className="opcao-radio">
              <input 
                type="radio" 
                id="salario-valor" 
                name="tipo-salario" 
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
                name="tipo-salario" 
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
          <textarea id="beneficios" name="beneficios" className="campo-textarea beneficios-vaga" rows="3" required></textarea>
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
          <label htmlFor="total-vagas" className="campo-label">Total de Vagas</label>
          <input type="number" id="total-vagas" name="vagas" className="campo-input total-vagas" min="1" defaultValue="1" required />
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="email-contato" className="campo-label">Email de Contato</label>
          <input type="email" id="email-contato" name="email" className="campo-input email-contato" required />
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
        
        <div className="campo-grupo">
          <label className="campo-label">Rede Social</label>
          <div className="selecao-rede-social">
            <select 
              name="tipo-rede-social" 
              className="campo-select tipo-rede-social"
              value={redeSocialTipo}
              onChange={handleRedeSocialTipoChange}
              required
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
            </select>
            
            <input 
              type="text" 
              id="valor-rede-social" 
              name="rede_social" 
              className="campo-input valor-rede-social" 
              placeholder={redeSocialTipo === 'instagram' ? '@seuinstagram' : 'facebook.com/suapagina'}
              required
            />
          </div>
        </div>
        
        <div className="campo-grupo botoes">
          <button 
            type="submit" 
            className="botao botao-enviar" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Cadastrar Vaga'}
          </button>
          <button type="reset" className="botao botao-limpar" disabled={isSubmitting}>Limpar</button>
        </div>
      </form>
    </div>
  );
}