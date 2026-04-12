import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Menu, X, Search, ShoppingBag, User, LogOut } from "lucide-react";

const Header = () => {
  const { t, toggleLang, lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { to: "/", label: t("nav_home") },
    { to: "/store", label: t("nav_store") },
    { to: "/invoice", label: t("nav_invoice") },
    { to: "/contact", label: t("nav_contact") },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border/40">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Hussain.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[13px] font-medium tracking-wide uppercase transition-colors hover:text-foreground ${
                location.pathname === link.to ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            {lang === "ar" ? "ENG" : "عربي"}
          </button>
          <div className="hidden md:flex items-center gap-1">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Cart">
              <ShoppingBag size={18} />
            </button>
            {user ? (
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/");
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <Link
                to="/login"
                className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Sign in"
              >
                <User size={18} />
              </Link>
            )}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border/40 p-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-3 px-4 rounded-lg transition-colors tracking-wide uppercase ${
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
