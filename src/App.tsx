import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/HomePage';
import MentorPage from './components/AgendarMentor/AgendarMentor';
import AnamnesePage from './components/Anamnese/AnamnesePage';
import AgendamentoPage from './components/Agendamento/AgendamentoPage';
import LoginPage from './components/TelaLogin/Login';
import IESPage from './components/TelaIES/TelaIES';
import CadastroPage from './components/TelaCadastro/Cadastro';
import UserPage from './components/TelaUsuario/Usuario';
import PerfilUser from './pages/Tela-PerfilUser/PerfilUser';
import NotificacaoUser from './pages/Tela-NotificacaoUser/NotificacaoUser';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/anamnese" element={<AnamnesePage />} />
        <Route path="/agendamento" element={<AgendamentoPage />} />

        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/IES" element={<IESPage />} />


        <Route path="/user" element={<UserPage />} />
        <Route path="/perfil" element={<PerfilUser />} />
        <Route path="/notificacao" element={<NotificacaoUser />} />

      </Routes>
    </Router>
  );
}

export default App;
