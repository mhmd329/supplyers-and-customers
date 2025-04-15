"use client";
import React, { useState } from "react";
import Tables from "./TablesCus";
import print from "../assets/Printer.png"
import Image from "next/image";
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
      <h2 dir="rtl" className="text-3xl font-bold text-gray-800 mt-6 px-2 sm:px-0">
        العملاء
      </h2>

      <div className="p-4 sm:p-6 rounded-lg  mx-2 sm:mx-0 flex flex-col sm:flex-row justify-between gap-4">
        
        <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row">
            <button
              onClick={() => handleSelection("dues")}
              className={`px-4 py-2 border-[1px] border-[#D9D9D9] cursor-pointer ${activeTab === "dues"
                ? "bg-white text-gray-900"
                : " text-gray-700 hover:bg-gray-300"
                }`}
            >
              مبالغ المستحقة
            </button>
            <button
              onClick={() => handleSelection("suppliers")}
              className={`px-4 py-2 border-[1px] border-[#D9D9D9] cursor-pointer ${activeTab === "suppliers" && !subTab
                ? "bg-white text-gray-900"
                : " text-gray-700 hover:bg-gray-300"
                }`}
            >
              العملاء
            </button>
          </div>

         
        </div>

        <div className="flex flex-col-reverse sm:flex-col items-end gap-2 text-end">
          <button
            onClick={() => window.print()}
            className="bg-[#16C47F] flex gap-5 justify-center w-[148px] hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-t-lg"
          >
            طباعة
            <Image src={print} alt="print icon" width={20} height={20} />

          </button>

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
