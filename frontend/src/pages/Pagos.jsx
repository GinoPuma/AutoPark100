import { useState, useEffect } from "react";
import { getPagos, createPago, updatePago, deletePago } from "../api/pagosApi";
import { getMetodosPago } from "../api/metodosPagoApi";
import { getTickets } from "../api/ticketsApi";

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [form, setForm] = useState({
    ticket_id: "",
    monto: "",
    metodo_pago_id: "",
    referencia: "",
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarPagos();
    cargarMetodosPago();
    cargarTickets();
  }, []);

  const cargarPagos = async () => {
    try {
      const data = await getPagos();
      setPagos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar pagos:", error);
    }
  };

  const cargarMetodosPago = async () => {
    try {
      const data = await getMetodosPago();
      setMetodosPago(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando métodos de pago:", error);
    }
  };

  const cargarTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando tickets:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.ticket_id || !form.metodo_pago_id || !form.monto) return;

    const payload = {
      metodo_pago_id: Number(form.metodo_pago_id),
      ticket_id: Number(form.ticket_id),
      monto: Number(form.monto),
      referencia: form.referencia || null,
    };

    try {
      if (editId) {
        await updatePago(editId, payload);
        setEditId(null);
      } else {
        await createPago(payload);
      }

      setForm({ ticket_id: "", monto: "", metodo_pago_id: "", referencia: "" });
      cargarPagos();
    } catch (error) {
      console.error("Error al guardar pago:", error);
    }
  };

  const handleEdit = (p) => {
    setForm({
      ticket_id: p.ticket_id,
      monto: p.monto,
      metodo_pago_id: p.metodo_pago_id,
      referencia: p.referencia || "",
    });
    setEditId(p.pago_id);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este pago?")) return;
    try {
      await deletePago(id);
      cargarPagos();
    } catch (error) {
      console.error("Error al eliminar pago:", error);
    }
  };

  const filteredPagos = pagos.filter((p) => {
    const ticket = p.Ticket?.ticket_id?.toString().toLowerCase() || "";
    const metodo = p.MetodosPago?.nombre?.toLowerCase() || "";
    const term = search.toLowerCase();
    return ticket.includes(term) || metodo.includes(term);
  });

  return (
    <div>
      <h1>Gestión de Pagos</h1>
      <p>Administra los pagos realizados por tickets.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Pago" : "Registrar Pago"}</h2>

        {/* Ticket */}
        <select
          value={form.ticket_id}
          onChange={(e) => setForm({ ...form, ticket_id: e.target.value })}
          required
        >
          <option value="">Seleccione un Ticket</option>
          {tickets.map((t) => (
            <option key={t.ticket_id} value={t.ticket_id}>
              Ticket #{t.ticket_id} - S/ {t.monto_total}
            </option>
          ))}
        </select>

        {/* Monto */}
        <input
          type="number"
          placeholder="Monto (S/)"
          value={form.monto}
          onChange={(e) => setForm({ ...form, monto: e.target.value })}
          required
        />

        {/* Método de pago */}
        <select
          value={form.metodo_pago_id}
          onChange={(e) => setForm({ ...form, metodo_pago_id: e.target.value })}
          required
        >
          <option value="">Método de Pago</option>
          {metodosPago.map((m) => (
            <option key={m.metodo_pago_id} value={m.metodo_pago_id}>
              {m.nombre}
            </option>
          ))}
        </select>

        {/* Referencia */}
        <input
          type="text"
          placeholder="Referencia (opcional)"
          value={form.referencia}
          onChange={(e) => setForm({ ...form, referencia: e.target.value })}
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
            <th>Ticket</th>
            <th>Monto</th>
            <th>Método</th>
            <th>Referencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPagos.length > 0 ? (
            filteredPagos.map((p) => (
              <tr key={p.pago_id}>
                <td>{p.pago_id}</td>
                <td>{p.Ticket?.ticket_id}</td>
                <td>S/ {p.monto}</td>
                <td>{p.MetodosPago?.nombre}</td>
                <td>{p.referencia || "-"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(p)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.pago_id)}
                    style={{ background: "#dc2626", marginLeft: "0.5rem", color: "#fff" }}
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
