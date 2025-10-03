import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Empresas from "./pages/Empresas";
import Sedes from "./pages/Sedes";
import Clientes from "./pages/Clientes";
import Vehiculos from "./pages/Vehiculos";
import Espacios from "./pages/Espacios";
import Tickets from "./pages/Tickets";
import Pagos from "./pages/Pagos";
import Entrada from "./pages/Entrada";

import "./assets/styles.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/sedes" element={<Sedes />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/entradas" element={<Entrada />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
