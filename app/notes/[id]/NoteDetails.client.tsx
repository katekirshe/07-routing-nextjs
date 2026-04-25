"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import NoteDetails from "@/components/NoteDetails/NoteDetails";

function NoteDetailClient() {
  const params = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["NotesById", params.id],
    queryFn: () => fetchNoteById(params.id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !data) {
    return <p>Something went wrong.</p>;
  }

  if (data) {
    return <NoteDetails note={data} />;
  }
}

export default NoteDetailClient;
