import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function GreenCTA({
  text = "Falar com a Figueira",
  to = "/contato",
  size = "default",
  className = ""
}) {
  const sizes = {
    sm: "px-5 py-2.5 text-sm min-h-[42px]",
    default: "px-7 py-3.5 text-sm min-h-[48px]",
    lg: "px-8 py-4 text-base min-h-[56px]",
  };

  return (
    <Link to={to} className="inline-flex">
      <motion.span
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        className={`
          inline-flex items-center justify-center text-center font-semibold rounded-lg
          bg-accent text-accent-foreground
          hover:shadow-lg hover:shadow-accent/20 hover:brightness-95
          transition-all duration-300
          ${sizes[size]}
          ${className}
        `}
      >
        {text}
      </motion.span>
    </Link>
  );
}