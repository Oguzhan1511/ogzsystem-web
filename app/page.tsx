"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AnimatedFlowIcon } from "@/components/AnimatedFlowIcon";
import { Container, Section } from "@/components/Layout";
import { CaseStudy } from "@/components/CaseStudy";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Clients } from "@/components/Clients";
import { PackageOpen, GitMerge, Truck } from "lucide-react";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Decorative Background Icon */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <AnimatedFlowIcon className="w-full max-w-4xl text-accent" />
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-3xl mx-auto"
          >
            <motion.div variants={heroVariants} className="mb-8">
              <Logo width={260} height={61} />
            </motion.div>

            <motion.h1
              variants={heroVariants}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6"
            >
              Üretimi ve Stokları <br />
              <span className="text-accent">Tek Ekrandan</span> Yönetin
            </motion.h1>

            <motion.p
              variants={heroVariants}
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed"
            >
              Karmaşık Excel dosyalarından kurtulun. Hammadde girişinden çok seviyeli üretime ve ürün sevkiyatına kadar tüm endüstriyel süreçlerinizi dijitalleştirin.
            </motion.p>

            <motion.div variants={heroVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/teklif-al"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-accent hover:bg-[#0a7a75] transition-colors rounded-full shadow-sm"
              >
                Teklif Al
              </Link>
              <a
                href="#vaka-analizi"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-ink bg-transparent border-2 border-ink/10 hover:border-ink/20 transition-colors rounded-full"
              >
                Vaka Analizini İncele
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* CLIENTS SECTION */}
      <Clients />

      {/* FEATURES SECTION */}
      <Section className="bg-white border-b border-slate-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-ink">Neler Yapıyoruz?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: PackageOpen,
                title: "Hammadde Takibi",
                desc: "Depoya giren her hammaddeyi, fireleri ve kullanım oranlarını anlık olarak izleyin. Eksik malzeme nedeniyle üretim durmasın.",
              },
              {
                icon: GitMerge,
                title: "Çok Seviyeli Üretim",
                desc: "Alt ürünlerden nihai ürüne kadar karmaşık reçeteleri yönetin. Üretim bandından çıkan her ürün stoklara otomatik işlensin.",
              },
              {
                icon: Truck,
                title: "Sevkiyat Yönetimi",
                desc: "Müşteriye çıkan siparişleri irsaliye mantığıyla kaydedin, stoktan otomatik düşün. Geriye dönük tüm hareketleri tek tıkla raporlayın.",
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-ink mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CASE STUDY SECTION */}
      <CaseStudy />
      </main>
      <Footer />
    </>
  );
}
