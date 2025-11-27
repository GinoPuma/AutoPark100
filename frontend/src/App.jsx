import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Empresas from "./pages/Empresas";
import Entrada from "./pages/Entrada";
import Espacios from "./pages/Espacios";
import Pagos from "./pages/Pagos";
import Sedes from "./pages/Sedes";
import Tickets from "./pages/Tickets";
import Vehiculos from "./pages/Vehiculos";
import TicketsAbiertos from "./pages/TicketsAbiertos";
import TicketsCerrados from "./pages/TicketsCerrados";
import Reportes from "./pages/Reportes";
import Tarifas from "./pages/Tarifas";
import MetodosPago from "./pages/MetodosPago";
import VehiculoTipos from "./pages/VehiculoTipos"; // ✅ Importar

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <ProtectedRoute>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/entrada" element={<Entrada />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/sedes" element={<Sedes />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/ticketsAbiertos" element={<TicketsAbiertos />} />
            <Route path="/ticketsCerrados" element={<TicketsCerrados />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/tarifas" element={<Tarifas />} />
            <Route path="/metodopagos" element={<MetodosPago />} />
            <Route path="/vehiculo-tipos" element={<VehiculoTipos />} /> {/* ✅ Nueva ruta */}
          </Routes>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
