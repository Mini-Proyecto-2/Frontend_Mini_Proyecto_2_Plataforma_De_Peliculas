/**
 * @file profile.ts
 * @description Provides API service functions for managing user profiles in the FilmUnity platform.
 * These functions use the shared `useApi` hook to handle HTTP requests consistently across the app.
 */

import { useApi } from "../hooks/useApi";

// Destructure the `request` function from the custom API hook.
const { request } = useApi();

/**
 * Retrieves the authenticated user's profile information.
 *
 * @async
 * @function getProfile
 * @returns {Promise<any>} The user's profile data returned from the backend.
 *
 * @example
 * ```ts
 * const profile = await getProfile();
 * console.log("User profile:", profile);
 * ```
 */
export const getProfile = async () => {
  return request("auth/profile", "GET");
};

/**
 * Updates the authenticated user's profile information.
 *
 * @async
 * @function updateProfile
 * @param {any} body - The updated profile data object.
 * @returns {Promise<any>} The updated profile data returned from the backend.
 *
 * @example
 * ```ts
 * const updatedProfile = await updateProfile({
 *   firstName: "John",
 *   lastName: "Doe",
 *   age: 28,
 *   email: "john.doe@example.com"
 * });
 * console.log("Profile updated:", updatedProfile);
 * ```
 */
export const updateProfile = async (body: any): Promise<any> => {
  return request("auth/profile", "PUT", body);
};

export const changePassword = async (body: {currentPassword: string, newPassword: string}): Promise<any> => {
  return request("auth/change-password", "POST", body);
};

/**
 * Deletes the authenticated user's profile and account from the system.
 *
 * @async
 * @function deleteProfile
 * @param {any} body - The request body containing the user identifier or related data required for deletion.
 * @returns {Promise<any>} The server response confirming the deletion.
 *
 * @example
 * ```ts
 * await deleteProfile({ user: { userId: "abc123" } });
 * console.log("Account successfully deleted");
 * ```
 */
export const deleteProfile = async (body: {password: string}) => {
  return request("auth/profile", "DELETE", body);
};