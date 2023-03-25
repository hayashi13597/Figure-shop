import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination w-full flex justify-center items-center">
      {currentPage == 1 ? null : (
        <BsArrowLeft
          className="text-xl cursor-pointer opacity-40 mr-2"
          onClick={() => onPageChange(currentPage - 1)}
        />
      )}
      <div className="pagination-node">
        {pageNumbers.map((number, key) => (
          <Link
            to="#"
            className={
              number === currentPage ? "page-node current" : "page-node"
            }
            onClick={(e) => {
              e.preventDefault();
              onPageChange(number);
            }}
            key={key}
          >
            {number}
          </Link>
        ))}
      </div>
      {currentPage == totalPages ? null : (
        <BsArrowRight
          className="text-xl cursor-pointer opacity-40 ml-2"
          onClick={() => onPageChange(currentPage + 1)}
        />
      )}
    </div>
  );
};

export default Pagination;
