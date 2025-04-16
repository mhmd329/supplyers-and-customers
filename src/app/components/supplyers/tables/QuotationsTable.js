import React, { useState } from "react";
import { quotations } from "../data";
import Image from "next/image";
import AddIcon from "../../assets/Add.png"
const QuotationsTable = () => {
    const [selectedQuotation, setSelectedQuotation] = useState(null);
    const [quotationList, setQuotationList] = useState(quotations);
    const [newQuotation, setNewQuotation] = useState({
        quotationNumber: "",
        quotationName: "",
        quotationType: "",
        quantity: "",
        salesUnit: "",
        tax: "",
        discount: "",
        quotationDesc: "",
        total: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [totals, setTotals] = useState([""]); // كل عنصر يمثل قيمة input في عمود "الإجمالي"
    const handleTotalChange = (index, value) => {
        const updatedTotals = [...totals];
        updatedTotals[index] = value;
        setTotals(updatedTotals);
    };


    const totalSum = quotations.reduce((acc, quotation) => {
        return acc + Number(quotation.total || 0);
    }, 0);
    const TotalInp = totals.reduce((acc, val) => {
        const num = parseFloat(val);
        return acc + (isNaN(num) ? 0 : num);
    }, 0);


    const handleAddQuotation = () => {
        const newId = Math.max(...quotationList.map(q => q.id), 0) + 1;
        const quotationToAdd = {
            id: newId,
            ...newQuotation
        };

        setQuotationList([...quotationList, quotationToAdd]);
        setNewQuotation({
            quotationNumber: "",
            quotationName: "",
            quotationType: "",
            quantity: "",
            salesUnit: "",
            tax: "",
            discount: "",
            quotationDesc: "",
            total: "",
        });
        setShowModal(false);
    };

    const filteredQuotations = quotationList.filter((quotation) =>
        quotation.quotationName.includes(searchTerm) ||
        quotation.quotationDesc.includes(searchTerm) ||
        quotation.total.toString().includes(searchTerm)
    );


    const handleDeleteQuotation = (id) => {
        setQuotationList(quotationList.filter((quotation) => quotation.id !== id));
    };


    return (
        <div className="overflow-x-auto mx-2 sm:mx-0">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-4" dir="rtl">

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

                <button
                    className="bg-[#16C47F] hover:bg-[#149f68] text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2 text-sm sm:text-base" onClick={() => setShowModal(true)}
                >
                   
                    <Image src={AddIcon} alt="أيقونة الإضافة" className="w-5 h-5" /> 
                    إضافة عرض
                </button>
            </div>


            {filteredQuotations.length === 0 ? (
                <div className="text-center py-8 text-gray-500 rounded-lg shadow">
                    لا توجد بيانات متاحة
                </div>
            ) : (
                <div className="shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-[#D0F3E5] text-gray-700">
                                <th className="py-3 px-4 border-b">خيارات</th>

                                <th className="py-3 px-4 border-b">التاريخ</th>
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
                                            onClick={() => setSelectedQuotation(quotation.id)}
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

                                    <td className="py-3 px-4">{quotation.quotationDate}</td>
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

                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-[#D0F3E5] text-gray-700">
                                    <th className="py-3 px-6 border-b">الاجمالي</th>
                                    <th className="py-3 px-6 border-b ">الوصف</th>
                                    <th className="py-3 px-6 border-b ">خصم</th>
                                    <th className="py-3 px-6 border-b ">ضريبة</th>
                                    <th className="py-3 px-6 border-b ">وحدة البيع</th>
                                    <th className="py-3 px-6 border-b "> الكمية</th>
                                    <th className="py-3 px-6 border-b ">فئة المنتج </th>
                                    <th className="py-3 px-6 border-b ">اسم المنتج</th>
                                    <th className="py-3 px-6 border-b ">كود المنتج</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotations.map((quotation, index) => (
                                    <tr key={quotation.id} className={`text-center border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-[#E8F9F2]"}`}>
                                        <td className="py-3 px-6">{quotation.total}</td>
                                        <td className="py-3 px-6">{quotation.quotationDesc}</td>
                                        <td className="py-3 px-6">{quotation.discount}</td>
                                        <td className="py-3 px-6">{quotation.tax}</td>
                                        <td className="py-3 px-6">{quotation.salesUnit}</td>
                                        <td className="py-3 px-6">{quotation.quantity}</td>
                                        <td className="py-3 px-6">{quotation.quotationType}</td>
                                        <td className="py-3 px-6">{quotation.quotationName}</td>
                                        <td className="py-3 px-6">{quotation.quotationNumber}</td>
                                    </tr>
                                ))}
                                <tr className="bg-[#E8F9F2]">
                                    <td colSpan="9" className="text-start  font-semibold ">
                                        <span className="bg-[#16C47F] text-white px-10 py-1">
                                            {totalSum}
                                        </span>

                                    </td>
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
                <div className="fixed inset-0 bg-black/60 flex p-4 justify-center items-center z-50">
                    <div dir="rtl" className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-7xl max-h-[90vh] overflow-auto flex flex-col justify-start items-center relative">

                        {/* زر الإغلاق */}
                        <button
                            className="absolute top-2 left-2 text-gray-700 cursor-pointer p-2 rounded-full hover:bg-gray-200"
                            onClick={() => setShowModal(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-gray-800">إضافة عرض</h2>

                        {/* جدول متجاوب */}
                        <div className="w-full overflow-x-auto">
                            <table className="table-auto min-w-[1000px] text-right border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-white bg-[#16C47F] whitespace-nowrap">كود المنتج</th>
                                        <th className="px-4 py-2 border text-white bg-[#16C47F] whitespace-nowrap">فئة المنتج</th>
                                        <th className="px-4 py-2 border text-white bg-[#16C47F] whitespace-nowrap">أسم المنتج</th>
                                        <th className="px-4 py-2 border text-white bg-[#16C47F] whitespace-nowrap">الكمية المطلوبة</th>
                                        <th className="px-4 py-2 border bg-[#D0F3E5] whitespace-nowrap">الكمية المتاحة</th>
                                        <th className="px-4 py-2 border bg-[#D0F3E5] whitespace-nowrap">وحده البيع</th>
                                        <th className="px-4 py-2 border bg-[#D0F3E5] whitespace-nowrap">الضريبة</th>
                                        <th className="px-4 py-2 border bg-[#D0F3E5] whitespace-nowrap">خصم</th>
                                        <th className="px-4 py-2 border bg-[#D0F3E5] whitespace-nowrap">الوصف</th>
                                        <th className="px-4 py-2 border bg-[#D0F3E5] whitespace-nowrap">الإجمالي</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* بيانات ثابتة */}
                                        <td className="px-4 py-2 border whitespace-nowrap">125</td>
                                        <td className="px-4 py-2 border whitespace-nowrap">كرتونة</td>
                                        <td className="px-4 py-2 border whitespace-nowrap">لاب توب</td>
                                        <td className="px-4 py-2 border whitespace-nowrap">12</td>

                                        {/* حقول إدخال */}
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input
                                                type="number"
                                                value={totals[0] || ""}
                                                onChange={(e) => handleTotalChange(0, e.target.value)}
                                                className="p-2 w-full rounded"
                                            />

                                        </td>
                                    </tr>
                                    <tr>
                                        {/* بيانات ثابتة */}
                                        <td className="px-4 py-2 border whitespace-nowrap">125</td>
                                        <td className="px-4 py-2 border whitespace-nowrap">كرتونة</td>
                                        <td className="px-4 py-2 border whitespace-nowrap">لاب توب</td>
                                        <td className="px-4 py-2 border whitespace-nowrap">12</td>

                                        {/* حقول إدخال */}
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input type="text" className="p-2 w-full  rounded" />
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <input
                                                type="number"
                                                value={totals[1] || ""}
                                                onChange={(e) => handleTotalChange(1, e.target.value)}
                                                className="p-2 w-full rounded"
                                            />

                                        </td>
                                    </tr>
                                    <tr dir="ltr" >
                                        <td className="px-4 py-2  whitespace-nowrap"></td>
                                        <td className="px-4 py-2  whitespace-nowrap"></td>
                                        <td className="px-4 py-2  whitespace-nowrap"> </td>
                                        <td className="px-4 py-2  whitespace-nowrap"></td>



                                        <td className="px-4 py-2 ">
                                        </td>
                                        <td className="px-4 py-2 ">
                                        </td>
                                        <td className="px-4 py-2 ">
                                        </td>
                                        <td className="px-4 py-2 ">
                                        </td>
                                        <td className="px-4 py-2 ">
                                        </td>
                                        <td colSpan="10" className="text-start px-4 py-2 border font-semibold bg-[#B9B9B9]">
                                            <span className=" text-black font-[400] px-10 py-1">
                                                {TotalInp}
                                            </span>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* زر الحفظ */}
                        <div className="w-full mt-6 flex justify-end">
                            <button
                                onClick={handleAddQuotation}
                                className="bg-[#16C47F] cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
