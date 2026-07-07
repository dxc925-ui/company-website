import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { companyInfo } from "@/data/company";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    {
      icon: Mail,
      label: "EMAIL",
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
    {
      icon: Phone,
      label: "PHONE",
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone}`,
    },
    {
      icon: MapPin,
      label: "ADDRESS",
      value: companyInfo.address,
      href: null,
    },
    {
      icon: Clock,
      label: "BUSINESS HOURS",
      value: "Mon - Fri: 9:00 - 18:00 (GMT+8)",
      href: null,
    },
  ];

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
                CONTACT
              </span>
            </div>
            <h1 className="font-display text-clamp-xl leading-none">
              GET IN <span className="text-stroke">TOUCH</span>
            </h1>
            <p className="mt-6 text-street-muted max-w-xl text-lg leading-relaxed">
              Ready to start your next collection? Send us a message and our
              team will get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-street-offwhite">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <SectionTitle
                eyebrow="DETAILS"
                title="CONTACT INFO"
                subtitle="Reach out through any of these channels — we're here to help."
              />

              <div className="space-y-6 mt-8">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-white border border-street-gray hover:border-street-neon transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 bg-street-neon/10 border border-street-neon/30 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-street-neonDark" />
                    </div>
                    <div>
                      <div className="font-mono text-xs tracking-widest text-street-muted mb-1">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-body text-sm text-street-black hover:text-street-neonDark transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-street-black leading-relaxed">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="p-8 md:p-10 bg-white border border-street-gray shadow-sm">
                <h3 className="font-display text-2xl tracking-wider mb-2">
                  SEND US A MESSAGE
                </h3>
                <p className="text-street-muted text-sm mb-8">
                  Fill out the form below and we'll respond within 24 hours.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <CheckCircle
                      size={64}
                      className="mx-auto text-street-neonDark mb-6"
                    />
                    <h4 className="font-display text-2xl tracking-wider mb-2">
                      MESSAGE SENT!
                    </h4>
                    <p className="text-street-muted">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs tracking-widest text-street-muted mb-2">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-street-offwhite border border-street-gray text-street-black font-body text-sm focus:outline-none focus:border-street-neon transition-colors placeholder:text-street-muted/50"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs tracking-widest text-street-muted mb-2">
                          EMAIL *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-street-offwhite border border-street-gray text-street-black font-body text-sm focus:outline-none focus:border-street-neon transition-colors placeholder:text-street-muted/50"
                          placeholder="john@brand.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs tracking-widest text-street-muted mb-2">
                          COMPANY
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-street-offwhite border border-street-gray text-street-black font-body text-sm focus:outline-none focus:border-street-neon transition-colors placeholder:text-street-muted/50"
                          placeholder="Brand / Company"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs tracking-widest text-street-muted mb-2">
                          SUBJECT *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-street-offwhite border border-street-gray text-street-black font-body text-sm focus:outline-none focus:border-street-neon transition-colors placeholder:text-street-muted/50"
                          placeholder="e.g. OEM Quote Request"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs tracking-widest text-street-muted mb-2">
                        MESSAGE *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-street-offwhite border border-street-gray text-street-black font-body text-sm focus:outline-none focus:border-street-neon transition-colors resize-none placeholder:text-street-muted/50"
                        placeholder="Tell us about your project, product types, quantities, etc."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-street-neon text-street-black font-display tracking-widest text-lg hover:bg-street-neonDark hover:text-street-white transition-colors"
                    >
                      SEND MESSAGE
                      <Send
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map / Location Placeholder */}
      <section className="bg-white border-t border-street-gray">
        <div className="h-64 md:h-80 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 diagonal-lines opacity-20" />
          <div className="relative text-center">
            <MapPin size={48} className="mx-auto text-street-neonDark mb-4" />
            <p className="font-display text-xl tracking-widest">
              {companyInfo.location.toUpperCase()}
            </p>
            <p className="font-mono text-xs text-street-muted tracking-widest mt-2">
              ZHEJIANG PROVINCE, CHINA
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
