import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function GreenCTA({ 
  text = "Fale com um especialista", 
  to = "/contato",
  size = "default",
  className = "",
  icon = true
}) {
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    default: "px-7 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          inline-flex items-center gap-2 font-semibold rounded-lg
          bg-accent text-accent-foreground
          hover:shadow-lg hover:shadow-accent/20
          transition-shadow duration-300
          ${sizes[size]}
          ${className}
        `}
      >
        {text}
        {icon && <ArrowRight className="w-4 h-4" />}
      </motion.div>
    </Link>
  );
}