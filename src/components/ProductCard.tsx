import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
    <Link
      to={`/products/${product.id}`}
      className="group block cursor-pointer"
    >
      <div className="relative overflow-hidden bg-white border border-street-gray group-hover:border-street-neon transition-all duration-300 shadow-sm">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-street-black/80 backdrop-blur-sm text-[10px] font-mono tracking-wider text-street-neon border border-street-neon/30"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="absolute inset-0 bg-street-neon/0 group-hover:bg-street-neon/5 transition-colors duration-300" />
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-street-muted">
            {product.categoryLabel}
          </span>
          <span className="w-6 h-px bg-street-muted group-hover:w-12 group-hover:bg-street-neonDark transition-all duration-300" />
        </div>
        <h3 className="font-display text-lg tracking-wide mt-1 group-hover:text-street-neonDark transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-street-muted mt-1 line-clamp-1">
          {product.description}
        </p>
      </div>
    </Link>
    </motion.div>
  );
}
