import authOptions from "@/utils/authOptions";
import NextAuth, { NextAuthOptions } from "next-auth";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
