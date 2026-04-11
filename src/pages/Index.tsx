import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/lib/translations";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

import heroImg from "@/assets/hero-living.jpg";
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

const HomePage = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero — full-bleed image with overlay */}
        <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
          <img
            src={heroImg}
            alt="Luxury living room with olive velvet furniture"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/10" />
          <div className="relative z-10 h-full flex flex-col justify-end container pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p className="text-primary-foreground/70 text-xs uppercase tracking-[0.2em] font-medium mb-4">
                {t("hero_eyebrow")}
              </p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-5 text-primary-foreground">
                {t("hero_title")}
              </h1>
              <p className="text-primary-foreground/80 text-sm md:text-base mb-8 max-w-lg leading-relaxed">
                {t("hero_lead")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/store"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-foreground text-foreground font-medium text-sm rounded-none hover:bg-primary-foreground/90 transition-colors"
                >
                  {t("cta_shop")}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary-foreground/40 text-primary-foreground font-medium text-sm rounded-none hover:bg-primary-foreground/10 transition-colors"
                >
                  {t("cta_contact")}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 md:py-28" id="categories">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 text-foreground">
                  {t("categories_title")}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-md">
                  {t("categories_subtitle")}
                </p>
              </div>
              <Link
                to="/store"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
              >
                {t("more_products")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bento-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {categories.map((cat, i) => (
                <motion.a
                  key={cat.en}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`group relative overflow-hidden ${
                    i === 0 ? "col-span-2 md:col-span-2 row-span-2 aspect-[4/3] md:aspect-auto" :
                    "aspect-[3/4]"
                  }`}
                >
                  <img
                    src={categoryImages[cat.image]}
                    alt={cat.en}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="font-display text-lg md:text-xl font-semibold text-primary-foreground mb-0.5">
                      {cat.en}
                    </h3>
                    <p className="font-arabic text-primary-foreground/70 text-sm">
                      {cat.ar}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Social / CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-2xl md:text-4xl font-semibold mb-4 text-foreground">
                  {t("actions_title")}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-md">
                  {t("actions_desc")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    {t("cta_contact")}
                  </Link>
                  <a
                    href="https://maps.google.com/?q=Al+Rida+St,+Al+Rayyan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border font-medium text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    {t("cta_find")}
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href="https://wa.me/97400000000" target="_blank" rel="noopener noreferrer" className="px-5 py-3 border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">{t("action_whatsapp")}</a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="px-5 py-3 border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">{t("action_facebook")}</a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="px-5 py-3 border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">{t("action_instagram")}</a>
              </div>
            </div>
          </div>
        </section>

        {/* Invoice CTA */}
        <section className="py-16">
          <div className="container">
            <div className="bg-card border border-border p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">{t("hero_highlight")}</h3>
                <p className="text-muted-foreground text-sm max-w-md">{t("hero_highlight_desc")}</p>
              </div>
              <Link
                to="/invoice"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors shrink-0"
              >
                {t("cta_invoice")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
