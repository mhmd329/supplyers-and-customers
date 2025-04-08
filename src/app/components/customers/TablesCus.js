import React from "react";
import CustomerTable from "./tables/CustomerTable";
import DuesTable from "./tables/DuesTableCus";
import QuotationsTable from "./tables/QuotationsTableCus";
import InvoicesTable from "./tables/InvoicesTableCus";

const Tables = ({ setActiveTab, activeTab, subTab }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {activeTab === "dues" && <DuesTable />}
      {(activeTab === "suppliers" || activeTab==="edit"&& subTab === null) && (
        <CustomerTable
          setActiveTab={setActiveTab}

        />
      )}

      {activeTab === "edit" && subTab === "invoices" && <InvoicesTable />}
    </div>
  );
};

export default Tables;
