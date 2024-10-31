import React, { useState } from "react";
import "../TelaLogin/Login.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [tipoUsuario, setTipoUsuario] = useState("comum"); // "comum" ou "ies"
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nomeIes, setNomeIes] = useState("");

  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove caracteres especiais

    if (cnpj === "") return false;
    if (cnpj.length !== 14) return false;

    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
  
    const userData = {
      tipoUsuario,
      nome,
      dataNascimento,
      email,
      senha,
      cnpj,
      nomeIes,
    };
  
    try {
      const response = await fetch('https://localhost:8080/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        // Redirecionar ou realizar outras ações após o cadastro
      } else {
        throw new Error("Erro ao cadastrar!");
      }
    } catch (error) {
    }
  };

  return (
    <div className="login-page">
      <div className="cadastro-container">
        <h1 className="h1Cadastro">Registra-se</h1>
        <p>Já é membro?</p>
        <Link className="reg" to="/login">
          Login
        </Link>

        <form onSubmit={handleRegister} style={{ marginTop: "20px" }}>
          {/* Seleção do tipo de usuário */}
          <label>
            Tipo de Cadastro:
            <select
              className="select"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
            >
              <option value="comum">Usuário Comum</option>
              <option value="ies">IES</option>
            </select>
          </label>

          {/* Campos para Usuário Comum */}
          {tipoUsuario === "comum" && (
            <>
              <label>
                Nome:
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </label>

              <label>
                Data de Nascimento:
                <input
                  type="date"
                  placeholder="Data de nascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
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

              <label>
                Confirmar Senha:
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </label>
            </>
          )}

          {/* Campos para IES */}
          {tipoUsuario === "ies" && (
            <>
              <label>
                Nome da IES:
                <input
                  type="text"
                  placeholder="Nome da IES"
                  value={nomeIes}
                  onChange={(e) => setNomeIes(e.target.value)}
                />
              </label>

              <label>
                CNPJ:
                <input
                  type="text"
                  placeholder="CNPJ"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  onBlur={() => {
                    if (!validarCNPJ(cnpj)) {
                      alert("CNPJ inválido");
                      setCnpj("");
                    }
                  }}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  placeholder="Email da IES"
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

              <label>
                Confirmar Senha:
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </label>
            </>
          )}

          <button type="submit" className="BLogin">
            Registra-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
