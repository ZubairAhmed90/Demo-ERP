"use client";
import Layout from "../components/layout/Layout";
import React, { useState } from "react";
import { useColor } from "../context/ColorContext";
import { Paper, Tabs, Tab } from "@mui/material";
import { font } from "../components/font/poppins";
import SapTextField from "../components/fields/sapFields/sapTextField";
import SapDropDown from "../components/fields/dropDown/sapDropDown";
import SapDateField from "../components/fields/date/sapDateField";
import SapDropdownButton from "../components/buttons/sapDropdownButton/sapDropdownButton";
import SapCancelButton from "../components/buttons/sapCancelButton/SapCancelButton";
import SapCopyButton from "../components/buttons/sapCopyButton/SapCopyButton";
import SapTable from "../components/tables/sapTable";

function Page() {
  const [rows, setRows] = useState([
    {
      itemNo: 1,
      description: "",
      uomCode: "",
      quantity: "",
      unitPrice: "",
      taxCode: "",
      total: "",
    },
  ]);

  const fieldConfigs = [
    { name: "itemNo", label: "Item No." },
    { name: "quantity", label: "Quantity" },
    { name: "unitPrice", label: "Unit Price" },
    { name: "discount", label: "Discount %" },
    { name: "taxCode", label: "Tax Code" },
    { name: "total", label: "Total" },
  ];

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleAddRow = () => {
    const newRow = {
      itemNo: rows.length + 1,
      description: "",
      uomCode: "",
      quantity: "",
      unitPrice: "",
      taxCode: "",
      total: "",
    };
    setRows([...rows, newRow]);
  };

  const { secondaryColor, primaryColor } = useColor();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOptionSelect = (option) => {
    console.log(option);
  };

  return (
    <Layout>
      <main className="flex-1 p-3 bg-gray-100 flex justify-center items-center">
        <div className={`${font.className}`}>
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
              Sales Quotation
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-2 gap-80">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "400px" }}>
                <SapDropDown
                  label="Customer:"
                  secondaryColor={secondaryColor}
                  option="Select Customer"
                  option1="Customer 1"
                  option2="Customer 2"
                  option3="Customer 3"
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
                  label="Customer Ref. No"
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
                  option1="Open"
                  option2="Pending"
                  option3="Closed"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Posting Date"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Valid Until"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Document Date"
                />
              </div>
            </div>
          </Paper>

          <div className="mt-2 mb-0"></div>

          <Paper
            elevation={3}
            style={{
              backgroundColor: secondaryColor,
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              overflowX: "auto",
              width: "100%",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                ".MuiTabs-flexContainer": { justifyContent: "left" },
              }}
            >
              <Tab
                label="Content"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
            </Tabs>

            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              <SapTable
                tabValue={tabValue}
                rows={rows}
                primaryColor={primaryColor}
                handleInputChange={handleInputChange}
                handleDeleteRow={handleDeleteRow}
                handleAddRow={handleAddRow}
                fieldConfigs={fieldConfigs}
              />
            </div>
          </Paper>

          <Paper
            elevation={3}
            style={{
              backgroundColor: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              padding: "20px",
              marginTop: "4px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "30%" }}>
                <div className="space-y-2" style={{ width: "100%" }}>
                  <SapDropDown
                    label="Sales Employee"
                    secondaryColor={secondaryColor}
                    option="Select Sales Employee"
                    option1="Employee 1"
                    option2="Employee  2"
                    option3="Employee 3"
                  />
                  <SapTextField label="Owner" secondaryColor={secondaryColor} />
                  <SapTextField
                    label="Remarks"
                    secondaryColor={secondaryColor}
                  />
                </div>
              </div>

              <div style={{ width: "33%" }}>
                <div className="space-y-2">
                  <SapTextField
                    label="Total Amount"
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
                  <SapTextField label="Total" secondaryColor={secondaryColor} />
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
                  <SapCopyButton
                    primaryColor={primaryColor}
                    title="Copy From"
                  />
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
