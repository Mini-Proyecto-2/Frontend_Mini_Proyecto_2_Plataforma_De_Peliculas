/**
 * @file Avatar Component
 * @description Accessible avatar component for displaying user profile images with fallback support.
 * Built on Radix UI Avatar primitives with automatic image loading states.
 * 
 * Features:
 * - Automatic image loading with fallback
 * - Circular or custom shaped avatars
 * - Accessible with proper ARIA attributes
 * - Composable API (Avatar + AvatarImage + AvatarFallback)
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/avatar shadcn/ui Avatar Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/avatar Radix UI Avatar}
 */

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Root container component for the Avatar.
 *
 * @component
 * @example
 * ```tsx
 * import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
 *
 * <Avatar>
 *   <AvatarImage src="https://example.com/user.jpg" alt="@username" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 *
 * @remarks
 * - Wraps `AvatarPrimitive.Root` from Radix.
 * - Ensures the avatar is displayed as a circle with fixed size.
 *
 * @param props - Standard `div` props forwarded to the root element.
 * @returns JSX.Element representing the avatar container.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * Image component for the Avatar.
 *
 * @component
 * @example
 * ```tsx
 * <AvatarImage src="https://example.com/user.jpg" alt="@username" />
 * ```
 *
 * @remarks
 * - Renders the user's profile picture.
 * - Automatically fills the container dimensions and keeps aspect ratio.
 * - Falls back to `AvatarFallback` if the image cannot be loaded.
 *
 * @param props - Standard `img` attributes passed through to the image element.
 * @returns JSX.Element representing the avatar image.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * Fallback content for the Avatar.
 *
 * @component
 * @example
 * ```tsx
 * <AvatarFallback>AB</AvatarFallback>
 * ```
 *
 * @remarks
 * - Displays alternative content (e.g., initials or icons)
 *   when the avatar image fails to load or is not provided.
 * - Styled as a centered element within the circular avatar container.
 *
 * @param props - React children and optional className for customization.
 * @returns JSX.Element representing the avatar fallback content.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/** Exported avatar components for modular composition. */
export { Avatar, AvatarImage, AvatarFallback }
