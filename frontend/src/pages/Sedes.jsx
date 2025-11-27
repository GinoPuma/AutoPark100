import { useEffect, useState } from "react";
import { getSedes, createSede, updateSede, deleteSede } from "../api/sedesApi";
import { getEmpresas } from "../api/empresasApi";

export default function Sedes() {
  const [sedes, setSedes] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({ empresa_id: "", nombre: "", direccion: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

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
      console.log("Empresas cargadas:", lista);
      setEmpresas(lista);
    } catch (error) {
      console.error("Error al obtener empresas:", error.response?.data || error);
    }
  };

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

  const handleEdit = (id) => {
    const sede = sedes.find((s) => s.sede_id === id);
    if (sede) {
      setForm({
        empresa_id: Number(sede.empresa_id),
        nombre: sede.nombre,
        direccion: sede.direccion,
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta sede?")) return;
    try {
      await deleteSede(id);
      fetchSedes();
    } catch (error) {
      console.error("Error al eliminar la sede:", error.response?.data || error);
    }
  };

  const filteredSedes = sedes.filter(
    (s) =>
      s.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      s.direccion?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gestión de Sedes</h1>
      <p>Administra las sedes registradas en tu estacionamiento.</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <h2>{editId ? "Editar Sede" : "Registrar Sede"}</h2>

        {/* ✅ Select Empresa */}
        <select
          value={form.empresa_id}
          onChange={(e) => setForm({ ...form, empresa_id: Number(e.target.value) })}
          required
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
            display: "inline-block",
          }}
        >
          <option value="">Selecciona una empresa</option>
          {empresas.map((emp) => (
            <option key={emp.empresa_id} value={emp.empresa_id}>
              {emp.razon_social}
            </option>
          ))}
        </select>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Nombre de la sede"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          style={{
            padding: "8px",
            width: "200px",
            marginRight: "10px",
            display: "inline-block",
          }}
        />

        <input
          type="text"
          placeholder="Dirección"
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          required
          style={{
            padding: "8px",
            width: "200px",
            marginRight: "10px",
            display: "inline-block",
          }}
        />

        <button type="submit" style={{ padding: "8px 12px" }}>
          {editId ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <h2>Lista de Sedes</h2>
      <input
        type="search"
        placeholder="Buscar por nombre o dirección"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />

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

                {/* ✅ Mostrar empresa por razon_social */}
                <td>
                  {s.Empresa?.razon_social ??
                    empresas.find((e) => Number(e.empresa_id) === Number(s.empresa_id))?.razon_social ??
                    "Sin empresa"}
                </td>

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
