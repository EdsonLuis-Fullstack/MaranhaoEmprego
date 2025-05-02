'use client'
import React, { useState } from 'react';
import { Card } from 'antd';
import { Cards, CardsHomeOffice, CardsDiarista, CardsEmprego, CardsEstagio, CardsJovemAprendiz, CardsRCA, CardsTRAINEE, CardsPCD } from './cards/jobList'; 
import './AbasCardsStyle.css'

const tabListNoTitle = [
  {
    key: 'todasvagas',
    label: 'Todas as vagas',
  },
  {
    key: 'diarista',
    label: 'Diarista',
  },
  {
    key: 'emprego',
    label: 'Emprego',
  },
  {
    key: 'estagio',
    label: 'Estágio'
  },
  {
    key: 'homeoffice',
    label: 'Home office'
  },
  {
    key: 'jovemaprendiz',
    label: 'Jovem aprendiz'
  },
  {
    key: 'pcd',
    label: 'PCD'
  },
  {
    key: 'rca',
    label: 'RCA'
  },
  {
    key: 'trainee',
    label: 'TRAINEE'
  }
];
const contentListNoTitle = {
  todasvagas: <Cards/>,
  diarista: <CardsDiarista/>,
  emprego: <CardsEmprego/>,
  estagio: <CardsEstagio/>,
  homeoffice: <CardsHomeOffice/>,
  jovemaprendiz: <CardsJovemAprendiz/>,
  pcd: <CardsPCD/>,
  rca: <CardsRCA/>,
  trainee: <CardsTRAINEE/>,
};
const AbasCards = () => {
  const [activeTabKey2, setActiveTabKey2] = useState('todasvagas');
  const onTab2Change = key => {
    setActiveTabKey2(key);
  };
  return (
    <>
      <Card
        style={{ 
          width: '100%',
          paddingLeft: '0px',
          paddingRight: '0px',
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle'
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};
export default AbasCards;