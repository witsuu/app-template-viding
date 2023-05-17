import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // get data themes from database
    const themes = await prisma.themes.findMany()

    // return data themes
    res.json(themes)
}