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
// HR Module
import HREmployees from './hr/employees/page.jsx';
import HRAttendance from './hr/attendance/page.jsx';
import HRLeaveManagement from './hr/leave-management/page.jsx';
import HRPerformanceReviews from './hr/performance-reviews/page.jsx';
import HRCreateEmployee from './hr/create-employee/page.jsx';
import HRCreateLeaveRequest from './hr/create-leave-request/page.jsx';
// Payroll Module
import PayrollProcessing from './payroll/processing/page.jsx';
import PayrollPayslips from './payroll/payslips/page.jsx';
import PayrollSalaryStructure from './payroll/salary-structure/page.jsx';
// Banking Module
import BankingAccounts from './banking/accounts/page.jsx';
import BankingTransactions from './banking/transactions/page.jsx';
import BankingReconciliation from './banking/reconciliation/page.jsx';
import BankingCreateAccount from './banking/create-account/page.jsx';

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
          {/* HR Routes */}
          <Route path="/hr/employees" element={<HREmployees />} />
          <Route path="/hr/create-employee" element={<HRCreateEmployee />} />
          <Route path="/hr/attendance" element={<HRAttendance />} />
          <Route path="/hr/leave-management" element={<HRLeaveManagement />} />
          <Route path="/hr/create-leave-request" element={<HRCreateLeaveRequest />} />
          <Route path="/hr/performance-reviews" element={<HRPerformanceReviews />} />
          {/* Payroll Routes */}
          <Route path="/payroll/processing" element={<PayrollProcessing />} />
          <Route path="/payroll/payslips" element={<PayrollPayslips />} />
          <Route path="/payroll/salary-structure" element={<PayrollSalaryStructure />} />
          {/* Banking Routes */}
          <Route path="/banking/accounts" element={<BankingAccounts />} />
          <Route path="/banking/create-account" element={<BankingCreateAccount />} />
          <Route path="/banking/transactions" element={<BankingTransactions />} />
          <Route path="/banking/reconciliation" element={<BankingReconciliation />} />
          {/* Reports & Settings */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
