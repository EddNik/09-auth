import { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create a new note",
  description: "Create a new note in your NoteHub.",
  openGraph: {
    title: "Create a new note",
    description: "Create a new note in your NoteHub.",
    url: `https://08-zustand-blond-seven.vercel.app/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub image",
      },
    ],
  },
};
function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create a new note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
