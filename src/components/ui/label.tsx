/**
 * @file Label Component
 * @description Accessible label component built on Radix UI Label primitive.
 * Provides enhanced accessibility for form inputs with proper ARIA relationships.
 * Supports disabled states, peer interactions, and group context.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/label shadcn/ui Label Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/label Radix UI Label}
 */

"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

/**
 * Styled and accessible form label component.
 *
 * @component
 * @param props - All Radix `LabelPrimitive.Root` props, including `htmlFor` and `className`.
 * @param props.className - Optional additional classes for custom styling.
 * @returns A styled label element that supports Radix accessibility and Tailwind variants.
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
