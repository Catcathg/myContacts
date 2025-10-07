import './App.css'
import Home from '../src/pages/Home'
import Connexion from '../src/pages/Connexion'
import Inscription from '../src/pages/Inscription'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/connexion' element={<Connexion/>} />
        <Route path="/inscription" element={<Inscription/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
