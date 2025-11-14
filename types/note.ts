export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: NoteTag;
}

export type NoteTag =
  | "Choose category"
  | "Todo"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping";

export type NewNote = {
  title: string;
  tag: NoteTag;
  content?: string;
};

export interface NoteDraftStore {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}
