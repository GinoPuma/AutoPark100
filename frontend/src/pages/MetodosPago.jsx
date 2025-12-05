import { useEffect, useState } from "react";
import {
  getMetodosPago,
  createMetodoPago,
  updateMetodoPago,
  deleteMetodoPago,
} from "../api/metodosPagoApi";

export default function MetodosPago() {
  const [metodos, setMetodos] = useState([]);
  const [form, setForm] = useState({ nombre: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarMetodos();
  }, []);

  const cargarMetodos = async () => {
    try {
      const data = await getMetodosPago();
      setMetodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar métodos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;

    try {
      if (editId) {
        await updateMetodoPago(editId, form);
        setEditId(null);
      } else {
        await createMetodoPago(form);
      }

      setForm({ nombre: "" });
      cargarMetodos();
    } catch (error) {
      console.error("Error al guardar método:", error);
    }
  };

  const handleEdit = (met) => {
    setForm({ nombre: met.nombre });
    setEditId(met.metodo_pago_id);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este método de pago?")) return;
    try {
      await deleteMetodoPago(id);
      cargarMetodos();
    } catch (error) {
      console.error("Error al eliminar método:", error);
    }
  };

  const filtered = metodos.filter((m) =>
    m.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gestión de Métodos de Pago</h1>
      <p>Administra los métodos de pago disponibles en el sistema.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Método de Pago" : "Registrar Método de Pago"}</h2>

        <input
          type="text"
          placeholder="Nombre del método (Ej: Efectivo)"
          value={form.nombre}
          onChange={(e) => setForm({ nombre: e.target.value })}
          required
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />

        <button type="submit">
          {editId ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <h2>Lista de Métodos de Pago</h2>

      <input
        type="search"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px", marginTop: "10px" }}
      />

      <table border="1" cellPadding="10" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length ? (
            filtered.map((m) => (
              <tr key={m.metodo_pago_id}>
                <td>{m.metodo_pago_id}</td>
                <td>{m.nombre}</td>
                <td>
                  <button onClick={() => handleEdit(m)} style={{ background: "#eab308" }}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(m.metodo_pago_id)}
                    style={{ background: "#dc2626", color: "white", marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No hay métodos registrados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
