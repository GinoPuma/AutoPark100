import { useEffect, useState } from "react";
import {
  getVehiculos,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "../api/vehiculosApi";

const estilos = {
  contenedor: { fontFamily: "Segoe UI, Arial, sans-serif", background: "#2a333bff", padding: "20px" },
  titulo: { fontSize: "1.3rem", color: "#fff", marginBottom: "0" },
  botonSuperior: { border: "1px solid #38bdf8", color: "#38bdf8", background: "white", padding: "8px 14px", borderRadius: "6px", fontSize: "1rem", cursor: "pointer", float: "right" },
  tablaTitulo: { fontSize: "1rem", fontWeight: "bold", marginTop: "30px", marginBottom: "12px", color: "#fff" },
  tabla: { width: "100%", borderCollapse: "collapse", marginBottom: "16px", background: "#705b5bff", boxShadow: "0 2px 6px #5a4040ff" },
  th: { background: "#4e3a3aff", color: "#fff", padding: "8px", border: "1px solid #e5e7eb", textAlign: "center" },
  td: { padding: "8px", border: "1px solid #272c37ff", textAlign: "center", color: "#fff" },
  input: { width: "160px", padding: "7px", borderRadius: "4px", border: "1px solid #e5e7eb", background: "#223446ff", color: "#fff" },
  boton: { borderRadius: "6px", border: "1.5px solid #3b82f6", color: "#3b82f6", background: "#3c2d2dff", padding: "4px 14px", cursor: "pointer", marginRight: "6px" },
  botonEditar: { borderRadius: "6px", border: "1.5px solid #38bdf8", color: "#38bdf8", background: "#673b3bff", padding: "4px 14px", cursor: "pointer" },
  mensajeOk: { color: "#4ade80", margin: "8px 0" },
  mensajeErr: { color: "#fb7185", margin: "8px 0" },
  formCont: { display: "flex", flexWrap: "wrap", gap: "7px", margin: "16px 0", background: "#354758ff", padding: "10px", borderRadius: "6px" },
};

export default function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    vehiculo_tipo_id: "",
    reserva_id: "",
    placa: "",
    color: "",
  });
  const [msgOk, setMsgOk] = useState("");
  const [msgErr, setMsgErr] = useState("");
  const [agregando, setAgregando] = useState(false);

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    try {
      const data = await getVehiculos();
      setVehiculos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar vehículos:", error);
      setMsgErr("Error al cargar vehículos.");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsgOk("");
    setMsgErr("");
    try {
      if (!form.vehiculo_tipo_id || !form.placa) {
        return setMsgErr("Debe ingresar tipo de vehículo y placa.");
      }

      if (editId) {
        await updateVehiculo(editId, form);
        setMsgOk("Vehículo actualizado correctamente.");
      } else {
        await createVehiculo(form);
        setMsgOk("Vehículo creado correctamente.");
      }

      setForm({ vehiculo_tipo_id: "", reserva_id: "", placa: "", color: "" });
      setEditId(null);
      setAgregando(false);
      cargarVehiculos();
    } catch (error) {
      console.error("Error al guardar vehículo:", error);
      setMsgErr("Error al guardar vehículo.");
    }
  };

  const handleEdit = (vehiculo) => {
    setEditId(vehiculo.vehiculo_id);
    setForm({
      vehiculo_tipo_id: vehiculo.vehiculo_tipo_id || "",
      reserva_id: vehiculo.reserva_id || "",
      placa: vehiculo.placa || "",
      color: vehiculo.color || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este vehículo?")) return;
    try {
      await deleteVehiculo(id);
      setMsgOk("Vehículo eliminado.");
      cargarVehiculos();
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
      setMsgErr("Error al eliminar vehículo.");
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>Gestión de Vehículos</h2>

      <button
        style={estilos.botonSuperior}
        onClick={() => {
          setAgregando(!agregando);
          setMsgOk("");
          setMsgErr("");
          setEditId(null);
        }}
      >
        + Nuevo Vehículo
      </button>

      {msgOk && <div style={estilos.mensajeOk}>{msgOk}</div>}
      {msgErr && <div style={estilos.mensajeErr}>{msgErr}</div>}

      {agregando && (
        <form style={estilos.formCont} onSubmit={handleSubmit}>
          <input
            name="vehiculo_tipo_id"
            type="text"
            value={form.vehiculo_tipo_id}
            onChange={handleChange}
            placeholder="Tipo vehículo (ID)"
            style={estilos.input}
          />
          <input
            name="reserva_id"
            type="text"
            value={form.reserva_id}
            onChange={handleChange}
            placeholder="Reserva (opcional)"
            style={estilos.input}
          />
          <input
            name="placa"
            type="text"
            value={form.placa}
            onChange={handleChange}
            placeholder="Placa"
            style={estilos.input}
          />
          <input
            name="color"
            type="text"
            value={form.color}
            onChange={handleChange}
            placeholder="Color"
            style={estilos.input}
          />
          <button style={estilos.boton} type="submit">
            {editId ? "Actualizar" : "Guardar"}
          </button>
          <button
            style={estilos.botonEditar}
            type="button"
            onClick={() => setAgregando(false)}
          >
            Cancelar
          </button>
        </form>
      )}

      <div style={estilos.tablaTitulo}>Lista de Vehículos</div>
      <table style={estilos.tabla}>
        <thead>
          <tr>
            <th style={estilos.th}>ID</th>
            <th style={estilos.th}>Tipo Vehículo (ID)</th>
            <th style={estilos.th}>Reserva</th>
            <th style={estilos.th}>Placa</th>
            <th style={estilos.th}>Color</th>
            <th style={estilos.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.length > 0 ? (
            vehiculos.map((v) => (
              <tr key={v.vehiculo_id}>
                <td style={estilos.td}>{v.vehiculo_id}</td>
                <td style={estilos.td}>{v.vehiculo_tipo_id}</td>
                <td style={estilos.td}>{v.reserva_id || "-"}</td>
                <td style={estilos.td}>{v.placa}</td>
                <td style={estilos.td}>{v.color}</td>
                <td style={estilos.td}>
                  <button style={estilos.boton} onClick={() => handleEdit(v)}>
                    📝 Editar
                  </button>
                  <button
                    style={estilos.botonEditar}
                    onClick={() => handleDelete(v.vehiculo_id)}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={estilos.td}>
                No hay vehículos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
