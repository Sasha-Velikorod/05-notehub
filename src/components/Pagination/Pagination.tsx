import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";

interface PaginationProps {
  onChange: (page: number) => void;
  currentPage: number;
}
const Pagination = ({ onChange, currentPage }: PaginationProps) => {
  const { data } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes({ page: currentPage }),
  });

  const totalPages = data?.totalPages ?? 0;

  if (totalPages < 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
