import React, { useState } from "react";
import { invoices } from "../dataCus";

const DuesTableCus = () => {
  const [duesList, setDuesList] = useState(invoices);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDues = duesList.filter((dues) => {
    return (
      dues.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dues.remainingAmount.toString().includes(searchQuery)
    );
  });

  return (
    <div className="overflow-x-auto mx-2 sm:mx-0">
      <div className="relative mt-4 bg-gray-50 sm:mt-0 w-1/2 sm:w-1/3 mb-4 ml-auto">
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

      {filteredDues.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
          لا توجد بيانات متاحة
        </div>
      ) : (
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#D0F3E5] text-gray-700">
                <th className="py-3 px-4 border-b text-sm sm:text-base">المبلغ المتبقي</th>
                <th className="py-3 px-4 border-b text-sm sm:text-base">اسم المورد</th>
              </tr>
            </thead>
            <tbody>
              {filteredDues.map((due, index) => (
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
    </div>
  );
};

export default DuesTableCus;
