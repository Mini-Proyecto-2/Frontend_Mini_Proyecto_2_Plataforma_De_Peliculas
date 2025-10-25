"use client"

const API_URL = import.meta.env.VITE_API_URL;

export function useApi() {
  const request = async <T>(url: string, method: string, body?: T) => {
    try {
      const response = await fetch(API_URL + url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      // Si el backend responde sin contenido (204)
      if (response.status === 204) {
        return null
      }

      return response.json()
    } catch (error) {
      return error
    }
  }

  return { request }
}
