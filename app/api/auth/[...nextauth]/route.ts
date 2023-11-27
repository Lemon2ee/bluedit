import NextAuth from "next-auth";
import authOptions from "./nextAuthOptions";

/**
 * @see https://next-auth.js.org/configuration/providers
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
