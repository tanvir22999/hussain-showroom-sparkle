import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-surface-light/90 pt-12 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-2">{t("footer_title")}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t("footer_location")}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://maps.google.com/?q=Al+Rida+St,+Al+Rayyan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-muted text-sm font-semibold text-foreground hover:bg-border transition-colors"
              >
                {t("cta_find")}
              </a>
              <Link
                to="/invoice"
                className="px-4 py-2 rounded-full bg-muted text-sm font-semibold text-foreground hover:bg-border transition-colors"
              >
                {t("cta_invoice")}
              </Link>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-border/50 min-h-[200px]">
            <iframe
              title="Hussain Furniture location"
              src="https://www.google.com/maps?q=Al+Rida+St,+Al+Rayyan&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[200px] border-0"
            />
          </div>

          <div>
            <h4 className="font-bold mb-3">{t("footer_links")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">{t("nav_home")}</Link></li>
              <li><Link to="/invoice" className="hover:text-primary transition-colors">{t("nav_invoice")}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t("nav_contact")}</Link></li>
              <li><Link to="/store" className="hover:text-primary transition-colors">{t("nav_store")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-xs pt-4 border-t border-border/30">
          <p>© 2025 Hussain Furniture. {t("footer_rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
