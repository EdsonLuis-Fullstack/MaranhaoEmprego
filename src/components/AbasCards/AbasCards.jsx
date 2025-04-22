'use client'
import React, { useState } from 'react';
import { Card } from 'antd';
import Cards from './cards/jobList'; 
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
  diarista: <p>app content</p>,
  emprego: <p>project content</p>,
  estagio: <p>project content</p>,
  homeoffice: <p>project content</p>,
  jovemaprendiz: <p>project content</p>,
  pcd: <p>project content</p>,
  rca: <p>project content</p>,
  trainee: <p>project content</p>,
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