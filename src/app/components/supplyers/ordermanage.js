"use client";
import React, { useState } from "react";
import Tables from "./Tables";

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("suppliers");
  const [subTab, setSubTab] = useState("suppliers");

  const handleSelection = (tab, newSubTab = null) => {
    setActiveTab(tab);
    setSubTab(newSubTab);
  };

  const getCurrentTabText = () => {
    if (activeTab === "dues") return "المبالغ المستحقة";
    if (activeTab === "suppliers") return "الموردين";
    if (activeTab === "edit") {
      return subTab === "invoices"
        ? "الفواتير"
        : subTab === "quotations"
        ? "عرض الأسعار"
        : "الموردين";
    }
    return "الموردين";
  };

  return (
    <>
    <h2 dir="rtl" className="text-3xl font-bold text-gray-800 mb-2 mt-6 px-2 sm:px-0">
    الموردين
  </h2>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-2 mx-2 sm:mx-0 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => handleSelection("dues")}
              className={`px-4 py-2 rounded-lg shadow-md ${
                activeTab === "dues" ? "bg-gray-50 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              المبالغ المستحقة
            </button>
            <button
              onClick={() => handleSelection("suppliers")}
              className={`px-4 py-2 rounded-lg shadow-md ${
                activeTab === "suppliers" && !subTab ? "bg-gray-50 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              الموردين
            </button>
          </div>

          {activeTab === "edit" && (
            <div className="flex gap-2 mt-2">
               <button
                onClick={() => handleSelection("edit", "invoices")}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  subTab === "invoices" ? "bg-gray-50 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                }`}
              >
                الفواتير
              </button>
              <button
                onClick={() => handleSelection("edit", "quotations")}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  subTab === "quotations" ? "bg-gray-50 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                }`}
              >
                عرض الأسعار
              </button>
             
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => window.print()}
            className="bg-[#16C47F] text-white px-4 py-2 rounded-lg shadow-md"
          >
            طباعة
          </button>
          <span className="text-gray-700 text-lg font-semibold">
            {getCurrentTabText()}
          </span>
        </div>
      </div>

      <div>
        <Tables setActiveTab={setActiveTab} setSubTab={setSubTab} activeTab={activeTab} subTab={subTab} />
      </div>
    </>
  );
};

export default OrderManagement;
