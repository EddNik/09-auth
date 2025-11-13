"use client";

import { NoteTag } from "@/types/notes";
import css from "./NotesPage.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/app/loading";
import Link from "next/link";
import Pagination from "@/components/Pagination/Pagination";
import toast from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";

interface NotesClientProps {
  tag?: NoteTag;
}

function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [debouncedQuery] = useDebounce(query, 500);
  const toastShown = useRef(false);

  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, tag, page],
    queryFn: () => fetchNotes(debouncedQuery, tag, page),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (toastShown.current) return;
    if (isError) {
      toast.error(error.message);
      toastShown.current = true;
    }

    if (isSuccess && data.notes.length === 0) {
      toast.error("No notes found for your request");
      toastShown.current = true;
    }
  }, [isError, isSuccess, error, data]);

  useEffect(() => {
    toastShown.current = false;
  }, [query, page]);

  function handleQuery(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox setQuery={handleQuery} query={query} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              setPage={setPage}
            />
          )}
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </header>
      </div>

      <main>
        {isLoading && <Loader />}
        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}
      </main>
    </>
  );
}

export default NotesClient;
