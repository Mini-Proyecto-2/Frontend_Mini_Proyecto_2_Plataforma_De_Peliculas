import { getCommentsByMovie } from "@/service/comments";
import { useEffect, useState } from "react";
import type { Comment as CommentType } from "@/types/comments";
import { toast } from "sonner";
import Comment from "./Comment";
import { Skeleton } from "@/components/ui/skeleton";
import CommentCreate from "./CommentCreate";

type CommentSectionProps = {
  id: number;
}

export const CommentSection = ({ id }: CommentSectionProps) => {
  const [userComments, setUserComments] = useState<CommentType[]>([]);
  const [otherComments, setOtherComments] = useState<CommentType[]>([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const data = await getCommentsByMovie(id);
        setUserComments(data.userComments);
        setOtherComments(data.otherComments);
      } catch (error) {
        toast.error("Error cargando los comentarios");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [id, reload]);

  const totalComments = userComments.length + otherComments.length;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1280px]">
      <div className="sticky-none lg:sticky top-46 h-max space-y-4">
        <section className="flex justify-between gap-2">
          <h3 className="font-bold text-2xl">Comentarios</h3>
          {!loading && (
            <p>{totalComments} {totalComments === 1 ? 'comentario' : 'comentarios'}</p>
          )}
        </section>
        <CommentCreate id={id} reload={() => setReload(!reload)} />
      </div>
      <section className="flex flex-col gap-4 lg:-mt-12 mt-0">
        {loading ? (
          <>
            {[...Array(7)].map((_, index) => (
              <Skeleton key={index} className="h-20" />
            ))}
          </>
        ) : (
          <>
            {userComments.map((comment) => (
              <Comment key={comment._id} author={comment.userId} text={comment.description} id={comment._id} createdAt={comment.createdAt} reload={() => setReload(!reload)} />
            ))}
            {otherComments.map((comment) => (
              <Comment key={comment._id} author={comment.userId} text={comment.description} createdAt={comment.createdAt} reload={() => setReload(!reload)} />
            ))}
          </>)}
      </section>
    </section>
  );
}
