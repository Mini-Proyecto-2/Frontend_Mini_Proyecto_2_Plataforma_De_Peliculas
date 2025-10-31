/**
 * @file Tooltip Component
 * @description Accessible tooltip component built on Radix UI primitives.
 * Displays contextual information on hover or focus. Includes arrow pointer,
 * animations, and automatic positioning with collision detection.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/tooltip shadcn/ui Tooltip Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/tooltip Radix UI Tooltip}
 */

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * Tooltip provider that defines global tooltip behavior,
 * such as delay before showing and context for nested tooltips.
 *
 * @component
 * @param props - Inherits all props from `TooltipPrimitive.Provider`.
 * @param props.delayDuration - Delay in milliseconds before showing the tooltip. Defaults to `0`.
 * @returns The provider component for tooltips.
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * Root wrapper for a single tooltip instance.
 * Must contain a `TooltipTrigger` and a `TooltipContent`.
 *
 * @component
 * @param props - Inherits all props from `TooltipPrimitive.Root`.
 * @returns A tooltip container that manages open and close state.
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

/**
 * Element that triggers the tooltip when hovered or focused.
 * Can wrap any interactive element (e.g., button, icon, text).
 *
 * @component
 * @param props - Inherits all props from `TooltipPrimitive.Trigger`.
 * @returns The trigger element for the tooltip.
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * Tooltip content container that displays the message or description.
 * Supports animations, positioning, and an arrow indicator.
 *
 * @component
 * @param props - Inherits all props from `TooltipPrimitive.Content`.
 * @param props.className - Optional Tailwind classes for customization.
 * @param props.sideOffset - Distance (in px) from the trigger element. Defaults to `0`.
 * @returns The visual content of the tooltip.
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
