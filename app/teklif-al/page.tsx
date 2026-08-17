"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitQuoteRequest } from "@/lib/actions/quote";
import { Container, Section } from "@/components/Layout";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function TeklifAlPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      await submitQuoteRequest(formData);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral flex flex-col">
      <header className="w-full py-6">
        <Container>
          <Link href="/">
            <Logo width={200} height={47} className="text-ink" />
          </Link>
        </Container>
      </header>

      <Section className="flex-1 flex items-center pt-8 md:pt-12 pb-24">
        <Container className="max-w-xl mx-auto w-full">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-ink mb-3">Projeyi Birlikte Şekillendirelim</h1>
                    <p className="text-slate-600">
                      İhtiyaçlarınızı anlamamız için lütfen aşağıdaki formu doldurun. En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ad Soyad *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-ink"
                        placeholder="Örn. Ahmet Yılmaz"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Şirket Adı *</label>
                      <input
                        type="text"
                        name="company"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-ink"
                        placeholder="Örn. ALD Plastik"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefon</label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-ink"
                          placeholder="05XX XXX XX XX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-posta</label>
                        <input
                          type="email"
                          name="email"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-ink"
                          placeholder="ornek@sirket.com"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-[-10px]">* Telefon veya e-posta adresinden en az birini doldurmalısınız.</p>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Projenizi Kısaca Anlatın *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-ink resize-none"
                        placeholder="Hangi süreçleri dijitalleştirmek istiyorsunuz?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-[#0a7a75] text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Gönderiliyor..." : "Teklif İste"}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-ink mb-3">Talebiniz Alındı!</h2>
                  <p className="text-slate-600 mb-8 max-w-sm">
                    Teklif talebiniz başarıyla bize ulaştı. Proje detaylarınızı inceleyip en kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-ink bg-neutral hover:bg-slate-100 transition-colors rounded-full"
                  >
                    Ana Sayfaya Dön
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </Section>
    </main>
  );
}
