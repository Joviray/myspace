import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from "next-auth/next";
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials'
import AzureADProvider from 'next-auth/providers/azure-ad'

export const authOptions: NextAuthOptions = {
    //adapter: PrismaAdapter(prisma),
    providers: [

        AzureADProvider({
            tenantId: process.env.AZURE_AD_TENANT_ID!,
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
        })
    ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};
