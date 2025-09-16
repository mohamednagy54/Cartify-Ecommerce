import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "content-type": "application/json" },
          }
        );

        const data = await res.json();

        if (data.message === "success") {
          const decodedToken: { id: string } = jwtDecode(data.token);

          return {
            id: decodedToken.id,
            user: data.user,
            token: data.token,
          };
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // encrypt token

      if (user) {
        token.sub = user.id;
        token.accessToken = user.token;
        token.user = user.user;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.sub,
        ...token.user,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
