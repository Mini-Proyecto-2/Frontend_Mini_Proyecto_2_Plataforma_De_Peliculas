/**
 * @file auth.ts
 * @description Provides authentication-related API calls for FilmUnity, including login, registration, and logout.
 * All requests are sent to the backend API defined in the `VITE_API_URL` environment variable.
 */

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Sends a login request to the backend API using the provided email and password.
 *
 * @async
 * @function login
 * @param {string} email - User email address.
 * @param {string} password - User password.
 * @returns {Promise<string>} The authenticated user's ID.
 *
 * @throws {Error} Throws an error if the request fails or credentials are invalid.
 *
 * @example
 * ```ts
 * try {
 *   const userId = await login("user@example.com", "password123");
 *   console.log("User logged in:", userId);
 * } catch (error) {
 *   console.error("Login failed:", error);
 * }
 * ```
 */
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
    console.log(data)
    return data.userId;
}

/**
 * Registers a new user account in the system.
 *
 * @async
 * @function register
 * @param {Object} data - User registration information.
 * @param {string} data.firstName - User's first name.
 * @param {string} data.lastName - User's last name.
 * @param {number} data.age - User's age.
 * @param {string} data.email - User's email address.
 * @param {string} data.password - User's chosen password.
 * @returns {Promise<string>} The authentication token returned by the backend.
 *
 * @throws {Error} Throws an error if registration fails or the response is invalid.
 *
 * @example
 * ```ts
 * const token = await register({
 *   firstName: "Alice",
 *   lastName: "Doe",
 *   age: 25,
 *   email: "alice@example.com",
 *   password: "securePassword!",
 * });
 * console.log("Registered with token:", token);
 * ```
 */
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

/**
 * Logs the user out by sending a logout request to the backend and clearing local storage.
 *
 * @async
 * @function logout
 * @returns {Promise<void>} Resolves when logout is successful.
 *
 * @throws {Error} Throws an error if the logout request fails.
 *
 * @example
 * ```ts
 * await logout();
 * console.log("User successfully logged out.");
 * ```
 */
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

    localStorage.removeItem("auth");
}

