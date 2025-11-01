/**
 * @file Settings.tsx
 * @description Profile settings page that allows users to view and update their personal data
 * (first name, last name, age, email) using a controlled form with Zod validation.
 * Also provides an option to delete the account.
 *
 * @example
 * ```tsx
 * import Settings from "@/pages/Settings"
 * 
 * export default function Route() {
 *   return <Settings />
 * }
 * ```
 */
import { DeleteProfile } from "@/components/settings/DeleteProfile";
import { UpdateProfile } from "@/components/settings/UpdateProfile";
import { ChangePassword } from "@/components/settings/ChangePassword";
import type { JSX } from "react";

/**
 * Profile settings page component.
 *
 * - Fetches the profile on mount and initializes the form.
 * - Validates user input using Zod + react-hook-form.
 * - Submits updates to the backend and displays success/error toasts.
 * - Allows account deletion via a confirmation dialog.
 *
 * @component
 * @returns {JSX.Element} A form-driven profile settings view.
 *
 * @remarks
 * - The `deleteProfile` call currently sends a payload containing `{ user: { userId: email } }`.
 *   Ensure the backend expects this shape (or adjust accordingly) if you implement password confirmation.
 */
export default function Settings(): JSX.Element {
  return (
    <div className="p-8 w-full">
      <h1 className="font-bold mb-8">Configuración</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 max-w-[1440px]">
        <UpdateProfile />
        <ChangePassword />
        <DeleteProfile />
      </div>
    </div>
  );
}