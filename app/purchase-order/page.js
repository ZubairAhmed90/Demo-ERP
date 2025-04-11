"use client";
import Layout from "../components/layout/Layout";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useColor } from "../context/ColorContext";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { font } from "../components/font/poppins";
import AddButton from "../components/buttons/addButton/addButton";
import { IoMdAdd } from "react-icons/io";
import SapDropDown from "../components/fields/dropDown/sapDropDown";
import SapTextField from "../components/fields/sapFields/sapTextField";
import SapDateField from "../components/fields/date/sapDateField";
import SapDropdownButton from "../components/buttons/sapDropdownButton/sapDropdownButton";
import SapCancelButton from "../components/buttons/sapCancelButton/SapCancelButton";
import SapCopyButton from "../components/buttons/sapCopyButton/SapCopyButton";
import SapCopyFromDropDown from "../components/fields/dropDown/sapCopyFromDropDown";

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

function Page() {
  const [formData, setFormData] = useState({
    businessPartner: "",
    name: "",
    contactPerson: "",
    shipTo: "",
    no: "",
    status: "",
    postingDate: "",
    dueDate: "",
    documentDate: "",
    fromWarehouse: "",
    toWarehouse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [rows, setRows] = useState([
    {
      itemNo: 1,
      description: "",
      fromWarehouse: "WHS-0001",
      toWarehouse: "WHS-0001",
      quantity: "",
      uomCode: "",
      uomName: "",
      moisture: "0.00",
      rejection: "",
      grade: "",
      value: "",
    },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        itemNo: rows.length + 1,
        description: "",
        fromWarehouse: "",
        toWarehouse: "",
        quantity: "",
        uomCode: "",
        uomName: "",
        moisture: "",
        rejection: "",
        grade: "",
        value: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const [rowsA, setRowsA] = useState([
    {
      itemNo: 1,
      targetpath: "",
      filename: "",
      attacheddate: "",
      freetext: "",
      copytotargetdocument: "",
    },
  ]);

  const handleInputChangeA = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsA];
    updatedRows[index][name] = value;
    setRowsA(updatedRows);
  };

  const handleAddRowA = () => {
    setRowsA([
      ...rowsA,
      {
        itemNo: rowsA.length + 1,
        targetpath: "",
        filename: "",
        attacheddate: "",
        freetext: "",
        copytotargetdocument: "",
      },
    ]);
  };

  const handleDeleteRowA = (index) => {
    const updatedRows = rowsA.filter((_, rowIndex) => rowIndex !== index);
    setRowsA(updatedRows);
  };

  const { secondaryColor, primaryColor } = useColor();
  const [tabValue, setTabValue] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Add and Close");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  
  const handleOptionSelect = (label) => {
    setButtonLabel(label); // Update the button label to the selected value
    setShowDropdown(false); // Hide the dropdown after selection
  };

  

  

  return (
    <Layout>
      <main className="flex-1 p-3 bg-gray-100 flex justify-center items-center">
        <div className={`${font.className}`}>
          {/* Title Section */}
          <Paper
            elevation={3}
            style={{
              backgroundColor: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              padding: "20px",
              width: "100%",
            }}
          >
            <p className="text-2xl font-bold text-black mt-3 ml-2">
              Purchase Order
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-2 gap-80">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "400px" }}>
                <SapDropDown
                  label="Vendor:"
                  secondaryColor={secondaryColor}
                  option="Select Vendor"
                  option1="Vendor 1"
                  option2="Vendor 2"
                  option3="Vendor 3"
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Name:"
                  option="Select Name"
                  option1="Name 1"
                  option2="Name 2"
                  option3="Name 3"
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Contact Person:"
                  option="Select Contact Person"
                  option1="Person 1"
                  option2="Person 2"
                  option3="Person 3"
                />
                <SapTextField
                  label="Vendor Ref. No"
                  secondaryColor={secondaryColor}
                />
              </div>

              {/* Right column */}
              <div className="space-y-2" style={{ width: "400px" }}>
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Number:"
                  option="Select Number"
                  option1="No. 1"
                  option2="No. 2"
                  option3="No. 3"
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Status:"
                  option="Select Status"
                  option2="Open"
                  option3="Closed"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Posting Date"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Delivery Date"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Document Date"
                />
              </div>
            </div>
          </Paper>

          <div className="mt-2 mb-0"></div>

          {/* bottom Tab section */}

          <Paper
            elevation={3}
            style={{
              backgroundColor: secondaryColor,
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                ".MuiTab-root": {
                  padding: "2px 1px",
                },
                ".MuiTabs-flexContainer": {
                  justifyContent: "left",
                },
              }}
            >
              <Tab
                label="Content"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Logistics"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Accounting"
                sx={{ fontWeight: "bold", fontSize: "12px", margin: "10px" }}
              />
              <Tab
                label="Attachments"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
            </Tabs>

            {/* Tab Panels */}
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              <TabPanel
                value={tabValue}
                index={0}
                style={{
                  padding: "1px",
                  overflowY: "auto",
                }}
              >
                <div
                  className="table-container"
                  style={{ overflowX: "auto", width: "99%" }}
                >
                  <Table
                    component={Paper}
                    className="shadow-sm shadow-slate-800 px-12"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-sm font-bold">
                          S No.
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Item no.
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Item Description
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          UoM Code
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Quantity
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Unit Price
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Tax Code
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Total
                        </TableCell>
                        <TableCell className="text-sm font-bold text-center">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.itemNo}</TableCell>
                          <TableCell>
                            <TextField
                              name="itemno."
                              value={row.item}
                              onChange={(e) => handleInputChange(index, e)}
                              size="small" // Reduced field size
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="description"
                              value={row.description}
                              onChange={(e) => handleInputChange(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="fromWarehouse"
                              value={row.fromWarehouse}
                              onChange={(e) => handleInputChange(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="toWarehouse"
                              value={row.toWarehouse}
                              onChange={(e) => handleInputChange(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="quantity"
                              value={row.quantity}
                              onChange={(e) => handleInputChange(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="uomCode"
                              value={row.uomCode}
                              onChange={(e) => handleInputChange(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="total"
                              value={row.total}
                              onChange={(e) => handleInputChange(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell className="flex justify-center">
                            <Button
                              onClick={() => handleDeleteRow(index)}
                              sx={{
                                transition: "background-color 0.3s, color 0.3s",
                                color: `${primaryColor}`,
                                fontSize: "16px",
                                "&:hover": {
                                  color: "red",
                                },
                              }}
                            >
                              <RiDeleteBin6Line
                                size={30}
                                className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                                sx={{ fontSize: "36px", color: `inherit` }}
                              />
                            </Button>
                            <Button
                              onClick={() => handleAddRow(index)}
                              sx={{
                                transition: "background-color 0.3s, color 0.3s",
                                color: `${primaryColor}`,
                                fontSize: "16px",
                              }}
                            >
                              <IoMdAdd
                                size={30}
                                className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                                onClick={handleAddRow}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabPanel>

              {/* Attachments Section */}
              <TabPanel
                value={tabValue}
                index={1}
                style={{
                  padding: "1px",
                  overflowY: "auto",
                }}
              >
                <div className="table-container">
                  <Table component={Paper} className="shadow-sm shadow-black">
                    <TableHead>
                      <TableRow>
                        <TableCell className="text-sm font-bold">
                          S No.
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Target Path
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          File Name
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Attachment Date
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Free Text
                        </TableCell>
                        <TableCell className="text-sm font-bold">
                          Copy to Target Doc.
                        </TableCell>
                        <TableCell className="text-sm font-bold text-center">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowsA.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.itemNo}</TableCell>
                          <TableCell>
                            <TextField
                              name="targetpath"
                              value={row.targetpath}
                              onChange={(e) => handleInputChangeA(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="filename"
                              value={row.filename}
                              onChange={(e) => handleInputChangeA(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="attacheddate"
                              value={row.attacheddate}
                              onChange={(e) => handleInputChangeA(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="freetext"
                              value={row.freetext}
                              onChange={(e) => handleInputChangeA(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="copytotargetdocument"
                              value={row.copytotargetdocument}
                              onChange={(e) => handleInputChangeA(index, e)}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          </TableCell>
                          <TableCell className="flex">
                            <Button
                              onClick={() => handleDeleteRowA(index)}
                              sx={{
                                transition: "background-color 0.3s, color 0.3s",
                                color: `${primaryColor}`,
                                fontSize: "16px",
                                "&:hover": {
                                  color: "red",
                                },
                              }}
                            >
                              <RiDeleteBin6Line
                                size={30}
                                className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                                sx={{ fontSize: "16px", color: `inherit` }}
                              />
                            </Button>
                            <Button
                              onClick={() => handleAddRowA(index)}
                              sx={{
                                transition: "background-color 0.3s, color 0.3s",
                                color: `${primaryColor}`,
                                fontSize: "16px",
                              }}
                            >
                              <IoMdAdd
                                size={30}
                                className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                                onClick={handleAddRowA}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabPanel>
            </div>
          </Paper>
          <Paper
            elevation={3}
            style={{
              backgroundColor: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              padding: "20px",
              width: "100%",
              height: "100%",
              marginTop: "4px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "30%" }}>
                <div className="space-y-2" style={{ width: "100%" }}>
                  <SapDropDown
                    label="Buyer:"
                    secondaryColor={secondaryColor}
                    option="Select Buyer"
                    option1="Buyer 1"
                    option2="Buyer 2"
                    option3="Buyer 3"
                  />
                  <SapTextField label="Owner" secondaryColor={secondaryColor} />
                </div>
                <div className="mt-2">
                  <SapTextField
                    label="Remarks"
                    secondaryColor={secondaryColor}
                  />
                </div>
              </div>

              <div style={{ width: "37%" }}>
                <div className="space-y-2">
                  <SapTextField
                    label="Total Before Discount"
                    secondaryColor={secondaryColor}
                  />
                  <SapTextField
                    label="Discount"
                    secondaryColor={secondaryColor}
                  />

                  <SapTextField
                    label="Freight"
                    secondaryColor={secondaryColor}
                  />
                  <SapTextField
                    label="Rounding"
                    secondaryColor={secondaryColor}
                  />
                  <SapTextField label="Tax" secondaryColor={secondaryColor} />
                  <SapTextField
                    label="Total After Discount"
                    secondaryColor={secondaryColor}
                  />
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <SapDropdownButton
                    primaryColor={primaryColor}
                    option1="Add and Close"
                    option2="Add and View"
                    onOptionSelect={handleOptionSelect}
                  />
                  <SapCancelButton title="Cancel" />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <SapCopyFromDropDown
                      primaryColor={primaryColor}
                      option1="Purchase Request"
                      option2="Purchase Quotation"
                      option3="Blanket Agreement"
                      onOptionSelect={handleOptionSelect}
                    />
                  </div>
                  <SapCopyButton primaryColor={primaryColor} title="Copy To" />
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
