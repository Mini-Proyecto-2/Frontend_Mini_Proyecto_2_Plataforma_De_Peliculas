import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Form, FormControl } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { FormField, FormItem, FormMessage, FormDescription } from "../ui/form";
import type { CommentFormValues } from "../movieDetails/CommentCreate";
import { commentSchema } from "../movieDetails/CommentCreate";

interface EditAlertProps {
  title: string;
  description: string;
  onConfirm: (newText: string) => Promise<void>;
}

export const EditAlert = ({ title, description, onConfirm }: EditAlertProps) => {
  const [loading, setLoading] = useState(false);

  const commentForm = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: description,
    },
  });

  const handleAction = async () => {
    setLoading(true);
    try {
      await onConfirm("");
    } catch (error) {
      console.error("Error al ejecutar acción", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="p-1.5 hover:bg-neutral-800 rounded transition-colors text-neutral-400 hover:text-primary"
          aria-label="Editar"
        >
          <Pencil size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary flex items-center gap-2"><Pencil />{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...commentForm}>
          <form onSubmit={commentForm.handleSubmit(handleAction)}>
            <FormField
              control={commentForm.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="comment"
                      placeholder="Escribe tu comentario..."
                      maxLength={100}
                      disabled={loading}
                      className="bg-white text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="ps-2" />
                  <FormDescription className="flex justify-between ps-2">
                    <span className="text-primary">{field.value.length}/100 caracteres</span>
                    <section className="flex gap-4 mt-2">
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Editando..." : "Editar"}
                      </Button>
                    </section>
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};