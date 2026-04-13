import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_caaaye9";
const TEMPLATE_ID = "template_eihmeq7";
const PUBLIC_KEY = "t8phjLsGQ7ohUVsBZ";

const ContactPage = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      toast.success(t("contact_send_success"));
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error(t("contact_send_error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("contact_title")}</h1>
              <p className="text-muted-foreground">{t("contact_subtitle")}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card/94 p-7 rounded-2xl border border-border/30 shadow-card"
              >
                <h2 className="font-bold text-xl mb-5">{t("contact_form_title")}</h2>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div>
                    <label className="text-sm font-semibold block mb-1">{t("contact_name")}</label>
                    <input type="text" required placeholder={t("contact_name_ph")} className="w-full px-3 py-2.5 rounded-lg border border-border/30 bg-card text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1">{t("contact_mobile")}</label>
                    <input type="tel" placeholder={t("contact_mobile_ph")} className="w-full px-3 py-2.5 rounded-lg border border-border/30 bg-card text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1">{t("contact_email")}</label>
                    <input type="email" placeholder={t("contact_email_ph")} className="w-full px-3 py-2.5 rounded-lg border border-border/30 bg-card text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1">{t("contact_message")}</label>
                    <textarea rows={5} required placeholder={t("contact_message_ph")} className="w-full px-3 py-2.5 rounded-lg border border-border/30 bg-card text-sm resize-none" />
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent font-semibold text-sm text-foreground shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all w-fit">
                    {t("contact_send")}
                  </button>
                </form>
              </motion.div>

              <div className="grid gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card/90 p-6 rounded-xl border border-border/30">
                  <h3 className="font-bold mb-2">{t("contact_visit")}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{t("footer_location")}</p>
                  <a href="https://maps.google.com/?q=Al+Rida+St,+Al+Rayyan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-foreground/5 font-semibold text-sm hover:bg-foreground/10 transition-colors">
                    {t("cta_find")}
                  </a>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card/90 p-6 rounded-xl border border-border/30">
                  <h3 className="font-bold mb-2">{t("contact_connect")}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{t("contact_connect_desc")}</p>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://wa.me/97400000000" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-foreground/5 text-sm font-semibold">{t("action_whatsapp")}</a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-foreground/5 text-sm font-semibold">{t("action_facebook")}</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-foreground/5 text-sm font-semibold">{t("action_instagram")}</a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
