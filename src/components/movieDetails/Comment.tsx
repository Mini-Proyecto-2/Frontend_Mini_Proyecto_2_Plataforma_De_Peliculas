import React from 'react';
import { Pencil } from 'lucide-react';
import { getGradientFromString, getInitials } from '@/lib/avatar';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { deleteComment } from '@/service/comments';
import { DeleteAlert } from '../alerts/delete';

interface CommentProps {
  author: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  text: string;
  createdAt: string;
  reload: () => void;
  id?: string;
}

const Comment: React.FC<CommentProps> = ({ author, text, createdAt, id, reload }) => {
  const handleDeleteComment = async () => {
    if (!id) return;
    try {
      await deleteComment(id);
      reload();
      toast.success("Comentario eliminado");
    } catch (error) {
      toast.error("Error al eliminar el comentario");
    }
  };

  const fullName = `${author.firstName} ${author.lastName}`;
  const gradient = getGradientFromString(author.firstName);
  const initials = getInitials(author.firstName, author.lastName);

  return (
    <div className="flex gap-3 p-4 bg-neutral-900 rounded-lg justify-between">
      <div className="flex gap-4">
        {/* Avatar con iniciales */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold`}>
          {initials}
        </div>
        <section className="flex flex-col">
          <div className="flex flex-col">
            <span className='font-semibold text-lg'>
              {fullName}
            </span>
            <span className="text-gray-400 text-[0.7rem] font-normal">{new Date(createdAt).toLocaleString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed mt-2">{text}</p>
        </section>
      </div>

      {/* Contenido */}
      <div className="flex gap-2 items-start">
        {id && (
          <Button
            onClick={() => console.log("Editando: ", id)}
            variant="ghost"
            size="icon"
            className="p-1.5 hover:bg-neutral-800 rounded transition-colors text-neutral-400 hover:text-white"
            aria-label="Editar comentario"
          >
            <Pencil size={16} />
          </Button>
        )}
        {id && (
          <DeleteAlert
            title="Eliminar comentario"
            description="¿Estás seguro de eliminar este comentario?"
            onConfirm={() => handleDeleteComment()}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;