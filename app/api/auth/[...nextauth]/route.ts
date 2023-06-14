import NextAuth from "next-auth/next";
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET!,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};
