import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      console.log("Usuario logueado:", data.user);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("rol", data.user.Rol?.nombre || "");
      localStorage.setItem("empresa", data.user.Empresa?.razon_social || "");

      window.dispatchEvent(new Event("storage"));

      navigate("/home");
    } catch (error) {
      console.error("Error al hacer login:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          🔐 Iniciar Sesión
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              outline: "none",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              outline: "none",
            }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: loading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s ease",
          }}
        >
          {loading ? "Verificando..." : "Entrar"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.8rem",
            color: "#555",
          }}
        >
          ⚡ Usuario: <b>admin</b> | Contraseña: <b>admin</b>
        </p>
      </form>
    </div>
  );
}

export default Login;
