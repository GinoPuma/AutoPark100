import { useState, useEffect } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          credentials: "include", // 🔑 Incluye la cookie JWT
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verificarSesion();
  }, []);

  return { isAuthenticated, loading };
}
