import { useState, useEffect } from "react";
import axios from "axios";

export default function Espacios() {
  const [espacios, setEspacios] = useState([]);
  const [form, setForm] = useState({
    sede_id: "",
    codigo: "",
    estado: "disponible",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:3000/api/espacios";

  // --- Cargar espacios desde el backend ---
  useEffect(() => {
    cargarEspacios();
  }, []);

  const cargarEspacios = async () => {
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.espacios || [];
      setEspacios(data);
    } catch (error) {
      console.error("Error al cargar espacios:", error.response?.data || error);
    }
  };

  // --- Crear o actualizar un espacio ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.sede_id.trim() || !form.codigo.trim()) return;

    try {
      if (editId) {
        // Actualizar espacio existente
        await axios.put(`${API_URL}/${editId}`, form, { withCredentials: true });
      } else {
        // Crear nuevo espacio
        await axios.post(API_URL, form, { withCredentials: true });
      }

      setForm({ sede_id: "", codigo: "", estado: "disponible" });
      setEditId(null);
      cargarEspacios();
    } catch (error) {
      console.error("Error al guardar espacio:", error.response?.data || error);
    }
  };

  const handleEdit = (id) => {
    const espacio = espacios.find((esp) => esp.espacio_id === id);
    if (espacio) {
      setForm({
        sede_id: espacio.sede_id || "",
        codigo: espacio.codigo || "",
        estado: espacio.estado || "disponible",
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
      cargarEspacios();
    } catch (error) {
      console.error("Error al eliminar espacio:", error.response?.data || error);
    }
  };

  const filteredEspacios = espacios.filter(
    (esp) =>
      esp.codigo?.toLowerCase().includes(search.toLowerCase()) ||
      String(esp.sede_id).includes(search)
  );

  return (
    <div>
      <h1>Gestión de Espacios</h1>
      <p>Administra los espacios de estacionamiento por sede.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Espacio" : "Registrar Espacio"}</h2>

        <input
          type="text"
          placeholder="ID de la Sede"
          value={form.sede_id}
          onChange={(e) => setForm({ ...form, sede_id: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Código del Espacio"
          value={form.codigo}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
          required
        />

        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
        >
          <option value="disponible">Disponible</option>
          <option value="ocupado">Ocupado</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>

        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      <h2>Lista de Espacios</h2>
      <input
        type="search"
        placeholder="Buscar por sede o código..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sede</th>
            <th>Código</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEspacios.length > 0 ? (
            filteredEspacios.map((esp) => (
              <tr key={esp.espacio_id}>
                <td>{esp.espacio_id}</td>
                <td>{esp.sede_id}</td>
                <td>{esp.codigo}</td>
                <td>{esp.estado}</td>
                <td>
                  <button
                    onClick={() => handleEdit(esp.espacio_id)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(esp.espacio_id)}
                    style={{ background: "#dc2626", marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay espacios registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
