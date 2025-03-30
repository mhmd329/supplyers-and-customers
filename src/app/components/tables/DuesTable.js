import React, { useState } from "react";
import { invoices } from "../data"; // استيراد البيانات

const DuesTable = () => {
  const [duesList, setDuesList] = useState(invoices);
  const [selectedDue, setSelectedDue] = useState(null);

  const handleDeleteDue = (id) => {
    setDuesList(duesList.filter((due) => due.id !== id));
  };

  return (
    <div className="overflow-x-auto mx-2 sm:mx-0">
      {duesList.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
          لا توجد بيانات متاحة
        </div>
      ) : (
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#D0F3E5] text-gray-700">
                <th className="py-3 px-4 border-b text-sm sm:text-base">خيارات</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">المبلغ المتبقي</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">اسم المورد</th>
              </tr>
            </thead>
            <tbody>
              {duesList.map((due, index) => (
                <tr
                  key={due.id}
                  className={`text-center border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"
                  }`}
                >
                  <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                    <button
                      className="text-red-500 border border-red-500 px-2 sm:px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                      onClick={() => handleDeleteDue(due.id)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      حذف
                    </button>
                    <button
                      className="bg- border-green-300 border-2 text-green-400 px-2 sm:px-3 py-1 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                      onClick={() => setSelectedDue(due)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                      عرض
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm sm:text-base">{due.remainingAmount} جنيه</td>
                  <td className="py-3 px-4 text-sm sm:text-base">{due.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* مودال عرض التفاصيل */}
      {selectedDue && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">تفاصيل المبلغ المستحق</h2>
            <p><strong>رقم الفاتورة:</strong> {selectedDue.invoiceNumber}</p>
            <p><strong>التاريخ:</strong> {selectedDue.invoiceDate}</p>
            <p><strong>إجمالي المبلغ:</strong> {selectedDue.totalAmount} جنيه</p>
            <p><strong>المبلغ المتبقي:</strong> {selectedDue.remainingAmount} جنيه</p>
            <p><strong>اسم المورد:</strong> {selectedDue.supplier}</p>
            <p><strong>الوصف:</strong> {selectedDue.description}</p>

            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => setSelectedDue(null)}
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

export default DuesTable;
