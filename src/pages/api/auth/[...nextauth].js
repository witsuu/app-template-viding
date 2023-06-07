import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt'

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
                const { email, password } = credentials

                const emailExist = await prisma.user.findUnique({
                    where: {
                        email: email
                    },
                    select: {
                        email: true,
                        password: true,
                    }
                })
                if (!emailExist) throw new Error("Email does not exist!");

                const checkPass = await bcrypt.compare(password, emailExist.password)
                if (!checkPass) throw new Error("Password don't match!")

                const user = await prisma.user.findUnique({
                    where: {
                        id: emailExist.id
                    },
                    select: {
                        name: true,
                        email: true,
                    }
                })

                return user
            }
        })
    ]
})