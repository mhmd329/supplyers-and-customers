import React, { useState } from "react";
import { quotations } from "../data";

const QuotationsTable = () => {
    const [selectedQuotation, setSelectedQuotation] = useState(null);
    const [quotationList, setQuotationList] = useState(quotations);
    const [newQuotation, setNewQuotation] = useState({
        quotationNumber: "",
        quotationDate: "",
        expiryDate: "",
        supplier: "",
        description: "",
        amount: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleQuotationChange = (e) => {
        const { name, value } = e.target;
        setNewQuotation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddQuotation = () => {

        if (!newQuotation.description || !newQuotation.amount) {
            alert("يرجى ملء جميع الحقول");
            return;
        }

        const newId = Math.max(...quotationList.map(q => q.id), 0) + 1;
        const quotationToAdd = {
            id: newId,
            ...newQuotation
        };

        setQuotationList([...quotationList, quotationToAdd]);
        setNewQuotation({ quotationNumber: "", quotationDate: "", expiryDate: "", supplier: "", description: "", amount: "" });
        setShowModal(false);
    };


    const filteredQuotations = quotationList.filter((quotation) =>
        quotation.amount.toString().includes(searchTerm)
        ||
        quotation.description.includes(searchTerm)
    );

    const handleDeleteQuotation = (id) => {
        setQuotationList(quotationList.filter((quotation) => quotation.id !== id));
    };

    return (
        <div className="overflow-x-auto mx-2 sm:mx-0">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-4" dir="rtl">
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

                <button
                    className="bg-[#16C47F] text-white px-4 py-2 rounded-lg shadow-md"
                    onClick={() => setShowModal(true)}
                >
                    إضافة عرض 
                </button>
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

                                <th className="py-3 px-4 border-b">السعر</th>
                                <th className="py-3 px-4 border-b">وصف العرض</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuotations.map((quotation, index) => (
                                <tr key={quotation.id} className={`text-center border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"}`}>
                                    <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                                        <button
                                            className="text-red-500 border border-red-500 px-2 sm:px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                                            onClick={() => handleDeleteQuotation(quotation.id)}
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
                      className="text-[#16C47F] border border-[#16C47F] px-2 sm:px-3 py-1 rounded-md transition flex items-center justify-center gap-1 text-xs sm:text-sm"
                      onClick={() => setSelectedQuotation(quotation)}
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

                                    <td className="py-3 px-4">{quotation.amount}</td>
                                    <td className="py-3 px-4">{quotation.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedQuotation && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative text-center">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">عرض اسعار</h2>

                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-[#D0F3E5] text-gray-700">
                                    <th className="py-3 px-6 border-b" style={{ width: '20%' }}>الاجمالي</th>
                                    <th className="py-3 px-6 border-b" style={{ width: '20%' }}>الكمية</th>
                                    <th className="py-3 px-6 border-b" style={{ width: '20%' }}>وحدة البيع</th>
                                    <th className="py-3 px-6 border-b" style={{ width: '20%' }}>اسم المنتج</th>
                                    <th className="py-3 px-6 border-b" style={{ width: '20%' }}>كود المنتج</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center border-b bg-gray-50">
                                    <td className="py-3 px-6">451</td>
                                    <td className="py-3 px-6">452</td>
                                    <td className="py-3 px-6">45</td>
                                    <td className="py-3 px-6">لاب توب</td>
                                    <td className="py-3 px-6">125</td>
                                </tr>
                                <tr className="text-center border-b bg-[#E8F9F2]">
                                    <td className="py-3 px-6">451</td>
                                    <td className="py-3 px-6">452</td>
                                    <td className="py-3 px-6">45</td>
                                    <td className="py-3 px-6">لاب توب</td>
                                    <td className="py-3 px-6">125</td>
                                </tr>
                                <tr className="text-center border-b bg-gray-50">
                                    <td className="py-3 px-6">451</td>
                                    <td className="py-3 px-6">452</td>
                                    <td className="py-3 px-6">45</td>
                                    <td className="py-3 px-6">لاب توب</td>
                                    <td className="py-3 px-6">125</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end mt-4">
                            <button
                                className=" text-black px-4 py-2 rounded-md cursor-pointer transition absolute top-0 left-0"
                                onClick={() => setSelectedQuotation(null)}
                            >
                                x
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 flex flex-col justify-start items-center relative">
                        <button
                            className="absolute top-2 right-2 text-gray-700 p-2 rounded-full hover:bg-gray-200"
                            onClick={() => setShowModal(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-gray-800">إضافة عرض جديد</h2>

                        <div className="mb-4 w-full flex items-center">
                            <label className="text-gray-700 mr-2 w-28">وصف العرض</label>
                            <input
                                type="text"
                                name="description"
                                value={newQuotation.description}
                                onChange={handleQuotationChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                placeholder="وصف العرض"
                                required
                            />
                        </div>

                        <div className="mb-4 w-full flex items-center">
                            <label className="text-gray-700 mr-2 w-28">المبلغ</label>
                            <input
                                type="number"
                                name="amount"
                                value={newQuotation.amount}
                                onChange={handleQuotationChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                placeholder="المبلغ"
                                required
                            />
                        </div>


                        <div className="w-full mt-4">
                            <button
                                onClick={handleAddQuotation}
                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                إضافة العرض
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default QuotationsTable;
