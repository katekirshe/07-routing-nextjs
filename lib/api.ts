import axios from "axios";
import type { Note, Tag } from "../types/note";
export type TagSortBy = "created" | "updated";

const authToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api/",
  headers: { Authorization: `Bearer ${authToken}` },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesRequest {
  search?: string;
  tag?: Tag;
  page?: number;
  sortBy?: TagSortBy;
}

export async function fetchNotes({
  search,
  tag,
  page,
  sortBy,
}: FetchNotesRequest): Promise<FetchNotesResponse> {
  const response = await instance.get<FetchNotesResponse>("notes", {
    params: {
      search,
      tag,
      page,
      perPage: 10,
      sortBy,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await instance.get<Note>(`notes/${id}`);
  return response.data;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: Tag;
}

export async function createNote(params: CreateNote): Promise<Note> {
  const response = await instance.post<Note>("notes", params);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await instance.delete<Note>(`notes/${id}`);
  return response.data;
}
