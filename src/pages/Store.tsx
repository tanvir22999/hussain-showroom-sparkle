import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/lib/translations";

import catSofas from "@/assets/cat-sofas.jpg";
import catCurtains from "@/assets/cat-curtains.jpg";
import catCarpets from "@/assets/cat-carpets.jpg";
import catFlooring from "@/assets/cat-flooring.jpg";
import catBed from "@/assets/cat-bed.jpg";
import catGypsum from "@/assets/cat-gypsum.jpg";

const categoryImages: Record<string, string> = {
  sofas: catSofas,
  curtains: catCurtains,
  carpets: catCarpets,
  flooring: catFlooring,
  bed: catBed,
  gypsum: catGypsum,
};

const StorePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Store hero */}
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="font-display text-3xl md:text-5xl font-semibold mb-3 text-foreground">{t("store_title")}</h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg">{t("store_subtitle")}</p>
            </motion.div>

            {/* Product Grid — Lignora style */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.en}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-[3/4] mb-3">
                    <img
                      src={categoryImages[cat.image]}
                      alt={cat.en}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-medium text-sm text-foreground">{cat.en}</h3>
                  <p className="font-arabic text-xs text-muted-foreground">{cat.ar}</p>
                </motion.div>
              ))}
            </div>

            {/* Showroom location */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card p-8 border border-border"
              >
                <h2 className="font-display text-xl font-semibold mb-5 text-foreground">{t("store_primary")}</h2>
                <div className="flex items-start gap-3 mb-3 text-sm text-muted-foreground">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span>{t("footer_location")}</span>
                </div>
                <div className="flex items-start gap-3 mb-6 text-sm text-muted-foreground">
                  <Clock size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span>{t("store_hours")}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=Al+Rida+St,+Al+Rayyan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    {t("cta_find")}
                    <ArrowRight size={16} />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 border border-border font-medium text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    {t("cta_contact")}
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="overflow-hidden border border-border"
              >
                <iframe
                  title="Hussain Furniture location"
                  src="https://www.google.com/maps?q=Al+Rida+St,+Al+Rayyan&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[400px] border-0"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StorePage;
