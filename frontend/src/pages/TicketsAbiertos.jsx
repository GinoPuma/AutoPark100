import { useState, useEffect } from "react";
import { getTickets, updateTicket } from "../api/ticketsApi";

export default function TicketsAbiertos() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    cargarTicketsAbiertos();
  }, []);

  const cargarTicketsAbiertos = async () => {
    try {
      const data = await getTickets();
      const abiertos = data.filter((t) => t.estado === "activo");
      setTickets(abiertos);
    } catch (error) {
      console.error("Error al cargar tickets abiertos:", error);
    }
  };

  const handleCerrarTicket = async (ticket) => {
    try {
      await updateTicket(ticket.id, {
        ...ticket,
        estado: "cerrado",
        fechaSalida: new Date().toISOString().slice(0, 16),
      });
      cargarTicketsAbiertos();
    } catch (error) {
      console.error("Error al cerrar ticket:", error);
    }
  };

  return (
    <div>
      <h1>🎟️ Tickets Abiertos</h1>
      {tickets.length === 0 ? (
        <p>No hay tickets abiertos actualmente.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Espacio</th>
              <th>Vehículo</th>
              <th>Tarifa</th>
              <th>Entrada</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.espacio}</td>
                <td>{t.vehiculo}</td>
                <td>{t.tarifa}</td>
                <td>{new Date(t.fechaEntrada).toLocaleString()}</td>
                <td>{t.estado}</td>
                <td>
                  <button
                    style={{ background: "#10b981" }}
                    onClick={() => handleCerrarTicket(t)}
                  >
                    Cerrar Ticket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
