import React, { useState } from "react";
import { invoices } from "../dataCus";

const InvoicesTableCus = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoiceList, setInvoiceList] = useState(invoices);
    const [searchTerm, setSearchTerm] = useState("");
    const [showTaxModal, setShowTaxModal] = useState(false);
    const [showInvDet, setShowInvDet] = useState(false)
    const filteredInvoices = invoiceList.filter((invoice) =>
        invoice.invoiceNumber.includes(searchTerm) ||
        invoice.supplier.includes(searchTerm)
    );


    return (
        <div className="overflow-x-auto shadow-md mx-2 sm:mx-0">
            
            <div className="relative mt-4 sm:mt-0 w-1/2 sm:w-1/3 mb-4 ml-auto">
            <input
            type="text"
            placeholder="ابحث هنا"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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


            {filteredInvoices.length === 0 ? (
                <div className="text-center py-8 text-gray-500 rounded-lg shadow">
                    لا توجد بيانات متاحة
                </div>
            ) : (
                <div className="shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-[#D0F3E5] text-gray-700">
                                <th className="py-3 px-4 border-b">خيارات</th>
                                <th className="py-3 px-4 border-b"> المبلغ المتبقي</th>
                                <th className="py-3 px-4 border-b"> مبلغ الفاتورة</th>
                                <th className="py-3 px-4 border-b">التاريخ</th>

                                <th className="py-3 px-4 border-b">رقم الفاتورة</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice, index) => (
                                <tr
                                    key={invoice.id}
                                    className={`text-center border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"}`}
                                >
                                    <td className="py-2 px-3 flex justify-center">

                                        <button
                                            className="text-[#16C47F] hover:bg-green-700 border border-[#16C47F] cursor-pointer px-2 sm:px-3 py-1 rounded-md transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                                            onClick={() => setSelectedInvoice(invoice)}
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
                                    <td className="py-3 px-4">{invoice.remainingAmount}</td>
                                    <td className="py-3 px-4">{invoice.totalAmount}</td>

                                    <td className="py-3 px-4">{invoice.invoiceDate}</td>
                                    <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedInvoice && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
                    <div className=" p-6 bg-white rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[900px] max-h-[90vh] overflow-auto relative">
                        <button
                            className="text-black rounded-full w-8 h-8 flex items-center justify-center absolute top-4 left-4 cursor-pointer"
                            onClick={() => setSelectedInvoice(null)}
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">عرض الفاتورة</h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border rounded-md text-sm">
                                <thead>
                                    <tr className="bg-[#D0F3E5] text-gray-700">
                                        <th className="py-3 px-4 border-b">اجمالي الفاتورة</th>
                                        <th className="py-3 px-4 border-b">الضريبة</th>
                                        <th className="py-3 px-4 border-b">الخصم</th>
                                        <th className="py-3 px-4 border-b">الاجمالي</th>
                                        <th className="py-3 px-4 border-b cursor-pointer hover:scale-125 transition" onClick={()=>setShowInvDet(prev => !prev)}>وحدة الشراء</th>
                                       <th className="py-3 px-4 border-b">الكمية</th>
                                        <th className="py-3 px-4 border-b">اسم الصنف</th>
                                        <th className="py-3 px-4 border-b">الكود</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center border-b bg-gray-50">
                                        <td className="py-3 px-4">451</td>

                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => setShowTaxModal(true)}
                                                className="text-[#16C47F] hover:text-green-700 underline cursor-pointer"
                                            >
                                                عرض الضريبة
                                            </button>
                                        </td>

                                        <td className="py-3 px-4">15</td>
                                        <td className="py-3 px-4">2000</td>
                                        <td className="py-3 px-4">500</td>
                                        <td className="py-3 px-4">4</td>
                                        <td className="py-3 px-4">لابتوب</td>
                                        <td className="py-3 px-4">15</td>
                                    </tr>
                                </tbody>
                            </table>
                            {showTaxModal && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
    <div className="ß p-6 bg-white rounded-lg shadow-lg w-full max-w-[90%] md:max-w-md max-h-[90vh] overflow-y-auto relative">
      <button
        className="text-black rounded-full w-8 h-8 flex items-center justify-center absolute top-4 left-4 cursor-pointer"
        onClick={() => setShowTaxModal(false)}
      >
        ×
      </button>
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">
        تفاصيل الضريبة
      </h2>

      <div className="text-right flex  gap-6 text-gray-600">
        {/* ضريبة مبيعات */}
        <div className="flex flex-col ">
          <label className="font-semibold mb-2 text-lg">ضريبة مبيعات</label>
          <select dir="rtl"
            className="border px-4 py-3 rounded w-45 text-lg text-right"
          >
            <option value="">لا يوجد</option>
            <option value="5%">5%</option>
            <option value="10%">10%</option>
            <option value="15%">15%</option>
          </select>
        </div>

        {/* ضريبة دخل */}
        <div className="flex flex-col ">
          <label className="font-semibold mb-2 text-lg">ضريبة دخل</label>
          <select dir="rtl"
            className="border px-4 py-3 rounded w-45 text-lg text-right"
          >
            <option value="">لا يوجد</option>
            <option value="10%">10%</option>
            <option value="20%">20%</option>
            <option value="25%">25%</option>
          </select>
        </div>
      </div>
    </div>
  </div>
)}


{showInvDet&&(
      <table className="min-w-full bg-white border rounded-md overflow-hidden text-sm mt-4">
      <thead>
          <tr className="bg-gray-300 text-gray-700">
              <th className="py-3 px-4 border-b">وحدة البيع</th>
              <th className="py-3 px-4 border-b">محتويات الوحدة 1:1:1</th>
              <th className="py-3 px-4 border-b">وحدة البيع</th>
              <th className="py-3 px-4 border-b">محتويات الوحدة 1:1</th>
              <th className="py-3 px-4 border-b">وحدة القياس</th>
              <th className="py-3 px-4 border-b">وحدة البيع</th>
              <th className="py-3 px-4 border-b">نوع الوحدة</th>
          </tr>
      </thead>
      <tbody>
          <tr className="text-center border-b bg-gray-50">
              <td className="py-3 px-4">4</td>
              <td className="py-3 px-4">10</td>
              <td className="py-3 px-4">42</td>
              <td className="py-3 px-4">12</td>
              <td className="py-3 px-4">كج</td>
              <td className="py-3 px-4">500</td>
              <td className="py-3 px-4">كرتونة</td>
          </tr>
      </tbody>
  </table>
)}
                      
                            <h2>500026</h2>
                            <h3 dir="rtl">تفاصيل الفاتورة</h3>
                            <table className="min-w-full bg-white border rounded-md overflow-hidden text-sm mt-4">
                                <thead>
                                    <tr className="bg-gray-300 text-gray-700">
                                        <th className="py-3 px-4 border-b">طريقة الدفع</th>
                                        <th className="py-3 px-4 border-b">صافي المرتجع</th>
                                        <th className="py-3 px-4 border-b">اجمالي ضريبة خصم واضافة</th>
                                        <th className="py-3 px-4 border-b">اجمالي ضريبة جدول</th>
                                        <th className="py-3 px-4 border-b">اجمالي ضريبة القيمة المضافة</th>
                                        <th className="py-3 px-4 border-b">اجمالي الخصم</th>
                                        <th className="py-3 px-4 border-b">اجمالي المرتجع</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center border-b bg-gray-50">
                                        <td className="py-3 px-4">
                                            <select
                                                className="border border-gray-300 rounded-md px-3 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="بنكي">بنكي</option>
                                                <option value="نقدي">نقدي</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-4">1500 ج.م</td>
                                        <td className="py-3 px-4">300 ج.م</td>
                                        <td className="py-3 px-4">15</td>
                                        <td className="py-3 px-4">15</td>
                                        <td className="py-3 px-4">15</td>
                                        <td className="py-3 px-4">5454</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p dir="rtl">
                                رقم الشيك : 12824781 &nbsp;&nbsp;&nbsp; مبلغ الشيك: 5000
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicesTableCus;
