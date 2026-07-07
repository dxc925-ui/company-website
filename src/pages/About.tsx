import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Factory, Users, Package, Award } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { companyInfo, companyStory, partners } from "@/data/company";

const aboutImage = "/images/about-factory.jpg";

const stats = [
  { icon: Factory, value: companyInfo.factorySize, label: "FACTORY AREA" },
  { icon: Users, value: companyInfo.staffCount, label: "SKILLED WORKERS" },
  { icon: Package, value: companyInfo.monthlyOutput, label: "MONTHLY OUTPUT" },
  { icon: Award, value: companyInfo.yearsExperience, label: "YEARS EXPERIENCE" },
];

export default function About() {
  return (
    <div className="pt-20 grain-overlay">
      {/* Page Header */}
      <section className="relative py-[3.6rem] md:py-[4.8rem] overflow-hidden bg-street-offwhite">
        <div className="absolute top-0 left-0 right-0 h-3/4 diagonal-lines opacity-30" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-street-neon" />
              <span className="font-mono text-sm tracking-[0.3em] text-street-neonDark">
                ABOUT US
              </span>
            </div>
            <h1 className="font-display text-clamp-xl leading-none">
              WHO WE <span className="text-stroke">ARE</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-street-offwhite">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white border border-street-gray shadow-sm">
                <img
                  src={aboutImage}
                  alt="Factory interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-street-neon text-street-black px-8 py-4 font-display text-2xl tracking-wider">
                EST. {companyInfo.founded}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle
                eyebrow="OUR STORY"
                title="FULL-SERVICE KNITWEAR SUPPLIER"
              />
              <div className="space-y-6 text-street-black/80 leading-relaxed">
                <p>{companyStory.whoWeAre}</p>
                <p>{companyStory.bestSellers}</p>
              </div>

              <div className="mt-8 p-6 border-l-4 border-street-neon bg-white">
                <p className="font-display text-xl italic tracking-wide">
                  "We can't change the world, but we can change ourselves."
                </p>
                <p className="font-mono text-xs text-street-muted mt-2 tracking-wider">
                  — BMG MISSION
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-street-gray">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-street-offwhite border border-street-gray hover:border-street-neon transition-colors"
              >
                <stat.icon
                  size={32}
                  className="mx-auto mb-4 text-street-neonDark"
                />
                <div className="font-display text-4xl md:text-5xl text-street-neonDark">
                  {stat.value}
                </div>
                <div className="font-mono text-xs tracking-widest text-street-muted mt-3">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Section */}
      <section className="py-24 bg-street-offwhite">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle
                eyebrow="MANUFACTURING"
                title="OUR FACTORY"
                subtitle="State-of-the-art facilities with skilled craftsmen dedicated to quality."
              />
              <div className="space-y-6 text-street-black/80 leading-relaxed">
                <p>{companyStory.factoryInfo}</p>
                <p>{companyStory.craftsmanship}</p>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  "2,500 sq.m production facility",
                  "8 partnership factories",
                  "100+ skilled employees",
                  "Located in Ningbo, China",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-street-neon" />
                    <span className="font-mono text-sm tracking-wider">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { name: "BSCI", img: "BSCI.png" },
                { name: "WRAP", img: "WRAP.png" },
                { name: "GRS", img: "GRS.png" },
                { name: "OCS", img: "OCS.png" },
                { name: "Disney FAMA", img: "Disney FAMA.png" },
                { name: "OEKO-TEX 100", img: "OEKO-TEX 100.png" },
              ].map((cert) => (
                <div
                  key={cert.name}
                  className="aspect-square bg-white overflow-hidden"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={`/images/${cert.img}`}
                      alt={cert.name}
                      className="w-[90%] h-[90%] object-contain"
                      style={{ clipPath: "inset(1px)" }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white border-y border-street-gray">
        <div className="container">
          <SectionTitle
            eyebrow="TRUSTED"
            title="BRAND PARTNERS"
            subtitle="We've built long-term relationships with internationally renowned brands."
            align="center"
          />
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 mt-16">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="font-display text-3xl md:text-4xl tracking-widest text-street-black/30 hover:text-street-neonDark transition-colors cursor-default"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - DARK for contrast */}
      <section className="py-24 bg-street-black relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines-dark opacity-30" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="font-mono text-sm tracking-[0.3em] text-street-neon">
              OUR MISSION
            </span>
            <h2 className="font-display text-clamp-lg leading-none mt-4 mb-6 text-street-white">
              100% SERVICE. <br />
              <span className="text-street-neon">100% COMMITMENT.</span>
            </h2>
            <p className="text-street-white/80 text-lg leading-relaxed mb-10">
              {companyStory.mission}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-street-neon text-street-black font-display tracking-widest text-lg hover:bg-street-neonDark hover:text-street-white transition-colors"
            >
              WORK WITH US
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
