import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteAlertProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
}

export const DeleteAlert = ({ title, description, onConfirm }: DeleteAlertProps) => {
  const [loading, setLoading] = useState(false);
  
  const handleAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error al ejecutar acción", error);
    } finally {
      e.stopPropagation();
      setLoading(false);
    }
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="p-1.5 hover:bg-neutral-800 rounded transition-colors text-neutral-400 hover:text-red-500"
          aria-label="Eliminar comentario"
        >
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-destructive">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="text-primary hover:border-primary">
              Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAction} className="bg-destructive hover:bg-destructive/80">
              {loading ? 'Eliminando...' : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};