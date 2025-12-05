import { useState, useEffect } from "react";
import {
  getTarifas,
  createTarifa,
  updateTarifa,
  deleteTarifa,
} from "../api/tarifasApi";
import axios from "axios";

const estilos = {
  contenedor: {
    fontFamily: "Segoe UI, Arial, sans-serif",
    background: "#2a333bff",
    padding: "20px",
  },
  titulo: { fontSize: "1.2rem", color: "#fff", marginBottom: "0" },
  botonesuperior: {
    border: "1px solid #38bdf8",
    color: "#38bdf8",
    background: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    float: "right",
  },
  tablaTitulo: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "30px",
    marginBottom: "12px",
    color: "#fff",
  },
  tabla: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "16px",
    background: "#705b5bff",
    boxShadow: "0 2px 6px #5a4040ff",
  },
  th: {
    background: "#4e3a3aff",
    fontWeight: "500",
    color: "#fff",
    padding: "8px 6px",
    border: "1px solid #e5e7eb",
    textAlign: "center",
    fontSize: "0.98rem",
  },
  td: {
    padding: "10px 6px",
    border: "1px solid #272c37ff",
    textAlign: "center",
    fontSize: "0.97rem",
    color: "#fff",
  },
  boton: {
    borderRadius: "6px",
    border: "1.5px solid #3b82f6",
    color: "#3b82f6",
    background: "#3c2d2dff",
    padding: "4px 14px",
    fontSize: "0.98rem",
    cursor: "pointer",
    marginRight: "6px",
  },
  botonEditar: {
    borderRadius: "6px",
    border: "1.5px solid #38bdf8",
    color: "#38bdf8",
    background: "#673b3bff",
    padding: "4px 14px",
    fontSize: "0.98rem",
    cursor: "pointer",
  },
  formCont: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
    margin: "16px 0",
    background: "#354758ff",
    padding: "10px",
    borderRadius: "6px",
    alignItems: "center",
  },
  input: {
    width: "160px",
    padding: "7px",
    borderRadius: "4px",
    border: "1px solid #e5e7eb",
    background: "#223446ff",
    fontSize: "0.96rem",
    color: "#fff",
  },
  nombre: {
    flex: "1",
    padding: "7px 10px",
    borderRadius: "4px",
    border: "1px solid #e5e7eb",
    background: "#4a6a8aff",
    fontSize: "0.96rem",
    color: "#fff",
  },
  mensajeOk: { color: "#4ade80", margin: "8px 0" },
  mensajeErr: { color: "#fb7185", margin: "8px 0" },
};

export default function Tarifas() {
  const [tarifas, setTarifas] = useState([]);
  const [tiposVehiculo, setTiposVehiculo] = useState({});
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    vehiculo_tipo_id: "",
    precio_hora: "",
    precio_dia: "",
    precio_mes: "",
    descripcion: "",
  });
  const [agregando, setAgregando] = useState(false);
  const [nuevaTarifa, setNuevaTarifa] = useState({
    vehiculo_tipo_id: "",
    precio_hora: "",
    precio_dia: "",
    precio_mes: "",
    descripcion: "",
  });
  const [busquedaTipo, setBusquedaTipo] = useState("");
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [msgOk, setMsgOk] = useState("");
  const [msgErr, setMsgErr] = useState("");

  useEffect(() => {
    cargarTarifas();
    cargarTiposVehiculo();
  }, []);

  const cargarTiposVehiculo = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/vehiculo-tipos", {
        withCredentials: true,
      });
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
      const lista = Array.isArray(data) ? data : data?.tarifas || [];
      setTarifas(lista);
    } catch (error) {
      setMsgErr("Error al cargar tarifas.");
    }
  };

  const handleAddTarifa = async (e) => {
    e.preventDefault();
    if (!nuevaTarifa.vehiculo_tipo_id || !nuevaTarifa.precio_hora) {
      return setMsgErr("Debe indicar tipo de vehículo y precio por hora.");
    }

    try {
      await createTarifa(nuevaTarifa);
      setMsgOk("Tarifa creada correctamente.");
      setNuevaTarifa({
        vehiculo_tipo_id: "",
        precio_hora: "",
        precio_dia: "",
        precio_mes: "",
        descripcion: "",
      });
      setBusquedaTipo("");
      setResultadosFiltrados([]);
      setAgregando(false);
      cargarTarifas();
    } catch {
      setMsgErr("Error al crear tarifa.");
    }
  };

  const handleEdit = (tarifa) => {
    setEditId(tarifa.tarifa_id);
    setEditData(tarifa);
  };

  const handleSave = async () => {
    try {
      await updateTarifa(editId, editData);
      setMsgOk("Tarifa actualizada.");
      setEditId(null);
      cargarTarifas();
    } catch {
      setMsgErr("Error al actualizar tarifa.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTarifa(id);
      setMsgOk("Tarifa eliminada.");
      cargarTarifas();
    } catch {
      setMsgErr("Error al eliminar tarifa.");
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>Tarifas Registradas</h2>

      <button
        style={estilos.botonesuperior}
        onClick={() => {
          setAgregando(!agregando);
        }}
      >
        + Agregar nueva Tarifa
      </button>

      {agregando && (
        <form style={estilos.formCont} onSubmit={handleAddTarifa}>
          {/* 🔎 Buscador de tipo vehículo */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Buscar tipo vehículo por nombre o ID"
              value={busquedaTipo}
              onChange={(e) => {
                const texto = e.target.value;
                setBusquedaTipo(texto);

                const resultados = Object.entries(tiposVehiculo)
                  .filter(
                    ([id, nombre]) =>
                      id.toString().includes(texto.toLowerCase()) ||
                      nombre.toLowerCase().includes(texto.toLowerCase())
                  )
                  .map(([id, nombre]) => ({ id, nombre }));

                setResultadosFiltrados(resultados);
              }}
              style={estilos.input}
            />

            {resultadosFiltrados.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  background: "#1e293b",
                  border: "1px solid #38bdf8",
                  width: "200px",
                  zIndex: 10,
                }}
              >
                {resultadosFiltrados.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setNuevaTarifa({
                        ...nuevaTarifa,
                        vehiculo_tipo_id: item.id,
                      });
                      setBusquedaTipo(item.nombre);
                      setResultadosFiltrados([]);
                    }}
                    style={{
                      padding: "6px",
                      cursor: "pointer",
                      color: "white",
                      borderBottom: "1px solid #334155",
                    }}
                  >
                    {item.id} - {item.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            name="precio_hora"
            type="number"
            value={nuevaTarifa.precio_hora}
            onChange={(e) =>
              setNuevaTarifa({ ...nuevaTarifa, precio_hora: e.target.value })
            }
            placeholder="Precio hora"
            style={estilos.input}
          />
          <input
            name="precio_dia"
            type="number"
            value={nuevaTarifa.precio_dia}
            onChange={(e) =>
              setNuevaTarifa({ ...nuevaTarifa, precio_dia: e.target.value })
            }
            placeholder="Precio día"
            style={estilos.input}
          />
          <input
            name="precio_mes"
            type="number"
            value={nuevaTarifa.precio_mes}
            onChange={(e) =>
              setNuevaTarifa({ ...nuevaTarifa, precio_mes: e.target.value })
            }
            placeholder="Precio mes"
            style={estilos.input}
          />
          <input
            name="descripcion"
            type="text"
            value={nuevaTarifa.descripcion}
            onChange={(e) =>
              setNuevaTarifa({ ...nuevaTarifa, descripcion: e.target.value })
            }
            placeholder="Descripción"
            style={estilos.nombre}
          />

          <button style={estilos.boton} type="submit">
            Guardar
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

      {msgOk && <div style={estilos.mensajeOk}>{msgOk}</div>}
      {msgErr && <div style={estilos.mensajeErr}>{msgErr}</div>}

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
          {tarifas.map((t) => (
            <tr key={t.tarifa_id}>
              <td style={estilos.td}>{tiposVehiculo[t.vehiculo_tipo_id]}</td>
              <td style={estilos.td}>{t.precio_hora}</td>
              <td style={estilos.td}>{t.precio_dia}</td>
              <td style={estilos.td}>{t.precio_mes}</td>
              <td style={estilos.td}>{t.descripcion}</td>
              <td style={estilos.td}>
                <button
                  style={estilos.boton}
                  onClick={() => handleDelete(t.tarifa_id)}
                >
                  🗑️
                </button>
                <button
                  style={estilos.botonEditar}
                  onClick={() => handleEdit(t)}
                >
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
