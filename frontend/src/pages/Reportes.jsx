import { useState, useEffect } from "react";
import { getTickets } from "../api/ticketsApi";

export default function Reportes() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    cargarTickets();
  }, []);

  const cargarTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error("Error al cargar tickets:", error);
    }
  };

  const totalTickets = tickets.length;
  const ticketsAbiertos = tickets.filter((t) => t.estado === "activo").length;
  const ticketsCerrados = tickets.filter((t) => t.estado === "cerrado").length;
  const montoTotal = tickets
    .filter((t) => t.monto)
    .reduce((acc, t) => acc + parseFloat(t.monto), 0)
    .toFixed(2);

  return (
    <div>
      <h1>Reportes de Tickets</h1>

      <div className="reportes-metrics">
        <div className="metric">
          <h2>{totalTickets}</h2>
          <p>Total de Tickets</p>
        </div>
        <div className="metric">
          <h2>{ticketsAbiertos}</h2>
          <p>Tickets Abiertos</p>
        </div>
        <div className="metric">
          <h2>{ticketsCerrados}</h2>
          <p>Tickets Cerrados</p>
        </div>
        <div className="metric">
          <h2>S/ {montoTotal}</h2>
          <p>Monto Total Recaudado</p>
        </div>
      </div>

      <h2>Últimos Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehículo</th>
            <th>Espacio</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Estado</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {tickets
            .sort((a, b) => b.id - a.id)
            .slice(0, 10)
            .map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.vehiculo}</td>
                <td>{t.espacio}</td>
                <td>{new Date(t.fechaEntrada).toLocaleString()}</td>
                <td>
                  {t.fechaSalida
                    ? new Date(t.fechaSalida).toLocaleString()
                    : "-"}
                </td>
                <td>{t.estado}</td>
                <td>S/ {t.monto || "-"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
