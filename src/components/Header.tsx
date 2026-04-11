import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { t, toggleLang, lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t("nav_home") },
    { to: "/invoice", label: t("nav_invoice") },
    { to: "/contact", label: t("nav_contact") },
    { to: "/store", label: t("nav_store") },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/78 border-b border-border/50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 grid place-items-center rounded-xl bg-gradient-to-br from-primary to-accent font-bold tracking-wider text-sm text-foreground">
            HF
          </div>
          <div>
            <p className="font-bold text-base text-foreground">{t("brand")}</p>
            <p className="text-xs text-muted-foreground">{t("tagline")}</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold transition-colors hover:text-foreground ${
                location.pathname === link.to ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-3.5 py-1.5 rounded-full border border-border/50 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-4 right-4 bg-card/96 backdrop-blur-xl border border-border/50 rounded-xl p-4 flex flex-col gap-3 shadow-card animate-fade-up">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-semibold py-2 px-3 rounded-lg transition-colors ${
                location.pathname === link.to
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
