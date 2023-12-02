import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // check if credentials, username and password are present
        if (!credentials || !credentials.password || !credentials.username) {
          return null;
        }

        const { username, password } = credentials;

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // Check if session.user is defined. If not, initialize it.
      if (!session.user) {
        session.user = {};
      }

      // Now that session.user is guaranteed to be an object, you can safely assign properties to it.

      const profileSearchResult = await prisma.profile.findUnique({
        where: {
          userId: token.sub,
        },
        select: {
          profilePicture: true,
          displayName: true,
        },
      });

      const userSearchResult = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        select: {
          role: true,
        },
      });

      if (!userSearchResult || !userSearchResult.role) return session;

      session.user.name = profileSearchResult?.displayName;
      session.user.image = profileSearchResult?.profilePicture;
      session.user.role = userSearchResult?.role;
      session.user.id = token.sub;

      if (!session) return session;
      return session;
    },
  },
};

export default authOptions;
