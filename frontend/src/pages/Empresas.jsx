import { useEffect, useState } from "react";
import {
  getEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
} from "../api/empresasApi";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({ ruc: "", razon_social: "" });
  const [editId, setEditId] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  // --- Cargar empresas al iniciar ---
  const cargarEmpresas = async () => {
    try {
      const data = await getEmpresas();
      setEmpresas(Array.isArray(data) ? data : data.empresas || []);
    } catch (error) {
      console.error("Error cargando empresas:", error);
    }
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  // --- Crear o actualizar empresa ---
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let response;

    if (editId) {
      response = await fetch(`/api/empresas/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    } else {
      response = await fetch(`/api/empresas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }

    const result = await response.json();

    if (!response.ok) {
      console.log(result.errors); // <<< aquí llegan los mensajes del backend
      alert(result.errors[0].msg); // mostrar el primer error al usuario
      return;
    }

    alert(editId ? "Empresa actualizada" : "Empresa creada correctamente");

    setEditId(null);
    setForm({ ruc: "", razon_social: "" });
    cargarEmpresas();

  } catch (error) {
    console.error("Error guardando empresa:", error);
  }
};


  const handleEdit = (empresa) => {
    setEditId(empresa.empresa_id);
    setForm({ ruc: empresa.ruc, razon_social: empresa.razon_social });
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta empresa?")) {
      try {
        await deleteEmpresa(id);
        cargarEmpresas();
      } catch (error) {
        console.error("Error eliminando empresa:", error);
      }
    }
  };

  // --- Filtrar y paginar ---
  const empresasFiltradas = empresas.filter(
    (e) =>
      e.ruc.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.razon_social.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(empresasFiltradas.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const empresasPaginadas = empresasFiltradas.slice(inicio, fin);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Empresas</h1>
        <p className="text-gray-500">
          Puedes registrar, editar o eliminar las empresas del sistema.
        </p>
      </div>

      {/* --- Formulario de Registro / Edición --- */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {editId ? "Editar Empresa" : "Registrar Nueva Empresa"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="RUC"
            value={form.ruc}
            onChange={(e) => setForm({ ...form, ruc: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Razón Social"
            value={form.razon_social}
            onChange={(e) =>
              setForm({ ...form, razon_social: e.target.value })
            }
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="col-span-2 flex justify-end gap-2">
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({ ruc: "", razon_social: "" });
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editId ? "Guardar Cambios" : "Registrar Empresa"}
            </button>
          </div>
        </form>
      </div>

      {/* --- Tabla de Empresas --- */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Lista de Empresas
          </h2>
          <input
            type="text"
            placeholder="Buscar por RUC o Razón Social..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">RUC</th>
                <th className="border px-4 py-2">Razón Social</th>
                <th className="border px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empresasPaginadas.length > 0 ? (
                empresasPaginadas.map((e) => (
                  <tr key={e.empresa_id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{e.empresa_id}</td>
                    <td className="border px-4 py-2">{e.ruc}</td>
                    <td className="border px-4 py-2">{e.razon_social}</td>
                    <td className="border px-4 py-2 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(e)}
                        className="px-3 py-1 border rounded-md hover:bg-gray-100"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(e.empresa_id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No hay empresas registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Paginación --- */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Página {pagina} de {totalPaginas || 1}
          </p>
          <div className="space-x-2">
            <button
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
              className={`px-3 py-1 rounded-md border ${
                pagina === 1
                  ? "text-gray-400 border-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              Anterior
            </button>
            <button
              disabled={pagina === totalPaginas || totalPaginas === 0}
              onClick={() => setPagina(pagina + 1)}
              className={`px-3 py-1 rounded-md border ${
                pagina === totalPaginas || totalPaginas === 0
                  ? "text-gray-400 border-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
