const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string) {
    const response = await fetch(API_URL + "auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data = await response.json();
    return data.token;
}

export async function register(data: {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  password: string;
}) {
    const response = await fetch(API_URL + "auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        is_boss: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }

    const responseData = await response.json();
    return responseData.token;
}

export async function logout() {
    const response = await fetch(API_URL + "auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al cerrar sesión");
    }

    localStorage.removeItem("auth");
}

