import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './telaAgendamento.css';
import logomentor from '../../assets/imgs/logomentor.jpg';

const AgendaMentor: React.FC = () => {
  const [mentores, setMentores] = useState<any[]>([]); // Lista de mentores
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null); // Mentor selecionado
  const [selectedDate, setSelectedDate] = useState<string>(''); // Data selecionada
  const [selectedHour, setSelectedHour] = useState<string>(''); // Horário selecionado
  const [mentoradoID, setMentoradoID] = useState<string>(''); // ID do mentorado
  const [availableHours, setAvailableHours] = useState<string[]>([]); // Horários disponíveis
  const [mentoriaAgendada, setMentoriaAgendada] = useState<boolean>(false); // Flag de sucesso
  const [loading, setLoading] = useState<boolean>(true); // Carregamento
  const [error, setError] = useState<string | null>(null); // Erros

  // Carrega os mentores e o ID do mentorado
  useEffect(() => {
    const mentoradoData = localStorage.getItem('mentoradoId');
    const token = localStorage.getItem('token');
    if (!mentoradoData || !token) {
      console.error('ID do mentorado ou token ausente.');
      setError('Erro de autenticação.');
      setLoading(false);
      return;
    }

    // Recupera o ID do mentorado
    try {
      const parsedData = JSON.parse(mentoradoData);
      setMentoradoID(parsedData.id);
    } catch (err) {
      console.error('Erro ao processar o ID do mentorado:', err);
    }

    // Busca a lista de mentores
    const fetchMentores = async () => {
      try {
        const response = await fetch('http://localhost:8080/mentor/listar', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar mentores: ${response.statusText} (${response.status})`);
        }

        const responseBody = await response.json();
        if (Array.isArray(responseBody.body)) {
          setMentores(responseBody.body);
          setError(null);
        } else {
          throw new Error('Formato de resposta inválido');
        }
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar mentores.');
      } finally {
        setLoading(false);
      }
    };

    fetchMentores();
  }, []);

  // Atualiza os horários disponíveis ao selecionar um mentor
  const fetchAvailableHours = async (mentorId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/mentor/${mentorId}/horarios`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar horários: ${response.statusText} (${response.status})`);
      }

      const responseBody = await response.json();
      setAvailableHours(responseBody.body);
    } catch (err) {
      console.error('Erro ao buscar horários:', err);
    }
  };

  // Agendamento de mentoria
  const handleAgendarMentoria = async () => {
    if (!selectedDate || !selectedHour) {
      alert('Por favor, selecione a data e a hora.');
      return;
    }

    if (!mentoradoID || !selectedMentor) {
      alert('Mentor ou mentorado não selecionado.');
      return;
    }

    const dateTime = `${selectedDate}T${selectedHour}:00`;

    try {
      const response = await fetch('http://localhost:8080/mentoria/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          mentorId: selectedMentor,
          diaHora: dateTime,
          mentoradoId: mentoradoID,
        }),
      });

      if (response.ok) {
        alert('Mentoria agendada com sucesso!');
        setMentoriaAgendada(true);
      } else {
        const errorData = await response.json();
        console.error('Erro ao agendar mentoria:', errorData);
        alert(`Erro ao agendar mentoria: ${errorData.message || 'Erro desconhecido.'}`);
      }
    } catch (err) {
      console.error('Erro ao enviar solicitação:', err);
      alert('Erro inesperado ao agendar mentoria.');
    }
  };

  // Renderização condicional
  if (mentoriaAgendada) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div>Carregando mentores...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="mentor-container">
      <h2>Nossos Mentores</h2>
      <div className="mentor-cards">
        {mentores.map((mentor) => (
          <div
            key={mentor.id}
            className={`mentor-card ${selectedMentor === mentor.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedMentor(mentor.id);
              fetchAvailableHours(mentor.id);
            }}
          >
            <img src={logomentor} alt="Foto do Mentor" className="mentor-imagem" />
            <div className="mentor-info">
              <h3>{mentor.nome}</h3>
              <p>{mentor.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMentor && (
        <div className="date-select">
          <div className="date-select">
            <label htmlFor="date-select">Selecione uma data:</label>
            <input
              type="date"
              id="date-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="hour-select">
            <label htmlFor="hour-select">Selecione um horário:</label>
            <select
              id="hour-select"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
            >
              <option value="">Selecione</option>
              {availableHours.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <button className="agendar-button" onClick={handleAgendarMentoria}>
            Confirmar Agendamento
          </button>
        </div>
      )}
    </div>
  );
};

export default AgendaMentor;
