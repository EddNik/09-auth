import { NewNote, Note, NoteTag } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  tag?: NoteTag,
  page?: number
): Promise<FetchNotesResponse> {
  const options = {
    params: {
      page,
      perPage: 12,
      tag,
      ...(query.trim() !== "" && { search: query.trim() }),
    },
  };

  try {
    const { data } = await api.get<FetchNotesResponse>("/notes", options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  try {
    const { data: note } = await api.get<Note>(`/notes/${id}`);
    return note;
  } catch (error) {
    throw error;
  }
}

export async function createNote(newNote: NewNote): Promise<Note> {
  try {
    const { data: note } = await api.post<Note>("/notes", newNote);
    return note;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id: Note["id"]): Promise<Note> {
  try {
    const { data: note } = await api.delete(`/notes/${id}`);
    return note;
  } catch (error) {
    throw error;
  }
}

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export async function register(request: RegisterRequest): Promise<User> {
  try {
    const response = await api.post<User>("/auth/register", request);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(request: LoginRequest): Promise<User> {
  try {
    const response = await api.post<User>("/auth/login", request);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    throw error;
  }
}

export interface CheckSessionRequest {
  success: boolean;
}

export async function checkSession(): Promise<boolean> {
  try {
    const response = await api.get<CheckSessionRequest>("/auth/session");
    return response.data.success;
  } catch (error) {
    throw error;
  }
}

export interface UpdateMeRequest {
  email: string;
  username: string;
}
export async function getMe(): Promise<User> {
  try {
    const { data } = await api.get<User>("/users/me");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateMe(request: UpdateMeRequest): Promise<User> {
  try {
    const { data } = await api.patch<User>("/users/me", request);
    return data;
  } catch (error) {
    throw error;
  }
}
