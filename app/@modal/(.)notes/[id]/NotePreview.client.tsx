"use client";
import { useParams } from "next/navigation";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Note } from "@/types/note";
import Loader from "@/app/loading";
import Error from "@/app/error";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (isError) return <Error error={error} />;

  const onClose = () => {
    router.back();
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString("en-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.date}>{formatDate(note.createdAt)}</p>
          </div>
        )}
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Back
        </button>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
