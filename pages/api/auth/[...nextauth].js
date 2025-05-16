import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '@/lib/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        username: { label: "Benutzername", type: "text" },
        password: { label: "Passwort", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          // Benutzer aus DB holen
          const res = await pool.query(
            'SELECT id, username, password FROM users WHERE username = $1',
            [username]
          );

          if (res.rows.length === 0) {
            return null; // Benutzer nicht gefunden
          }

          const user = res.rows[0];

          // Einfacher Passwortcheck (ACHTUNG: In Produktion bitte Hashing verwenden!)
          if (password === user.password) {
            // User-Objekt, das in session kommt
            return { id: user.id, name: user.username };
          } else {
            return null; // Passwort falsch
          }
        } catch (error) {
          console.error('Fehler bei der Authentifizierung:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Wenn User beim Login neu ist, id zum Token hinzufügen
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // id aus Token in die Session packen
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'supersecretkey',
};

export default NextAuth(authOptions);
