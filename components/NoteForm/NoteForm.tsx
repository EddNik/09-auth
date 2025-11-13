import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { useRouter } from "next/router";
import { createNote } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { NewNote } from "@/types/notes";

function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

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

  return (
    <>
      <form action={handleSubmit}>
        <div>
          <label></label>
          <input type="text" />
        </div>
        <div>
          <label></label>
          <input type="text" />
        </div>
        <div>
          <label></label>
          <input type="text" />
        </div>
      </form>
    </>
  );
}
