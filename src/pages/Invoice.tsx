import { useState, useCallback, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Plus, FileDown } from "lucide-react";

interface ProductRow {
  id: number;
  description: string;
  qty: number;
  unitPrice: number;
}

const InvoicePage = () => {
  const { t, lang } = useLanguage();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [invoiceNumber] = useState(() => `HF-${Date.now().toString().slice(-6)}`);
  const [invoiceDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [invoiceType, setInvoiceType] = useState("cash");
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [advancePayment, setAdvancePayment] = useState(0);
  const [salesmanName, setSalesmanName] = useState("");

  const [rows, setRows] = useState<ProductRow[]>([
    { id: 1, description: "", qty: 1, unitPrice: 0 },
  ]);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: Date.now(), description: "", qty: 1, unitPrice: 0 },
    ]);
  };

  const updateRow = (id: number, field: keyof ProductRow, value: string | number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const total = rows.reduce((sum, r) => sum + r.qty * r.unitPrice, 0);
  const balance = Math.max(total - advancePayment, 0);
  const status = balance === 0 && total > 0
    ? t("status_paid")
    : t("status_partial");

  const generatePDF = useCallback(async () => {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save("hussain-furniture-invoice.pdf");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("invoice_title")}</h1>
              <p className="text-muted-foreground mb-8">{t("invoice_subtitle")}</p>
            </motion.div>

            <div ref={invoiceRef} className="bg-card/94 rounded-2xl p-6 md:p-8 border border-border/30 shadow-card">
              {/* Header */}
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-bold text-xl">{t("invoice_header")}</h2>
                  <p className="text-muted-foreground text-sm">{t("invoice_header_desc")}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div>
                    <label className="text-sm font-semibold block mb-1">{t("invoice_number")}</label>
                    <input type="text" readOnly value={invoiceNumber} className="w-40 px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1">{t("invoice_date")}</label>
                    <input type="date" readOnly value={invoiceDate} className="w-40 px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                  </div>
                </div>
              </div>

              {/* Customer info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-semibold block mb-1">{t("customer_name")}</label>
                  <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder={t("customer_name_ph")} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">{t("mobile_number")}</label>
                  <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder={t("mobile_number_ph")} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">{t("invoice_type")}</label>
                  <select value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-card text-sm">
                    <option value="cash">{t("invoice_cash")}</option>
                    <option value="credit">{t("invoice_credit")}</option>
                  </select>
                </div>
              </div>

              {/* Product table */}
              <div className="mb-6">
                <div className="hidden md:grid grid-cols-[0.3fr_2fr_0.7fr_1fr_1fr] gap-3 mb-2 text-sm font-semibold text-muted-foreground">
                  <span>{t("table_serial")}</span>
                  <span>{t("table_desc")}</span>
                  <span>{t("table_qty")}</span>
                  <span>{t("table_unit")}</span>
                  <span>{t("table_amount")}</span>
                </div>
                {rows.map((row, idx) => (
                  <div key={row.id} className="grid grid-cols-1 md:grid-cols-[0.3fr_2fr_0.7fr_1fr_1fr] gap-3 mb-2 items-center">
                    <span className="font-bold text-sm hidden md:block">{idx + 1}</span>
                    <input type="text" value={row.description} onChange={(e) => updateRow(row.id, "description", e.target.value)} placeholder={t("product_desc_ph")} className="px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                    <input type="number" min={1} value={row.qty} onChange={(e) => updateRow(row.id, "qty", Number(e.target.value))} className="px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                    <input type="number" min={0} value={row.unitPrice} onChange={(e) => updateRow(row.id, "unitPrice", Number(e.target.value))} className="px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                    <input type="text" readOnly value={(row.qty * row.unitPrice).toFixed(2)} className="px-3 py-2 rounded-lg border border-border/30 bg-muted text-sm" />
                  </div>
                ))}
                <button onClick={addRow} className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm font-semibold hover:bg-muted transition-colors">
                  <Plus size={14} /> {t("add_row")}
                </button>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-semibold block mb-1">{t("total")}</label>
                      <input type="text" readOnly value={total.toFixed(2)} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-muted text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-1">{t("advance")}</label>
                      <input type="number" min={0} value={advancePayment} onChange={(e) => setAdvancePayment(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-1">{t("balance")}</label>
                      <input type="text" readOnly value={balance.toFixed(2)} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-muted text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-1">{t("final_total")}</label>
                      <input type="text" readOnly value={total.toFixed(2)} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-muted text-sm" />
                    </div>
                  </div>

                  {/* Status & PDF */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <p className="text-sm"><strong>{t("status_label")}</strong> <span className={balance === 0 && total > 0 ? "text-secondary font-bold" : "text-primary font-bold"}>{status}</span></p>
                    <button onClick={generatePDF} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent font-semibold text-sm text-foreground shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all">
                      <FileDown size={16} /> {t("generate_pdf")}
                    </button>
                  </div>
                </div>

                {/* Payment options */}
                <div className="bg-foreground/[0.03] p-5 rounded-xl">
                  <h3 className="font-bold mb-3">{t("payment_title")}</h3>
                  {[
                    { value: "debit", label: t("payment_debit") },
                    { value: "credit", label: t("payment_credit") },
                    { value: "gateway", label: t("payment_gateway") },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                      <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary" />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Signature */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/30">
                <div>
                  <label className="text-sm font-semibold block mb-1">{t("salesman_name")}</label>
                  <input type="text" value={salesmanName} onChange={(e) => setSalesmanName(e.target.value)} placeholder={t("salesman_ph")} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-card text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">{t("salesman_signature")}</label>
                  <input type="file" accept="image/*" className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-muted file:text-sm file:font-semibold" />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">{t("customer_signature")}</label>
                  <input type="text" disabled placeholder={t("customer_signature_ph")} className="w-full px-3 py-2 rounded-lg border border-border/30 bg-muted text-sm opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InvoicePage;
