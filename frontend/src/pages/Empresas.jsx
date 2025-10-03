import { useEffect, useState } from "react";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({ ruc: "", razon_social: "" });
  const [editId, setEditId] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  const cargarEmpresas = async () => {
    try {
      const res = await fetch("http://localhost:4000/empresas");
      const data = await res.json();
      setEmpresas(data);
    } catch (error) {
      console.error("Error cargando empresas:", error);
    }
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await fetch(`http://localhost:4000/empresas/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setEditId(null);
      } else {
        await fetch("http://localhost:4000/empresas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
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
      await fetch(`http://localhost:4000/empresas/${id}`, { method: "DELETE" });
      cargarEmpresas();
    }
  };

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
        <p className="text-gray-500">Administra las empresas registradas en tu estacionamiento</p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {editId ? "Editar Empresa" : "Registrar Empresa"}
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
            onChange={(e) => setForm({ ...form, razon_social: e.target.value })}
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
              {editId ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
