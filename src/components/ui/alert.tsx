/**
 * @file Alert Component
 * @description Accessible alert/notification component with multiple variants.
 * Built with Radix UI primitives and styled with Tailwind CSS.
 * Supports icons, titles, descriptions, and destructive states.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/alert shadcn/ui Alert Documentation}
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Class variance authority configuration for alert variants.
 *
 * @remarks
 * Defines base styles and variant-specific styles for the alert component.
 * Available variants:
 * - `default`: Neutral or informational appearance.
 * - `destructive`: Red/danger theme for errors or critical alerts.
 *
 * @see {@link https://cva.style} for details on CVA patterns.
 */
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Main alert container component.
 *
 * @component
 * @example
 * ```tsx
 * import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
 * import { AlertCircle } from "lucide-react";
 *
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <div>
 *     <AlertTitle>Error</AlertTitle>
 *     <AlertDescription>Something went wrong while saving.</AlertDescription>
 *   </div>
 * </Alert>
 * ```
 *
 * @param props - Standard `div` attributes and variant props.
 * @returns JSX element representing an alert box.
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

/**
 * Title element for the alert component.
 *
 * @component
 * @example
 * ```tsx
 * <AlertTitle>Warning</AlertTitle>
 * ```
 *
 * @remarks
 * Typically rendered inside an `Alert` to label the type or context of the message.
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/**
 * Description element for the alert component.
 *
 * @component
 * @example
 * ```tsx
 * <AlertDescription>Please check your input fields before submitting.</AlertDescription>
 * ```
 *
 * @remarks
 * Provides a place for extended message text under the alert title.
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

/** Exported alert components for modular use. */
export { Alert, AlertTitle, AlertDescription }
