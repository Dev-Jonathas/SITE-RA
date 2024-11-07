import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoggedHeader.css";
import logo from "../../assets/imgs/logo_ra1.png";

const LoggedHeader: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
   // localStorage.removeItem("token"); // Exemplo de remoção do token
    navigate("/login"); // Redirecionar para a página de login
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Redireciona para a página de login se o usuário tentar acessar uma página protegida
  /*useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
*/
  return (
    <header className="header-container">
      <nav className="logo">
          <img src={logo} alt="RA" />
    

        <ul className="nav-links">
          <li>
            <Link to="/usermentor" className="link">
              Seja um Mentor
            </Link>
          </li>
        </ul>

        <div className="profile-menu">
          <div className="menu-icon" onClick={toggleDropdown}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/notificacao" className="dropdown-item">
                Notificações
              </Link>
              <button onClick={handleLogout} className="dropdown-button">
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LoggedHeader;
