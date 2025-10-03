import { useState } from "react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    doc_tipo: "DNI",
    doc_num: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.doc_num.trim() || !form.nombre.trim()) return;

    if (editId) {
      setClientes(
        clientes.map((c) =>
          c.id === editId ? { ...c, ...form } : c
        )
      );
      setEditId(null);
    } else {
      setClientes([
        ...clientes,
        { id: Date.now(), ...form },
      ]);
    }
    setForm({
      doc_tipo: "DNI",
      doc_num: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
    });
  };

  const handleEdit = (id) => {
    const cliente = clientes.find((c) => c.id === id);
    setForm(cliente);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setClientes(clientes.filter((c) => c.id !== id));
  };

  const filteredClientes = clientes.filter(
    (c) =>
      c.doc_num.toLowerCase().includes(search.toLowerCase()) ||
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.apellido.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <p>Administra los clientes de tu estacionamiento.</p>

      <form onSubmit={handleSubmit}>
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
          value={form.doc_num}
          onChange={(e) => setForm({ ...form, doc_num: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          value={form.apellido}
          onChange={(e) => setForm({ ...form, apellido: e.target.value })}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={form.telefono}
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
      />

      <table>
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
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.doc_tipo}</td>
                <td>{c.doc_num}</td>
                <td>{c.nombre}</td>
                <td>{c.apellido}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
                <td>
                  <button
                    onClick={() => handleEdit(c.id)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    style={{ background: "#dc2626", marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay clientes registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
