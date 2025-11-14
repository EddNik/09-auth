import { Note, NoteTag } from "@/types/note";
import { cookies } from "next/headers";
import { api } from "./api";
import { CheckSessionRequest, User } from "@/types/user";
import { AxiosResponse } from "axios";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number,
  tag?: NoteTag
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

  const options = {
    params: {
      page,
      perPage: 12,
      tag,
      ...(query.trim() !== "" && { search: query.trim() }),
    },
    headers: { Cookie: cookieStore.toString() },
  };

  try {
    const { data } = await api.get<FetchNotesResponse>("/notes", options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const cookieStore = await cookies();
  const options = {
    headers: { Cookie: cookieStore.toString() },
  };
  try {
    const { data: note } = await api.get<Note>(`/notes/${id}`, options);
    return note;
  } catch (error) {
    throw error;
  }
}

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  const options = {
    headers: { Cookie: cookieStore.toString() },
  };
  try {
    const { data } = await api.get<User>("/users/me", options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const options = {
    headers: { Cookie: cookieStore.toString() },
  };
  try {
    const response = await api.get("/auth/session", options);
    return response;
  } catch (error) {
    throw error;
  }
}
