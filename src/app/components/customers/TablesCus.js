import React from "react";
import DuesTableCus from "./tables/DuesTableCus";
import Customer from "./tables/customer"; 
const Tables = ({ setActiveTab, activeTab, subTab ,setSubTab }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {activeTab === "dues" && <DuesTableCus />}
      {(activeTab === "suppliers" || activeTab==="edit") && (
        <Customer
          setActiveTab={setActiveTab} activeTab={activeTab} subTab={subTab} setSubTab={setSubTab}

        />
      )}
     
    </div>
  );
};

export default Tables;
