import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/lib/translations";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HomePage = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="uppercase tracking-widest text-secondary font-semibold text-xs mb-4">
                  {t("hero_eyebrow")}
                </p>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 text-foreground">
                  {t("hero_title")}
                </h1>
                <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-lg">
                  {t("hero_lead")}
                </p>
                <div className="flex flex-wrap gap-3 mb-5">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent font-semibold text-sm text-foreground shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all"
                  >
                    {t("cta_contact")}
                  </Link>
                  <a
                    href="#categories"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border/50 font-semibold text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    {t("cta_shop")}
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href="https://wa.me/97400000000" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-foreground/5 text-sm font-semibold">{t("action_whatsapp")}</a>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-foreground/5 text-sm font-semibold">{t("action_facebook")}</a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-foreground/5 text-sm font-semibold">{t("action_instagram")}</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-card/90 to-surface-light/85 rounded-2xl p-8 shadow-card border border-border/30">
                  <div className="flex flex-col gap-1 mb-6">
                    <span className="text-muted-foreground text-sm">{t("stat_label")}</span>
                    <span className="text-4xl font-bold text-foreground">{t("stat_value")}</span>
                    <span className="text-muted-foreground text-sm">{t("stat_caption")}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t("hero_highlight")}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{t("hero_highlight_desc")}</p>
                    <Link
                      to="/invoice"
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-foreground/5 font-semibold text-sm hover:bg-foreground/10 transition-colors"
                    >
                      {t("cta_invoice")}
                    </Link>
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute -z-10 w-64 h-64 rounded-full bg-secondary/25 blur-3xl -top-10 -right-10" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16" id="categories">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-3">{t("categories_title")}</h2>
              <p className="text-muted-foreground">{t("categories_subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat, i) => (
                <motion.a
                  key={cat.en}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group p-6 rounded-2xl bg-card/92 border border-border/30 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all"
                >
                  <span className="text-3xl mb-4 block">{cat.icon}</span>
                  <h3 className="font-bold text-lg mb-1 font-sans">{cat.en}</h3>
                  <p className="text-muted-foreground font-arabic text-sm">{cat.ar}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="py-14">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("actions_title")}</h2>
                <p className="text-muted-foreground">{t("actions_desc")}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent font-semibold text-sm text-foreground shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all">{t("cta_contact")}</Link>
                <a href="#categories" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border/50 font-semibold text-sm hover:bg-muted transition-colors">{t("cta_shop")}</a>
                <a href="https://maps.google.com/?q=Al+Rida+St,+Al+Rayyan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground/5 font-semibold text-sm hover:bg-foreground/10 transition-colors">{t("cta_find")}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
