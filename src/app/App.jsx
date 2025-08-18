import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout.jsx';
import Home from './page.jsx';
import Login from './login/page.jsx';
import Dashboard from './dashboard/page.jsx';
import Company from './company/page.jsx';
import CreateCompany from './create-company/page.jsx';
import CreateUsers from './create-users/page.jsx';
import Users from './users/page.jsx';
import Roles from './roles/page.jsx';
import SalesOrder from './sales-order/page.jsx';
import SalesQuotation from './sales-quotation/page.jsx';
import PurchaseOrder from './purchase-order/page.jsx';
import PurchaseQuotation from './purchase-quotation/page.jsx';
import PurchaseRequest from './purchase-request/page.jsx';
import GoodsReceiptsPO from './goods-receipts-po/page.jsx';
import GoodsReturn from './goods-return/page.jsx';
import GoodsReturnRequest from './goods-return-request/page.jsx';
import InventoryReq from './inventory-req/page.jsx';
import Delivery from './delivery/page.jsx';
import Return from './return/page.jsx';
import ReturnRequest from './return-request/page.jsx';
import Opportunity from './opportunity/page.jsx';
import APInvoice from './ap-invoice/page.jsx';
import APCreditMemo from './ap-credit-memo/page.jsx';
import ARInvoice from './ar-invoice/page.jsx';
import ARCreditMemo from './ar-credit-memo/page.jsx';
import Reports from './reports/page.jsx';
import Settings from './settings/page.jsx';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/company" element={<Company />} />
          <Route path="/create-company" element={<CreateCompany />} />
          <Route path="/create-users" element={<CreateUsers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/sales-order" element={<SalesOrder />} />
          <Route path="/sales-quotation" element={<SalesQuotation />} />
          <Route path="/purchase-order" element={<PurchaseOrder />} />
          <Route path="/purchase-quotation" element={<PurchaseQuotation />} />
          <Route path="/purchase-request" element={<PurchaseRequest />} />
          <Route path="/goods-receipts-po" element={<GoodsReceiptsPO />} />
          <Route path="/goods-return" element={<GoodsReturn />} />
          <Route path="/goods-return-request" element={<GoodsReturnRequest />} />
          <Route path="/inventory-req" element={<InventoryReq />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/return" element={<Return />} />
          <Route path="/return-request" element={<ReturnRequest />} />
          <Route path="/opportunity" element={<Opportunity />} />
          <Route path="/ap-invoice" element={<APInvoice />} />
          <Route path="/ap-credit-memo" element={<APCreditMemo />} />
          <Route path="/ar-invoice" element={<ARInvoice />} />
          <Route path="/ar-credit-memo" element={<ARCreditMemo />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
