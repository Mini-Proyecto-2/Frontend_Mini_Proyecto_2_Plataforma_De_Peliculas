/**
 * @file Tabs Component
 * @description Accessible tabs component built on Radix UI primitives.
 * Organizes content into multiple panels with tab navigation.
 * Supports keyboard navigation, ARIA attributes, and custom styling.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/tabs shadcn/ui Tabs Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/tabs Radix UI Tabs}
 */

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * Root container for the Tabs system.
 * Provides state management for switching between tab triggers and content.
 *
 * @component
 * @see https://www.radix-ui.com/primitives/docs/components/tabs
 */
const Tabs = TabsPrimitive.Root

/**
 * Wrapper that holds all the tab triggers.
 *
 * @component
 * @param props - Extends `TabsPrimitive.List` props.
 * @param props.className - Optional Tailwind classes to customize layout and background.
 * @returns The tab list container.
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * Interactive button used to switch between tab panels.
 *
 * @component
 * @param props - Extends `TabsPrimitive.Trigger` props.
 * @param props.className - Optional Tailwind classes for styling the active/inactive states.
 * @returns A styled tab trigger button.
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * Content area that corresponds to a specific tab trigger.
 *
 * @component
 * @param props - Extends `TabsPrimitive.Content` props.
 * @param props.className - Optional Tailwind classes to adjust spacing and focus ring.
 * @returns The tab panel content section.
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
