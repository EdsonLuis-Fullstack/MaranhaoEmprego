'use client'
import './CardStyle.css'
import {
  EnvironmentFilled,
  ShoppingFilled
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import getAllJobs from '@/components/services/allJob/getJobs';
import {getParamet} from '@/components/services/allJob/getJobs';

function Cards() {
  const [vagas, setVagas] = useState([]);
  async function fetchVagas() {
    try {
      const data = await getAllJobs();
      setVagas(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    }
  }
  
  useEffect(() => {

    fetchVagas();
  }, []);

  return (
    <div className="Vagas" >
      {vagas.map((jobs) => (
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='areas'>{jobs.area}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
        </div>
      ))}
    </div>
  );
}
function CardsHomeOffice() {
  const [vagas, setVagas] = useState([]);

  async function fetchVagas() {
    try {
      const data = await getParamet('tipo', 'Home Office');
      setVagas(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    }
  }
  useEffect(() => {

    fetchVagas();
  }, []);

  return (
    <div className="Vagas">
      {vagas.map((jobs) => (
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
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
        const data = await getParamet('tipo','Diarista');
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
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
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
        const data = await getParamet("tipo","emprego");
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
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
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
        const data = await getParamet('tipo', 'Jovem Aprendiz');
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
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
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
        const data = await getParamet('tipo', 'Estágio');
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
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
        </div>
      ))}
    </div>
  );
}

function CardsPcd() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const data = await getParamet('tipo', 'Pcd');
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
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
        </div>
      ))}
    </div>
  );
}


function CardsRca() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const data = await getParamet('tipo', 'rca');
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
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
        </div>
      ))}
    </div>
  );
}

function CardsTrainee() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const data = await getParamet('tipo', 'Trainee');
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
        <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
          <h1 id='tituloCard'>{jobs.titulo}</h1>
          <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
          <p id='Local'><EnvironmentFilled style={{ color: '#02539b' }} /> {jobs.cidade} - MA</p>
          <p id='Categoria'><ShoppingFilled style={{ color: '#02539b' }} /> {jobs.categoria}</p>
          <p id='SobreVaga'>{jobs.sobre}44</p>
          <div id="SalarioPreço">
            <p id='Salario'>Salário:</p>
            <span id='SalarioP'>
  {jobs.salario === 'A combinar' ? jobs.salario : `R$${jobs.salario}`}
</span>

          </div>
          <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>Saiba mais</Link>
        </div>
      ))}
    </div>
  );
}


export function Card_Filtros({ vagas = [] }) {

  return (
    <div className="Vagas">
      {vagas.length === 0 ? (
        <div className="no-results">
          <p>Nenhuma vaga encontrada com os filtros aplicados.</p>
        </div>
      ) : (
        vagas.map((jobs) => (
          <div className={[`CardVagas`, jobs.destaque ? "CardVagaHighlight" : ""].join(" ")} key={jobs.uuid}>
            <h1 id='tituloCard'>{jobs.titulo}</h1>
            <div id="statusTempo">{jobs.date.slice(0, 10)}</div>
            <p id='Local'>
              <EnvironmentFilled style={{ color: '#02539b' }} /> 
              {jobs.cidade} - MA
            </p>
            <p id='Categoria'>
              <ShoppingFilled style={{ color: '#02539b' }} /> 
              {jobs.categoria}
            </p>
            <p id='areas'>{jobs.area}</p>
            <p id='SobreVaga'>{jobs.sobre}</p>
            <div id="SalarioPreço">
              <p id='Salario'>Salário:</p>
              <span id='SalarioP'>
                {jobs.salario === 'A combinar' ? jobs.salario : `R${jobs.salario}`}
              </span>
            </div>
            <Link className='LinkClass' id='linkID' href={`/job/${jobs.uuid}`}>
              Saiba mais
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
export  { Cards, CardsHomeOffice, CardsDiarista, CardsEmprego, CardsJovemAprendiz, CardsEstagio,CardsPcd,CardsRca,CardsTrainee,Card_Filtros };
