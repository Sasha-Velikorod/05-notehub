import axios from "axios";
import { Note, NoteTag } from "../types/note";

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await instance.get("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });
  return response.data;
};

export const createNote = async (note: NoteTag): Promise<Note> => {
  const response = await instance.post<Note>(`/notes`, note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete(`/notes/${id}`);
  return response.data;
};
