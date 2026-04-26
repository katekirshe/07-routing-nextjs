import NoteDetailClient from "@/app/notes/[id]/NoteDetails.client";
import NotePreviewModal from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["NotesById", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <NotePreviewModal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailClient />
      </HydrationBoundary>
    </NotePreviewModal>
  );
};

export default NotePreview;
