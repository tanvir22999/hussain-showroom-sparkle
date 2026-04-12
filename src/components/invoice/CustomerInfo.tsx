import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  customerName: string;
  setCustomerName: (v: string) => void;
  mobileNumber: string;
  setMobileNumber: (v: string) => void;
  invoiceType: string;
  setInvoiceType: (v: string) => void;
  salesmanName: string;
  setSalesmanName: (v: string) => void;
}

const CustomerInfo = ({
  customerName, setCustomerName,
  mobileNumber, setMobileNumber,
  invoiceType, setInvoiceType,
  salesmanName, setSalesmanName,
}: Props) => {
  const { t } = useLanguage();

  const fieldClass = "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block mb-1.5">
          {t("customer_name")}
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder={t("customer_name_ph")}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block mb-1.5">
          {t("mobile_number")}
        </label>
        <input
          type="tel"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder={t("mobile_number_ph")}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block mb-1.5">
          {t("invoice_type")}
        </label>
        <select
          value={invoiceType}
          onChange={(e) => setInvoiceType(e.target.value)}
          className={fieldClass}
        >
          <option value="cash">{t("invoice_cash")}</option>
          <option value="credit">{t("invoice_credit")}</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block mb-1.5">
          {t("salesman_name")}
        </label>
        <input
          type="text"
          value={salesmanName}
          onChange={(e) => setSalesmanName(e.target.value)}
          placeholder={t("salesman_ph")}
          className={fieldClass}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
