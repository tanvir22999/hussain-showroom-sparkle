import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  invoiceNumber: string;
  invoiceDate: string;
}

const InvoiceHeader = ({ invoiceNumber, invoiceDate }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
          Hussain Furniture
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Al Rida St, Al Rayyan, Qatar
        </p>
        <p className="text-muted-foreground text-sm">
          +974 5555 0000 · info@hussainfurniture.qa
        </p>
      </div>
      <div className="text-left md:text-right space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t("invoice_number")}
        </p>
        <p className="text-lg font-bold text-primary">{invoiceNumber}</p>
        <p className="text-sm text-muted-foreground">{invoiceDate}</p>
      </div>
    </div>
  );
};

export default InvoiceHeader;
