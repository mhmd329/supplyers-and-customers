import React, { useState } from "react";
import { invoices } from "../data"; // استيراد البيانات

const InvoicesTable = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoiceList, setInvoiceList] = useState(invoices);
    const [searchTerm, setSearchTerm] = useState(""); // حالة البحث

    // دالة لتصفية الفواتير بناءً على النص المدخل في البحث
    const filteredInvoices = invoiceList.filter((invoice) =>
        invoice.invoiceNumber.includes(searchTerm) ||
        invoice.supplier.includes(searchTerm)
    );

    const handleDeleteInvoice = (id) => {
        setInvoiceList(invoiceList.filter((invoice) => invoice.id !== id));
    };

    return (
        <div className="overflow-x-auto mx-2 sm:mx-0">
            {/* مربع البحث */}
            <div dir="rtl" className="relative mt-4 w-full sm:w-80">
                <input
                    type="text"
                    placeholder="ابحث هنا..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border text-right border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                    className="w-5 h-5 text-gray-500 absolute inset-y-0 left-3 my-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>

            {filteredInvoices.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
                    لا توجد بيانات متاحة
                </div>
            ) : (
                <div className="shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-[#D0F3E5] text-gray-700">
                                <th className="py-3 px-4 border-b">خيارات</th>
                                <th className="py-3 px-4 border-b">رقم الفاتورة</th>
                                <th className="py-3 px-4 border-b">التاريخ</th>
                                <th className="py-3 px-4 border-b">المبلغ الكلي</th>
                                <th className="py-3 px-4 border-b">المتبقي</th>
                                <th className="py-3 px-4 border-b">المورد</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice, index) => (
                                <tr
                                    key={invoice.id}
                                    className={`text-center border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"}`}
                                >
                                    <td className="py-3 px-4">
                                        <button
                                            className="text-red-500 border px-3 py-1 rounded-md hover:bg-red-50 transition"
                                            onClick={() => handleDeleteInvoice(invoice.id)}
                                        >
                                            حذف
                                        </button>
                                        <button
                                            className="bg- border-green-300 border-2 text-green-400 px-2 sm:px-3 py-1 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                                            onClick={() => setSelectedInvoice(invoice)}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                            عرض
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                                    <td className="py-3 px-4">{invoice.invoiceDate}</td>
                                    <td className="py-3 px-4">{invoice.totalAmount} ج.م</td>
                                    <td className="py-3 px-4">{invoice.remainingAmount} ج.م</td>
                                    <td className="py-3 px-4">{invoice.supplier}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedInvoice && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">تفاصيل الفاتورة</h2>
                        <p><strong>رقم الفاتورة:</strong> {selectedInvoice.invoiceNumber}</p>
                        <p><strong>التاريخ:</strong> {selectedInvoice.invoiceDate}</p>
                        <p><strong>المبلغ الكلي:</strong> {selectedInvoice.totalAmount} ج.م</p>
                        <p><strong>المبلغ المتبقي:</strong> {selectedInvoice.remainingAmount} ج.م</p>
                        <p><strong>المورد:</strong> {selectedInvoice.supplier}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                onClick={() => setSelectedInvoice(null)}
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

export default InvoicesTable;
