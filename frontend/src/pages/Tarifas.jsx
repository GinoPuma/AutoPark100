import { useState, useEffect } from "react";
import {
  getTarifas,
  createTarifa,
  updateTarifa,
  deleteTarifa,
} from "../api/tarifasApi";
import axios from "axios";

const estilos = {
  contenedor: { fontFamily: "Segoe UI, Arial, sans-serif", background: "#2a333bff", padding: "20px" },
  titulo: { fontSize: "1.2rem", color: "#fff", marginBottom: "0" },
  botonesuperior: { border: "1px solid #38bdf8", color: "#38bdf8", background: "white", padding: "8px 14px", borderRadius: "6px", fontSize: "1rem", cursor: "pointer", float: "right" },
  tablaTitulo: { fontSize: "1rem", fontWeight: "bold", marginTop: "30px", marginBottom: "12px", color: "#fff" },
  tabla: { width: "100%", borderCollapse: "collapse", marginBottom: "16px", background: "#705b5bff", boxShadow: "0 2px 6px #5a4040ff" },
  th: { background: "#4e3a3aff", fontWeight: "500", color: "#fff", padding: "8px 6px", border: "1px solid #e5e7eb", textAlign: "center", fontSize: "0.98rem" },
  td: { padding: "10px 6px", border: "1px solid #272c37ff", textAlign: "center", fontSize: "0.97rem", color: "#fff" },
  boton: { borderRadius: "6px", border: "1.5px solid #3b82f6", color: "#3b82f6", background: "#3c2d2dff", padding: "4px 14px", fontSize: "0.98rem", cursor: "pointer", marginRight: "6px" },
  botonEditar: { borderRadius: "6px", border: "1.5px solid #38bdf8", color: "#38bdf8", background: "#673b3bff", padding: "4px 14px", fontSize: "0.98rem", cursor: "pointer" },
  formCont: { display: "flex", flexWrap: "wrap", gap: "7px", margin: "16px 0", background: "#354758ff", padding: "10px", borderRadius: "6px", alignItems: "center" },
  input: { width: "140px", padding: "7px", borderRadius: "4px", border: "1px solid #e5e7eb", background: "#223446ff", fontSize: "0.96rem", color: "#fff" },
  nombre: { flex: "1", padding: "7px 10px", borderRadius: "4px", border: "1px solid #e5e7eb", background: "#4a6a8aff", fontSize: "0.96rem", color: "#fff" },
  mensajeOk: { color: "#4ade80", margin: "8px 0" },
  mensajeErr: { color: "#fb7185", margin: "8px 0" },
};

export default function Tarifas() {
  const [tarifas, setTarifas] = useState([]);
  const [tiposVehiculo, setTiposVehiculo] = useState({});
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ vehiculo_tipo_id: "", precio_hora: "", precio_dia: "", precio_mes: "", descripcion: "" });
  const [agregando, setAgregando] = useState(false);
  const [nuevaTarifa, setNuevaTarifa] = useState({ vehiculo_tipo_id: "", precio_hora: "", precio_dia: "", precio_mes: "", descripcion: "" });
  const [msgOk, setMsgOk] = useState("");
  const [msgErr, setMsgErr] = useState("");

  useEffect(() => {
    cargarTarifas();
    cargarTiposVehiculo(); // 👈 carga los nombres de los tipos
  }, []);

  // ✅ Cargar tipos de vehículo una vez
  const cargarTiposVehiculo = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/vehiculotipos", { withCredentials: true });
      const mapa = {};
      res.data.forEach((t) => {
        mapa[t.vehiculo_tipo_id] = t.nombre;
      });
      setTiposVehiculo(mapa);
    } catch (error) {
      console.error("[UI] Error cargando tipos de vehículo:", error);
    }
  };

  const cargarTarifas = async () => {
    try {
      const data = await getTarifas();
      // ✅ Asegura que sea un array válido
      const lista = Array.isArray(data) ? data : data?.tarifas || [];
      setTarifas(lista);
    } catch (error) {
      console.error("[UI] Error cargarTarifas:", error);
      setMsgErr("Error al cargar tarifas.");
    }
  };

  const handleEdit = (tarifa) => {
    setMsgOk(""); setMsgErr("");
    setEditId(tarifa.tarifa_id);
    setEditData({
      vehiculo_tipo_id: tarifa.vehiculo_tipo_id ?? "",
      precio_hora: tarifa.precio_hora ?? "",
      precio_dia: tarifa.precio_dia ?? "",
      precio_mes: tarifa.precio_mes ?? "",
      descripcion: tarifa.descripcion ?? "",
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({ vehiculo_tipo_id: "", precio_hora: "", precio_dia: "", precio_mes: "", descripcion: "" });
  };

  const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setMsgOk(""); setMsgErr("");
    try {
      if (!editId) return setMsgErr("ID de tarifa inválido.");

      const res = await updateTarifa(editId, editData);
      setMsgOk("Tarifa actualizada correctamente.");
      cargarTarifas();
      handleCancel();
    } catch (error) {
      console.error("[UI] Error handleSave:", error);
      setMsgErr("Error al actualizar tarifa.");
    }
  };

  const handleDelete = async (id) => {
    setMsgOk(""); setMsgErr("");
    try {
      await deleteTarifa(id);
      setMsgOk("Tarifa eliminada.");
      cargarTarifas();
    } catch (error) {
      console.error("[UI] Error handleDelete:", error);
      setMsgErr("Error al eliminar tarifa.");
    }
  };

  const handleNuevaChange = (e) => setNuevaTarifa({ ...nuevaTarifa, [e.target.name]: e.target.value });

  const handleAddTarifa = async (e) => {
    e.preventDefault();
    setMsgOk(""); setMsgErr("");
    try {
      if (!nuevaTarifa.vehiculo_tipo_id || !nuevaTarifa.precio_hora) {
        return setMsgErr("Debe indicar tipo de vehículo y precio por hora.");
      }

      await createTarifa(nuevaTarifa);
      setMsgOk("Tarifa creada correctamente.");
      setNuevaTarifa({ vehiculo_tipo_id: "", precio_hora: "", precio_dia: "", precio_mes: "", descripcion: "" });
      setAgregando(false);
      cargarTarifas();
    } catch (error) {
      console.error("[UI] Error handleAddTarifa:", error);
      setMsgErr("Error al crear tarifa.");
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>Tarifas Registradas</h2>

      <button style={estilos.botonesuperior} onClick={() => { setAgregando(!agregando); setMsgOk(""); setMsgErr(""); }}>
        + Agregar nueva Tarifa
      </button>

      <div style={estilos.tablaTitulo}>Listado de Tarifas</div>

      {msgOk && <div style={estilos.mensajeOk}>{msgOk}</div>}
      {msgErr && <div style={estilos.mensajeErr}>{msgErr}</div>}

      {agregando && (
        <form style={estilos.formCont} onSubmit={handleAddTarifa}>
          <input name="vehiculo_tipo_id" type="text" value={nuevaTarifa.vehiculo_tipo_id} onChange={handleNuevaChange} placeholder="Tipo de vehículo (ID)" style={estilos.input} />
          <input name="precio_hora" type="number" value={nuevaTarifa.precio_hora} onChange={handleNuevaChange} placeholder="Precio hora" style={estilos.input} />
          <input name="precio_dia" type="number" value={nuevaTarifa.precio_dia} onChange={handleNuevaChange} placeholder="Precio día" style={estilos.input} />
          <input name="precio_mes" type="number" value={nuevaTarifa.precio_mes} onChange={handleNuevaChange} placeholder="Precio mes" style={estilos.input} />
          <input name="descripcion" type="text" value={nuevaTarifa.descripcion} onChange={handleNuevaChange} placeholder="Descripción" style={estilos.nombre} />
          <button style={estilos.boton} type="submit">Guardar</button>
          <button style={estilos.botonEditar} type="button" onClick={() => { setAgregando(false); setMsgErr(""); setMsgOk(""); }}>Cancelar</button>
        </form>
      )}

      <table style={estilos.tabla}>
        <thead>
          <tr>
            <th style={estilos.th}>Tipo Vehículo</th>
            <th style={estilos.th}>Precio Hora</th>
            <th style={estilos.th}>Precio Día</th>
            <th style={estilos.th}>Precio Mes</th>
            <th style={estilos.th}>Descripción</th>
            <th style={estilos.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tarifas.length > 0 ? (
            tarifas.map((t) => (
              <tr key={t.tarifa_id}>
                <td style={estilos.td}>
                  {editId === t.tarifa_id ? (
                    <input
                      type="text"
                      name="vehiculo_tipo_id"
                      value={editData.vehiculo_tipo_id}
                      onChange={handleChange}
                      style={estilos.input}
                    />
                  ) : (
                    tiposVehiculo[t.vehiculo_tipo_id] || t.vehiculo_tipo_id
                  )}
                </td>
                <td style={estilos.td}>{editId === t.tarifa_id ? <input type="number" name="precio_hora" value={editData.precio_hora} onChange={handleChange} style={estilos.input} /> : t.precio_hora}</td>
                <td style={estilos.td}>{editId === t.tarifa_id ? <input type="number" name="precio_dia" value={editData.precio_dia} onChange={handleChange} style={estilos.input} /> : t.precio_dia}</td>
                <td style={estilos.td}>{editId === t.tarifa_id ? <input type="number" name="precio_mes" value={editData.precio_mes} onChange={handleChange} style={estilos.input} /> : t.precio_mes}</td>
                <td style={estilos.td}>{editId === t.tarifa_id ? <input type="text" name="descripcion" value={editData.descripcion} onChange={handleChange} style={estilos.nombre} /> : t.descripcion}</td>
                <td style={estilos.td}>
                  {editId === t.tarifa_id ? (
                    <>
                      <button style={estilos.boton} onClick={handleSave}>Guardar</button>
                      <button style={estilos.botonEditar} onClick={handleCancel}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button style={estilos.boton} onClick={() => handleDelete(t.tarifa_id)}>🗑️ Eliminar</button>
                      <button style={estilos.botonEditar} onClick={() => handleEdit(t)}>📝 Editar</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td style={estilos.td} colSpan="6">No hay tarifas registradas.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
