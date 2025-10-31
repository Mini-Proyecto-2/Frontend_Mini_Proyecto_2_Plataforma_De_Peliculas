/**
 * @file Utility Functions
 * @description Core utility functions for the application.
 * Provides className manipulation and merging utilities.
 * 
 * @module utils
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and merges Tailwind CSS conflicts.
 *
 * @function cn
 * @param {...ClassValue[]} inputs - A list of class names, arrays, or objects with conditional class names.
 * @returns {string} A single merged class name string.
 *
 * @remarks
 * - Uses `clsx` to handle conditional and array-based class definitions.
 * - Uses `tailwind-merge` to ensure no conflicting Tailwind classes remain.
 *
 * @example
 * ```ts
 * cn("p-2", "bg-blue-500", false && "hidden") // "p-2 bg-blue-500"
 * cn("p-2", "p-4") // "p-4" (tailwind-merge resolves the conflict)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
