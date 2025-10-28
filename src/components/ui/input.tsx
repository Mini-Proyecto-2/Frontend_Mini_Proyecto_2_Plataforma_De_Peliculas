/**
 * @file Input Component
 * @description Accessible, styled input field component with comprehensive state management.
 * Supports all native input types with consistent styling across browsers.
 * Built with accessibility, focus states, and file upload support.
 * 
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/input shadcn/ui Input Documentation}
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Reusable styled input field.
 *
 * @component
 * @param props - Standard HTML input attributes.
 * @param props.className - Optional additional classes to override or extend default styling.
 * @param props.type - Input type (e.g., "text", "email", "password").
 * @returns A styled input element supporting forwarded refs.
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="Enter your email" />
 * ```
 *
 * @example
 * ```tsx
 * With React Hook Form
 * <FormField
 *   control={form.control}
 *   name="email"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <Input type="email" {...field} />
 *       </FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-primary shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm autofill:bg-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
