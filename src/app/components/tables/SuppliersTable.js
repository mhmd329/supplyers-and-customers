import React, { useState } from "react";
import { suppliers } from "../data";

const SuppliersTable = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierList, setSupplierList] = useState(suppliers);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // حالة البحث

  // دالة لتصفية الموردين بناءً على البحث
  const filteredSuppliers = supplierList.filter(supplier => {
    return (
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.phone.includes(searchQuery) ||
      supplier.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDeleteSupplier = (id) => {
    setSupplierList(supplierList.filter((supplier) => supplier.id !== id));
  };

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier(prev => ({
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
    setIsModalOpen(false); // إغلاق المودال بعد إضافة المورد
  };

  return (
    <div className="overflow-x-auto mx-2 sm:mx-0">
      {/* حقل البحث */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="ابحث عن مورد"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
        >
          إضافة مورد جديد
        </button>
      </div>

      {/* مودال إضافة مورد جديد */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">إضافة مورد جديد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">اسم المورد *</label>
                <input
                  type="text"
                  name="name"
                  value={newSupplier.name}
                  onChange={handleSupplierChange}
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
                  onChange={handleSupplierChange}
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
                  onChange={handleSupplierChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="أدخل العنوان"
                  required
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleAddSupplier}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
                disabled={!newSupplier.name || !newSupplier.phone || !newSupplier.address}
              >
                حفظ المورد
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* جدول الموردين */}
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
                  className={`text-center border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"}`}
                >
                  <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                    <button
                      className="text-red-500 border border-red-500 px-2 sm:px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                      onClick={() => handleDeleteSupplier(supplier.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      حذف
                    </button>
                    <button
                      className="bg- border-green-300 border-2 text-green-400 px-2 sm:px-3 py-1 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
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

      {selectedSupplier && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">تفاصيل المورد</h2>
            <p><strong>اسم المورد:</strong> {selectedSupplier.name}</p>
            <p><strong>رقم الهاتف:</strong> {selectedSupplier.phone}</p>
            <p><strong>العنوان:</strong> {selectedSupplier.address}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedSupplier(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersTable;
