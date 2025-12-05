import { useState, useEffect } from "react";
import axios from "axios";

export default function Tarifas() {
  const [tipoVehiculo, setTipoVehiculo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formModal, setFormModal] = useState({
    placa: "",
    descripcion: "",
  });
  const [tickets, setTickets] = useState([]);

  const tipos = [
    { key: 1, label: "Carro" },
    { key: 2, label: "Moto" },
    { key: 3, label: "Camioneta" },
  ];

  const API_TICKETS = "http://localhost:3000/api/tickets";

  // --- Cargar datos al montar ---
  useEffect(() => {
    cargarTickets();
  }, []);

  // --- Cargar Tickets ---
  const cargarTickets = async () => {
    try {
      const res = await axios.get(API_TICKETS, { withCredentials: true });
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.tickets || [];
      setTickets(data);
    } catch (error) {
      console.error("Error al cargar tickets:", error.response?.data || error);
    }
  };

  const handleSelectTipo = (tipo) => {
    setTipoVehiculo(tipo);
    setFormModal({ placa: "", descripcion: "" });
    setShowModal(true);
  };

  // --- Crear nuevo Ticket ---
  const handleSaveModal = async () => {
    if (!formModal.placa || !formModal.descripcion) {
      alert("Completa todos los campos antes de continuar.");
      return;
    }

    try {
      await axios.post(
        API_TICKETS,
        {
          espacio_id: 1, // valor fijo o dinámico según tu lógica
          vehiculo_id: 1,
          tarifa_id: 1, // valor temporal, ya que eliminamos el select
          fecha_entrada: new Date(),
          estado: "activo",
          monto_total: 0,
        },
        { withCredentials: true }
      );

      setShowModal(false);
      setTipoVehiculo(null);
      cargarTickets();
    } catch (error) {
      console.error("Error al guardar ticket:", error.response?.data || error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Ingreso por Hora</h1>

      <h2>Tickets Registrados</h2>
      {tickets.length === 0 ? (
        <p>No hay tickets registrados</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ marginBottom: "2rem", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Tarifa</th>
              <th>Estado</th>
              <th>Fecha Entrada</th>
              <th>Monto Total</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.ticket_id}>
                <td>{t.ticket_id}</td>
                <td>{t.tarifa_id}</td>
                <td>{t.estado}</td>
                <td>{new Date(t.fecha_entrada).toLocaleString()}</td>
                <td>S/ {t.monto_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        {tipos.map((t) => (
          <button
            key={t.key}
            onClick={() => handleSelectTipo(t.key)}
            style={{ padding: "1rem 2rem", cursor: "pointer" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#352c2cff",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Ingreso por Hora
            </h2>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {tipos.find((t) => t.key === tipoVehiculo)?.label}
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  textAlign: "center",
                  marginBottom: "0.5rem",
                }}
              >
                Matrícula
              </label>
              <input
                type="text"
                placeholder="Matrícula"
                value={formModal.placa}
                onChange={(e) =>
                  setFormModal({ ...formModal, placa: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  textAlign: "center",
                  marginBottom: "0.5rem",
                }}
              >
                Descripción
              </label>
              <input
                type="text"
                placeholder="Descripción"
                value={formModal.descripcion}
                onChange={(e) =>
                  setFormModal({ ...formModal, descripcion: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button onClick={handleSaveModal}>Ingresar por Hora</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
