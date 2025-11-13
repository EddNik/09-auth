import { NewNote, NoteDraftStore } from "@/types/notes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (note) => set(() => ({ draft: note })),
        clearDraft: () => {},
      };
    },
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
