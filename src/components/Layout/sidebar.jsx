import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, 
  FaUser, 
  FaUsers, 
  FaBuilding,
  FaCog,
  FaPlus,
  FaFileInvoice,
  FaShoppingCart,
  FaBoxes,
  FaTruck,
  FaUndo,
  FaCreditCard,
  FaChartBar,
  FaWarehouse,
  FaClipboardList,
  FaExchangeAlt,
  FaHandshake,
  FaFileAlt,
  FaReceipt,
  FaArrowRight,
  FaUserTie,
  FaClock,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUniversity,
  FaFileInvoiceDollar,
  FaStar,
  FaBalanceScale,
  FaDollarSign,
  FaBook,
  FaSitemap,
  FaChartLine,
  FaBuilding as FaBuildingIcon,
  FaBox,
  FaArrowDown,
  FaClipboardCheck,
  FaProjectDiagram,
  FaCheckCircle,
  FaHistory,
  FaPercent,
  FaLayerGroup,
  FaChartPie,
  FaRoute,
  FaChartArea
} from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { font } from "../font/poppins";
import { useColor } from "../../context/ColorContext.jsx";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { TbPackages } from "react-icons/tb";

const Sidebar = ({ isOpen = true }) => {
  const { primaryColor, secondaryColor } = useColor();
  const [activeTab, setActiveTab] = useState("");
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isSaleOpen, setIsSaleOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isHROpen, setIsHROpen] = useState(false);
  const [isPayrollOpen, setIsPayrollOpen] = useState(false);
  const [isBankingOpen, setIsBankingOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isFixedAssetsOpen, setIsFixedAssetsOpen] = useState(false);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isTaxOpen, setIsTaxOpen] = useState(false);
  const [isProcurementOpen, setIsProcurementOpen] = useState(false);
  const [isSupplyChainOpen, setIsSupplyChainOpen] = useState(false);
  const [isReportingOpen, setIsReportingOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path);
  }, [location]);

  const renderLink = (href, Icon, label, subLink = false) => (
    <Link to={href}>
      <p
        className={`flex items-center py-2 px-3 mt-0.5 rounded-lg transition-all duration-200 text-sm font-medium ${
          subLink ? "ml-4 text-xs" : ""
        }`}
        style={{
          backgroundColor: activeTab === href ? primaryColor : "transparent",
          color: activeTab === href ? "white" : "#374151",
        }}
        onMouseEnter={(e) => {
          if (activeTab !== href) {
            e.target.style.backgroundColor = `${primaryColor}15`;
            e.target.style.color = primaryColor;
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== href) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#374151";
          }
        }}
        onClick={() => setActiveTab(href)}
      >
        {Icon && <Icon size={subLink ? "14px" : "16px"} />}
        {isOpen && <span className="ml-2">{label}</span>}
      </p>
    </Link>
  );

  const renderCollapsedMenu = (Icon, isMenuOpen, setIsMenuOpen, hasSubItems = false) => (
    <div className="flex justify-center mb-2">
      <p
        className="flex items-center justify-center py-2 px-2 rounded-lg transition-all duration-200 cursor-pointer relative"
        style={{
          backgroundColor: isMenuOpen ? primaryColor : "transparent",
          color: isMenuOpen ? "white" : "#374151",
          width: "32px",
          height: "32px",
        }}
        onMouseEnter={(e) => {
          if (!isMenuOpen) {
            e.target.style.backgroundColor = `${primaryColor}15`;
            e.target.style.color = primaryColor;
          }
        }}
        onMouseLeave={(e) => {
          if (!isMenuOpen) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#374151";
          }
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Icon size="16px" />
        {hasSubItems && (
          <FaArrowRight 
            size="8px" 
            className="absolute -right-1 -top-1 text-gray-400" 
          />
        )}
      </p>
    </div>
  );

  return (
    <aside
      className={`${font.className} text-gray-700 transition-all duration-300 ease-in-out h-full ${
        isOpen ? 'w-64' : 'w-16'
      } overflow-hidden border-r border-gray-200`}
      style={{
        background: `linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)`,
      }}
    >
      {/* Scrollable Navigation Content */}
      <div className="h-full overflow-y-auto">
        <nav className="px-3 py-4 space-y-1">
          {/* Main Navigation */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Main
            </h3>
            {renderLink("/dashboard", FaHome, "Dashboard")}
            
            {/* Company Section */}
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isCompanyOpen ? primaryColor : "transparent",
                    color: isCompanyOpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isCompanyOpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCompanyOpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                >
                  <FaBuilding size="16px" />
                  <span className="ml-2">Company</span>
                  <svg 
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isCompanyOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isCompanyOpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/company", null, "View Companies", true)}
                    {renderLink("/create-company", null, "Create Company", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaBuilding, isCompanyOpen, setIsCompanyOpen, true)
            )}

            {/* User Management Section */}
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isUserOpen ? primaryColor : "transparent",
                    color: isUserOpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isUserOpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isUserOpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsUserOpen(!isUserOpen)}
                >
                  <FaUsers size="16px" />
                  <span className="ml-2">User Management</span>
                  <svg 
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isUserOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isUserOpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/users", null, "View Users", true)}
                    {renderLink("/create-users", null, "Create User", true)}
                    {renderLink("/roles", null, "Manage Roles", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaUsers, isUserOpen, setIsUserOpen, true)
            )}
          </div>

          {/* Sales Section */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Sales
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isSaleOpen ? primaryColor : "transparent",
                    color: isSaleOpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSaleOpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSaleOpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsSaleOpen(!isSaleOpen)}
                >
                  <FaShoppingCart size="16px" />
                  <span className="ml-2">Sales</span>
                  <svg 
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isSaleOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isSaleOpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/sales-order", FaFileAlt, "Sales Order", true)}
                    {renderLink("/sales-quotation", FaClipboardList, "Sales Quotation", true)}
                    {renderLink("/delivery", FaTruck, "Delivery", true)}
                    {renderLink("/opportunity", FaHandshake, "Opportunity", true)}
                    {renderLink("/return", FaUndo, "Return", true)}
                    {renderLink("/return-request", FaClipboardList, "Return Request", true)}
                    {renderLink("/ar-invoice", FaFileInvoice, "A/R Invoice", true)}
                    {renderLink("/ar-credit-memo", FaCreditCard, "A/R Credit Memo", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaShoppingCart, isSaleOpen, setIsSaleOpen, true)
            )}
          </div>

          {/* Inventory Section */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Inventory
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isInventoryOpen ? primaryColor : "transparent",
                    color: isInventoryOpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isInventoryOpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isInventoryOpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsInventoryOpen(!isInventoryOpen)}
                >
                  <FaWarehouse size="16px" />
                  <span className="ml-2">Inventory</span>
                  <svg 
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isInventoryOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isInventoryOpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/inventory/items", FaBox, "Items/Products", true)}
                    {renderLink("/inventory/warehouses", FaWarehouse, "Warehouses", true)}
                    {renderLink("/inventory/stock-levels", FaChartBar, "Stock Levels", true)}
                    {renderLink("/inventory/counting", FaClipboardList, "Inventory Counting", true)}
                    {renderLink("/inventory/goods-issue", FaArrowDown, "Goods Issue", true)}
                    {renderLink("/inventory/transfer", FaExchangeAlt, "Inventory Transfer", true)}
                    {renderLink("/inventory-req", FaExchangeAlt, "Transfer Request", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaWarehouse, isInventoryOpen, setIsInventoryOpen, true)
            )}
          </div>

          {/* Procurement Section */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Procurement
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isProcurementOpen ? primaryColor : "transparent",
                    color: isProcurementOpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isProcurementOpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isProcurementOpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsProcurementOpen(!isProcurementOpen)}
                >
                  <FaTruck size="16px" />
                  <span className="ml-2">Procurement</span>
                  <svg
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isProcurementOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isProcurementOpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/procurement/vendors", FaTruck, "Vendors", true)}
                    {renderLink("/procurement/rfq", FaFileAlt, "RFQ", true)}
                    {renderLink("/procurement/supplier-performance", FaChartLine, "Supplier Performance", true)}
                    {renderLink("/procurement/analytics", FaChartPie, "Procurement Analytics", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaTruck, isProcurementOpen, setIsProcurementOpen, true)
            )}
          </div>

          {/* Purchase Section */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Purchase
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isPurchaseOpen ? primaryColor : "transparent",
                    color: isPurchaseOpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isPurchaseOpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPurchaseOpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsPurchaseOpen(!isPurchaseOpen)}
                >
                  <FaBoxes size="16px" />
                  <span className="ml-2">Purchase</span>
                  <svg 
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isPurchaseOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isPurchaseOpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/purchase-order", FaFileAlt, "Purchase Order", true)}
                    {renderLink("/purchase-request", FaClipboardList, "Purchase Request", true)}
                    {renderLink("/purchase-quotation", FaClipboardList, "Purchase Quotation", true)}
                    {renderLink("/goods-receipts-po", FaReceipt, "Goods Receipts PO", true)}
                    {renderLink("/goods-return-request", FaClipboardList, "Goods Return Request", true)}
                    {renderLink("/goods-return", FaUndo, "Goods Return", true)}
                    {renderLink("/ap-credit-memo", FaCreditCard, "A/P Credit Memo", true)}
                    {renderLink("/ap-invoice", FaFileInvoice, "A/P Invoice", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaBoxes, isPurchaseOpen, setIsPurchaseOpen, true)
            )}
          </div>

          {/* HR Section */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Human Resources
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isHROpen ? primaryColor : "transparent",
                    color: isHROpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isHROpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isHROpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsHROpen(!isHROpen)}
                >
                  <FaUserTie size="16px" />
                  <span className="ml-2">HR Management</span>
                  <svg 
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isHROpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isHROpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/hr/employees", FaUserTie, "Employees", true)}
                    {renderLink("/hr/attendance", FaClock, "Attendance", true)}
                    {renderLink("/hr/leave-management", FaCalendarAlt, "Leave Management", true)}
                    {renderLink("/hr/performance-reviews", FaStar, "Performance Reviews", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaUserTie, isHROpen, setIsHROpen, true)
            )}
          </div>

          {/* Payroll Section */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Payroll
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isPayrollOpen ? primaryColor : "transparent",
                    color: isPayrollOpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isPayrollOpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPayrollOpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsPayrollOpen(!isPayrollOpen)}
                >
                  <FaMoneyBillWave size="16px" />
                  <span className="ml-2">Payroll</span>
                  <svg 
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isPayrollOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isPayrollOpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/payroll/processing", FaMoneyBillWave, "Payroll Processing", true)}
                    {renderLink("/payroll/payslips", FaFileInvoiceDollar, "Payslips", true)}
                    {renderLink("/payroll/salary-structure", FaDollarSign, "Salary Structure", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaMoneyBillWave, isPayrollOpen, setIsPayrollOpen, true)
            )}
          </div>

          {/* Banking Section */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Banking
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  style={{
                    backgroundColor: isBankingOpen ? primaryColor : "transparent",
                    color: isBankingOpen ? "white" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    if (!isBankingOpen) {
                      e.target.style.backgroundColor = `${primaryColor}15`;
                      e.target.style.color = primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isBankingOpen) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#374151";
                    }
                  }}
                  onClick={() => setIsBankingOpen(!isBankingOpen)}
                >
                  <FaUniversity size="16px" />
                  <span className="ml-2">Banking</span>
                  <svg 
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${isBankingOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </p>
                {isBankingOpen && (
                  <div className="mt-1 space-y-0.5">
                    {renderLink("/banking/accounts", FaUniversity, "Bank Accounts", true)}
                    {renderLink("/banking/transactions", FaExchangeAlt, "Transactions", true)}
                    {renderLink("/banking/reconciliation", FaBalanceScale, "Reconciliation", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaUniversity, isBankingOpen, setIsBankingOpen, true)
            )}
          </div>

                 {/* Finance Section */}
                 <div className="mb-6">
                   <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
                     Finance & Accounting
                   </h3>
                   {isOpen ? (
                     <div>
                       <p
                         className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                         style={{
                           backgroundColor: isFinanceOpen ? primaryColor : "transparent",
                           color: isFinanceOpen ? "white" : "#374151",
                         }}
                         onMouseEnter={(e) => {
                           if (!isFinanceOpen) {
                             e.target.style.backgroundColor = `${primaryColor}15`;
                             e.target.style.color = primaryColor;
                           }
                         }}
                         onMouseLeave={(e) => {
                           if (!isFinanceOpen) {
                             e.target.style.backgroundColor = "transparent";
                             e.target.style.color = "#374151";
                           }
                         }}
                         onClick={() => setIsFinanceOpen(!isFinanceOpen)}
                       >
                         <FaBook size="16px" />
                         <span className="ml-2">Finance</span>
                         <svg
                           className={`ml-auto w-4 h-4 transition-transform duration-200 ${isFinanceOpen ? 'rotate-180' : ''}`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                       </p>
                       {isFinanceOpen && (
                         <div className="mt-1 space-y-0.5">
                           {renderLink("/finance/general-ledger", FaBook, "General Ledger", true)}
                           {renderLink("/finance/chart-of-accounts", FaSitemap, "Chart of Accounts", true)}
                           {renderLink("/finance/journal-entries", FaFileAlt, "Journal Entries", true)}
                           {renderLink("/finance/financial-reports", FaChartLine, "Financial Reports", true)}
                           {renderLink("/finance/budget-management", FaDollarSign, "Budget Management", true)}
                         </div>
                       )}
                     </div>
                   ) : (
                     renderCollapsedMenu(FaBook, isFinanceOpen, setIsFinanceOpen, true)
                   )}
                 </div>

                 {/* Fixed Assets Section */}
                 <div className="mb-6">
                   <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
                     Fixed Assets
                   </h3>
                   {renderLink("/fixed-assets/register", FaBuildingIcon, "Asset Register")}
                 </div>

                 {/* Workflow Section */}
                 <div className="mb-6">
                   <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
                     Workflow
                   </h3>
                   {isOpen ? (
                     <div>
                       <p
                         className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                         style={{
                           backgroundColor: isWorkflowOpen ? primaryColor : "transparent",
                           color: isWorkflowOpen ? "white" : "#374151",
                         }}
                         onMouseEnter={(e) => {
                           if (!isWorkflowOpen) {
                             e.target.style.backgroundColor = `${primaryColor}15`;
                             e.target.style.color = primaryColor;
                           }
                         }}
                         onMouseLeave={(e) => {
                           if (!isWorkflowOpen) {
                             e.target.style.backgroundColor = "transparent";
                             e.target.style.color = "#374151";
                           }
                         }}
                         onClick={() => setIsWorkflowOpen(!isWorkflowOpen)}
                       >
                         <FaProjectDiagram size="16px" />
                         <span className="ml-2">Workflow</span>
                         <svg
                           className={`ml-auto w-4 h-4 transition-transform duration-200 ${isWorkflowOpen ? 'rotate-180' : ''}`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                       </p>
                       {isWorkflowOpen && (
                         <div className="mt-1 space-y-0.5">
                           {renderLink("/workflow/workflows", FaProjectDiagram, "Workflows", true)}
                           {renderLink("/workflow/approval-requests", FaCheckCircle, "Approval Requests", true)}
                           {renderLink("/workflow/approval-history", FaHistory, "Approval History", true)}
                         </div>
                       )}
                     </div>
                   ) : (
                     renderCollapsedMenu(FaProjectDiagram, isWorkflowOpen, setIsWorkflowOpen, true)
                   )}
                 </div>

                 {/* Tax Section */}
                 <div className="mb-6">
                   <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
                     Tax Management
                   </h3>
                   {isOpen ? (
                     <div>
                       <p
                         className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                         style={{
                           backgroundColor: isTaxOpen ? primaryColor : "transparent",
                           color: isTaxOpen ? "white" : "#374151",
                         }}
                         onMouseEnter={(e) => {
                           if (!isTaxOpen) {
                             e.target.style.backgroundColor = `${primaryColor}15`;
                             e.target.style.color = primaryColor;
                           }
                         }}
                         onMouseLeave={(e) => {
                           if (!isTaxOpen) {
                             e.target.style.backgroundColor = "transparent";
                             e.target.style.color = "#374151";
                           }
                         }}
                         onClick={() => setIsTaxOpen(!isTaxOpen)}
                       >
                         <FaPercent size="16px" />
                         <span className="ml-2">Tax</span>
                         <svg
                           className={`ml-auto w-4 h-4 transition-transform duration-200 ${isTaxOpen ? 'rotate-180' : ''}`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                       </p>
                       {isTaxOpen && (
                         <div className="mt-1 space-y-0.5">
                           {renderLink("/tax/tax-codes", FaPercent, "Tax Codes", true)}
                           {renderLink("/tax/tax-groups", FaLayerGroup, "Tax Groups", true)}
                         </div>
                       )}
                     </div>
                   ) : (
                     renderCollapsedMenu(FaPercent, isTaxOpen, setIsTaxOpen, true)
                   )}
                 </div>

                 {/* Supply Chain Section */}
                 <div className="mb-6">
                   <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
                     Supply Chain
                   </h3>
                   {isOpen ? (
                     <div>
                       <p
                         className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                         style={{
                           backgroundColor: isSupplyChainOpen ? primaryColor : "transparent",
                           color: isSupplyChainOpen ? "white" : "#374151",
                         }}
                         onMouseEnter={(e) => {
                           if (!isSupplyChainOpen) {
                             e.target.style.backgroundColor = `${primaryColor}15`;
                             e.target.style.color = primaryColor;
                           }
                         }}
                         onMouseLeave={(e) => {
                           if (!isSupplyChainOpen) {
                             e.target.style.backgroundColor = "transparent";
                             e.target.style.color = "#374151";
                           }
                         }}
                         onClick={() => setIsSupplyChainOpen(!isSupplyChainOpen)}
                       >
                         <FaRoute size="16px" />
                         <span className="ml-2">Supply Chain</span>
                         <svg
                           className={`ml-auto w-4 h-4 transition-transform duration-200 ${isSupplyChainOpen ? 'rotate-180' : ''}`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                       </p>
                       {isSupplyChainOpen && (
                         <div className="mt-1 space-y-0.5">
                           {renderLink("/supply-chain/logistics", FaRoute, "Logistics", true)}
                           {renderLink("/supply-chain/distribution", FaTruck, "Distribution", true)}
                           {renderLink("/supply-chain/demand-forecasting", FaChartArea, "Demand Forecasting", true)}
                         </div>
                       )}
                     </div>
                   ) : (
                     renderCollapsedMenu(FaRoute, isSupplyChainOpen, setIsSupplyChainOpen, true)
                   )}
                 </div>

                 {/* Reporting Section */}
                 <div className="mb-6">
                   <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
                     Reporting
                   </h3>
                   {isOpen ? (
                     <div>
                       <p
                         className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                         style={{
                           backgroundColor: isReportingOpen ? primaryColor : "transparent",
                           color: isReportingOpen ? "white" : "#374151",
                         }}
                         onMouseEnter={(e) => {
                           if (!isReportingOpen) {
                             e.target.style.backgroundColor = `${primaryColor}15`;
                             e.target.style.color = primaryColor;
                           }
                         }}
                         onMouseLeave={(e) => {
                           if (!isReportingOpen) {
                             e.target.style.backgroundColor = "transparent";
                             e.target.style.color = "#374151";
                           }
                         }}
                         onClick={() => setIsReportingOpen(!isReportingOpen)}
                       >
                         <FaChartBar size="16px" />
                         <span className="ml-2">Reporting</span>
                         <svg
                           className={`ml-auto w-4 h-4 transition-transform duration-200 ${isReportingOpen ? 'rotate-180' : ''}`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                       </p>
                       {isReportingOpen && (
                         <div className="mt-1 space-y-0.5">
                           {renderLink("/reports", FaChartBar, "Analytics", true)}
                           {renderLink("/reporting/report-builder", FaFileAlt, "Report Builder", true)}
                           {renderLink("/reporting/scheduled-reports", FaClock, "Scheduled Reports", true)}
                         </div>
                       )}
                     </div>
                   ) : (
                     renderCollapsedMenu(FaChartBar, isReportingOpen, setIsReportingOpen, true)
                   )}
                 </div>

                 {/* Settings Section */}
                 <div className="mb-6">
                   <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
                     Settings
                   </h3>
                   {renderLink("/settings", FaCog, "Settings")}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;