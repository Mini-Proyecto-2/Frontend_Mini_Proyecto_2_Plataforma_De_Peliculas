import { createComment } from "@/service/comments";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CommentCreateProps {
  id: number;
  reload: () => void;
}

// Schema de validación
export const commentSchema = z.object({
  comment: z
    .string()
    .min(1, "El comentario no puede estar vacío")
    .max(100, "El comentario debe tener máximo 100 caracteres"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;

const CommentCreate: React.FC<CommentCreateProps> = ({ id, reload }) => {
  const [isSending, setIsSending] = useState(false);

  const commentForm = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: CommentFormValues) => {
    setIsSending(true);
    try {
      await createComment(data.comment, id);
      commentForm.reset();
      toast.success("Comentario creado exitosamente.");
      reload();
    } catch (error) {
      toast.error("Error al crear el comentario. Intenta de nuevo.");
      commentForm.setError("comment", {
        type: "manual",
        message: "Error al crear el comentario. Intenta de nuevo.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Form {...commentForm}>
      <form onSubmit={commentForm.handleSubmit(onSubmit)} className="space-y-4">
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
                  disabled={isSending}
                  className="bg-white text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage className="ps-2"/>
              <FormDescription className="flex justify-between mt-4 ps-2">
                <span className="text-white">{field.value.length}/100 caracteres</span>
                <Button type="submit" disabled={isSending}>
                  {isSending ? "Enviando..." : "Enviar comentario"}
                </Button>
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default CommentCreate;