import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>🚗 AutoPark 100</h2>
      <nav>
        <ul>
          <li><Link to="/">🏠 Inicio</Link></li>
          <li><Link to="/empresas">🏢 Empresas</Link></li>
          <li><Link to="/sedes">📍 Sedes</Link></li>
          <li><Link to="/clientes">👥 Clientes</Link></li>
          <li><Link to="/vehiculos">🚘 Vehículos</Link></li>
          <li><Link to="/espacios">🅿️ Espacios</Link></li>
          <li><Link to="/tickets">🎟️ Tickets</Link></li>
          <li><Link to="/entradas">🎟️ Entradas</Link></li>
          <li><Link to="/pagos">💳 Pagos</Link></li>
        </ul>
      </nav>
    </aside>
  );
}