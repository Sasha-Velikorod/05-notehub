import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { fetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes({ page: currentPage, search }),
    placeholderData: keepPreviousData,
  });

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
    setCurrentPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        <Pagination currentPage={currentPage} onChange={setCurrentPage} />
        <button className={css.button} onClick={() => setModalIsOpen(true)}>
          Create note +
        </button>
      </header>
      {data && <NoteList notes={data.notes} />}
      {modalIsOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onCloseModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
