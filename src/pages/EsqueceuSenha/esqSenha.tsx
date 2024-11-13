import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './esqueceuSenha.css';

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      console.error('As senhas não coincidem.');
      return;
    }

    // Example API call to update password (replace with actual API)
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      // Check if the response is successful
      if (response.ok) {
        alert('Senha alterada com sucesso!');
        setNewPassword('');  // Limpar o campo de nova senha
        setConfirmPassword('');  // Limpar o campo de confirmação
        navigate('/login'); // Redirecionar para a página de login
      } else {
        // Em caso de falha na alteração da senha, você pode tratar o erro aqui
        console.error('Falha ao alterar a senha. Tente novamente.');
        alert('Erro ao alterar a senha. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro de conexão. Tente novamente mais tarde.', error);
      alert('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <div className='e-background'>
      <div className="e-container">
        <h2>Alterar Senha</h2>
        <form onSubmit={handleChangePassword}>
          <div>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Alterar Senha</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
