import { useState, useEffect } from "react";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../api/clientesApi";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    empresa_id: 1,
    doc_tipo: "DNI",
    doc_num: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error(" Error al cargar clientes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doc_num.trim() || !form.nombre.trim()) return;

    try {
      if (editId) {
        await updateCliente(editId, form);
      } else {
        await createCliente(form);
      }
      setForm({
        empresa_id: 1,
        doc_tipo: "DNI",
        doc_num: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
      });
      setEditId(null);
      cargarClientes();
    } catch (error) {
      alert(" Error al guardar el cliente");
    }
  };

  const handleEdit = (id) => {
    const cliente = clientes.find((c) => c.cliente_id === id);
    if (!cliente) return;
    setForm({ ...cliente });
    setEditId(id);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este cliente?")) {
      try {
        await deleteCliente(id);
        cargarClientes();
      } catch (error) {
        alert(" Error al eliminar el cliente");
      }
    }
  };

  const filteredClientes = clientes.filter(
    (c) =>
      (c.doc_num || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.nombre || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.apellido || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Gestión de Clientes</h1>
      <p>Administra los clientes de tu estacionamiento.</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <h2>{editId ? "Editar Cliente" : "Registrar Cliente"}</h2>

        <select
          value={form.doc_tipo}
          onChange={(e) => setForm({ ...form, doc_tipo: e.target.value })}
        >
          <option value="DNI">DNI</option>
          <option value="RUC">RUC</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>

        <input
          type="text"
          placeholder="Número de documento"
          value={form.doc_num || ""}
          onChange={(e) => setForm({ ...form, doc_num: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre || ""}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          value={form.apellido || ""}
          onChange={(e) => setForm({ ...form, apellido: e.target.value })}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={form.telefono || ""}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />

        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      <h2>Lista de Clientes</h2>
      <input
        type="search"
        placeholder="Buscar por nombre, apellido o documento"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />

      <table
        border="1"
        cellPadding="8"
        style={{ marginTop: "1rem", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Doc. Tipo</th>
            <th>Doc. Num</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.length > 0 ? (
            filteredClientes.map((c) => (
              <tr key={c.cliente_id}>
                <td>{c.cliente_id}</td>
                <td>{c.doc_tipo}</td>
                <td>{c.doc_num}</td>
                <td>{c.nombre}</td>
                <td>{c.apellido}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
                <td>
                  <button
                    onClick={() => handleEdit(c.cliente_id)}
                    style={{ background: "#f59e0b", color: "#fff" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.cliente_id)}
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No hay clientes registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
