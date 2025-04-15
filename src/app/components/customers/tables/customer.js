import React, { useState } from "react";
import { suppliers } from "../dataCus";
import CustomerTable from "./CustomerTable";
import InvoicesTableCus from "./InvoicesTableCus";

const Customer = ({ setActiveTab, activeTab, subTab, setSubTab }) => {
  const [selectedSupplier, setSelectedSupplier] = useState({
    name: "",
    phone: "",
    address: ""
  })
  const [supplierList, setSupplierList] = useState(suppliers);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditOrder = (supplier) => {
    setEditingId(supplier.id);
    setSelectedSupplier({
      name: supplier.name,
      phone: supplier.phone,
      address: supplier.address
    });
    setShowForm(true);
    setActiveTab("edit")
    setSubTab("invoices")

  };

  const handleUpdateOrder = () => {
    setSupplierList(supplierList.map(supplier =>
      supplier.id === editingId
        ? {
          ...supplier,
          name: selectedSupplier.name,
          phone: selectedSupplier.phone,
          address: selectedSupplier.address
        }
        : supplier
    ));

    setEditingId(null);
    setShowForm(false);
    setSelectedSupplier({
      name: "",
      phone: "",
      address: ""
    });
  };


  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelection = (tab, newSubTab = null) => {
    setActiveTab(tab);
    setSubTab(newSubTab);
  };

  return (
    <div className="overflow-x-auto mx-2 sm:mx-0">

      {showForm && (
        <div className=" p-4 sm:p-6 rounded-lg shadow-md mb-6 mx-2 sm:mx-0">

          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <button
              onClick={handleUpdateOrder}
              className={`w-full sm:w-24 h-12 rounded-md shadow transition cursor-pointer flex items-center justify-center gap-2 ${(!selectedSupplier.name || !selectedSupplier.phone || !selectedSupplier.address)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#16C47F] hover:bg-green-500 text-white'
                }`}
              disabled={!selectedSupplier.name || !selectedSupplier.phone || !selectedSupplier.address}
            >
              حفظ
            </button>

            <div className="w-full sm:w-1/3">
              <label className="block text-gray-700 mb-2 text-right">العنوان</label>
              <input
                type="text"
                name="address"
                value={selectedSupplier.address}
                onChange={handleSupplierChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                placeholder="العنوان"
                required
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block text-gray-700 mb-2 text-right">رقم الهاتف</label>
              <input
                type="text"
                name="phone"
                value={selectedSupplier.phone}
                onChange={handleSupplierChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                placeholder="رقم الهاتف"
                required
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block text-gray-700 mb-2 text-right"> الاسم</label>
              <input
                type="text"
                name="name"
                value={selectedSupplier.name}
                onChange={handleSupplierChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                placeholder="اسم العميل"
                required
              />
            </div>


          </div>
        </div>
      )}
      {activeTab === "edit" && (
        <div className="flex flex-col sm:flex-row gap-2 mb-4 mt-2">
          <button
            onClick={() => handleSelection("edit", "invoices")}
            className={`px-4 py-2 shadow-md cursor-pointer ${subTab === "invoices"
                ? "bg-white text-gray-900"
                : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
          >
            الفواتير
          </button>
         
        </div>
      )}

      {(activeTab === "suppliers" || (activeTab === "edit" && subTab === null)) && (
        <CustomerTable
          handleEditOrder={handleEditOrder}
          supplierList={supplierList}
          setSupplierList={setSupplierList}
          newSupplier={newSupplier}
          setNewSupplier={setNewSupplier}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {/* عرض الجدول للفواتير وعرض الأسعار */}
      {activeTab === "edit" && subTab === "invoices" && <InvoicesTableCus />}
    </div>
  );
}

export default Customer;
