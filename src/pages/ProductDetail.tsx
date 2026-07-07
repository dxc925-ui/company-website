import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShoppingBag,
  Ruler,
  Palette,
  Layers,
  Clock,
  Package,
} from "lucide-react";
import { products } from "@/data/products";
import { companyInfo } from "@/data/company";
import ZoomImage from "@/components/ZoomImage";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="pt-32 min-h-screen grain-overlay bg-street-offwhite">
        <div className="container text-center">
          <h1 className="font-display text-5xl tracking-wider mb-4">
            PRODUCT NOT FOUND
          </h1>
          <p className="text-street-muted mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-street-neon text-street-black font-display tracking-widest hover:bg-street-neonDark hover:text-street-white transition-colors"
          >
            <ArrowLeft size={18} />
            BACK TO PRODUCTS
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const specs = [
    { icon: Layers, label: "FABRIC", value: product.fabric },
    { icon: Package, label: "WEIGHT", value: product.weight },
    { icon: Clock, label: "LEAD TIME", value: product.leadTime },
    { icon: ShoppingBag, label: "MOQ", value: `${product.moq} pcs` },
  ];

  return (
    <div className="pt-20 grain-overlay">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-street-offwhite">
        <div className="absolute inset-0 diagonal-lines opacity-30" />
        <div className="container relative">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-street-muted hover:text-street-neonDark transition-colors mb-8"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            BACK
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative lg:col-span-3"
            >
              <div className="relative overflow-hidden bg-white border border-street-gray shadow-sm">
                <div className="aspect-square overflow-hidden">
                  <ZoomImage src={product.image} alt={product.name} />
                </div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-street-black/80 backdrop-blur-sm text-[10px] font-mono tracking-wider text-street-neon border border-street-neon/30"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-1 bg-street-neon" />
                <span className="font-mono text-xs tracking-[0.3em] text-street-neonDark">
                  {product.categoryLabel}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl leading-none tracking-tight mb-6">
                {product.name}
              </h1>

              <p className="text-street-muted text-lg leading-relaxed mb-8">
                {product.fullDescription}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-4 bg-white border border-street-gray"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <spec.icon size={16} className="text-street-neonDark" />
                      <span className="font-mono text-[10px] tracking-widest text-street-muted">
                        {spec.label}
                      </span>
                    </div>
                    <div className="font-display text-lg tracking-wide">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-street-neon text-street-black font-display tracking-widest text-lg hover:bg-street-neonDark hover:text-street-white transition-colors"
                >
                  REQUEST A QUOTE
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-street-black/30 text-street-black font-display tracking-widest text-lg hover:border-street-neonDark hover:text-street-neonDark transition-colors"
                >
                  ALL PRODUCTS
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-white border-y border-street-gray">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Ruler size={20} className="text-street-neonDark" />
                <h2 className="font-display text-2xl tracking-wider">
                  AVAILABLE SIZES
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <div
                    key={size}
                    className="w-14 h-14 flex items-center justify-center bg-street-offwhite border border-street-gray font-display text-lg tracking-wide hover:border-street-neon transition-colors"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Colors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Palette size={20} className="text-street-neonDark" />
                <h2 className="font-display text-2xl tracking-wider">
                  COLOR OPTIONS
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="px-4 py-2.5 bg-street-offwhite border border-street-gray font-mono text-xs tracking-wider hover:border-street-neon transition-colors"
                  >
                    {color.toUpperCase()}
                  </div>
                ))}
              </div>
              <p className="text-xs text-street-muted mt-4 font-mono">
                Custom colors available on request
              </p>
            </motion.div>

            {/* Techniques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Layers size={20} className="text-street-neonDark" />
                <h2 className="font-display text-2xl tracking-wider">
                  TECHNIQUES
                </h2>
              </div>
              <ul className="space-y-3">
                {product.techniques.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-3 font-body text-sm"
                  >
                    <Check size={16} className="text-street-neonDark flex-shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-8 bg-street-offwhite border border-street-gray"
          >
            <h2 className="font-display text-2xl tracking-wider mb-6">
              KEY FEATURES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 font-body text-sm"
                >
                  <div className="w-5 h-5 bg-street-neon/20 border border-street-neon/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-street-neonDark" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section - DARK for contrast */}
      <section className="py-20 bg-street-black relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines-dark opacity-50" />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="font-mono text-sm tracking-[0.3em] text-street-neon">
              HOW IT WORKS
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-street-white">
              ORDERING PROCESS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "INQUIRY", desc: "Share your design, quantities & timeline" },
              { num: "02", title: "SAMPLING", desc: "We produce a pre-production sample for approval" },
              { num: "03", title: "PRODUCTION", desc: "Bulk manufacturing with quality control" },
              { num: "04", title: "DELIVERY", desc: " QC, packing & shipping to your door" },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="font-display text-6xl text-street-neon/30 mb-3">
                  {step.num}
                </div>
                <h3 className="font-display text-xl tracking-wider text-street-white mb-2">
                  {step.title}
                </h3>
                <p className="text-street-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-street-offwhite">
          <div className="container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-1 bg-street-neon" />
                  <span className="font-mono text-xs tracking-[0.3em] text-street-neonDark">
                    MORE FROM {product.categoryLabel}
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                  RELATED PRODUCTS
                </h2>
              </div>
              <Link
                to="/products"
                className="group hidden md:inline-flex items-center gap-2 font-mono text-sm tracking-widest text-street-neonDark hover:gap-4 transition-all"
              >
                VIEW ALL
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((rp, index) => (
                <Link
                  key={rp.id}
                  to={`/products/${rp.id}`}
                  className="group cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="relative overflow-hidden bg-white border border-street-gray group-hover:border-street-neon transition-all duration-300 shadow-sm">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={rp.image}
                          alt={rp.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="pt-3">
                      <span className="text-xs font-mono tracking-widest text-street-muted">
                        {rp.categoryLabel}
                      </span>
                      <h3 className="font-display text-base tracking-wide mt-1 group-hover:text-street-neonDark transition-colors">
                        {rp.name}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-street-black relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines-dark opacity-30" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl text-street-white leading-none mb-6">
              READY TO ORDER{" "}
              <span className="text-stroke-neon">{product.name}?</span>
            </h2>
            <p className="text-street-muted text-lg mb-10">
              Contact us for samples, custom specs, and bulk pricing. MOQ from{" "}
              {product.moq} pieces.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-street-neon text-street-black font-display tracking-widest text-xl hover:bg-street-neonDark hover:text-street-white transition-colors"
            >
              GET A QUOTE
              <ArrowRight
                size={22}
                className="transition-transform group-hover:translate-x-2"
              />
            </Link>
            <p className="font-mono text-xs text-street-muted mt-8 tracking-widest">
              {companyInfo.email} · {companyInfo.phone}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
