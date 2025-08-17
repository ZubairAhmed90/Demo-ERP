import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
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
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path);
  }, [location]);

  const renderLink = (href, Icon, label, subLink = false) => (
    <Link to={href}>
      <p
        className={`flex items-center py-3 px-4 mt-1 rounded-lg transition-all duration-200 text-sm font-medium ${
          subLink ? "ml-6 text-xs" : ""
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
        {Icon && <Icon size={subLink ? "16px" : "18px"} />}
        {isOpen && <span className="ml-3">{label}</span>}
      </p>
    </Link>
  );

  const renderCollapsedMenu = (Icon, isMenuOpen, setIsMenuOpen) => (
    <div className="flex justify-center">
      <p
        className="flex items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: isMenuOpen ? primaryColor : "transparent",
          color: isMenuOpen ? "white" : "#374151",
          width: "40px",
          height: "40px",
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
        <Icon size="18px" />
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
        <nav className="px-4 py-6 space-y-2">
          {/* Main Navigation */}
          <div className="mb-8">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 ${!isOpen && 'hidden'}`}>
              Main
            </h3>
            {renderLink("/dashboard", FaHome, "Dashboard")}
            {renderLink("/company", GoGraph, "Company")}
            {renderLink("/users", FaUser, "Users")}
            {renderLink("/roles", FaUsers, "Roles")}
          </div>

          {/* Sales Section */}
          <div className="mb-8">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 ${!isOpen && 'hidden'}`}>
              Sales
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
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
                  <LuPackage size="18px" />
                  <span className="ml-3">Sales</span>
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
                  <div className="mt-2 space-y-1">
                    {renderLink("/sales-order", null, "Sales Order", true)}
                    {renderLink("/sales-quotation", null, "Sales Quotation", true)}
                    {renderLink("/delivery", null, "Delivery", true)}
                    {renderLink("/opportunity", null, "Opportunity", true)}
                    {renderLink("/return", null, "Return", true)}
                    {renderLink("/return-request", null, "Return Request", true)}
                    {renderLink("/ar-invoice", null, "A/R Invoice", true)}
                    {renderLink("/ar-credit-memo", null, "A/R Credit Memo", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(LuPackage, isSaleOpen, setIsSaleOpen)
            )}
          </div>

          {/* Inventory Section */}
          <div className="mb-8">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 ${!isOpen && 'hidden'}`}>
              Inventory
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
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
                  <MdOutlineInventory2 size="18px" />
                  <span className="ml-3">Inventory</span>
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
                  <div className="mt-2 space-y-1">
                    {renderLink("/inventory-req", null, "Inventory Transfer Req.", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(MdOutlineInventory2, isInventoryOpen, setIsInventoryOpen)
            )}
          </div>

          {/* Purchase Section */}
          <div className="mb-8">
            <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 ${!isOpen && 'hidden'}`}>
              Purchase
            </h3>
            {isOpen ? (
              <div>
                <p
                  className="flex items-center py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
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
                  <TbPackages size="18px" />
                  <span className="ml-3">Purchase</span>
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
                  <div className="mt-2 space-y-1">
                    {renderLink("/purchase-order", null, "Purchase Order", true)}
                    {renderLink("/purchase-request", null, "Purchase Request", true)}
                    {renderLink("/purchase-quotation", null, "Purchase Quotation", true)}
                    {renderLink("/goods-receipts-po", null, "Goods Receipts PO", true)}
                    {renderLink("/goods-return-request", null, "Goods Return Request", true)}
                    {renderLink("/goods-return", null, "Goods Return", true)}
                    {renderLink("/ap-credit-memo", null, "A/P Credit Memo", true)}
                    {renderLink("/ap-invoice", null, "A/P Invoice", true)}
                  </div>
                )}
              </div>
            ) : (
              renderCollapsedMenu(TbPackages, isPurchaseOpen, setIsPurchaseOpen)
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;