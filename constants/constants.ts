import { NoteTag } from "@/types/note";

export const tags: NoteTag[] = [
  "Choose category",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export const privateRoutes = ["/profile", "/notes"];
export const publicRoutes = ["/sign-in", "/sign-up"];
