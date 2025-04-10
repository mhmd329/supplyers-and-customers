import React from "react";
import CustomerTable from "./tables/CustomerTable";
import DuesTableCus from "./tables/DuesTableCus";
import InvoicesTableCus from "./tables/InvoicesTableCus";

const Tables = ({ setActiveTab, activeTab, subTab }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {activeTab === "dues" && <DuesTableCus />}
      {(activeTab === "suppliers" || activeTab==="edit"&& subTab === null) && (
        <CustomerTable
          setActiveTab={setActiveTab}

        />
      )}

      {activeTab === "edit" && subTab === "invoices" && <InvoicesTableCus />}
    </div>
  );
};

export default Tables;
