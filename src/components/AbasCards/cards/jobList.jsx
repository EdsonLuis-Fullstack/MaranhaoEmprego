'use client'

import './CardStyle.css'
import {
  EnvironmentFilled,
  ShoppingFilled
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import getAllJobs from '@/components/services/allJob/getAllJobs';

export default function Cards() {
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
          <div id="statusTempo">Recém publicado</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - {jobs.estado}</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.descricao}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>R${jobs.salario}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
