import React, { useState } from "react";
import "./PerfilUser.css";

const PerfilUser = () => {
  // Simulação de dados do perfil, você pode substituir com dados reais vindos de uma API ou estado global
  const [user] = useState({
    nome: "João da Silva", // Nome do usuário
    email: "joao.silva@example.com", // Email do usuário
  });


  return (
    <div className="p-container">
      <div className="card">
        <h1 className="h1Perfil">Meu Perfil</h1>
        <div className="perfil-info">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={user.nome}
              readOnly
              className="input-perfil"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              readOnly
              className="input-perfil"
            />
          </div>
        </div>
        <button type="button" className="btn-Voltar" onClick={() => window.history.back()}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PerfilUser;
