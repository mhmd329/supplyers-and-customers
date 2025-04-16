export const suppliers = [
    { id: 101, name: "احمد حسين", address: "جيزة/فيصل", phone: "0111111111", type: "طبي" },
    { id: 102, name: "محمد حسين", address: "جيزة/الطوابق", phone: "0122222222", type: "طبي" },
    { id: 103, name: "محمد حسين", address: "جيزة/الطوابق", phone: "0122222222", type: "طبي" },
    { id: 104, name: "محمود حسين", address: "جيزة/كعابيش", phone: "0133333333", type: "طبي" },
];

export const tableConfig = {
    headers: ["الاسم", "الهاتف", "العنوان"],
    dataKeys: ["name", "phone", "address"]
};

export const invoices = [
    {
        id: 201,
        invoiceNumber: "INV-001",
        invoiceDate: "2024-03-01",
        totalAmount: 5000,
        remainingAmount: 3000,
        supplier: "احمد حسين",
        description: "فاتورة شراء مواد خام"
    },
    {
        id: 202,
        invoiceNumber: "INV-002",
        invoiceDate: "2024-03-05",
        totalAmount: 3000,
        remainingAmount: 1500,
        supplier: "محمد حسين",
        description: "فاتورة صيانة معدات"
    }
];

export const quotations = [
    {
        quotationDate: "2024-03-10",
        description: "عرض سعر غسالات",
        id: 301,
        quotationNumber: "122",
        quotationName: "لاب توب",
        quotationType: "كرتونة",
        quantity: " 12",
        salesUnit: "100",
        tax: "10%",
        discount: 2,
        quotationDesc: "4+1",
        total: "1200"
    },
    {
        quotationDate: "2024-03-10",
        description: "عرض سعر غسالات",
        id: 302,
        quotationNumber: "122",
        quotationName: "لاب توب",
        quotationType: "كرتونة",
        quantity: " 12",
        salesUnit: "100",
        tax: "10%",
        discount: 2,
        quotationDesc: "4+1",
        total: "1200"
    },
    {
        quotationDate: "2024-03-10",
        description: "عرض سعر غسالات",
        id: 303,
        quotationNumber: "122",
        quotationName: "لاب توب",
        quotationType: "كرتونة",
        quantity: " 12",
        salesUnit: "100",
        tax: "10%",
        discount: 2,
        quotationDesc: "4+1",
        total: "1500"
    },
    {
        quotationDate: "2024-03-10",
        description: "عرض سعر غسالات",
        id: 304,
        quotationNumber: "122",
        quotationName: "لاب توب",
        quotationType: "كرتونة",
        quantity: " 12",
        salesUnit: "100",
        tax: "10%",
        discount: 2,
        quotationDesc: "4+1",
        total: "1200"
    },
    {
        quotationDate: "2024-03-10",
        description: "عرض سعر غسالات",
        id: 305,
        quotationNumber: "122",
        quotationName: "لاب توب",
        quotationType: "كرتونة",
        quantity: " 12",
        salesUnit: "100",
        tax: "10%",
        discount: 2,
        quotationDesc: "4+1",
        total: "1200"
    },

];
