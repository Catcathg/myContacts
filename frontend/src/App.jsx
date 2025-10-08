import './App.css'
import Home from '../src/pages/Home'
import Connexion from '../src/pages/Connexion'
import Inscription from '../src/pages/Inscription'
import Dashboard from '../src/pages/Dashboard'
import Form from '../src/pages/Form'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/connexion' element={<Connexion/>} />
        <Route path="/inscription" element={<Inscription/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/ajouter-contact" element={<Form/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
