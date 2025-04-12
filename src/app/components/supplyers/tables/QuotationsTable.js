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
        products: [
            {
                productName: "",
                category: "",
                unit: "",
                quantity: "",
            },
        ],
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

    const handleProductChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProducts = [...newQuotation.products];
        updatedProducts[index][name] = value;
        setNewQuotation(prev => ({ ...prev, products: updatedProducts }));
    };

    const handleAddProductRow = () => {
        setNewQuotation(prev => ({
            ...prev,
            products: [...prev.products, { productName: "", category: "", unit: "", quantity: "" }],
        }));
    };

    const handleRemoveProductRow = (index) => {
        if (newQuotation.products.length === 1) {
            alert("لا يمكن حذف الصف الأخير. يجب أن يحتوي العرض على منتج واحد على الأقل.");
            return;
        }
        const updatedProducts = newQuotation.products.filter((_, i) => i !== index);
        setNewQuotation(prev => ({ ...prev, products: updatedProducts }));
    };

    const handleAddQuotation = () => {
        const newId = Math.max(...quotationList.map(q => q.id), 0) + 1;
        const quotationToAdd = {
            id: newId,
            ...newQuotation
        };

        setQuotationList([...quotationList, quotationToAdd]);
        setNewQuotation({
            quotationNumber: "",
            quotationDate: "",
            expiryDate: "",
            supplier: "",
            description: "",
            amount: "",
            products: [
                { productName: "", category: "", unit: "", quantity: "" },
            ],
        });
        setShowModal(false);
    };

    const filteredQuotations = quotationList.filter((quotation) =>
        quotation.amount.toString().includes(searchTerm) ||
        quotation.description.includes(searchTerm)
    );

    const handleDeleteQuotation = (id) => {
        setQuotationList(quotationList.filter((quotation) => quotation.id !== id));
    };


    return (
        <div className="overflow-x-auto mx-2 sm:mx-0">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-4" dir="rtl">

                <div className="relative mt-4 bg-gray-50 sm:mt-0 w-1/2 sm:w-1/3 mb-4 ml-auto">
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

                <button
                    className="bg-[#16C47F] hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
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
                <div className="shadow-md rounded-lg overflow-x-auto">
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
                                            className="text-red-500 border cursor-pointer border-red-500 px-2 sm:px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
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
                                            className="text-[#16C47F] hover:bg-green-700 border cursor-pointer border-[#16C47F] px-2 sm:px-3 py-1 rounded-mdhover:bg-green-700 transition flex items-center justify-center gap-1 text-xs sm:text-sm"
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
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative text-center overflow-x-auto">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-700">عرض اسعار</h2>

                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-[#D0F3E5] text-gray-700">
                                    <th className="py-3 px-6 border-b w-[20%]">الاجمالي</th>
                                    <th className="py-3 px-6 border-b w-[20%]">الكمية</th>
                                    <th className="py-3 px-6 border-b w-[20%]">وحدة البيع</th>
                                    <th className="py-3 px-6 border-b w-[20%]">اسم المنتج</th>
                                    <th className="py-3 px-6 border-b w-[20%]">كود المنتج</th>
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

                        <button
                            className="text-black px-4 py-2 cursor-pointer rounded-md absolute top-4 left-4 text-lg"
                            onClick={() => setSelectedQuotation(null)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
{showModal && (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <div dir="rtl" className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[650px] flex flex-col justify-start items-center relative">
            <button
                className="absolute top-2 right-2 text-gray-700 cursor-pointer p-2 rounded-full hover:bg-gray-200"
                onClick={() => setShowModal(false)}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">إضافة عرض </h2>

            {/* رأس الجدول */}
            <div className="w-full mb-2">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700 text-center">
                    <div>اسم المنتج</div>
                    <div>فئة المنتج</div>
                    <div>وحدة البيع</div>
                    <div>الكمية</div>
                    <div></div>
                </div>
            </div>

            {/* صفوف المنتجات */}
            {newQuotation.products.map((product, index) => {
                const isLastRow = index === newQuotation.products.length - 1;

                return (
                    <div key={index} className="w-full mb-2">
                        <div className="grid grid-cols-5 gap-4 items-center">
                            <input
                                type="text"
                                name="productName"
                                value={product.productName}
                                onChange={(e) => handleProductChange(e, index)}
                                className="p-2 border border-gray-300 rounded-lg text-right"
                                placeholder="اسم المنتج"
                            />
                            <input
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={(e) => handleProductChange(e, index)}
                                className="p-2 border border-gray-300 rounded-lg text-right"
                                placeholder="فئة المنتج"
                            />
                            <input
                                type="text"
                                name="unit"
                                value={product.unit}
                                onChange={(e) => handleProductChange(e, index)}
                                className="p-2 border border-gray-300 rounded-lg text-right"
                                placeholder="وحدة البيع"
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                onChange={(e) => handleProductChange(e, index)}
                                className="p-2 border border-gray-300 rounded-lg text-right w-full"
                                placeholder="الكمية"
                            />

                            <div className="flex justify-start gap-2">
                                {isLastRow && (
                                    <>
                                        <button
                                            onClick={() => handleRemoveProductRow(index)}
                                            className="bg-red-100 text-red-600 font-bold px-3 py-1 rounded-lg hover:bg-red-200"
                                        >
                                            ×
                                        </button>
                                        <button
                                            onClick={handleAddProductRow}
                                            className="bg-gray-200 text-xl px-3 py-1 rounded-lg hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* زر الحفظ */}
            <div className="w-full mt-4 flex justify-end">
                <button
                    onClick={handleAddQuotation}
                    className="w-22 bg-[#16C47F] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    حفظ
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default QuotationsTable;
