import React from 'react';
import ReactPaginate from 'react-paginate';
interface IProps {
  itemsPerPage: number;
  pageCount: number;
  currentPage: number;
  handlePageClick?: (e: any) => void;
}
const PaginatedItems = ({ pageCount, currentPage, handlePageClick }: IProps) => {
  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='>'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel='<'
      renderOnZeroPageCount={null}
      className='pagination'
      forcePage={currentPage}
    />
  );
};

export default PaginatedItems;
