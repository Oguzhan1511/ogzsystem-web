"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";
import { Container } from "./Layout";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(250, 250, 250, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ["none", "0 1px 2px 0 rgba(0, 0, 0, 0.05)"]
  );

  return (
    <motion.header
      style={{
        backgroundColor: headerBg,
        boxShadow: headerShadow,
        backdropFilter: isScrolled ? "blur(8px)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <Container className="flex items-center justify-between h-20">
        <Link href="/">
          <Logo width={200} height={47} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#vaka-analizi" className="text-sm font-semibold text-slate-600 hover:text-ink transition-colors">
            Vaka Analizi
          </Link>
          <Link href="/teklif-al" className="text-sm font-semibold text-slate-600 hover:text-ink transition-colors">
            Teklif Al
          </Link>
          <a
            href="https://ald.ogzsystem.com"
            className="text-sm font-semibold text-accent hover:text-[#0a7a75] transition-colors"
          >
            Müşteri Girişi
          </a>
        </nav>
      </Container>
    </motion.header>
  );
}
