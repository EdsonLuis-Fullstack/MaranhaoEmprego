'use client'

import './CardStyle.css'
import {
  EnvironmentFilled,
  ShoppingFilled
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import getAllJobs from '@/components/services/allJob/getAllJobs';

function Cards() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const data = await getAllJobs();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    }

    fetchVagas();
  }, []);

  return (
    <div className="Vagas">
      {vagas.map((jobs) => (
        <div className='CardVagas' key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>R${jobs.salario}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
function CardsHomeOffice() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const data = await getAllJobs();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    }

    fetchVagas();
  }, []);

  return (
    <div className="Vagas">
            {vagas
        .filter((jobs) => jobs.categoria === 'Saúde')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='SobreVaga'>{jobs.sobre}</p>
            <div id="SalarioPreço">
              <p id='Salario'>Salário:</p>
              <span id='SalarioP'>R${jobs.salario}</span>
            </div>
          </div>
      ))}
    </div>
  );
}
function CardsDiarista() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const data = await getAllJobs();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    }

    fetchVagas();
  }, []);

  return (
    <div className="Vagas">
            {vagas
        .filter((jobs) => jobs.categoria === 'Logística')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='SobreVaga'>{jobs.sobre}</p>
            <div id="SalarioPreço">
              <p id='Salario'>Salário:</p>
              <span id='SalarioP'>R${jobs.salario}</span>
            </div>
          </div>
      ))}
    </div>
  );
}
function CardsEmprego() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const data = await getAllJobs();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    }

    fetchVagas();
  }, []);

  return (
    <div className="Vagas">
            {vagas
        .filter((jobs) => jobs.categoria === 'Serviço Social')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='SobreVaga'>{jobs.sobre}</p>
            <div id="SalarioPreço">
              <p id='Salario'>Salário:</p>
              <span id='SalarioP'>R${jobs.salario}</span>
            </div>
          </div>
      ))}
    </div>
  );
}
export  { Cards, CardsHomeOffice, CardsDiarista, CardsEmprego }