"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { NewNote } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { tags } from "@/constants/constants";

function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutationCreate = useMutation({
    mutationKey: ["notes"],
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
    onError: (error) => {
      if (draft.tag === "Choose category") {
        toast.error("Please select a valid tag before saving.");
      } else {
        toast.error(`Failed to create note. ${error?.message}`);
      }
    },
  });

  function handleSubmit(formData: FormData) {
    const noteObj = Object.fromEntries(formData) as NewNote;
    mutationCreate.mutate(noteObj);
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  }

  function handleCancel() {
    router.back();
  }

  return (
    <>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className={css.input}
            onChange={handleChange}
            defaultValue={draft?.title}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft?.content}
            onChange={handleChange}
            maxLength={500}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            name="tag"
            id="tag"
            className={css.select}
            defaultValue={draft?.tag}
            onChange={handleChange}
          >
            {tags.map((tag) => {
              return (
                <option
                  key={tag}
                  value={tag}
                  disabled={tag === "Choose category"}
                >
                  {tag}
                </option>
              );
            })}
          </select>
        </div>
        <div className={css.actions}>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" disabled={mutationCreate.isPending}>
            {mutationCreate.isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </form>
    </>
  );
}

export default NoteForm;
