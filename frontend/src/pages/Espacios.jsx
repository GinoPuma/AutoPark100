import { useState } from "react";

export default function Espacios() {
  const [espacios, setEspacios] = useState([]);
  const [form, setForm] = useState({
    sede: "",
    codigo: "",
    disponible: true,
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.sede.trim() || !form.codigo.trim()) return;

    if (editId) {
      setEspacios(
        espacios.map((esp) =>
          esp.id === editId ? { ...esp, ...form } : esp
        )
      );
      setEditId(null);
    } else {
      setEspacios([
        ...espacios,
        { id: Date.now(), ...form },
      ]);
    }
    setForm({ sede: "", codigo: "", disponible: true });
  };

  const handleEdit = (id) => {
    const espacio = espacios.find((esp) => esp.id === id);
    setForm(espacio);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setEspacios(espacios.filter((esp) => esp.id !== id));
  };

  const filteredEspacios = espacios.filter(
    (esp) =>
      esp.codigo.toLowerCase().includes(search.toLowerCase()) ||
      esp.sede.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gestión de Espacios</h1>
      <p>Administra los espacios de estacionamiento por sede.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Espacio" : "Registrar Espacio"}</h2>

        <input
          type="text"
          placeholder="Sede"
          value={form.sede}
          onChange={(e) => setForm({ ...form, sede: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Código del Espacio"
          value={form.codigo}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
          required
        />

        <label>
          <input
            type="checkbox"
            checked={form.disponible}
            onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
          />
          Disponible
        </label>

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
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEspacios.length > 0 ? (
            filteredEspacios.map((esp) => (
              <tr key={esp.id}>
                <td>{esp.id}</td>
                <td>{esp.sede}</td>
                <td>{esp.codigo}</td>
                <td>{esp.disponible ? "✅ Sí" : "❌ No"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(esp.id)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(esp.id)}
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
