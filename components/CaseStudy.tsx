"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Container, Section } from "./Layout";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * (to - from) + from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function CaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress specifically for the SVG diagram section
  const { scrollYProgress } = useScroll({
    target: svgContainerRef,
    offset: ["start 85%", "center center"]
  });

  // Flow animation transforms
  // 0.0 - 0.2: Show Hammadde
  // 0.2 - 0.4: Draw line to Ürün
  // 0.4 - 0.6: Draw line to Grup Ürün
  // 0.6 - 0.8: Draw line to Sevkiyat
  
  const line1Progress = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const line2Progress = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);
  const line3Progress = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

  const box1Opacity = useTransform(scrollYProgress, [0.0, 0.1], [0, 1]);
  const box2Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const box3Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const box4Opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  return (
    <Section className="bg-neutral overflow-hidden" id="vaka-analizi">
      <Container>
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Vaka Analizi</span>
          <h2 className="text-4xl font-bold tracking-tight text-ink mb-6">Örnek Proje: Plastik Enjeksiyon Sektörü</h2>
        </div>

        <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-20 relative">
          
          {/* 1. SORUN */}
          <div className="text-center max-w-2xl mx-auto pt-10">
            <h3 className="text-2xl font-semibold text-ink mb-4">Sorun: Excel ile Yönetilen Karmaşa</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Plastik enjeksiyon üretimi yapan işletme, yüzlerce hammaddeyi, karmaşık alt ürün reçetelerini ve sevkiyatları manuel olarak Excel üzerinden takip ediyordu. Bu durum stok hatalarına, üretim duraksamalarına ve geriye dönük izlenebilirliğin kaybolmasına neden oluyordu.
            </p>
          </div>

          {/* 2. ÇÖZÜM: SVG DİYAGRAM */}
          <div ref={svgContainerRef} className="relative h-[350px] md:h-[400px] flex items-center justify-center my-8">
            <div className="absolute inset-0 flex items-center justify-center mt-12 md:mt-16">
              <svg viewBox="0 0 800 400" className="w-full h-full max-w-3xl overflow-visible">
                {/* Lines */}
                <motion.path
                  d="M 200 200 L 350 200"
                  fill="none"
                  stroke="var(--color-accent, #0c8c86)"
                  strokeWidth="4"
                  strokeDasharray="150"
                  style={{ pathLength: 1, strokeDashoffset: useTransform(line1Progress, v => v * 150) }}
                />
                <motion.path
                  d="M 450 200 L 600 200"
                  fill="none"
                  stroke="var(--color-accent, #0c8c86)"
                  strokeWidth="4"
                  strokeDasharray="150"
                  style={{ pathLength: 1, strokeDashoffset: useTransform(line2Progress, v => v * 150) }}
                />
                
                <motion.path
                  d="M 650 250 L 650 320 L 400 320"
                  fill="none"
                  stroke="var(--color-accent, #0c8c86)"
                  strokeWidth="4"
                  strokeDasharray="320"
                  style={{ pathLength: 1, strokeDashoffset: useTransform(line3Progress, v => v * 320) }}
                />

                {/* Boxes */}
                <motion.g style={{ opacity: box1Opacity }}>
                  <rect x="50" y="150" width="150" height="100" rx="12" fill="white" stroke="var(--color-ink)" strokeWidth="2" />
                  <text x="125" y="205" textAnchor="middle" fill="var(--color-ink)" className="font-semibold text-lg">Hammadde</text>
                </motion.g>

                <motion.g style={{ opacity: box2Opacity }}>
                  <rect x="350" y="150" width="100" height="100" rx="50" fill="var(--color-ink)" />
                  <text x="400" y="205" textAnchor="middle" fill="white" className="font-semibold text-lg">Ürün</text>
                </motion.g>

                <motion.g style={{ opacity: box3Opacity }}>
                  <rect x="600" y="130" width="140" height="140" rx="12" fill="var(--color-accent)" />
                  <text x="670" y="195" textAnchor="middle" fill="white" className="font-semibold text-lg">Grup</text>
                  <text x="670" y="220" textAnchor="middle" fill="white" className="font-semibold text-lg">Ürün</text>
                </motion.g>

                <motion.g style={{ opacity: box4Opacity }}>
                  <rect x="250" y="290" width="150" height="60" rx="30" fill="white" stroke="var(--color-accent)" strokeWidth="3" />
                  <text x="325" y="325" textAnchor="middle" fill="var(--color-accent)" className="font-bold text-lg">Sevkiyat</text>
                </motion.g>
              </svg>
            </div>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 shadow-sm w-[90%] max-w-sm text-center">
              <h3 className="text-xl font-bold text-ink mb-2">Çözüm: Çok Seviyeli Reçete Akışı</h3>
              <p className="text-slate-600 text-sm">
                Sistem; hammaddeden ara ürüne, ara üründen paketlenmiş nihai gruba kadar tüm reçete zincirini birbirine bağlayarak tek ekrandan yönetilebilir hale getirdi.
              </p>
            </div>
          </div>

          {/* 3. SONUÇ: COUNTER */}
          <div className="pb-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-ink">Elde Edilen Sonuçlar</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl text-center shadow-sm border border-slate-100">
                <div className="text-5xl font-extrabold text-accent mb-4">
                  <Counter from={0} to={129} />
                </div>
                <div className="text-slate-600 font-medium">Hammadde-Reçete İlişkisi</div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl text-center shadow-sm border border-slate-100">
                <div className="text-5xl font-extrabold text-accent mb-4">
                  <Counter from={0} to={3} />
                </div>
                <div className="text-slate-600 font-medium">Seviyeli Ürün Ağacı</div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl text-center shadow-sm border border-slate-100">
                <div className="text-5xl font-extrabold text-accent mb-4">
                  %<Counter from={0} to={100} />
                </div>
                <div className="text-slate-600 font-medium">Anlık Stok Doğruluğu, Sıfır Excel</div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
