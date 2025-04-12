export const suppliers = [
    { id: 101, name: "احمد حسين", address: "جيزة/فيصل", phone: "0111111111" },
    { id: 102, name: "محمد حسين", address: "جيزة/الطوابق", phone: "0122222222" },
    { id: 103, name: "محمد حسين", address: "جيزة/الطوابق", phone: "0122222222" },
    { id: 104, name: "محمود حسين", address: "جيزة/كعابيش", phone: "0133333333" },
];


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
        id: 301,
        quotationNumber: "QUO-001",
        quotationDate: "2024-03-10",
        expiryDate: "2024-04-10",
        supplier: "احمد حسين",
        description: "عرض سعر غسالات",
        amount: 25000
    },
    {
        id: 302,
        quotationNumber: "QUO-002",
        quotationDate: "2024-03-15",
        expiryDate: "2024-04-15",
        supplier: "محمود حسين",
        description: "عرض سعر ثلاجات",
        amount: 18000
    }
];
