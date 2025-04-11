"use client"

import React, { useState } from 'react';
import { FormControl, Select, MenuItem, Grid, Paper } from '@mui/material';
import { useColor } from '../context/ColorContext';
import { font } from '../components/font/poppins';
import CheckboxGroup from '../components/checkBox/checkBox';
import Layout from '../components/layout/layout';

const Page = () => {
  const [role, setRole] = useState('Select A Role');
  const { secondaryColor } = useColor();

  const [sales, setSales] = useState({
    SalesBlanketAgreement: false,
    SalesQuotation: false,
    SalesOrder: false,
    Delivery: false,
    Return: false,
    ARDownPaymentRequest: false,
    ARDownPaymentInvoice: false,
    ARInvoice: false,
    ARInvoiceAndPayment: false,
    ARCreditMemo: false,
    ARReserveInvoice: false,
    RecurringTransactions: false,
    UDO: false,
    PickAndPackManager: false,
    PickList: false,
    InventoryTransferRequest: false,
    InventoryTransfer: false,
    IncomingPayment: false,
  });

  const [inventory, setInventory] = useState({
    InventoryCounting: false,
    GoodsReceipt: false,
    GoodsIssue: false,
    UDO: false,
    InventoryTransferRequest: false,
    InventoryTransfer: false,
  });

  const [procurement, setProcurement] = useState({
    PurchaseBlanketAgreement: false,
    PurchaseRequest: false,
    PurchaseQuotation: false,
    PurchaseOrder: false,
    GoodsReceiptPO: false,
    GoodsReturn: false,
    APDownPaymentRequest: false,
    APDownPaymentInvoice: false,
    APInvoice: false,
    APCreditMemo: false,
    APReserveInvoice: false,
    OutgoingPayment: false,
    LandedCosts: false,
    PurchaseQoutationGenerationWizard: false,
    UDO: false,
    InventoryTransferRequest: false,
    InventoryTransfer: false,
  });

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSalesChange = (event) => {
    setSales({
      ...sales,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInventoryChange = (event) => {
    setInventory({
      ...inventory,
      [event.target.name]: event.target.checked,
    });
  };

  const handleProcurementChange = (event) => {
    setProcurement({
      ...procurement,
      [event.target.name]: event.target.checked,
    });
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <p className="text-2xl font-bold mt-1 text-black ml4 ">Roles</p>
                
                <hr className="border-gray-700 w-full" />
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl fullWidth>
                  <Select
                    value={role}
                    onChange={handleRoleChange}
                    displayEmpty
                    style={{
                      backgroundColor: secondaryColor,
                      border: '1px solid #d0d0d0',
                      borderRadius: '8px',
                      padding: '10px',
                      height: '48px',
                      width: '660px',
                    }}
                  >
                    <MenuItem value="Select A Role">
                      <em>Select a Role</em>
                    </MenuItem>
                    <MenuItem value="Inventory">Inventory</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Procurement">Procurement</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {role !== "Select A Role" && (
                <Grid item xs={12} md={6} className='ml-4'>
                  {role === "Inventory" && (
                    <CheckboxGroup groupData={inventory} handleChange={handleInventoryChange} />
                  )}
                  {role === "Sales" && (
                    <CheckboxGroup groupData={sales} handleChange={handleSalesChange} />
                  )}
                  {role === "Procurement" && (
                    <CheckboxGroup groupData={procurement} handleChange={handleProcurementChange} />
                  )}
                </Grid>
              )}
            </Grid>
          </Paper>
        </main>
    </Layout>
  );
};

export default Page;
