import { useState, useEffect } from "react";
import {
  getVehiculotipos,
  createVehiculotipo,
  updateVehiculotipo,
  deleteVehiculotipo,
} from "../api/vehiculotiposApi";

export default function VehiculoTipos() {
  const [vehiculoTipos, setVehiculoTipos] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    try {
      const data = await getVehiculotipos();
      setVehiculoTipos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar tipos de vehículo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;

    try {
      if (editId) {
        await updateVehiculotipo(editId, form);
        setEditId(null);
      } else {
        await createVehiculotipo(form);
      }

      setForm({ nombre: "", descripcion: "" });
      cargarTipos();
    } catch (error) {
      console.error("Error al guardar tipo de vehículo:", error);
    }
  };

  const handleEdit = (tipo) => {
    setForm({ nombre: tipo.nombre, descripcion: tipo.descripcion || "" });
    setEditId(tipo.vehiculo_tipo_id);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este tipo de vehículo?")) return;
    try {
      await deleteVehiculotipo(id);
      cargarTipos();
    } catch (error) {
      console.error("Error al eliminar tipo:", error);
    }
  };

  const filtered = vehiculoTipos.filter((v) =>
    v.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gestión de Tipos de Vehículos</h1>
      <p>Administra los tipos de vehículos registrados.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Tipo" : "Registrar Tipo"}</h2>

        <input
          type="text"
          placeholder="Nombre del tipo (Ej: Carro)"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      <h2>Lista de Tipos de Vehículos</h2>

      <input
        type="search"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px" }}
      />

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((v) => (
              <tr key={v.vehiculo_tipo_id}>
                <td>{v.vehiculo_tipo_id}</td>
                <td>{v.nombre}</td>
                <td>{v.descripcion || "-"}</td>
                <td>
                  <button onClick={() => handleEdit(v)} style={{ background: "#eab308" }}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(v.vehiculo_tipo_id)}
                    style={{
                      background: "#dc2626",
                      color: "white",
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
              <td colSpan="4">No hay tipos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
