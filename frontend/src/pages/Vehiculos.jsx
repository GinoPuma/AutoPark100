import { useState } from "react";

export default function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({
    placa: "",
    marca: "",
    modelo: "",
    color: "",
    cliente: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.placa.trim() || !form.marca.trim()) return;

    if (editId) {
      setVehiculos(
        vehiculos.map((v) =>
          v.id === editId ? { ...v, ...form } : v
        )
      );
      setEditId(null);
    } else {
      setVehiculos([
        ...vehiculos,
        { id: Date.now(), ...form },
      ]);
    }
    setForm({ placa: "", marca: "", modelo: "", color: "", cliente: "" });
  };

  const handleEdit = (id) => {
    const vehiculo = vehiculos.find((v) => v.id === id);
    setForm(vehiculo);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setVehiculos(vehiculos.filter((v) => v.id !== id));
  };

  const filteredVehiculos = vehiculos.filter(
    (v) =>
      v.placa.toLowerCase().includes(search.toLowerCase()) ||
      v.marca.toLowerCase().includes(search.toLowerCase()) ||
      v.modelo.toLowerCase().includes(search.toLowerCase()) ||
      v.color.toLowerCase().includes(search.toLowerCase()) ||
      v.cliente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Gestión de Vehículos</h1>
      <p>Administra los vehículos de los clientes.</p>

      <form onSubmit={handleSubmit}>
        <h2>{editId ? "Editar Vehículo" : "Registrar Vehículo"}</h2>

        <input
          type="text"
          placeholder="Placa"
          value={form.placa}
          onChange={(e) => setForm({ ...form, placa: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Marca"
          value={form.marca}
          onChange={(e) => setForm({ ...form, marca: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Modelo"
          value={form.modelo}
          onChange={(e) => setForm({ ...form, modelo: e.target.value })}
        />

        <input
          type="text"
          placeholder="Color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />

        <input
          type="text"
          placeholder="Cliente"
          value={form.cliente}
          onChange={(e) => setForm({ ...form, cliente: e.target.value })}
        />

        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
      </form>

      <h2>Lista de Vehículos</h2>
      <input
        type="search"
        placeholder="Buscar por placa, marca, cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehiculos.length > 0 ? (
            filteredVehiculos.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.placa}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.color}</td>
                <td>{v.cliente}</td>
                <td>
                  <button
                    onClick={() => handleEdit(v.id)}
                    style={{ background: "#f59e0b" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    style={{ background: "#dc2626", marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay vehículos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
