import React from "react";
import SuppliersTable from "./tables/SuppliersTable";
import DuesTable from "./tables/DuesTable";
import QuotationsTable from "./tables/QuotationsTable";
import InvoicesTable from "./tables/InvoicesTable";

const Tables = ({ setActiveTab, activeTab, subTab }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {activeTab === "dues" && <DuesTable />}
      {(activeTab === "suppliers" || activeTab==="edit"&& subTab === null) && (
        <SuppliersTable
          setActiveTab={setActiveTab}

        />
      )}
      {activeTab === "edit" && subTab === "quotations" && <QuotationsTable />}
      {activeTab === "edit" && subTab === "invoices" && <InvoicesTable />}
    </div>
  );
};

export default Tables;
