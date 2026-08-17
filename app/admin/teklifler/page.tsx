import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container, Section } from "@/components/Layout";
import { Logo } from "@/components/Logo";

export default async function TekliflerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const quotes = await prisma.quoteRequest.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="min-h-screen bg-neutral">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <Container className="py-4 flex justify-between items-center">
          <Logo width={180} height={42} />
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Merhaba, {session.user?.name}</span>
            <a href="/api/auth/signout" className="text-sm text-red-600 font-semibold hover:underline">Çıkış Yap</a>
          </div>
        </Container>
      </header>

      <Section>
        <Container>
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-ink">Gelen Teklif Talepleri</h1>
              <p className="text-slate-500 mt-1">Siteniz üzerinden gönderilen tüm formları buradan inceleyebilirsiniz.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Tarih</th>
                  <th className="px-6 py-4">Kişi / Şirket</th>
                  <th className="px-6 py-4">İletişim</th>
                  <th className="px-6 py-4">Durum</th>
                  <th className="px-6 py-4">Detay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      Henüz hiç teklif talebi yok.
                    </td>
                  </tr>
                ) : (
                  quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {new Date(q.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-ink">{q.name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{q.company}</div>
                      </td>
                      <td className="px-6 py-4">
                        {q.email && <div className="text-slate-600">{q.email}</div>}
                        {q.phone && <div className="text-slate-600">{q.phone}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold
                          ${q.status === 'YENI' ? 'bg-blue-50 text-blue-600' : 
                            q.status === 'GORUSULDU' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'}
                        `}>
                          {q.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-slate-500" title={q.message}>
                        {q.message}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </div>
  );
}
