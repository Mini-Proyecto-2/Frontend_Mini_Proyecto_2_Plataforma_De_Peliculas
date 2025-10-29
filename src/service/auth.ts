const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string) {
    const response = await fetch(API_URL + "auth/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data.userId;
}

export async function register(data: {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}) {
    const response = await fetch(API_URL + "auth/register/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        is_boss: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const responseData = await response.json();
    return responseData.token;
}

export async function session() {
    const response = await fetch(API_URL + "auth/session/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.status;
}

export async function logout() {
    const response = await fetch(API_URL + "auth/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
}

