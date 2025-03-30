import React, { useState } from "react";
import { quotations } from "../data";

const QuotationsTable = () => {
    const [selectedQuotation, setSelectedQuotation] = useState(null);
    const [quotationList, setQuotationList] = useState(quotations);
    const [newQuotation, setNewQuotation] = useState({
        quotationNumber: "",
        quotationDate: "",
        supplier: "",
        description: "",
        amount: ""
    });
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // حالة البحث

    // دالة لتحديث قيم الحقول لنموذج العرض الجديد
    const handleQuotationChange = (e) => {
        const { name, value } = e.target;
        setNewQuotation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // دالة لحفظ العرض الجديد في القائمة
    const handleAddQuotation = () => {
        const newId = Math.max(...quotationList.map(q => q.id), 0) + 1;
        const quotationToAdd = {
            id: newId,
            quotationNumber: newQuotation.quotationNumber,
            quotationDate: newQuotation.quotationDate,
            supplier: newQuotation.supplier,
            description: newQuotation.description,
            amount: newQuotation.amount
        };

        setQuotationList([...quotationList, quotationToAdd]);
        setNewQuotation({ quotationNumber: "", quotationDate: "", supplier: "", description: "", amount: "" });
        setShowModal(false);
    };

    // دالة لتصفية العروض بناءً على النص المدخل في البحث
    const filteredQuotations = quotationList.filter((quotation) =>
        quotation.quotationNumber.includes(searchTerm) ||
        quotation.supplier.includes(searchTerm) ||
        quotation.description.includes(searchTerm)
    );

    const handleDeleteQuotation = (id) => {
        setQuotationList(quotationList.filter((quotation) => quotation.id !== id));
    };

    return (
        <div className="overflow-x-auto mx-2 sm:mx-0">
            <button 
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md mb-4"
                onClick={() => setShowModal(true)}
            >
                إضافة عرض جديد
            </button>

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

            {filteredQuotations.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
                    لا توجد بيانات متاحة
                </div>
            ) : (
                <div className="shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-[#D0F3E5] text-gray-700">
                                <th className="py-3 px-4 border-b">خيارات</th>
                                <th className="py-3 px-4 border-b">رقم العرض</th>
                                <th className="py-3 px-4 border-b">التاريخ</th>
                                <th className="py-3 px-4 border-b">المورد</th>
                                <th className="py-3 px-4 border-b">الوصف</th>
                                <th className="py-3 px-4 border-b">المبلغ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuotations.map((quotation, index) => (
                                <tr key={quotation.id} className={`text-center border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"}`}>
                                    <td className="py-3 px-4">
                                        <button className="text-red-500 border px-3 py-1 rounded-md hover:bg-red-50 transition"
                                            onClick={() => handleDeleteQuotation(quotation.id)}>
                                            حذف
                                        </button>
                                       <button    className="bg- border-green-300 border-2 text-green-400 px-2 sm:px-3 py-1 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                                            onClick={() => setSelectedQuotation(quotation)}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                                            عرض
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">{quotation.quotationNumber}</td>
                                    <td className="py-3 px-4">{quotation.quotationDate}</td>
                                    <td className="py-3 px-4">{quotation.supplier}</td>
                                    <td className="py-3 px-4">{quotation.description}</td>
                                    <td className="py-3 px-4">{quotation.amount} ج.م</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedQuotation && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">تفاصيل العرض</h2>
                        <p><strong>رقم العرض:</strong> {selectedQuotation.quotationNumber}</p>
                        <p><strong>التاريخ:</strong> {selectedQuotation.quotationDate}</p>
                        <p><strong>المورد:</strong> {selectedQuotation.supplier}</p>
                        <p><strong>الوصف:</strong> {selectedQuotation.description}</p>
                        <p><strong>المبلغ:</strong> {selectedQuotation.amount} ج.م</p>
                        <div className="flex justify-end mt-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                onClick={() => setSelectedQuotation(null)}>
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal لإضافة عرض جديد */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">إضافة عرض جديد</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">رقم العرض *</label>
                            <input
                                type="text"
                                name="quotationNumber"
                                value={newQuotation.quotationNumber}
                                onChange={handleQuotationChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="أدخل رقم العرض"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">التاريخ *</label>
                            <input
                                type="date"
                                name="quotationDate"
                                value={newQuotation.quotationDate}
                                onChange={handleQuotationChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">المورد *</label>
                            <input
                                type="text"
                                name="supplier"
                                value={newQuotation.supplier}
                                onChange={handleQuotationChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="أدخل اسم المورد"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">الوصف *</label>
                            <input
                                type="text"
                                name="description"
                                value={newQuotation.description}
                                onChange={handleQuotationChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="أدخل الوصف"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">المبلغ *</label>
                            <input
                                type="number"
                                name="amount"
                                value={newQuotation.amount}
                                onChange={handleQuotationChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="أدخل المبلغ"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
                                onClick={handleAddQuotation}
                                disabled={!newQuotation.quotationNumber || !newQuotation.quotationDate || !newQuotation.supplier || !newQuotation.description || !newQuotation.amount}
                            >
                                حفظ العرض
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                                onClick={() => setShowModal(false)}
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuotationsTable;
