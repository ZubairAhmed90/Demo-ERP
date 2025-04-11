"use client";

import Link from 'next/link';
import { FaRegEye } from "react-icons/fa";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useColor } from '../context/ColorContext';
import Layout from '../components/layout/Layout';
import { IoMdAdd } from "react-icons/io";
import Pagination from '../components/pagination/pagination';
import TextBar from '../components/fields/textField/textBar';
import AddButton from '../components/buttons/addButton/addButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, name, action) {
  return { id, name, action };
}

const allRows = [
  createData('CM-001', "Techno", ""),
  createData('CM-002', "Oppo", ""),
  createData('CM-003', "Infinix", ""),
  createData('CM-004', "TechCorp", ""),
  createData('CM-005', "AlphaTech", ""),
  createData('CM-006', "CyberNet", ""),
];

const rowsPerPage = 3;

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [create, setCreate] = useState(false);

  const { primaryColor, secondaryColor } = useColor();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = allRows.filter((row) =>
    row.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Layout>
  <main className="flex-1 p-3 bg-gray-100 flex justify-center items-center">
    <Paper
      elevation={3}
      style={{
        backgroundColor: 'white',
        border: '1px solid #d0d0d0',
        borderRadius: '8px',
        padding: '20px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Manage Company Section */}
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold mt-1 text-black ml-4">Manage Company</p>
        <Link href="/create-company">
          <AddButton label="Create Company" fontSize="md" primaryColor={primaryColor}/>
        </Link>
      </div>
      <hr className="border-gray-700 w-full" />

      {/* Centering the input field */}
      <div className="w-full flex justify-center mt-8">
    <input
      type="text"
      placeholder="Search by User ID"
      value={searchQuery}
      onChange={handleSearch}
      className="w-full p-3 border flex justify-center items-center border-gray-300 rounded-md focus:outline-none focus:ring-2"
      style={{ 
        maxWidth: '1200px',
        backgroundColor: secondaryColor,
        color: 'black', 
      }}
    />
  </div>

      {/* Centering the table */}
      <div className="w-full flex justify-center">
        <TableContainer component={Paper} className="mt-8" sx={{ maxWidth: 1200 }}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="font-bold" sx={{ width: '20%' }}>Company ID</StyledTableCell>
                <StyledTableCell className="font-bold" align="left" sx={{ width: '20%' }}>Company Name</StyledTableCell>
                <StyledTableCell className="font-bold" align="left" sx={{ width: '20%' }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="flex">
                      <FaRegEye size={36} className="border-2 border-blue-600 p-2 rounded-full" />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Pagination */}
      <div className="mr-28">
        <div className="w-full flex justify-end mt-8">
          <Pagination
            count={Math.ceil(filteredRows.length / rowsPerPage)}
            page={page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Paper>
  </main>
</Layout>

  );
};

export default Page;
