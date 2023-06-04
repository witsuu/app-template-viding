import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Login with Credential",
            credentials: {
                email: { label: "Email", type: 'email', placeholder: "example@mail.com" },
                password: { label: 'Password', type: "password" }
            },

            async authorize(credentials, req) {

            }
        })
    ]
})