import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [showConfig, setShowConfig] = useState(false); // Controla el submenú de Configuración
  const [showInicio, setShowInicio] = useState(false); // Controla el submenú de Inicio

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🚗 AutoPark</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {/* 🔹 Submenú Inicio */}
          <li className="submenu">
            <button
              onClick={() => setShowInicio(!showInicio)}
              className="submenu-btn"
            >
              🏠 Inicio {showInicio ? "▲" : "▼"}
            </button>
            {showInicio && (
              <ul className="submenu-list">
                <li>
                  <Link to="/ticketsAbiertos">🎟️ Tickets Abiertos</Link>
                </li>
                <li>
                  <Link to="/ticketsCerrados">🎟️ Tickets Cerrados</Link>
                </li>
                <li>
                  <Link to="/reportes"> Reportes</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/vehiculos">🚘 Vehículos</Link>
          </li>
          <li>
            <Link to="/espacios">🅿️ Espacios</Link>
          </li>
          <li>
            <Link to="/pagos">💳 Pagos</Link>
          </li>
          <li>
            <Link to="/entrada">🚪 Entrada</Link>
          </li>

          {/* 🔧 Sección de Configuración */}
          <li className="submenu">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="submenu-btn"
            >
              ⚙️ Configuración {showConfig ? "▲" : "▼"}
            </button>
            {showConfig && (
              <ul className="submenu-list">
                <li>
                  <Link to="/empresas">🏢 Empresas</Link>
                </li>
                <li>
                  <Link to="/clientes">👥 Clientes</Link>
                </li>
                <li>
                  <Link to="/tickets">🎟️ Tickets</Link>
                </li>
                <li>
                  <Link to="/sedes">📍 Sedes</Link>
                </li>
                <li>
                  <Link to="/tarifas">📍 Tarifas</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          🚪 Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
