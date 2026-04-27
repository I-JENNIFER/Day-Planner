import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS class names, resolving conflicts via `tailwind-merge`
 * and supporting conditional classes via `clsx`.
 *
 * @param inputs - Class values (strings, arrays, objects, etc.)
 * @returns A single merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
