import { useState } from "react";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    espacio: "",
    vehiculo: "",
    tarifa: "",
    fechaEntrada: new Date().toISOString().slice(0, 16),
    fechaSalida: "",
    estado: "activo",
    monto: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.espacio.trim() || !form.vehiculo.trim()) return;

    if (editId) {
      setTickets(
        tickets.map((t) =>
          t.id === editId ? { ...t, ...form } : t
        )
      );
      setEditId(null);
    } else {
      setTickets([
        ...tickets,
        { id: Date.now(), ...form },
      ]);
    }

    setForm({
      espacio: "",
      vehiculo: "",
      tarifa: "",
      fechaEntrada: new Date().toISOString().slice(0, 16),
      fechaSalida: "",
      estado: "activo",
      monto: "",
    });
  };

  const handleEdit = (id) => {
    const ticket = tickets.find((t) => t.id === id);
    setForm(ticket);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTickets(tickets.filter((t) => t.id !== id));
  };

  const handleClose = (id) => {
    setTickets(
      tickets.map((t) =>
        t.id === id
          ? {
              ...t,
              estado: "cerrado",
              fechaSalida: new Date().toISOString().slice(0, 16),
            }
          : t
      )
    );
  };

  const filteredTickets = tickets.filter(
    (t) =>
      t.vehiculo.toLowerCase().includes(search.toLowerCase()) ||
      t.estado.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gestión de Tickets</h1>
      <p>Controla los tickets de ingreso y salida del estacionamiento.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Ticket" : "Nuevo Ticket"}</h2>

        <input
          type="text"
          placeholder="ID Espacio"
          value={form.espacio}
          onChange={(e) => setForm({ ...form, espacio: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Vehículo / Placa"
          value={form.vehiculo}
          onChange={(e) => setForm({ ...form, vehiculo: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Tarifa"
          value={form.tarifa}
          onChange={(e) => setForm({ ...form, tarifa: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.fechaEntrada}
          onChange={(e) => setForm({ ...form, fechaEntrada: e.target.value })}
          required
        />

        <input
          type="datetime-local"
          value={form.fechaSalida}
          onChange={(e) => setForm({ ...form, fechaSalida: e.target.value })}
        />

        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
        >
          <option value="activo">Activo</option>
          <option value="cerrado">Cerrado</option>
        </select>

        <input
          type="number"
          placeholder="Monto total (S/)"
          value={form.monto}
          onChange={(e) => setForm({ ...form, monto: e.target.value })}
        />

        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      <h2>Lista de Tickets</h2>
      <input
        type="search"
        placeholder="Buscar por vehículo o estado..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Espacio</th>
            <th>Vehículo</th>
            <th>Tarifa</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.espacio}</td>
                <td>{t.vehiculo}</td>
                <td>{t.tarifa}</td>
                <td>{new Date(t.fechaEntrada).toLocaleString()}</td>
                <td>
                  {t.fechaSalida
                    ? new Date(t.fechaSalida).toLocaleString()
                    : "-"}
                </td>
                <td>{t.estado}</td>
                <td>S/ {t.monto}</td>
                <td>
                  {t.estado === "activo" && (
                    <button
                      onClick={() => handleClose(t.id)}
                      style={{ background: "#10b981", marginRight: "0.5rem" }}
                    >
                      Cerrar
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(t.id)}
                    style={{ background: "#f59e0b", marginRight: "0.5rem" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    style={{ background: "#dc2626" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay tickets registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
