import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { products, productCategories } from "@/data/products";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20 grain-overlay">
      {/* Page Header */}
      <section className="relative py-[3.6rem] md:py-[4.8rem] overflow-hidden bg-street-offwhite">
        <div className="absolute inset-0 diagonal-lines opacity-30" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-street-neon" />
              <span className="font-mono text-sm tracking-[0.3em] text-street-neonDark">
                PRODUCTS
              </span>
            </div>
            <h1 className="font-display text-clamp-xl leading-none">
              OUR <span className="text-stroke">COLLECTION</span>
            </h1>
            <p className="mt-6 text-street-muted max-w-xl text-lg leading-relaxed">
              Premium knitwear manufactured to the highest standards. From
              heavyweight tees to cozy fleece — all customizable with our wash,
              print, and embroidery services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-12 bg-street-offwhite">
        <div className="container">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 font-mono text-xs tracking-widest transition-all border ${
                  activeCategory === cat.id
                    ? "bg-street-neon text-street-black border-street-neon"
                    : "bg-white text-street-black border-street-gray hover:border-street-neon hover:text-street-neonDark"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Product Count */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-street-gray" />
            <span className="font-mono text-xs tracking-widest text-street-muted">
              {filteredProducts.length} ITEMS
            </span>
          </div>

          {/* Product Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={`${activeCategory}-${product.id}`}
                  product={product}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Services Banner */}
      <section className="py-20 bg-white border-y border-street-gray">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionTitle
              eyebrow="CUSTOMIZATION"
              title="MAKE IT YOURS"
              subtitle="Every piece can be customized with our premium finishing services."
            />
            <div className="md:col-span-2 grid grid-cols-3 gap-4">
              {[
                { label: "GARMENT WASH", count: "10+" },
                { label: "PRINTING", count: "8+" },
                { label: "EMBROIDERY", count: "5+" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 bg-street-offwhite border border-street-gray text-center hover:border-street-neon transition-colors"
                >
                  <div className="font-display text-4xl text-street-neonDark">
                    {item.count}
                  </div>
                  <div className="font-mono text-xs tracking-widest text-street-muted mt-2">
                    {item.label}
                  </div>
                  <div className="text-xs text-street-muted/70 mt-1">
                    techniques
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
