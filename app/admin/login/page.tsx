"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Geçersiz kullanıcı adı veya şifre.");
      } else {
        router.push("/admin/teklifler");
        router.refresh();
      }
    } catch (err) {
      setError("Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex justify-center mb-8">
          <Logo width={240} height={56} />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ink">Yönetici / Müşteri Girişi</h1>
          <p className="text-slate-500 mt-2 text-sm">Sisteme giriş yapmak için bilgilerinizi girin.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kullanıcı Adı</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Şifre</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-ink hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-70 mt-4"
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400">
          // TODO: çoklu müşteri hesabı sistemi ayrı bir aşamada eklenecek
        </div>
      </div>
    </div>
  );
}
