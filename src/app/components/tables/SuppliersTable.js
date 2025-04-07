import React, { useState } from "react";
import {  suppliers } from "../data";

const SuppliersTable = ({   setActiveTab }) => {
  const [selectedSupplier, setSelectedSupplier] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [supplierList, setSupplierList] = useState(suppliers);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filteredSuppliers = supplierList.filter(supplier => {
    return (
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.phone.includes(searchQuery) ||
      supplier.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEditOrder = (supplier) => {
    setEditingId(supplier.id);
    setSelectedSupplier({
      name: supplier.name,
      phone: supplier.phone,
      address: supplier.address
    });
    setShowForm(true);
    setActiveTab("edit")
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

  const handleDeleteSupplier = (id) => {
    setSupplierList(supplierList.filter((supplier) => supplier.id !== id));
  };

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSupplier = () => {
    const newId = Math.max(...supplierList.map(s => s.id), 0) + 1;
    const supplierToAdd = {
      id: newId,
      name: newSupplier.name,
      phone: newSupplier.phone,
      email: newSupplier.email,
      address: newSupplier.address
    };

    setSupplierList([...supplierList, supplierToAdd]);
    setNewSupplier({ name: "", phone: "", email: "", address: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto mx-2 sm:mx-0">
     
      {showForm &&  (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 mx-2 sm:mx-0">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-right">
      تعديل المورد
    </h2>
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <button
        onClick={handleUpdateOrder}
        className={`w-full sm:w-24 h-12 rounded-md shadow transition flex items-center justify-center gap-2 ${
          (!selectedSupplier.name || !selectedSupplier.phone || !selectedSupplier.address)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
        disabled={!selectedSupplier.name || !selectedSupplier.phone || !selectedSupplier.address}
      >
        تحديث
      </button>

      <div className="w-full sm:w-1/3">
        <label className="block text-gray-700 mb-2 text-right">اسم المورد</label>
        <input
          type="text"
          name="name"
          value={selectedSupplier.name}
          onChange={handleSupplierChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
          placeholder="اسم المورد"
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
    </div>
  </div>
)}
<div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md w-auto"
  >
    إضافة مورد جديد
  </button>

  <input
    type="text"
    placeholder="ابحث عن مورد"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="mt-4 sm:mt-0 w-1/2 sm:w-1/3 p-2 border border-gray-300 rounded-lg"
  />
</div>

     
{isModalOpen && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 left-2 text-black px-2 py-1 rounded-lg cursor-pointer"
      >
        x
      </button>
      
      <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
        إضافة مورد جديد
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">اسم المورد *</label>
          <input
            type="text"
            name="name"
            value={newSupplier.name}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, name: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="أدخل اسم المورد"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">رقم الهاتف *</label>
          <input
            type="text"
            name="phone"
            value={newSupplier.phone}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, phone: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="أدخل رقم الهاتف"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">العنوان *</label>
          <input
            type="text"
            name="address"
            value={newSupplier.address}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, address: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="أدخل العنوان"
            required
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-2">
        <button
          onClick={handleAddSupplier}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          disabled={!newSupplier.name || !newSupplier.phone || !newSupplier.address}
        >
          حفظ المورد
        </button>
       
      </div>
    </div>
  </div>
)}


      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
          لا توجد بيانات متاحة
        </div>
      ) : (
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#D0F3E5] text-gray-700">
                <th className="py-3 px-4 border-b text-sm sm:text-base">خيارات</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">العنوان</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">رقم الهاتف</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">الاسم</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className={`text-center border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"
                  }`}
                >
                  <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                    <button
                      className="text-red-500 border border-red-500 px-2 sm:px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                      onClick={() => handleDeleteSupplier(supplier.id)}
                    >
                      حذف
                    </button>
                    <button
                      className="bg-green-400 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                      onClick={() => handleEditOrder(supplier)}
                    >
                      عرض
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm sm:text-base">{supplier.address}</td>
                  <td className="py-3 px-4 text-sm sm:text-base">{supplier.phone}</td>
                  <td className="py-3 px-4 text-sm sm:text-base">{supplier.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SuppliersTable;
