import React, { useState } from "react";
import "../TelaLogin/Login.css";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  };

    return (
      <div className="login-page ">
        <div className="cadastro-container">
          <h1 className="h1Cadastro"> Login </h1>
          <p>Novo nesse site?</p> 
          <Link className="reg" to="/Cadastro">Registra-se</Link>
          
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
            <Link className="E-senha" to="//">Esqueceu a senha?</Link>
            <br />


            <button type="submit" className="BLogin">Fazer Login</button>

          </form>
        </div>
      </div>
    );
};

export default Login;
