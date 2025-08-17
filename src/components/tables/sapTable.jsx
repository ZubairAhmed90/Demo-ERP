import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Paper, Button, Box } from '@mui/material';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const SapTable = ({ tabValue, rows, primaryColor, handleInputChange, handleDeleteRow, handleAddRow, fieldConfigs }) => {
  return (
    <TabPanel
      value={tabValue}
      index={0}
      style={{ padding: '1px', overflowY: 'auto' }}
    >
      <div className="table-container" style={{ overflowX: 'auto', width: '99%' }}>
        <Table component={Paper} className="shadow-sm shadow-slate-800 px-12">
          <TableHead>
            <TableRow>
              <TableCell className="text-sm font-bold">S No.</TableCell>
              {fieldConfigs.map((field) => (
                <TableCell key={field.name} className="text-sm font-bold">{field.label}</TableCell>
              ))}
              <TableCell className="text-sm font-bold text-center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {fieldConfigs.map((field) => (
                  <TableCell key={field.name}>
                    <TextField
                      name={field.name}
                      value={row[field.name]}
                      onChange={(e) => handleInputChange(rowIndex, e)}
                      size="small"
                      inputProps={{ style: { fontSize: "12px" } }}
                    />
                  </TableCell>
                ))}
                <TableCell className="flex justify-center">
                  <Button
                    onClick={() => handleDeleteRow(rowIndex)}
                    sx={{
                      transition: "background-color 0.3s, color 0.3s",
                      color: `${primaryColor}`,
                      fontSize: "16px",
                      "&:hover": { color: "red" },
                    }}
                  >
                    <RiDeleteBin6Line
                      size={30}
                      className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                    />
                  </Button>
                  <Button
                    onClick={() => handleAddRow(rowIndex)}
                    sx={{
                      transition: "background-color 0.3s, color 0.3s",
                      color: `${primaryColor}`,
                      fontSize: "16px",
                    }}
                  >
                    <IoMdAdd
                      size={30}
                      className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabPanel>
  );
};

export default SapTable;
