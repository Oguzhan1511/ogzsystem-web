"use server";

import { prisma } from "../prisma";

export async function submitQuoteRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !name.trim()) throw new Error("Ad Soyad zorunludur.");
  if (!company || !company.trim()) throw new Error("Şirket Adı zorunludur.");
  if (!message || !message.trim()) throw new Error("Proje detayı zorunludur.");
  
  if (!phone?.trim() && !email?.trim()) {
    throw new Error("Lütfen e-posta veya telefon numarasından en az birini girin.");
  }

  await prisma.quoteRequest.create({
    data: {
      name: name.trim(),
      company: company.trim(),
      phone: phone?.trim() || null,
      email: email?.trim() || null,
      message: message.trim(),
    }
  });

  return { success: true };
}
