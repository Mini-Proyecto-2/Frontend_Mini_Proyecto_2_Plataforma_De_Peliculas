/**
 * @file Separator Component
 * @description Accessible divider/separator component built on Radix UI primitives.
 * Creates visual and semantic separation between content sections.
 * Supports horizontal and vertical orientations with proper ARIA attributes.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/separator shadcn/ui Separator Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/separator Radix UI Separator}
 */

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Styled and accessible separator component.
 *
 * @component
 * @param props - Radix `SeparatorPrimitive.Root` props.
 * @param props.className - Optional Tailwind or custom class names.
 * @param props.orientation - Defines the separator direction (`"horizontal"` or `"vertical"`).  
 * Defaults to `"horizontal"`.
 * @param props.decorative - Whether the separator is purely visual (`true`) or semantic (`false`).  
 * Defaults to `true`.
 * @returns A separator line that visually divides content.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
