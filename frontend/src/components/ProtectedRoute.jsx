import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, roles = [] }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Mientras se verifica la sesión
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          color: "#555",
          background: "#f9f9f9",
        }}
      >
        Verificando sesión...
      </div>
    );
  }

  // Si no está autenticado, redirige al login guardando la ruta previa
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 🔒 Si se pasa una lista de roles permitidos, verifica
  if (roles.length > 0 && !roles.includes(user?.Rol?.nombre)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si pasa todo, renderiza el contenido protegido
  return children;
}
