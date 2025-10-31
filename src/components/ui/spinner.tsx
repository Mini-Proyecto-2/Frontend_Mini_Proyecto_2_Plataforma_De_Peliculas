/**
 * @file Spinner Component
 * @description Loading spinner component with rotation animation.
 * Uses Lucide's Loader2 icon with continuous spin animation.
 * Perfect for loading states, button loaders, and async operations.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://lucide.dev/icons/loader-2 Lucide Loader2 Icon}
 */

import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Animated loading spinner using `Loader2Icon`.
 *
 * @component
 * @param props - Standard `svg` props such as `className`, `aria-label`, or `role`.
 * @param props.className - Optional Tailwind class names to control size and color.
 * @returns An accessible, continuously rotating loading icon.
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
