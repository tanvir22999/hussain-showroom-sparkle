import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import InvoiceHeaderBlock from "@/components/invoice/InvoiceHeader";
import CustomerInfo from "@/components/invoice/CustomerInfo";
import ProductTable, { type ProductRow } from "@/components/invoice/ProductTable";
import InvoiceSummary from "@/components/invoice/InvoiceSummary";
import { generateInvoicePDF } from "@/lib/generateInvoicePDF";

const InvoicePage = () => {
  const { t } = useLanguage();

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

  const total = rows.reduce((sum, r) => sum + r.qty * r.unitPrice, 0);
  const balance = Math.max(total - advancePayment, 0);

  const handleGeneratePDF = useCallback(() => {
    generateInvoicePDF({
      invoiceNumber,
      invoiceDate,
      customerName,
      mobileNumber,
      invoiceType,
      salesmanName,
      paymentMethod,
      advancePayment,
      rows,
    });
  }, [invoiceNumber, invoiceDate, customerName, mobileNumber, invoiceType, salesmanName, paymentMethod, advancePayment, rows]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                {t("invoice_title")}
              </h1>
              <p className="text-muted-foreground mt-2">{t("invoice_subtitle")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8"
            >
              <InvoiceHeaderBlock invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} />

              <CustomerInfo
                customerName={customerName} setCustomerName={setCustomerName}
                mobileNumber={mobileNumber} setMobileNumber={setMobileNumber}
                invoiceType={invoiceType} setInvoiceType={setInvoiceType}
                salesmanName={salesmanName} setSalesmanName={setSalesmanName}
              />

              <ProductTable rows={rows} setRows={setRows} />

              <InvoiceSummary
                total={total}
                advancePayment={advancePayment}
                setAdvancePayment={setAdvancePayment}
                balance={balance}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

              {/* Generate PDF button */}
              <div className="pt-6 border-t border-border mt-6 flex justify-end">
                <button
                  onClick={handleGeneratePDF}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <FileDown size={18} />
                  {t("generate_pdf")}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InvoicePage;
