import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";

type UserProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

export default function Settings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { request } = useApi();

  // 🔹 Cargar perfil desde /auth/profile
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await request<UserProfile>("auth/profile/", "GET");
        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAge(data.age);
        setEmail(data.email);
      } catch {
        setError("No se pudo obtener el perfil");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  // 🔹 Guardar cambios con userId en el body
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?._id) return setError("No se encontró el ID del usuario");
    setLoading(true);
    setError(null);
    try {
      const body = {
        user: { userId: profile._id },
        firstName,
        lastName,
        age: Number(age),
        email,
      };

      await request("auth/profile/", "PUT", body);
      alert("✅ Perfil actualizado correctamente");
    } catch {
      setError("❌ Error al guardar cambios");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar cuenta con el mismo formato
  const handleDeleteAccount = async () => {
    if (!profile?._id) return setError("No se encontró el ID del usuario");
    const ok = confirm("¿Seguro que quieres eliminar tu cuenta?");
    if (!ok) return;
    setLoading(true);
    try {
      const body = { user: { userId: profile._id } };
      await request("auth/profile/", "DELETE", body);
      localStorage.removeItem("auth");
      navigate("/descubre");
    } catch {
      setError("Error al eliminar la cuenta");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) return <div className="text-gray-400 ml-6">Cargando perfil...</div>;

  return (
    <div className="p-8 text-gray-200 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-white">Configuración de perfil</h2>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSave} className="space-y-6 bg-[#1f2a38] p-6 rounded-2xl shadow-lg">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            className="w-full bg-[#2d3748] text-gray-100 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Apellido</label>
          <input
            className="w-full bg-[#2d3748] text-gray-100 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Tu apellido"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Edad</label>
          <input
            type="number"
            className="w-full bg-[#2d3748] text-gray-100 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Tu edad"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Correo electrónico</label>
          <input
            className="w-full bg-[#2d3748] text-gray-100 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Eliminar cuenta
          </button>
        </div>
      </form>
    </div>
  );
}
