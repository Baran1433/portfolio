import { motion } from "framer-motion";

import { useReducedMotion } from "../../hooks/useReducedMotion";



const EASE = [0.22, 1, 0.36, 1];



const variants = {

  primary: "btn-neon-primary text-white",

  secondary: "btn-neon-secondary text-white",

};



export function PremiumButton({

  children,

  href,

  download,

  variant = "primary",

  className = "",

  type,

  disabled,

  onClick,

}) {

  const reduced = useReducedMotion();

  const base =

    "relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-premium";

  const combined = `${base} ${variants[variant] ?? variants.primary} ${className}`;



  const motionProps = reduced

    ? {}

    : {

        whileHover: {

          y: -2,

          scale: 1.02,

          boxShadow:
            "0 12px 36px rgba(124, 58, 237, 0.45), 0 0 32px rgba(59, 130, 246, 0.22)",

        },

        whileTap: { scale: 0.98, y: 0 },

        transition: { duration: 0.35, ease: EASE },

      };



  const glow = !reduced && (

    <motion.span

      aria-hidden

      className="pointer-events-none absolute inset-0 opacity-0"

      initial={false}

      whileHover={{ opacity: 1 }}

      transition={{ duration: 0.35 }}

      style={{

        background:

          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 65%)",

      }}

    />

  );



  if (href) {

    return (

      <motion.a href={href} download={download} className={combined} {...motionProps}>

        {glow}

        <span className="relative z-10">{children}</span>

      </motion.a>

    );

  }



  return (

    <motion.button

      type={type ?? "button"}

      disabled={disabled}

      onClick={onClick}

      className={combined}

      {...motionProps}

    >

      {glow}

      <span className="relative z-10">{children}</span>

    </motion.button>

  );

}

