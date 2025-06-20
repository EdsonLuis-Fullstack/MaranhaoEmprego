'use client';
import { Card_Filtros } from '../../components/AbasCards/cards/jobList';
import FiltroVagas from '../../components/filtro/Filtro';
import { getJobsFiltros } from '../../components/services/allJob/getjobsFiltros'; // Ajuste o caminho conforme sua estrutura
import './search.css';
import { useState } from 'react';

export default function Search() {
    const [vagas, setVagas] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const handleFiltrar = async (filtros) => {
        // Verifica se pelo menos um filtro foi preenchido
        if (!filtros.area && !filtros.cidade && !filtros.cargo) {
            setErro('Preencha pelo menos um filtro para buscar vagas.');
            setVagas([]);
            setMostrarResultados(true);
            return;
        }

        setCarregando(true);
        setErro('');
        
        try {
            const resultado = await getJobsFiltros(
                filtros.area || '',
                filtros.cidade || '',
                filtros.cargo || ''
            );
            
            if (resultado.code === 200) {
                console.log('Vagas filtradas:', resultado.data);
                setVagas(resultado.data);
                setMostrarResultados(true);
            } else {
                setErro(resultado.msg || 'Erro ao buscar vagas');
                setVagas([]);
                setMostrarResultados(true);
            }
        } catch (error) {
            console.error('Erro ao filtrar vagas:', error);
            setErro('Erro ao conectar com o servidor');
            setVagas([]);
            setMostrarResultados(true);
        } finally {
            setCarregando(false);
        }
    };

    const limparFiltros = () => {
        setVagas([]);
        setMostrarResultados(false);
        setCarregando(false);
        setErro('');
    };

    return (
        <div>
            <div className='Search'>
                <div className='SearchFiltro'>
                    <FiltroVagas onFiltrar={handleFiltrar} onLimpar={limparFiltros} />
                </div>
            </div>
            
            <div className='SearchContent'>
                <div className='SearchContentTitle'>
                    <h1>
                        {mostrarResultados ? 'Resultado das vagas' : 'Use os filtros acima para buscar vagas'}
                    </h1>
                </div>
                <hr/>
                
                <div className='SearchContentVagas'>
                    {carregando ? (
                        <div className="loading-container">
                            <p>Carregando vagas...</p>
                            {/* Você pode adicionar um spinner aqui */}
                        </div>
                    ) : mostrarResultados ? (
                        erro ? (
                            <div className="error-message">
                                <p>❌ {erro}</p>
 
                            </div>
                        ) : vagas.length > 0 ? (
                            <div>
                                <div className="results-info">
                                    <p>{vagas.length} vaga(s) encontrada(s)</p>
                                </div>
                                <Card_Filtros vagas={vagas} />
                            </div>
                        ) : (
                            <div className="no-results-message">
                                <p>🔍 Nenhuma vaga encontrada com os filtros selecionados.</p>
                                <p>Tente ajustar os critérios de busca.</p>
                            </div>
                        )
                    ) : (
                        <div className="no-search-message">
                            <p>Selecione os filtros desejados e clique em "Buscar" para ver as vagas disponíveis.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}