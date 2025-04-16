import React from "react";
import Customer from "./tables/customer";
import DuesTableCus from "./tables/DuesTableCus";

const Tables = ({ setActiveTab, activeTab, subTab ,setSubTab ,getCurrentTabText}) => {
  return (
    <div className="p-4 rounded-lg ">
      {activeTab === "dues" && <DuesTableCus getCurrentTabText={getCurrentTabText} />}
      {(activeTab === "suppliers" || activeTab==="edit") && (
        <Customer
          setActiveTab={setActiveTab} activeTab={activeTab} subTab={subTab} setSubTab={setSubTab} getCurrentTabText={getCurrentTabText}

        />
      )}
     
    </div>
  );
};

export default Tables;
