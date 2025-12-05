import { useState, useEffect } from "react";
import { getTickets } from "../api/ticketsApi";

export default function TicketsCerrados() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    cargarTicketsCerrados();
  }, []);

  const cargarTicketsCerrados = async () => {
    try {
      const data = await getTickets();
      const cerrados = data.filter((t) => t.estado === "cerrado");
      setTickets(cerrados);
    } catch (error) {
      console.error(" Error al cargar tickets cerrados:", error);
    }
  };

  return (
    <div>
      <h1>🎟️ Tickets Cerrados</h1>
      {tickets.length === 0 ? (
        <p>No hay tickets cerrados actualmente.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Espacio</th>
              <th>Vehículo</th>
              <th>Tarifa</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Monto</th>
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
                <td>{t.fechaSalida ? new Date(t.fechaSalida).toLocaleString() : "-"}</td>
                <td>S/ {t.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
