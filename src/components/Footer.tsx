import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-street-black text-street-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/images/BMG logo.png"
                alt="Best Mind Garment Logo"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-street-muted text-sm max-w-md leading-relaxed mb-6">
              Full-service knitwear manufacturer specializing in streetwear and
              casual apparel. OEM services with garment wash, printing, and
              embroidery capabilities.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-street-light flex items-center justify-center hover:bg-street-neon hover:text-street-black hover:border-street-neon transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-street-light flex items-center justify-center hover:bg-street-neon hover:text-street-black hover:border-street-neon transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg tracking-widest mb-6 text-street-neon">
              NAVIGATE
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-street-muted hover:text-street-neon transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-street-muted hover:text-street-neon transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-street-muted hover:text-street-neon transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-street-muted hover:text-street-neon transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg tracking-widest mb-6 text-street-neon">
              CONTACT
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="text-street-neon mt-0.5 flex-shrink-0"
                />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-sm text-street-muted hover:text-street-white transition-colors break-all"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="text-street-neon mt-0.5 flex-shrink-0"
                />
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-sm text-street-muted hover:text-street-white transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-street-neon mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-street-muted leading-relaxed">
                  {companyInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-street-light mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-street-muted">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-street-muted tracking-wider">
            KNITWEAR / STREETWEAR / OEM MANUFACTURING
          </p>
        </div>
      </div>
    </footer>
  );
}
