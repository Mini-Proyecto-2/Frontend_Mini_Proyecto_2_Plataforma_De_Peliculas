/**
 * @file Progress Component
 * @description Accessible progress bar/indicator built on Radix UI primitives.
 * Displays completion percentage with smooth transitions and customizable styling.
 * Includes proper ARIA attributes for screen reader accessibility.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/progress shadcn/ui Progress Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/progress Radix UI Progress}
 */

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/**
 * A styled and accessible progress bar component.
 *
 * @component
 * @param props - Radix `ProgressPrimitive.Root` props.
 * @param props.value - Current progress value (from 0 to 100). If omitted, renders as indeterminate.
 * @param props.className - Optional additional CSS classes to extend or override styling.
 * @returns A progress bar element showing completion percentage.
 *
 * @example
 * ```tsx
 * <Progress value={75} />
 * ```
 *
 * @example
 * ```tsx
 * Indeterminate loading state
 * <Progress className="bg-primary/30" />
 * ```
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
