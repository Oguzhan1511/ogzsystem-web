import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const adminUsername = process.env.ADMIN_USERNAME || "ogzsystem";
        const adminPassword = process.env.ADMIN_PASSWORD || "ogz2026";

        const aldUsername = process.env.ALD_USERNAME || "admin";
        const aldPassword = process.env.ALD_PASSWORD || "ald2024";

        if (
          credentials.username === adminUsername &&
          credentials.password === adminPassword
        ) {
          return {
            id: "1",
            name: "Yönetici",
            email: "admin@ogzsystem.com",
            role: "ADMIN"
          };
        }

        if (
          credentials.username === aldUsername &&
          credentials.password === aldPassword
        ) {
          return {
            id: "2",
            name: aldUsername,
            email: `${aldUsername}@aldplastik.local`,
            role: "ALD_ADMIN"
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        session.user.name = token.name;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: ".ogzsystem.com",
        maxAge: 30 * 24 * 60 * 60, // Persistent for 30 days
      },
    },
  },
  secret: "ogzsystem-ald-plastik-shared-secret-2026-v2",
};
