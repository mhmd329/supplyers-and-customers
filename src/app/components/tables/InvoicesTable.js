import React, { useState } from "react";
import { invoices } from "../data"; 

const InvoicesTable = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoiceList, setInvoiceList] = useState(invoices);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [showTaxModal, setShowTaxModal] = useState(false);

    const filteredInvoices = invoiceList.filter((invoice) =>
        invoice.invoiceNumber.includes(searchTerm) ||
        invoice.supplier.includes(searchTerm)
    );


    return (
        <div className="overflow-x-auto mx-2 sm:mx-0">
            <div className="flex justify-end mt-4 w-full">
                <div className="relative w-full sm:w-80">
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
                                <th className="py-3 px-4 border-b">المبلغ الكلي</th>
                                <th className="py-3 px-4 border-b">المبلغ المتبقي</th>
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
                                    <td className="py-3 px-4">

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
                                    <td className="py-3 px-4">{invoice.totalAmount}</td>
                                    <td className="py-3 px-4">{invoice.remainingAmount}</td>
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
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[900px] max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="text-black rounded-full w-8 h-8 flex items-center justify-center absolute top-4 left-4 cursor-pointer"
                            onClick={() => setSelectedInvoice(null)}
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">عرض الفاتورة</h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border rounded-md overflow-hidden text-sm">
                                <thead>
                                    <tr className="bg-[#D0F3E5] text-gray-700">
                                        <th className="py-3 px-4 border-b">اجمالي الفاتورة</th>
                                        <th className="py-3 px-4 border-b">الضريبة</th>
                                        <th className="py-3 px-4 border-b">الخصم</th>
                                        <th className="py-3 px-4 border-b">الاجمالي</th>
                                        <th className="py-3 px-4 border-b">وحدة الشراء</th>
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
                                                className="text-green-400 underline cursor-pointer"
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
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-md max-h-[90vh] overflow-y-auto relative">
                                        <button
                                            className="text-black rounded-full w-8 h-8 flex items-center justify-center absolute top-4 left-4 cursor-pointer"
                                            onClick={() => setShowTaxModal(false)}
                                        >
                                            ×
                                        </button>
                                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">تفاصيل الضريبة</h2>



                                        <div className="text-right flex justify-around text-gray-600">
                                            <div className="mb-4">
                                                <h3 className="font-semibold">ضريبة مبيعات</h3>
                                                <p>لا يوجد</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">ضريبة دخل</h3>
                                                <p>لا يوجد</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


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
                            <h2>500026</h2>
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
                                                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default InvoicesTable;
