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
  FaArrowRight
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
                    {renderLink("/inventory-req", FaExchangeAlt, "Inventory Transfer Req.", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(FaWarehouse, isInventoryOpen, setIsInventoryOpen, true)
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

          {/* Reports Section */}
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${!isOpen && 'hidden'}`}>
              Reports
            </h3>
            {renderLink("/reports", FaChartBar, "Analytics")}
            {renderLink("/settings", FaCog, "Settings")}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;