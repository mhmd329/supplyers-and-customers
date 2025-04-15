import React from "react";
import Suppliers from "./tables/supplier";
import DuesTable from "./tables/DuesTable";

const Tables = ({ setActiveTab, activeTab, subTab ,setSubTab }) => {
  return (
    <div className="p-4 rounded-lg shadow-lg">
      {activeTab === "dues" && <DuesTable />}
      {(activeTab === "suppliers" || activeTab==="edit") && (
        <Suppliers
          setActiveTab={setActiveTab} activeTab={activeTab} subTab={subTab} setSubTab={setSubTab}

        />
      )}
     
    </div>
  );
};

export default Tables;
