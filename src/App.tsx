import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './components/Home/HomePage';
import MentorPage from './components/AgendarMentor/AgendarMentor';
import AnamnesePage from './components/Anamnese/AnamnesePage';
import AgendamentoPage from './components/Agendamento/AgendamentoPage';
import LoginPage from './components/TelaLogin/Login';
import IESPage from './components/TelaIES/TelaIES';
import CadastroPage from './components/TelaCadastro/Cadastro';
import UserPage from './components/TelaUsuario/Usuario';
import MentorUserPage from './components/TelamentorUser/mentorUser';
import MentoresPage from './components/Mentores/mentores-v';


import NotificacaoUser from './pages/Tela-NotificacaoUser/NotificacaoUser';
import ChangePassword from './pages/EsqueceuSenha/esqSenha';



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
        <Route path="/recuperar-senha" element={<ChangePassword />} />

        <Route path="/IES" element={<IESPage />} />

        <Route path="/usermentor" element={<MentorUserPage />} />
    
        <Route path="/user" element={<UserPage />} />
        <Route path="/notificacao" element={<NotificacaoUser />} />
        <Route path="/mentores" element={<MentoresPage />} />


        

      </Routes>
    </Router>



  );
}

export default App;
