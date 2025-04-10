"use client";
import React, { useState } from "react";
import Tables from "./TablesCus";

const OrderManagementCus = () => {
  const [activeTab, setActiveTab] = useState("suppliers");
  const [subTab, setSubTab] = useState("suppliers");

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

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-2 mx-2 sm:mx-0 flex flex-col sm:flex-row justify-between gap-4">
        {/* التبويبات */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleSelection("dues")}
              className={`px-4 py-2 rounded-lg shadow-md ${
                activeTab === "dues"
                  ? "bg-gray-50 text-gray-900"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              المبالغ المستحقة
            </button>
            <button
              onClick={() => handleSelection("suppliers")}
              className={`px-4 py-2 rounded-lg shadow-md ${
                activeTab === "suppliers" && !subTab
                  ? "bg-gray-50 text-gray-900"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              العملاء
            </button>
          </div>

          {/* التبويبات الفرعية */}
          {activeTab === "edit" && (
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={() => handleSelection("edit", "invoices")}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  subTab === "invoices"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                الفواتير
              </button>
              {/* لو عايز ترجع زر عرض الأسعار، شيل الكومنت هنا */}
              {/* <button
                onClick={() => handleSelection("edit", "quotations")}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  subTab === "quotations"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                عرض الأسعار
              </button> */}
            </div>
          )}
        </div>

        {/* الزر والنص */}
        <div className="flex flex-col-reverse sm:flex-col items-end gap-2 text-end">
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

      {/* جدول البيانات */}
      <div>
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
