import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Tag } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const tag =
    slug[0] === "all"
      ? undefined
      : ["Meeting", "Personal", "Shopping", "Todo", "Work"].includes(slug[0])
        ? slug[0]
        : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["Notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, search: "", tag: tag as Tag }),
  });

  // console.log("Notes", 1, "", tag);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
