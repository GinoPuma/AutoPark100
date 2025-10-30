import { useState, useEffect } from "react";
import { getPagos, createPago, updatePago, deletePago } from "../api/pagosApi";

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [form, setForm] = useState({
    ticket: "",
    monto: "",
    metodo: "Efectivo",
    fecha: new Date().toISOString().slice(0, 16),
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarPagos();
  }, []);

  const cargarPagos = async () => {
    try {
      const data = await getPagos();
      setPagos(data);
    } catch (error) {
      console.error("Error al cargar pagos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.ticket.trim() || !form.monto.trim()) return;

    try {
      if (editId) {
        await updatePago(editId, form);
        setEditId(null);
      } else {
        await createPago(form);
      }
      setForm({ ticket: "", monto: "", metodo: "Efectivo", fecha: new Date().toISOString().slice(0, 16) });
      cargarPagos();
    } catch (error) {
      console.error("Error al guardar pago:", error);
    }
  };

  const handleEdit = (pago) => {
    setForm(pago);
    setEditId(pago.id);
  };

  const handleDelete = async (id) => {
    try {
      await deletePago(id);
      cargarPagos();
    } catch (error) {
      console.error("Error al eliminar pago:", error);
    }
  };

  const filteredPagos = pagos.filter(
    (p) =>
      p.ticket.toLowerCase().includes(search.toLowerCase()) ||
      p.metodo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gestión de Pagos</h1>
      <p>Administra los pagos realizados por tickets.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Pago" : "Registrar Pago"}</h2>

        <input
          type="text"
          placeholder="ID Ticket"
          value={form.ticket}
          onChange={(e) => setForm({ ...form, ticket: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Monto (S/)"
          value={form.monto}
          onChange={(e) => setForm({ ...form, monto: e.target.value })}
          required
        />

        <select
          value={form.metodo}
          onChange={(e) => setForm({ ...form, metodo: e.target.value })}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Yape">Yape</option>
          <option value="Plin">Plin</option>
        </select>

        <input
          type="datetime-local"
          value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })}
          required
        />

        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      <h2>Lista de Pagos</h2>
      <input
        type="search"
        placeholder="Buscar por ticket o método..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Ticket</th>
            <th>Monto</th>
            <th>Método</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPagos.length > 0 ? (
            filteredPagos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.ticket}</td>
                <td>S/ {p.monto}</td>
                <td>{p.metodo}</td>
                <td>{new Date(p.fecha).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(p)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{ background: "#dc2626", marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay pagos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
