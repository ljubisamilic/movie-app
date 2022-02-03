import React from "react";

const Pagination = ({ total, page, setPage, limit }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumber.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumber.map((number) => {
        return (
          <li key={number}>
            <button
              className={page === number ? "active" : ""}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
