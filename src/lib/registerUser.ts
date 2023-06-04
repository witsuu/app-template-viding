import { IUserRegister } from "@/@types/user";
import { prisma } from "./prisma";
import bcrypt from 'bcrypt'


export const registerUtils = async (data: IUserRegister) => {

    const { email, name, password } = data

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPass
        }
    })

    return user
}