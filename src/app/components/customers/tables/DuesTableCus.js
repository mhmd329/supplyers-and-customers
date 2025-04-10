import React, { useState } from "react";
import { invoices } from "../dataCus";

const DuesTableCus = () => {
  const [duesList, setDuesList] = useState(invoices);
  const [selectedDue, setSelectedDue] = useState(null);


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

                <th className="py-3 px-4 border-b text-sm sm:text-base">المبلغ المتبقي</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">اسم العميل</th>
              </tr>
            </thead>
            <tbody>
              {duesList.map((due, index) => (
                <tr
                  key={due.id}
                  className={`text-center border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"
                    }`}
                >

                  <td className="py-3 px-4 text-sm sm:text-base">{due.remainingAmount} جنيه</td>
                  <td className="py-3 px-4 text-sm sm:text-base">{due.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default DuesTableCus;
