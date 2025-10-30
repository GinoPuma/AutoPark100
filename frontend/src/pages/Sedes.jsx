import { useEffect, useState } from "react";
import { getSedes, createSede, updateSede, deleteSede } from "../api/sedesApi";
import { getEmpresas } from "../api/empresasApi";

export default function Sedes() {
  const [sedes, setSedes] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({ empresa_id: "", nombre: "", direccion: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // --- Cargar datos ---
  useEffect(() => {
    fetchSedes();
    fetchEmpresas();
  }, []);

  const fetchSedes = async () => {
    try {
      const data = await getSedes();
      const lista = Array.isArray(data) ? data : data.sedes || [];
      setSedes(lista);
    } catch (error) {
      console.error("Error al obtener sedes:", error.response?.data || error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const data = await getEmpresas();
      const lista = Array.isArray(data) ? data : data.empresas || [];
      setEmpresas(lista);
    } catch (error) {
      console.error("Error al obtener empresas:", error.response?.data || error);
    }
  };

  // --- Crear o editar sede ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.empresa_id || !form.nombre.trim() || !form.direccion.trim()) {
      alert("Completa todos los campos, incluyendo la empresa.");
      return;
    }

    try {
      if (editId) {
        await updateSede(editId, form);
      } else {
        await createSede(form);
      }
      setForm({ empresa_id: "", nombre: "", direccion: "" });
      setEditId(null);
      fetchSedes();
    } catch (error) {
      console.error("Error al guardar la sede:", error.response?.data || error);
    }
  };

  // --- Editar sede ---
  const handleEdit = (id) => {
    const sede = sedes.find((s) => s.sede_id === id);
    if (sede) {
      setForm({
        empresa_id: sede.empresa_id,
        nombre: sede.nombre,
        direccion: sede.direccion,
      });
      setEditId(id);
    }
  };

  // --- Eliminar sede ---
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta sede?")) return;
    try {
      await deleteSede(id);
      fetchSedes();
    } catch (error) {
      console.error("Error al eliminar la sede:", error.response?.data || error);
    }
  };

  // --- Filtrar sedes ---
  const filteredSedes = sedes.filter(
    (s) =>
      s.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      s.direccion?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gestión de Sedes</h1>
      <p>Administra las sedes registradas en tu estacionamiento.</p>

      {/* --- Formulario --- */}
      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Sede" : "Registrar Sede"}</h2>

        {/* Selección de empresa */}
        <select
          value={form.empresa_id}
          onChange={(e) => setForm({ ...form, empresa_id: e.target.value })}
          required
        >
          <option value="">Selecciona una empresa</option>
          {empresas.map((emp) => (
            <option key={emp.empresa_id} value={emp.empresa_id}>
              {emp.nombre}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Nombre de la sede"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Dirección"
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          required
        />

        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      {/* --- Búsqueda --- */}
      <h2>Lista de Sedes</h2>
      <input
        type="search"
        placeholder="Buscar por nombre o dirección"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* --- Tabla --- */}
      <table border="1" cellPadding="10" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSedes.length > 0 ? (
            filteredSedes.map((s) => (
              <tr key={s.sede_id}>
                <td>{s.sede_id}</td>
                <td>{s.Empresa?.nombre || empresas.find((e) => e.empresa_id === s.empresa_id)?.nombre || "Sin empresa"}</td>
                <td>{s.nombre}</td>
                <td>{s.direccion}</td>
                <td>
                  <button onClick={() => handleEdit(s.sede_id)}>Editar</button>
                  <button
                    onClick={() => handleDelete(s.sede_id)}
                    style={{ marginLeft: "0.5rem", background: "#dc2626", color: "#fff" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay sedes registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
