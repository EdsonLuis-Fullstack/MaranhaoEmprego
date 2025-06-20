import { Cards } from '../../components/AbasCards/cards/jobList'
import FiltroVagas from '../../components/filtro/Filtro'
import './search.css'
export default function Search() {
    return (
        <div>
            <div className='Search'>
                <div className='SearchFiltro'>
                    <FiltroVagas/>
                </div>
                </div>
                <div className='SearchContent'>
                    <div className='SearchContentTitle'>
                        <h1>Resultado das vagas</h1>
                    </div>
                    <hr/>
                    <div className='SearchContentVagas'>
                        <Cards/>
                    </div>
                </div>
        </div>
    )
}