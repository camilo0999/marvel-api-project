import { Routes, Route } from 'react-router-dom';
import Comic from './pages/Comic';
import Inicio from './pages/Inicio';
import Personaje from './pages/Personaje';
import VerPersonaje from './pages/VerPersonaje';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VerComic from './pages/VerComic';
import Buscar from './pages/Buscar';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Navbar siempre se muestra en todas las páginas */}
      <Navbar />

      {/* Rutas de las páginas */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/personajes" element={<Personaje />} />
          <Route path="/comic" element={<Comic />} />
          <Route path="/comic/:id" element={<VerComic />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/personajes/:id" element={<VerPersonaje />} />
        </Routes>
      </div>

      {/* Footer siempre se muestra en todas las páginas */}
      <Footer />
    </div>
  );
}

export default App;
