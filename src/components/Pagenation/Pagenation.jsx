import { useEffect, useRef } from "react";
import "./Pagination.css";
import { GrPrevious, GrNext } from "react-icons/gr";

const Pagination = ({ setPage, length, page }) => {

  const num = useRef();

  useEffect(() => {
    num.current.textContent = page;
  }, [page, setPage]);

  const prevHandler = () => {
    setPage(page <= 1 ? page : page - 1);
  };

  const nextHandler = () => {
    setPage(page < length ? page + 1 : page);
  };

  return (
    <div className="pagination-container">
      <button>
        <GrPrevious onClick={prevHandler} />
    </button>

      <span ref={num}>1</span>
      <button onClick={nextHandler}>
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
