"use client";
import React, { useState } from "react";
import Tables from "./TablesCus";

const OrderManagementCus = () => {
  const [activeTab, setActiveTab] = useState("dues");
  const [subTab, setSubTab] = useState("dues");

  const handleSelection = (tab, newSubTab = null) => {
    setActiveTab(tab);
    setSubTab(newSubTab);
  };

  const getCurrentTabText = () => {
    if (activeTab === "dues") return "المبالغ المستحقة";
    if (activeTab === "suppliers") return "العملاء";
    if (activeTab === "edit") {
      return subTab === "invoices"
        ? "الفواتير"
        : subTab === "quotations"
        ? "عرض الأسعار"
        : "العملاء";
    }
    return "العملاء";
  };

  return (
    <>
      <h2 dir="rtl" className="text-3xl font-bold text-gray-800 mb-2 mt-6 px-2 sm:px-0">
        العملاء
      </h2>

      <div className="p-4 sm:p-6 rounded-lg mb-2 mx-2 sm:mx-0 flex flex-col sm:flex-row justify-between gap-4">
        
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row">
            <button
              onClick={() => handleSelection("dues")}
              className={`px-4 py-2 shadow-md cursor-pointer ${
                activeTab === "dues"
                  ? "bg-white text-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
            مبالغ المستحقة
            </button>
            <button
              onClick={() => handleSelection("suppliers")}
              className={`px-4 py-2 shadow-md cursor-pointer ${
                activeTab === "suppliers" && !subTab
                  ? "bg-white text-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              العملاء
            </button>
          </div>

         
        </div>

        <div className="flex flex-col-reverse sm:flex-col items-end gap-2 text-end">
          <button
            onClick={() => window.print()}
            className="bg-[#16C47F] hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-lg shadow-md"
          >
            طباعة
          </button>
          <span className="text-gray-700 text-lg font-semibold">
            {getCurrentTabText()}
          </span>
        </div>
      </div>


      <div className="shadow-lg border-gray-400 border-[0.5px]">
        <Tables
          setActiveTab={setActiveTab}
          setSubTab={setSubTab}
          activeTab={activeTab}
          subTab={subTab}
        />
      </div>
    </>
  );
};

export default OrderManagementCus;
