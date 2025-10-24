import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi"; // 👈 importa tu hook

type UserProfile = {
  id: string;
  name: string;
  email: string;
};

export default function Settings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { authLogout } = useAuth();
  const { request } = useApi(); // 👈 usamos el hook

  // Cargar perfil
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // 👇 usa el hook en vez de fetch
        const data = await request<UserProfile>("user/", "GET");
        if (!data) throw new Error("No se pudo obtener el perfil");
        setProfile(data);
        setName(data.name);
        setEmail(data.email);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await request("user/", "PUT", { name, email });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const ok = window.confirm("¿Seguro que quieres eliminar tu cuenta?");
    if (!ok) return;
    setLoading(true);
    try {
      await request("user/", "DELETE");
      authLogout();
      navigate("/descubre");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) return <div>Cargando perfil...</div>;
  if (error) return <div style={{ color: "red" }}>⚠️ {error}</div>;
  if (!profile) return null;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Configuración de perfil</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginTop: 16 }}>
          <button type="submit" disabled={loading}>Guardar</button>
          <button
            type="button"
            onClick={handleDeleteAccount}
            style={{ marginLeft: 12 }}
            disabled={loading}
          >
            Eliminar cuenta
          </button>
        </div>
      </form>
    </div>
  );
}
