import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Printer, Sparkles } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { companyInfo, services, highlights, partners } from "@/data/company";
import { products } from "@/data/products";

const heroImage = "/images/about-factory.jpg?v=4";

const productsBg = "/images/products-bg.jpg?v=3";

const servicesBg = "/images/services-bg.jpg?v=3";

const ctaBg = "/images/cta-bg.jpg?v=3";

const serviceIcons: Record<string, typeof Droplets> = {
  droplets: Droplets,
  printer: Printer,
  needle: Sparkles,
};

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="grain-overlay">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-street-offwhite">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Streetwear fashion"
            className="w-full h-full object-cover opacity-100 brightness-90 contrast-110 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-street-offwhite/90 via-street-offwhite/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-street-offwhite via-street-offwhite/20 to-transparent" />
        </div>

        <div className="container relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-street-neon" />
              <span className="font-mono text-sm tracking-[0.3em] text-street-neonDark">
                EST. {companyInfo.founded}
              </span>
            </div>

            <h1 className="font-display text-clamp-hero leading-[0.85] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block"
              >
                KNITWEAR
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block text-stroke"
              >
                MANUFACTURING
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="block text-street-neonDark"
              >
                REDEFINED
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 text-lg text-street-muted max-w-xl leading-relaxed"
            >
              Full-service OEM knitwear manufacturer for streetwear and casual
              apparel. Premium quality with garment wash, printing, and
              embroidery capabilities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-street-neon text-street-black font-display tracking-widest text-lg hover:bg-street-neonDark hover:text-street-white transition-colors"
              >
                VIEW PRODUCTS
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-street-black/30 text-street-black font-display tracking-widest text-lg hover:border-street-neonDark hover:text-street-neonDark transition-colors"
              >
                GET A QUOTE
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs tracking-widest text-street-muted">
            SCROLL
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-street-neonDark to-transparent" />
        </motion.div>
      </section>

      {/* Marquee */}
      <section className="bg-street-neon py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span className="font-display text-2xl tracking-widest text-street-black">
                GARMENT WASH
              </span>
              <span className="text-street-black">★</span>
              <span className="font-display text-2xl tracking-widest text-street-black">
                SCREEN PRINT
              </span>
              <span className="text-street-black">★</span>
              <span className="font-display text-2xl tracking-widest text-street-black">
                EMBROIDERY
              </span>
              <span className="text-street-black">★</span>
              <span className="font-display text-2xl tracking-widest text-street-black">
                OEM MANUFACTURING
              </span>
              <span className="text-street-black">★</span>
              <span className="font-display text-2xl tracking-widest text-street-black">
                STREETWEAR
              </span>
              <span className="text-street-black">★</span>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-street-offwhite diagonal-lines relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-street-neon blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-street-neon blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 bg-white border border-street-gray hover:border-street-neon transition-all duration-300 shadow-sm"
              >
                <span className="font-display text-7xl text-street-neon/30 group-hover:text-street-neon/50 transition-colors">
                  {item.number}
                </span>
                <h3 className="font-display text-2xl tracking-wider mt-2 group-hover:text-street-neonDark transition-colors">
                  {item.title}
                </h3>
                <p className="text-street-muted mt-4 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-street-offwhite relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={productsBg}
            alt=""
            className="w-full h-full object-cover opacity-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-street-offwhite via-street-offwhite/55 to-street-offwhite/85" />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <SectionTitle
              eyebrow="FEATURED"
              title="PRODUCT HIGHLIGHTS"
              subtitle="Our best-selling knitwear pieces, crafted with premium materials and street-ready details."
            />
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 font-mono text-sm tracking-widest text-street-neonDark hover:gap-4 transition-all self-start md:self-end"
            >
              VIEW ALL
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={servicesBg}
            alt=""
            className="w-full h-full object-cover opacity-[0.30]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-white/85" />
        </div>
        <div className="container relative z-10">
          <SectionTitle
            eyebrow="CAPABILITIES"
            title="CUSTOM TECHNIQUES"
            subtitle="From vintage washes to premium embroidery — we offer every customization you need to make your collection stand out."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] || Sparkles;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative"
                  data-cursor-hover
                >
                  <div className="p-8 bg-street-offwhite border border-street-gray hover:border-street-neon transition-all duration-300 h-full">
                    <div className="w-16 h-16 bg-street-neon/10 border border-street-neon/30 flex items-center justify-center mb-6 group-hover:bg-street-neon group-hover:text-street-black transition-all duration-300">
                      <Icon
                        size={28}
                        className="text-street-neonDark group-hover:text-street-black transition-colors"
                      />
                    </div>
                    <div className="font-mono text-xs tracking-widest text-street-neonDark mb-2">
                      {`0${index + 1}`} / 03
                    </div>
                    <h3 className="font-display text-2xl tracking-wider mb-3">
                      {service.title}
                    </h3>
                    <p className="text-street-muted text-sm mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-street-black/70 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - DARK for contrast */}
      <section className="py-24 bg-street-black relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines-dark opacity-50" />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: companyInfo.yearsExperience, label: "YEARS EXPERIENCE" },
              { number: companyInfo.factorySize, label: "FACTORY SIZE" },
              { number: companyInfo.staffCount, label: "STAFF MEMBERS" },
              { number: companyInfo.monthlyOutput, label: "MONTHLY OUTPUT" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-5xl md:text-6xl text-street-neon">
                  {stat.number}
                </div>
                <div className="font-mono text-xs tracking-widest text-street-muted mt-3">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white border-y border-street-gray">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-mono text-xs tracking-[0.3em] text-street-muted uppercase">
              Trusted by leading brands worldwide
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="font-display text-2xl md:text-3xl tracking-widest text-street-black/40 hover:text-street-black transition-colors cursor-default"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - DARK for impact */}
      <section className="py-24 bg-street-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={ctaBg}
            alt=""
            className="w-full h-full object-cover opacity-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-street-black via-street-black/55 to-street-black/85" />
        </div>
        <div className="absolute inset-0 diagonal-lines-dark opacity-30 z-0" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="font-mono text-sm tracking-[0.3em] text-street-neon">
              READY TO START?
            </span>
            <h2 className="font-display text-clamp-xl leading-none mt-4 mb-6 text-street-white">
              LET'S BUILD YOUR{" "}
              <span className="text-stroke-neon">NEXT COLLECTION</span>
            </h2>
            <p className="text-street-muted text-lg max-w-2xl mx-auto mb-10">
              From concept to production, we handle every step. Get in touch
              with our team for a quote on your next streetwear or casual
              apparel line.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-street-neon text-street-black font-display tracking-widest text-xl hover:bg-street-neonDark hover:text-street-white transition-colors"
            >
              CONTACT US NOW
              <ArrowRight
                size={24}
                className="transition-transform group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
