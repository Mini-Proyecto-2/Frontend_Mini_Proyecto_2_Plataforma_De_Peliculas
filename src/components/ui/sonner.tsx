/**
 * @file Toaster Component
 * @description Toast notification system wrapper built on Sonner library.
 * Provides themed, accessible toast notifications with automatic dark mode support.
 * Displays temporary messages for success, error, loading, and info states.
 * 
 * Built on Sonner by Emil Kowalski.
 * Part of shadcn/ui component library.
 * @see {@link https://ui.shadcn.com/docs/components/sonner shadcn/ui Sonner Documentation}
 * @see {@link https://sonner.emilkowal.ski/ Sonner Library}
 */

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

/**
 * Props for the Toaster component, extending all native `Sonner` options.
 */
type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * Global toast provider that adapts to the current Next.js theme.
 *
 * @component
 * @param props - All `Sonner` props plus automatic theme handling.
 * @returns A themed toast container for displaying notifications.
 *
 * @example
 * ```tsx
 * import { toast } from "sonner"
 *
 * toast.success("Settings saved successfully!")
 * toast.error("Something went wrong.")
 * ```
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
