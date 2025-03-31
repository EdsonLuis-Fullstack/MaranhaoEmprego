import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/pages/Home';
import Vagas from './components/pages/Vagas';
import Noticias from './components/pages/Noticias';
import Cursos from './components/pages/Cursos';

function App() {
  return (
    <Router> 
      <Header/>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Vagas" element={<Vagas />} />
          <Route path="/Noticias" element={<Noticias />} />
          <Route path="/Cursos" element={<Cursos />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
