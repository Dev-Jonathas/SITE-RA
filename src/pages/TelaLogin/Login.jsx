import React, { useState } from "react";
import "../TelaLogin/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

 // Função de login para conectar ao backend
 const login = async (email, senha) => {
  try {
    const response = await fetch("https://locallhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      return { success: false, message: "Credenciais inválidas" };
    }

    const data = await response.json();
    const { token, type } = data;

    // Armazenando o token e o tipo de usuário
    localStorage.setItem("token", token);
    localStorage.setItem("userType", type);

    return { success: true, type };
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return { success: false, message: "Erro no servidor" };
  }
};

// Função para tratar o envio do formulário de login
const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const { success, type } = await login(email, senha);

  // Redirecionamento condicional
  if (success) {
    if (type === "common") {
      navigate("/user");
    } else if (type === "ies") {
      navigate("/IES");
    }
  } else {
    alert("Falha no login. Verifique suas credenciais.");
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
          <Link className="E-senha" to="//">
            Esqueceu a senha?
          </Link>
          <br />

          <button type="submit" className="BLogin">
            Fazer Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
