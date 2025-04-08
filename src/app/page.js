"use client"
import OrderManagementCus from "./components/customers/ordermanageCus";
import NavBar from "./components/supplyers/nav";
import OrderManagement from "./components/supplyers/ordermanage";
import { useState } from "react";
export default function Home() {
  const [activeTab, setActiveTab] = useState("suppliers"); // or "customers"

  return (
    <div className="">
      <NavBar />

      <div className="flex justify-center my-4 gap-4">
        <button
          onClick={() => setActiveTab("suppliers")}
          className={`px-4 py-2 rounded ${
            activeTab === "suppliers"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          الموردين
        </button>

        <button
          onClick={() => setActiveTab("customers")}
          className={`px-4 py-2 rounded ${
            activeTab === "customers"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          العملاء
        </button>
      </div>

      <div className="px-4">
        {activeTab === "suppliers" && <OrderManagement />}
        {activeTab === "customers" && <OrderManagementCus />}
      </div>
    </div>
  );
}