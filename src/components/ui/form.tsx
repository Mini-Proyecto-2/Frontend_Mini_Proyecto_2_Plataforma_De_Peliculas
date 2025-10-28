

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/**
 * Re-export of `FormProvider` to wrap an entire form tree and provide RHF context.
 *
 * @example
 * ```tsx
 * const methods = useForm();
 * return (
 *   <Form {...methods}>
 *     <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
 *   </Form>
 * );
 * ```
 */
const Form = FormProvider

/**
 * Context value used by `FormField` and `useFormField` to share the field name.
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  /** Registered field name (e.g., "email", "profile.firstName"). */
  name: TName
}

/**
 * Internal React Context to share the current field name down the tree.
 */
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

/**
 * A typed wrapper around `react-hook-form`'s `Controller` that also provides
 * the field name through context for subcomponents (label, control, etc.).
 *
 * @typeParam TFieldValues - RHF field values type (defaults to `FieldValues`).
 * @typeParam TName - Field path within `TFieldValues`.
 *
 * @component
 * @example
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="email"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <input {...field} />
 *       </FormControl>
 *       <FormDescription>We’ll never share your email.</FormDescription>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/**
 * Hook to access the current form field wiring (IDs, name, and validation state).
 * Must be used within a `FormField` and a `FormItem` so that both contexts are available.
 *
 * @throws {Error} If used outside of a `FormField` provider.
 *
 * @example
 * ```tsx
 * const { id, formItemId, formMessageId, error } = useFormField();
 * ```
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

/**
 * Context value that exposes a unique base ID for a `FormItem` subtree.
 */
type FormItemContextValue = {
  /** Unique base id used to derive ARIA attributes and element ids. */
  id: string
}

/**
 * Internal React Context to share the generated base id for a `FormItem`.
 */
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

/**
 * Structural wrapper for a single form field block. Generates a unique id
 * and provides it to descendants for consistent ARIA labelling.
 *
 * @component
 * @param props - Standard `div` attributes; `className` is merged with defaults.
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Username</FormLabel>
 *   <FormControl><input /></FormControl>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

/**
 * Accessible label bound to the current field via `htmlFor`.
 * Automatically turns red when the field has a validation error.
 *
 * @component
 * @param props - Radix `Label` root props; `className` is merged.
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

/**
 * Slot wrapper that binds the correct `id`, `aria-describedby`, and `aria-invalid`
 * attributes to the actual form control (e.g., input, textarea, select).
 *
 * @component
 * @param props - Radix `Slot` props; children should be a control element.
 *
 * @example
 * ```tsx
 * <FormControl>
 *   <input type="text" {...field} />
 * </FormControl>
 * ```
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

/**
 * Optional helper text that describes the field. Associated via `aria-describedby`.
 *
 * @component
 * @param props - Standard `p` attributes; `className` is merged.
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

/**
 * Validation message region for the field. Automatically displays
 * the field error message from `react-hook-form`, if present.
 *
 * @component
 * @param props - Standard `p` attributes; `className` is merged.
 * @remarks
 * - Returns `null` if there is no error and no explicit children.
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
