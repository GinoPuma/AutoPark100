import { useState } from "react";

export default function Entradas() {
  const [entradas, setEntradas] = useState([]);
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
      setEntradas(
        entradas.map((en) =>
          en.id === editId ? { ...en, ...form } : en
        )
      );
      setEditId(null);
    } else {
      setEntradas([
        ...entradas,
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
    const entrada = entradas.find((en) => en.id === id);
    setForm(entrada);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setEntradas(entradas.filter((en) => en.id !== id));
  };

  const filteredEntradas = entradas.filter(
    (en) =>
      en.vehiculo.toLowerCase().includes(search.toLowerCase()) ||
      en.estado.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gestión de Entradas</h1>
      <p>Registra y controla los tickets de ingreso al estacionamiento.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Entrada" : "Registrar Entrada"}</h2>

        <input
          type="text"
          placeholder="ID Espacio"
          value={form.espacio}
          onChange={(e) => setForm({ ...form, espacio: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="ID Vehículo / Placa"
          value={form.vehiculo}
          onChange={(e) => setForm({ ...form, vehiculo: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="ID Tarifa"
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
          <option value="finalizado">Finalizado</option>
        </select>

        <input
          type="number"
          placeholder="Monto total (S/)"
          value={form.monto}
          onChange={(e) => setForm({ ...form, monto: e.target.value })}
        />

        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      <h2>Lista de Entradas</h2>
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
            <th>Fecha Entrada</th>
            <th>Fecha Salida</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntradas.length > 0 ? (
            filteredEntradas.map((en) => (
              <tr key={en.id}>
                <td>{en.id}</td>
                <td>{en.espacio}</td>
                <td>{en.vehiculo}</td>
                <td>{en.tarifa}</td>
                <td>{new Date(en.fechaEntrada).toLocaleString()}</td>
                <td>{en.fechaSalida ? new Date(en.fechaSalida).toLocaleString() : "-"}</td>
                <td>{en.estado}</td>
                <td>S/ {en.monto}</td>
                <td>
                  <button
                    onClick={() => handleEdit(en.id)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(en.id)}
                    style={{ background: "#dc2626", marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay entradas registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
