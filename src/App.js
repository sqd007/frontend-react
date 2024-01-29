import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ContatoPage from './pages/ContatoPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CadastroCandidato from './pages/CadastroCandidato';
import CadastroRecrutador from './pages/CadastroRecrutador';
import DashboardCandidato from './pages/DashboardCandidato';
import DashboardRecrutador from './pages/DashboardRecrutador';
import CadastroVaga from './pages/CadastroVaga';
import EditarVaga from './pages/EditarVaga';
import VagaMatchs from './pages/VagaMatch';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/cadastro_candidato' element={<CadastroCandidato />} />
        <Route path='/cadastro_recrutador' element={<CadastroRecrutador />} />
        <Route path='/dashboard_candidato' element={<DashboardCandidato />} />
        <Route path='/dashboard_recrutador' element={<DashboardRecrutador />} />
        <Route path='/dashboard_recrutador' element={<DashboardRecrutador />} />
        <Route path='/vagas_recrutador' element={<CadastroVaga />} />
        <Route path='/vaga_editar/:recrutadorId/:vagaId' element={<EditarVaga />} />
        <Route path='/matchs' element={<VagaMatchs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
