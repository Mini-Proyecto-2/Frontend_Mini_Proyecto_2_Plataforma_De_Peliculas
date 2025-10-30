/**
 * @file Skeleton Component
 * @description Loading placeholder component that mimics the shape of content.
 * Uses pulse animation to indicate loading state. Perfect for improving
 * perceived performance and user experience during data fetching.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/skeleton shadcn/ui Skeleton Documentation}
 */

import { cn } from "@/lib/utils"

/**
 * Animated skeleton placeholder.
 *
 * @component
 * @param props - Standard `div` props for size, shape, and aria attributes.
 * @param props.className - Additional class names to adjust width/height/shape.
 * @returns A pulsing `div` block styled as a loading placeholder.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
