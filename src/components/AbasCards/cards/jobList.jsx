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
          <p id='areas'>{jobs.area}</p>
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
        .filter((jobs) => jobs.area === 'Home Office')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='areas'>{jobs.area}</p>
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
        .filter((jobs) => jobs.area === 'Diarista')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='areas'>{jobs.area}</p>
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
        .filter((jobs) => jobs.area === 'Emprego')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='areas'>{jobs.area}</p>
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
function CardsEstagio() {
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
        .filter((jobs) => jobs.area === 'Estágio')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='areas'>{jobs.area}</p>
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
function CardsJovemAprendiz() {
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
        .filter((jobs) => jobs.area === 'Jovem Aprendiz')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='areas'>{jobs.area}</p>
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
function CardsPCD() {
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
        .filter((jobs) => jobs.area === 'PCD')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='areas'>{jobs.area}</p>
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
function CardsRCA() {
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
        .filter((jobs) => jobs.area === 'RCA')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='areas'>{jobs.area}</p>
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
function CardsTRAINEE() {
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
        .filter((jobs) => jobs.area === 'TRAINEE')
        .map((jobs) => (
          <div className='CardVagas' key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
            <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
            <p id='areas'>{jobs.area}</p>
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
export  { Cards, CardsHomeOffice, CardsDiarista, CardsEmprego, CardsEstagio, CardsJovemAprendiz, CardsPCD, CardsRCA, CardsTRAINEE };