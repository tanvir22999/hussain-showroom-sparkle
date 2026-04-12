import { useLanguage } from "@/contexts/LanguageContext";
import { Plus, Trash2 } from "lucide-react";

export interface ProductRow {
  id: number;
  description: string;
  qty: number;
  unitPrice: number;
}

interface Props {
  rows: ProductRow[];
  setRows: React.Dispatch<React.SetStateAction<ProductRow[]>>;
}

const ProductTable = ({ rows, setRows }: Props) => {
  const { t } = useLanguage();

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      { id: Date.now(), description: "", qty: 1, unitPrice: 0 },
    ]);

  const removeRow = (id: number) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const updateRow = (id: number, field: keyof ProductRow, value: string | number) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );

  return (
    <div className="py-6 border-t border-border">
      {/* Desktop header */}
      <div className="hidden md:grid grid-cols-[40px_1fr_90px_120px_120px_40px] gap-3 mb-3">
        {[t("table_serial"), t("table_desc"), t("table_qty"), t("table_unit"), t("table_amount"), ""].map(
          (h, i) => (
            <span key={i} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {h}
            </span>
          )
        )}
      </div>

      {rows.map((row, idx) => {
        const amount = row.qty * row.unitPrice;
        return (
          <div
            key={row.id}
            className="grid grid-cols-1 md:grid-cols-[40px_1fr_90px_120px_120px_40px] gap-3 mb-2 items-center"
          >
            <span className="hidden md:block text-sm font-bold text-muted-foreground text-center">
              {idx + 1}
            </span>
            <input
              type="text"
              value={row.description}
              onChange={(e) => updateRow(row.id, "description", e.target.value)}
              placeholder={t("product_desc_ph")}
              className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="number"
              min={1}
              value={row.qty}
              onChange={(e) => updateRow(row.id, "qty", Number(e.target.value))}
              className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="number"
              min={0}
              value={row.unitPrice}
              onChange={(e) => updateRow(row.id, "unitPrice", Number(e.target.value))}
              className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <div className="px-3 py-2.5 rounded-lg bg-muted text-sm font-semibold text-center">
              {amount.toFixed(2)}
            </div>
            <button
              onClick={() => removeRow(row.id)}
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Remove"
            >
              <Trash2 size={14} />
            </button>
          </div>
        );
      })}

      <button
        onClick={addRow}
        className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        <Plus size={14} /> {t("add_row")}
      </button>
    </div>
  );
};

export default ProductTable;
