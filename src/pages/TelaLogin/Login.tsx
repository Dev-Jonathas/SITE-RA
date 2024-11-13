import React, { useState } from "react";
import "../TelaLogin/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // For redirecting after login

  // Função de login para conectar ao backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email, 
          senha: senha,
        }),
      });

      if (!response.ok) {
        // Handle unsuccessful login
        alert("Credenciais inválidas");
        return;
      }

      // Assuming the response contains user info or a token
      const data = await response.json();
      localStorage.setItem('token', data.token);

        // Redireciona para o Dashboard após o login
        navigate('/home'); // Substitua pela rota correta após o login
      } catch (error) {
          console.error('Erro ao tentar fazer login!', error);
    }
  };

  return (
    <div className="login-page">
      <div className="cadastro-container">
        <h1 className="h1Cadastro">Login</h1>
        <p>Novo nesse site?</p>
        <Link className="reg" to="/Cadastro">
          Registra-se
        </Link>

        <form style={{ marginTop: "20px" }}>
          <label>
            Email:
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <Link className="E-senha" to="/recuperar-senha">
            Esqueceu a senha?
          </Link>
          <br />

          <button onClick={handleLogin} className="BLogin">
            Fazer Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
