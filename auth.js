import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const SECRET_KEY = process.env.JWT_SECRET; // Asegúrate de tener una clave secreta para firmar el JWT

export const { handlers, signIn, signOut, auth, update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const user = await res.json();

          if (res.ok && user && user.token) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token.expires && Date.now() / 1000 > token.expires) {
        console.log("Session has expired");
        return { error: "SessionExpired" };
      }
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
        token.expires = Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60;
        console.log("Token set to expire at:", token.expires);
      }

      if (trigger === "update" && session) {
        token = { ...token, user: session };
        return token;
      }

      if (token.expires && Date.now() / 1000 > token.expires) {
        console.log("Token has expired");
        return {}; // Retornar un objeto vacío para invalidar el token
      }

      return token;
    },
  },

  jwt: {
    secret: SECRET_KEY,
    maxAge: 3 * 24 * 60 * 60, // El token expira en 3 dias
  },

  pages: {
    signIn: "/auth/login", // Redirigir a la página de login personalizada
    error: "/auth/error", // Página de error personalizada
  },
});
