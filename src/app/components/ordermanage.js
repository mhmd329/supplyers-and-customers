"use client";
import React, { useState } from "react";

const OrderManagement = ({ activeTab, setActiveTab, subTab, setSubTab }) => {
  const handleSelection = (tab, newSubTab = null) => {
    setActiveTab(tab);
    setSubTab(newSubTab);
  };

  const getCurrentTabText = () => {
    if (activeTab === "dues") return "المبالغ المستحقة";
    if (activeTab === "suppliers") {
      return subTab === "invoices" ? "الفواتير" 
           : subTab === "quotations" ? "عرض الأسعار" 
           : "الموردين";
    }
    return "اختيار القسم";
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 mx-2 sm:mx-0 flex justify-between items-center">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-2 p-4 bg-white rounded-lg shadow-md">
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

        <div className="flex gap-2 p-4 bg-white rounded-lg shadow-md">
          <button
            onClick={() => handleSelection("suppliers", "quotations")}
            className={`px-4 py-2 rounded-lg shadow-md ${
              activeTab === "suppliers" && subTab === "quotations" ? "bg-gray-50 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
          >
            عرض الأسعار
          </button>
          <button
            onClick={() => handleSelection("suppliers", "invoices")}
            className={`px-4 py-2 rounded-lg shadow-md ${
              activeTab === "suppliers" && subTab === "invoices" ? "bg-gray-50 text-gray-900" : "bg-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
          >
            الفواتير
          </button>
        </div>
      </div>

      {/* ✅ نص يوضح التبويب الحالي */}
      <span className="text-gray-700 text-lg font-semibold">
        {getCurrentTabText()}
      </span>

      {/* ✅ زر طباعة */}
      <button
        onClick={() => window.print()}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
      >
        طباعة
      </button>
    </div>
  );
};

export default OrderManagement;
