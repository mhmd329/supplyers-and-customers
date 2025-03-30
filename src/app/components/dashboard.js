"use client";
import React, { useState } from "react";
import NavBar from "./nav";
import OrderManagement from "./ordermanage";
import Tables from "./Tables";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("suppliers");
  const [subTab, setSubTab] = useState("quotations");

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="container mx-auto mt-6 p-4">
        {/* ✅ إدارة الطلبات */}
        <OrderManagement 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          subTab={subTab} 
          setSubTab={setSubTab} 
        />

        {/* ✅ الجداول بناءً على الاختيار */}
        <Tables activeTab={activeTab} subTab={subTab} />
      </div>
    </div>
  );
}
