import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  total: number;
  advancePayment: number;
  setAdvancePayment: (v: number) => void;
  balance: number;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
}

const InvoiceSummary = ({
  total, advancePayment, setAdvancePayment, balance,
  paymentMethod, setPaymentMethod,
}: Props) => {
  const { t } = useLanguage();
  const isPaid = balance === 0 && total > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-border">
      {/* Totals */}
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-muted-foreground">{t("total")}</span>
          <span className="text-sm font-semibold">{total.toFixed(2)} QAR</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-muted-foreground">{t("advance")}</span>
          <input
            type="number"
            min={0}
            value={advancePayment}
            onChange={(e) => setAdvancePayment(Number(e.target.value))}
            className="w-32 px-3 py-2 rounded-lg border border-border bg-background text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-muted-foreground">{t("balance")}</span>
          <span className="text-sm font-semibold">{balance.toFixed(2)} QAR</span>
        </div>
        <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-sm font-bold">{t("final_total")}</span>
          <span className="text-lg font-bold text-primary">{total.toFixed(2)} QAR</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("status_label")}
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isPaid
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {isPaid ? t("status_paid") : t("status_partial")}
          </span>
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-muted/50 rounded-xl p-5 border border-border/50">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          {t("payment_title")}
        </h3>
        {[
          { value: "debit", label: t("payment_debit") },
          { value: "credit", label: t("payment_credit") },
          { value: "gateway", label: t("payment_gateway") },
        ].map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 mb-2.5 text-sm cursor-pointer group"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                paymentMethod === opt.value
                  ? "border-primary bg-primary"
                  : "border-border group-hover:border-primary/50"
              }`}
            >
              {paymentMethod === opt.value && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
              )}
            </div>
            <input
              type="radio"
              name="payment"
              value={opt.value}
              checked={paymentMethod === opt.value}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default InvoiceSummary;
