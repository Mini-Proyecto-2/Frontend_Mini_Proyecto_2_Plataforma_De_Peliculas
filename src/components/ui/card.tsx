/**
 * @file Card Component
 * @description Flexible, composable card component for displaying content in contained sections.
 * Provides semantic structure with header, title, description, content, and footer areas.
 * Styled with Tailwind CSS and theme-aware colors.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/card shadcn/ui Card Documentation}
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Root Card container component.
 *
 * @component
 * @example
 * ```tsx
 * import {
 *   Card,
 *   CardHeader,
 *   CardTitle,
 *   CardDescription,
 *   CardContent,
 *   CardFooter
 * } from "@/components/ui/card";
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Payment Summary</CardTitle>
 *     <CardDescription>Review your transaction details</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>$45.00 - Monthly Subscription</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Confirm</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * @remarks
 * - Renders a bordered container with background, text, and shadow.
 * - Can contain any of the subcomponents or custom children.
 *
 * @param props - Standard HTML `div` attributes.
 * @returns JSX element representing the main card container.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * Card header container.
 *
 * @component
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Dashboard</CardTitle>
 *   <CardDescription>Overview of your analytics</CardDescription>
 * </CardHeader>
 * ```
 *
 * @remarks
 * - Typically placed at the top of the card.
 * - Provides vertical spacing and padding for titles and descriptions.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * Card title text element.
 *
 * @component
 * @example
 * ```tsx
 * <CardTitle>User Profile</CardTitle>
 * ```
 *
 * @remarks
 * - Typically used inside `CardHeader`.
 * - Styled with bold typography and reduced letter spacing.
 */
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * Card description text element.
 *
 * @component
 * @example
 * ```tsx
 * <CardDescription>Short description text</CardDescription>
 * ```
 *
 * @remarks
 * - Typically used below a `CardTitle` in `CardHeader`.
 * - Uses muted foreground color and smaller font size.
 */
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * Card content container.
 *
 * @component
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Main content goes here</p>
 * </CardContent>
 * ```
 *
 * @remarks
 * - Used for the primary content area inside the card.
 * - Includes horizontal padding and removes top padding for visual balance.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * Card footer container.
 *
 * @component
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button variant="primary">Save</Button>
 * </CardFooter>
 * ```
 *
 * @remarks
 * - Usually contains actions like buttons or links.
 * - Positioned at the bottom of the card with padding.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

/** Exported card subcomponents for modular composition. */
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
