import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const email = credentials.email.trim().toLowerCase();

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!passwordMatch) {
            return null;
          }

          // Only allow ADMIN accounts to sign in
          if (user.role !== "ADMIN") {
            return null;
          }

          console.log("DEBUG authorize user.id:", user.id);

          return {
            id: user.id,
            email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("DEBUG jwt user:", JSON.stringify(user));
      console.log("DEBUG jwt token.sub before:", token.sub);
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.sub = user.id;
        token.email = user.email?.toLowerCase?.() ?? user.email;
      }
      console.log("DEBUG jwt token.sub after:", token.sub);
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id ?? token.sub ?? "";
        session.user.email = token.email ?? session.user.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
