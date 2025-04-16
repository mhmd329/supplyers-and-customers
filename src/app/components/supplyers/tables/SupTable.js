import React, { useState } from "react";
import AddIcon from "../../assets/Add.png"
import Image from "next/image";
const SuppliersTable = ({
  handleEditOrder,
  supplierList,
  setSupplierList,
  newSupplier,
  setNewSupplier,

  isModalOpen,
  setIsModalOpen
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuppliers = supplierList.filter(supplier => {
    return (
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.phone.includes(searchQuery) ||
      supplier.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAddSupplier = () => {
    const newId = Math.max(...supplierList.map(s => s.id), 0) + 1;
    const supplierToAdd = {
      id: newId,
      name: newSupplier.name,
      phone: newSupplier.phone,
      type: newSupplier.type,
      address: newSupplier.address
    };

    setSupplierList([...supplierList, supplierToAdd]);
    setNewSupplier({ name: "", phone: "", email: "", address: "", type: "" });
    setIsModalOpen(false);
  };

  const handleDeleteSupplier = (id) => {
    setSupplierList(supplierList.filter((supplier) => supplier.id !== id));
  };
  return (
    <div className="shadow-md">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#16C47F] hover:bg-[#149f68] text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
        >
          <span>إضافة مورد</span>
          <Image src={AddIcon} alt="أيقونة الإضافة" className="w-5 h-5" />
        </button>



        <div className="relative mt-4  sm:mt-0 w-1/2 sm:w-1/3">
          <input
            type="text"
            placeholder="ابحث هنا"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pr-10 border border-gray-300 rounded-xl text-right"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
            />
          </svg>
        </div>

      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className=" p-5 bg-white rounded-lg shadow-lg w-[600px] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 left-2 text-black px-2 py-1 rounded-lg cursor-pointer"
            >
              x
            </button>

            <h3 className="text-lg mb-4 text-[#1E1E1E] text-center">
              إضافة مورد جديد
            </h3>

            <div dir="rtl" className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1E1E1E] mb-1">اسم المورد *</label>
                <input
                  type="text"
                  name="name"
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, name: e.target.value })
                  }
                  className="w-64 p-2 border border-gray-300 rounded-lg"
                  placeholder=" اسم المورد"
                  required
                />
              </div>
              <div>
                <label className="block text-[#1E1E1E] mb-1">رقم الهاتف *</label>
                <input
                  type="text"
                  name="phone"
                  value={newSupplier.phone}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, phone: e.target.value })
                  }
                  className="w-64 p-2 border border-gray-300 rounded-lg"
                  placeholder=" رقم الهاتف"
                  required
                />
              </div>
              <div>
                <label className="block text-[#1E1E1E] mb-1">نوع المورد *</label>
                <input
                  type="text"
                  name="address"
                  value={newSupplier.type}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, type: e.target.value })
                  }
                  className="w-64 p-2 border border-gray-300 rounded-lg"
                  placeholder=" نوع المورد"
                  required
                />
              </div>
              <div>
                <label className="block text-[#1E1E1E] mb-1">العنوان *</label>
                <input
                  type="text"
                  name="address"
                  value={newSupplier.address}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, address: e.target.value })
                  }
                  className="w-64 p-2 border border-gray-300 rounded-lg"
                  placeholder=" العنوان"
                  required
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={handleAddSupplier}
                className="bg-[#16C47F] hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md"
                disabled={!newSupplier.name || !newSupplier.phone || !newSupplier.address || !newSupplier.type}
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}


      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-8 text-gray-500  rounded-lg shadow">
          لا توجد بيانات متاحة
        </div>
      ) : (
        <div className="shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#D0F3E5] text-gray-700">
                <th className="py-3 px-4 border-b text-sm sm:text-base">خيارات</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">نوع المورد</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">العنوان</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base"> الهاتف</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">اسم المورد</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className={`text-center border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"
                    }`}
                >
                  <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                    <button
                      className="text-red-500 border  border-red-500 px-2 sm:px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center justify-center gap-1 text-xs sm:text-sm cursor-pointer"
                      onClick={() => handleDeleteSupplier(supplier.id)}
                    >
                      حذف
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7"
                        />
                      </svg>
                    </button>

                    <button
                      className="text-[#16C47F] hover:bg-green-700  cursor-pointer border border-[#16C47F] px-2 sm:px-3 py-1 rounded-md transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                      onClick={() => handleEditOrder(supplier)}
                    >
                      عرض
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#16C47F"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>

                  </td>
                  <td className="py-3 px-4 text-sm sm:text-base">{supplier.type}</td>
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
  )

};

export default SuppliersTable;
