import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./mentorUser.css";

const MentorPage: React.FC = () => {
  const [candidato, setCandidato] = useState({
    nome: '',
    email: '',
    bio: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCandidato({ ...candidato, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/ies', { state: { message: 'Candidatura enviada com sucesso!' } });
  };

  return (
    <div className="m-background">
      <div className="m-container">
        <h1 className="m-header">Candidatura para Mentor</h1>
        <p className="m-description">Seja um mentor e ajude os estudantes a alcançarem seus objetivos profissionais.</p>
        <p className="m-description">Preencha o formulário abaixo para se candidatar.</p>

        <form className="m-form" onSubmit={handleSubmit}>
          <input
            className="m-input"
            type="text"
            name="nome"
            value={candidato.nome}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <input
            className="m-input"
            type="email"
            name="email"
            value={candidato.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <textarea
            className="m-textarea"
            name="bio"
            value={candidato.bio}
            onChange={handleChange}
            placeholder="Biografia"
            required
          />
          <button type="submit" className="mentor-submit-button">Enviar Candidatura</button>
        </form>
      </div>
    </div>
  );
};

export default MentorPage;
