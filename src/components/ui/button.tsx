/**
 * @file Button Component
 * @description Versatile, accessible button component with multiple variants and sizes.
 * Built with Radix UI Slot for composition and styled with Tailwind CSS.
 * Supports polymorphic rendering via asChild prop.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/button shadcn/ui Button Documentation}
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Class variance authority configuration for the `Button` component.
 *
 * @remarks
 * Defines button variants (`variant`) and size options (`size`),
 * along with their respective TailwindCSS utility classes.
 *
 * Variants:
 * - `default`: Primary brand button (filled, colored).
 * - `destructive`: Red/danger variant for destructive actions.
 * - `outline`: Bordered button with subtle hover state.
 * - `secondary`: Neutral background button for secondary actions.
 * - `ghost`: Minimalist button with transparent background.
 * - `link`: Text-style button with underline hover.
 *
 * Sizes:
 * - `default`: Standard height (h-9).
 * - `sm`: Compact button (h-8).
 * - `lg`: Large button (h-10).
 * - `icon`: Square button for icons.
 *
 * @see {@link https://cva.style} for the CVA API documentation.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Props for the {@link Button} component.
 *
 * @property asChild - When true, renders the button as a child element using `@radix-ui/react-slot`.
 * This allows styling of custom elements (like `<Link>` or `<a>`) with button variants.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    /** Render the button as a custom child element instead of a native `<button>`. */
  asChild?: boolean
}

/**
 * Primary Button component.
 *
 * @component
 * @example
 * ```tsx
 * import { Button } from "@/components/ui/button";
 *
 * Default button
 * <Button>Click me</Button>
 *
 * Destructive variant
 * <Button variant="destructive">Delete</Button>
 *
 * Icon-only button
 * <Button size="icon">
 *   <Trash className="h-4 w-4" />
 * </Button>
 *
 * AsChild example (rendering a Link)
 * <Button asChild variant="link">
 *   <a href="/about">About</a>
 * </Button>
 * ```
 *
 * @remarks
 * - Automatically handles focus and disabled states.
 * - Works with SVG icons (applies size and spacing automatically).
 * - Fully keyboard and screen-reader accessible.
 *
 * @param props - Button attributes and variant configuration.
 * @returns JSX.Element representing the styled button.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

/** Exported button and its variant configuration. */
export { Button, buttonVariants }
