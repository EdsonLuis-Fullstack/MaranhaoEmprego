'use client'
import './FormVaga.css'
import React, { useEffect, useState } from 'react';


export default function FormVaga(){
    const [tipoSalario, setTipoSalario] = useState('valor');
  const [redeSocialTipo, setRedeSocialTipo] = useState('instagram');

  const handleTipoSalarioChange = (e) => {
    setTipoSalario(e.target.value);
  };

  const handleRedeSocialTipoChange = (e) => {
    setRedeSocialTipo(e.target.value);
  };

  return (
    <div className="FormVaga">
      <h1 className="titulo-pagina">Cadastro de Vaga</h1>
      
      <form className="formulario-vaga">
        <div className="campo-grupo">
          <label htmlFor="titulo" className="campo-label">Título da Vaga</label>
          <input type="text" id="titulo" name="titulo" className="campo-input titulo-vaga" required/>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="requisitos" className="campo-label">Requisitos</label>
          <textarea id="requisitos" name="requisitos" className="campo-textarea requisitos-vaga" rows="4" required></textarea>
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
          <label htmlFor="observacoes" className="campo-label">Observações</label>
          <textarea id="observacoes" name="observacoes" className="campo-textarea observacoes-vaga" rows="3" required></textarea>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="total-vagas" className="campo-label">Total de Vagas</label>
          <input type="number" id="total-vagas" name="total-vagas" className="campo-input total-vagas" min="1" defaultValue="1" required/>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="email-contato" className="campo-label">Email de Contato</label>
          <input type="email" id="email-contato" name="email-contato" className="campo-input email-contato" required/>
        </div>
        
        <div className="campo-grupo">
          <label htmlFor="whatsapp" className="campo-label">WhatsApp</label>
          <input type="tel" id="whatsapp" name="whatsapp" className="campo-input whatsapp-contato" required/>
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
              name="valor-rede-social" 
              className="campo-input valor-rede-social" 
              placeholder={redeSocialTipo === 'instagram' ? '@seuinstagram' : 'facebook.com/suapagina'}
              required
            />
          </div>
        </div>
        
        <div className="campo-grupo botoes">
          <button type="submit" className="botao botao-enviar">Cadastrar Vaga</button>
          <button type="reset" className="botao botao-limpar">Limpar</button>
        </div>
      </form>
    </div>
  );
}