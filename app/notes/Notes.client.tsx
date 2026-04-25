"use client";
import { useState } from "react";
import css from "./Notes.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error } = useQuery({
    queryKey: ["Notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  console.log(error);

  const handleChange = useDebouncedCallback((value) => {
    setSearch(value);
    setPage(1);
  }, 300);

  function onBtnClick() {
    setIsModalOpen(true);
  }

  function onClose() {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={handleChange} />
        {(data?.totalPages || 0) > 1 && (
          <Pagination
            totalPages={data?.totalPages || 0}
            setPage={setPage}
            page={page}
          />
        )}
        {
          <button className={css.button} onClick={onBtnClick}>
            Create note +
          </button>
        }
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data?.notes} />}
      {isModalOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
