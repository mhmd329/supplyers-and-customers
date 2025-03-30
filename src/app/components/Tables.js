import React from "react";
import SuppliersTable from "./tables/SuppliersTable";
import DuesTable from "./tables/DuesTable";
import QuotationsTable from "./tables/QuotationsTable";
import InvoicesTable from "./tables/InvoicesTable";

const Tables = ({ activeTab, subTab }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {activeTab === "dues" && <DuesTable />}
      {activeTab === "suppliers" && !subTab && <SuppliersTable />}
      {activeTab === "suppliers" && subTab === "quotations" && <QuotationsTable />}
      {activeTab === "suppliers" && subTab === "invoices" && <InvoicesTable />}
    </div>
  );
};

export default Tables;
