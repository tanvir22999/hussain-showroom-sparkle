import { jsPDF } from "jspdf";

interface Row {
  description: string;
  qty: number;
  unitPrice: number;
}

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  mobileNumber: string;
  invoiceType: string;
  salesmanName: string;
  paymentMethod: string;
  advancePayment: number;
  rows: Row[];
}

export const generateInvoicePDF = (data: InvoiceData) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const W = pdf.internal.pageSize.getWidth();
  const margin = 18;
  const contentW = W - margin * 2;
  let y = margin;

  // Colors
  const olive: [number, number, number] = [74, 92, 60];
  const dark: [number, number, number] = [40, 36, 30];
  const gray: [number, number, number] = [130, 125, 115];
  const lightBg: [number, number, number] = [245, 242, 236];

  // ---- Company header ----
  pdf.setFillColor(...olive);
  pdf.rect(0, 0, W, 38, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(255, 255, 255);
  pdf.text("Hussain Furniture", margin, 16);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(220, 220, 210);
  pdf.text("Al Rida St, Al Rayyan, Qatar  |  +974 5555 0000  |  info@hussainfurniture.qa", margin, 24);

  // Invoice label on right
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.setTextColor(255, 255, 255);
  pdf.text("INVOICE", W - margin, 18, { align: "right" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.text(`#${data.invoiceNumber}`, W - margin, 26, { align: "right" });
  pdf.text(data.invoiceDate, W - margin, 32, { align: "right" });

  y = 48;

  // ---- Customer info grid ----
  pdf.setFillColor(...lightBg);
  pdf.roundedRect(margin, y, contentW, 28, 3, 3, "F");

  const infoFields = [
    { label: "Customer", value: data.customerName || "—" },
    { label: "Mobile", value: data.mobileNumber || "—" },
    { label: "Type", value: data.invoiceType === "cash" ? "Cash" : "Credit" },
    { label: "Salesman", value: data.salesmanName || "—" },
  ];

  const colW = contentW / 4;
  infoFields.forEach((f, i) => {
    const x = margin + colW * i + 6;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(...gray);
    pdf.text(f.label.toUpperCase(), x, y + 9);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...dark);
    pdf.text(f.value, x, y + 17);
  });

  y += 36;

  // ---- Product table ----
  // Table header
  const cols = [
    { label: "#", w: 12, align: "center" as const },
    { label: "Description", w: contentW - 12 - 22 - 30 - 35, align: "left" as const },
    { label: "Qty", w: 22, align: "center" as const },
    { label: "Unit Price", w: 30, align: "right" as const },
    { label: "Amount", w: 35, align: "right" as const },
  ];

  pdf.setFillColor(...olive);
  pdf.roundedRect(margin, y, contentW, 9, 2, 2, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(255, 255, 255);
  let cx = margin;
  cols.forEach((col) => {
    const tx = col.align === "right" ? cx + col.w - 3 : col.align === "center" ? cx + col.w / 2 : cx + 3;
    pdf.text(col.label.toUpperCase(), tx, y + 6, { align: col.align });
    cx += col.w;
  });

  y += 12;

  // Table rows
  data.rows.forEach((row, idx) => {
    if (y > 260) {
      pdf.addPage();
      y = margin;
    }

    const amount = row.qty * row.unitPrice;
    const isEven = idx % 2 === 0;

    if (isEven) {
      pdf.setFillColor(250, 248, 244);
      pdf.rect(margin, y - 4, contentW, 9, "F");
    }

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...dark);

    cx = margin;
    const values = [
      String(idx + 1),
      row.description || "—",
      String(row.qty),
      row.unitPrice.toFixed(2),
      amount.toFixed(2),
    ];

    cols.forEach((col, ci) => {
      const tx = col.align === "right" ? cx + col.w - 3 : col.align === "center" ? cx + col.w / 2 : cx + 3;
      if (ci === 0) pdf.setTextColor(...gray);
      else pdf.setTextColor(...dark);
      if (ci === 4) pdf.setFont("helvetica", "bold");
      else pdf.setFont("helvetica", "normal");
      pdf.text(values[ci], tx, y, { align: col.align });
      cx += col.w;
    });

    y += 9;
  });

  y += 4;

  // ---- Divider ----
  pdf.setDrawColor(220, 218, 210);
  pdf.setLineWidth(0.3);
  pdf.line(margin, y, W - margin, y);
  y += 8;

  // ---- Summary section ----
  const total = data.rows.reduce((s, r) => s + r.qty * r.unitPrice, 0);
  const balance = Math.max(total - data.advancePayment, 0);

  const summaryX = W - margin - 70;
  const summaryRows = [
    { label: "Subtotal", value: total.toFixed(2), bold: false },
    { label: "Advance Paid", value: data.advancePayment.toFixed(2), bold: false },
    { label: "Balance Due", value: balance.toFixed(2), bold: false },
  ];

  summaryRows.forEach((sr) => {
    pdf.setFont("helvetica", sr.bold ? "bold" : "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...gray);
    pdf.text(sr.label, summaryX, y);
    pdf.setTextColor(...dark);
    pdf.text(`${sr.value} QAR`, W - margin, y, { align: "right" });
    y += 7;
  });

  // Final total highlight
  y += 2;
  pdf.setFillColor(...olive);
  pdf.roundedRect(summaryX - 4, y - 5, W - margin - summaryX + 8, 12, 2, 2, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(255, 255, 255);
  pdf.text("TOTAL", summaryX, y + 2);
  pdf.text(`${total.toFixed(2)} QAR`, W - margin, y + 2, { align: "right" });

  y += 18;

  // ---- Payment & Status ----
  const statusText = balance === 0 && total > 0 ? "PAID" : "PARTIALLY PAID";
  const statusColor: [number, number, number] = balance === 0 && total > 0 ? [34, 120, 60] : [180, 120, 20];

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(...gray);
  pdf.text(`Payment: ${data.paymentMethod === "debit" ? "Debit Card" : data.paymentMethod === "credit" ? "Credit Card" : "Online Gateway"}`, margin, y);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(...statusColor);
  pdf.text(statusText, margin + 80, y);

  y += 16;

  // ---- Signature line ----
  pdf.setDrawColor(200, 198, 190);
  pdf.setLineWidth(0.3);

  pdf.line(margin, y, margin + 55, y);
  pdf.line(W - margin - 55, y, W - margin, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(...gray);
  pdf.text("Salesman Signature", margin, y + 5);
  pdf.text("Customer Signature", W - margin - 55, y + 5);

  if (data.salesmanName) {
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.setTextColor(...dark);
    pdf.text(data.salesmanName, margin, y - 3);
  }

  // ---- Footer ----
  const footerY = pdf.internal.pageSize.getHeight() - 12;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(...gray);
  pdf.text("Thank you for choosing Hussain Furniture — Where Comfort Meets Elegance", W / 2, footerY, { align: "center" });

  pdf.save(`Invoice-${data.invoiceNumber}.pdf`);
};
