import React from "react";
import { Container } from "./Layout";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-slate-400 py-12 mt-auto">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Logo width={180} height={42} className="text-white opacity-80" />
          <p className="text-sm mt-3">
            &copy; {new Date().getFullYear()} OGZ System. Tüm hakları saklıdır.
          </p>
        </div>
        
        <div className="flex gap-6 text-sm">
          <a href="mailto:iletisim@ogzsystem.com" className="hover:text-white transition-colors">
            iletisim@ogzsystem.com
          </a>
        </div>
      </Container>
    </footer>
  );
}
