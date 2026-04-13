import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, ShoppingCart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const StorePage = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50 });
        setProducts(data?.data?.products?.edges || []);
      } catch (e) {
        console.error("Failed to fetch products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.node.title });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="font-display text-3xl md:text-5xl font-semibold mb-3 text-foreground">{t("store_title")}</h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg">{t("store_subtitle")}</p>
            </motion.div>

            {/* Products */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-lg mb-16">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">No products yet</h2>
                <p className="text-muted-foreground text-sm">Products will appear here once added to the store.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
                {products.map((product, i) => {
                  const image = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  return (
                    <motion.div
                      key={product.node.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="group"
                    >
                      <Link to={`/product/${product.node.handle}`} className="block">
                        <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-muted">
                          {image ? (
                            <img
                              src={image.url}
                              alt={image.altText || product.node.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <ShoppingCart size={32} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Link>
                      <h3 className="font-medium text-sm text-foreground truncate">{product.node.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{price.currencyCode} {parseFloat(price.amount).toFixed(2)}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isCartLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded hover:bg-muted transition-colors text-foreground disabled:opacity-50"
                      >
                        <ShoppingCart size={12} /> Add to Cart
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}

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
