import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./mentorDashboard.css";

interface Agendamento {
  id: number;
  mentorado: string;
  data: string;
  hora: string;
  anamnese: string;
}

const MentorDashboard: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redireciona para o login se não houver token
    }
  }, [navigate]);
  
  // Função para buscar os agendamentos do mentor
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('http://localhost:8080/mentor/agendamentos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAgendamentos(data);
        } else {
          console.error('Erro ao buscar agendamentos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  // Função para sair da conta
  const handleLogout = () => {
    // Aqui você pode limpar tokens de autenticação se necessário
    navigate('/login', { state: { message: 'Você saiu da conta.' } });
  };

  return (
    <div className="mentor-dashboard">
      <header className="dashboard-header">
        <h1>Bem-vindo, Mentor</h1>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </header>

      <main>
        <h2>Agendamentos Recebidos</h2>
        {agendamentos.length > 0 ? (
          <div className="agendamentos-list">
            {agendamentos.map((agendamento) => (
              <div key={agendamento.id} className="agendamento-card">
                <h3>Mentorado: {agendamento.mentorado}</h3>
                <p><strong>Data:</strong> {agendamento.data}</p>
                <p><strong>Hora:</strong> {agendamento.hora}</p>
                <p><strong>Anamnese:</strong> {agendamento.anamnese}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum agendamento encontrado.</p>
        )}
      </main>
    </div>
  );
};

export default MentorDashboard;
