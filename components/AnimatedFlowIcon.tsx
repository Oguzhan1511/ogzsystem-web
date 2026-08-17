"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedFlowIconProps {
  className?: string;
  [key: string]: any;
}

export function AnimatedFlowIcon({ className, ...props }: AnimatedFlowIconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 20,
        ease: "linear",
      }}
    >
      <path
        d="M50 85 A35 35 0 1 1 15 50"
        fill="none"
        stroke="var(--color-accent, #0c8c86)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M20 48 L8 58 L5 48 Z"
        fill="var(--color-accent, #0c8c86)"
      />
    </motion.svg>
  );
}
