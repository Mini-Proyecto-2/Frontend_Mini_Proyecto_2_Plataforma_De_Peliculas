import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { getGradientFromString, getInitials } from '@/lib/avatar';

interface CommentProps {
  author: {
    firstName: string;
    lastName: string;
  };
  text: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const Comment: React.FC<CommentProps> = ({ author, text, onEdit, onDelete }) => {
  const fullName = `${author.firstName} ${author.lastName}`;
  const gradient = getGradientFromString(author.firstName);
  const initials = getInitials(author.firstName, author.lastName);

  return (
    <div className="flex gap-3 p-4 bg-neutral-900 rounded-lg lg:w-1/3 w-full lg:min-w-[600px] lg:max-w-[800px]">
      {/* Avatar con iniciales */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold`}>
        {initials}
      </div>
      
      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <strong className="text-white">{fullName}</strong>
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-1.5 hover:bg-neutral-800 rounded transition-colors text-neutral-400 hover:text-white"
                aria-label="Editar comentario"
              >
                <Pencil size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-1.5 hover:bg-neutral-800 rounded transition-colors text-neutral-400 hover:text-red-500"
                aria-label="Eliminar comentario"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
        <p className="text-neutral-300 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
};