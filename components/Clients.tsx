"use client";

import React from "react";
import { Container, Section } from "./Layout";
import { motion } from "framer-motion";

export function Clients() {
  return (
    <Section className="bg-white border-y border-slate-100 py-12">
      <Container>
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
            Hizmet Verdiğimiz Şirketler
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-all duration-500">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <img 
              src="/ald-logo.png" 
              alt="ALD Plastik" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" 
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
