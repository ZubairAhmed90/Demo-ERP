import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ count, page, onPageChange }) => {
  return (
    <div className="flex justify-end my-5">
      <MuiPagination
        count={count}
        page={page}
        onChange={onPageChange}
        variant="outlined"
        color="primary"
      />
    </div>
  );
};

export default Pagination;
