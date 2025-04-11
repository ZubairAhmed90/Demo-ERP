"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { font } from "../font/poppins";
import { useColor } from "../../context/ColorContext";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { TbPackages } from "react-icons/tb";

const Sidebar = () => {
  const { primaryColor, secondaryColor } = useColor();
  const [activeTab, setActiveTab] = useState("");
  const [isInventoryOpen, setIsInventoryOpen] = useState(false); // State to toggle inventory sub-menu
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false); // State to toggle Purchase sub-menu
  const [isSaleOpen, setIsSaleOpen] = useState(false); // State to toggle Sales sub-menu

  useEffect(() => {
    const path = window.location.pathname;
    setActiveTab(path);
  }, []);

  const renderLink = (href, Icon, label, subLink = false) => (
    <Link href={href}>
      <p
        className={`flex items-center py-2 px-4 mt-2 rounded transition duration-200 ${
          subLink ? "ml-6" : ""
        }`}
        style={{
          backgroundColor: activeTab === href ? primaryColor : "transparent",
          color: activeTab === href ? "white" : "black",
        }}
        onMouseEnter={(e) => {
          if (activeTab !== href) {
            e.target.style.backgroundColor = primaryColor;
            e.target.style.color = "white";
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== href) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "black";
          }
        }}
        onClick={() => setActiveTab(href)}
      >
        {Icon && <Icon size={"24px"} />}
        &nbsp;&nbsp;{label}
      </p>
    </Link>
  );

  return (
    <aside
      className={`${font.className} w-64 text-black `}
      style={{
        background: `linear-gradient(to bottom, white 10%,${secondaryColor} 60%, ${primaryColor} 200%)`,
      }}
    >
      <nav className="flex-1 px-4 mt-6 space-y-4">
        {renderLink("/dashboard", FaHome, "Home")}
        {renderLink("/company", GoGraph, "Company")}
        {renderLink("/users", FaUser, "Users")}
        {renderLink("/roles", FaUsers, "Roles")}

        {/* Sales Main Tab */}
        <div>
          <p
            className="flex items-center py-2 px-4 rounded transition duration-200 cursor-pointer"
            style={{
              backgroundColor: isSaleOpen ? primaryColor : "transparent",
              color: isSaleOpen ? "white" : "black",
            }}
            onMouseEnter={(e) => {
              if (!isSaleOpen) {
                e.target.style.backgroundColor = primaryColor;
                e.target.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSaleOpen) {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "black";
              }
            }}
            onClick={() => setIsSaleOpen(!isSaleOpen)} // Toggle the sales sub-menu
          >
            <LuPackage size={"24px"} />
            &nbsp;&nbsp;Sales
          </p>
          {isSaleOpen && (
            <div className="mr-4 w-full font-light text-sm">
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

        {/* Inventory Main Tab */}
        <div>
          <p
            className="flex items-center py-2 px-4 rounded transition duration-200 cursor-pointer"
            style={{
              backgroundColor: isInventoryOpen ? primaryColor : "transparent",
              color: isInventoryOpen ? "white" : "black",
            }}
            onMouseEnter={(e) => {
              if (!isInventoryOpen) {
                e.target.style.backgroundColor = primaryColor;
                e.target.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              if (!isInventoryOpen) {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "black";
              }
            }}
            onClick={() => setIsInventoryOpen(!isInventoryOpen)} // Toggle the inventory sub-menu
          >
            <MdOutlineInventory2 size={"24px"} />
            &nbsp;&nbsp;Inventory
          </p>
          {isInventoryOpen && (
            <div className="mr-4 w-full font-light text-sm">
              {renderLink("/inventory-req", null, "Inventory Transfer Req.", true)}{" "}
            </div>
          )}
        </div>

        {/* Purchase Main Tab */}
        <div>
          <p
            className="flex items-center py-2 px-4 rounded transition duration-200 cursor-pointer"
            style={{
              backgroundColor: isPurchaseOpen ? primaryColor : "transparent",
              color: isPurchaseOpen ? "white" : "black",
            }}
            onMouseEnter={(e) => {
              if (!isPurchaseOpen) {
                e.target.style.backgroundColor = primaryColor;
                e.target.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              if (!isPurchaseOpen) {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "black";
              }
            }}
            onClick={() => setIsPurchaseOpen(!isPurchaseOpen)} // Toggle the purchase sub-menu
          >
            <TbPackages size={"24px"} />
            &nbsp;&nbsp;Purchase
          </p>
          {isPurchaseOpen && (
            <div className="mr-4 w-full font-light text-sm">
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
      </nav>
    </aside>
  );
};

export default Sidebar;
