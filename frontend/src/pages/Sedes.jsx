import { useState } from "react";

export default function Sedes() {
  const [sedes, setSedes] = useState([]);
  const [form, setForm] = useState({ nombre: "", direccion: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.direccion.trim()) return;

    if (editId) {
      setSedes(
        sedes.map((s) =>
          s.id === editId ? { ...s, ...form } : s
        )
      );
      setEditId(null);
    } else {
      setSedes([
        ...sedes,
        { id: Date.now(), nombre: form.nombre, direccion: form.direccion },
      ]);
    }
    setForm({ nombre: "", direccion: "" });
  };

  const handleEdit = (id) => {
    const sede = sedes.find((s) => s.id === id);
    setForm({ nombre: sede.nombre, direccion: sede.direccion });
    setEditId(id);
  };

  const handleDelete = (id) => {
    setSedes(sedes.filter((s) => s.id !== id));
  };

  const filteredSedes = sedes.filter(
    (s) =>
      s.nombre.toLowerCase().includes(search.toLowerCase()) ||
      s.direccion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gestión de Sedes</h1>
      <p>Administra las sedes registradas en tu estacionamiento.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Sede" : "Registrar Sede"}</h2>
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

      <h2>Lista de Sedes</h2>
      <input
        type="search"
        placeholder="Buscar por nombre o dirección"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSedes.length > 0 ? (
            filteredSedes.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.nombre}</td>
                <td>{s.direccion}</td>
                <td>
                  <button
                    onClick={() => handleEdit(s.id)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    style={{ background: "#dc2626", marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay sedes registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
