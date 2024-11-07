import React, { useState } from "react";
import "../TelaLogin/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");  // Para exibir erros
  const navigate = useNavigate(); // Para redirecionar após login

  // Função de login para conectar ao backend
  const handleLogin = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Credenciais inválidas");
        return;
      }

      const data = await response.json();
      // Aqui você pode salvar o token, se necessário, em localStorage ou context
      console.log("Usuário logado com sucesso:", data);
      // Redireciona para outra página após o login, por exemplo, Dashboard
      navigate("/user");
    } catch (error) {
      console.error("Erro na autenticação:", error);
      setError("Erro no servidor. Tente novamente.");
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

        <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
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
          <Link className="E-senha" to="#">
            Esqueceu a senha?
          </Link>
          <br />

          {error && <p className="error-message">{error}</p>} {/* Exibe mensagem de erro */}

          <button type="submit" className="BLogin">
            Fazer Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
