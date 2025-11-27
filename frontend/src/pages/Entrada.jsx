import { useState, useEffect } from "react";
import { getEspacios, createEspacio, updateEspacio, deleteEspacio } from "../api/espaciosApi";

export default function Espacios() {
  const [espacios, setEspacios] = useState([]);
  const [form, setForm] = useState({
    sede: "",
    codigo: "",
    disponible: true,
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cargarEspacios();
  }, []);

  const cargarEspacios = async () => {
    try {
      const data = await getEspacios();
      setEspacios(data);
    } catch (error) {
      console.error("Error al cargar espacios:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.sede.trim() || !form.codigo.trim()) return;

    try {
      if (editId) {
        await updateEspacio(editId, form);
        setEditId(null);
      } else {
        await createEspacio(form);
      }

      setForm({ sede: "", codigo: "", disponible: true });
      cargarEspacios();
    } catch (error) {
      console.error("Error al guardar espacio:", error);
    }
  };

  const handleEdit = (espacio) => {
    setForm({
      sede: espacio.sede || "",
      codigo: espacio.codigo || "",
      disponible: espacio.disponible ?? true,
    });
    setEditId(espacio.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este espacio?")) return;
    try {
      await deleteEspacio(id);
      cargarEspacios();
    } catch (error) {
      console.error("Error al eliminar espacio:", error);
    }
  };

  // ✅ Filtro seguro
  const filteredEspacios = espacios.filter((esp) => {
    const codigo = esp.codigo?.toLowerCase() || "";
    const sede = esp.sede?.toLowerCase() || "";
    const term = search.toLowerCase();

    return codigo.includes(term) || sede.includes(term);
  });

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
                <td>{esp.disponible ? "Sí" : "No"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(esp)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(esp.id)}
                    style={{ background: "#dc2626", marginLeft: "0.5rem", color: "#fff" }}
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
