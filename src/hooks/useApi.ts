/**
 * @file useApi Hook
 * @description Custom React hook for making HTTP requests to the API.
 * Provides a unified interface for all API calls with automatic error handling,
 * credentials inclusion, and JSON serialization/deserialization.
 * 
 * Features:
 * - Automatic JSON handling
 * - Credentials included (cookies)
 * - Error handling
 * - Type-safe requests
 * - 204 No Content support
 * - Environment variable configuration
 * 
 * @module useApi
 */

"use client"

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Provides a generic `request` function to perform HTTP calls to the backend API.
 * Automatically handles JSON parsing, credentials, and error responses.
 *
 * @function useApi
 * @returns An object containing the `request` function.
 */
export function useApi() {
  /**
   * Sends an HTTP request to the API.
   *
   * @template T - The type of the request body.
   * @template R - The expected type of the response data.
   * @param {string} url - The endpoint path (relative to `API_URL`).
   * @param {string} method - The HTTP method (e.g., `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`).
   * @param {T} [body] - Optional body payload to send with the request (automatically serialized to JSON).
   * @returns {Promise<R | null | Error>} The parsed JSON response, `null` for 204 No Content, or an `Error` if the request fails.
   *
   * @throws {Error} If the response is not successful (`response.ok === false`).
   *
   * @example
   * ```ts
   * const { request } = useApi()
   * const user = await request<{ username: string }>("/login", "POST", { username: "John" })
   * ```
   */
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

      // Handle responses with no content (HTTP 204)
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
