import React from "react";
import Suppliers from "./tables/supplier";
import DuesTable from "./tables/DuesTable";

const Tables = ({ setActiveTab, activeTab, subTab ,setSubTab ,getCurrentTabText}) => {
  return (
    <div className="p-4 rounded-lg">
      {activeTab === "dues" && <DuesTable getCurrentTabText={getCurrentTabText}/>}
      {(activeTab === "suppliers" || activeTab==="edit") && (
        <Suppliers
          setActiveTab={setActiveTab} activeTab={activeTab} subTab={subTab} setSubTab={setSubTab} getCurrentTabText={getCurrentTabText}

        />
      )}
     
    </div>
  );
};

export default Tables;
