import { prisma } from "./prisma"

export const getDataThemesClient = async () => {
    const res = await fetch('https://witsuu.github.io/new-theme-viding/data.json')
    return res.json()
}

export const getDataThemesServer = async () => {
    // get data themes from database
    const themes = await prisma.themes.findMany()

    // return data themes
    return JSON.parse(JSON.stringify(themes))
}

type IstatusThemes = {
    statusThemes: string
}

export const getDataThemesByStatus = async ({ statusThemes }: IstatusThemes) => {
    // get data themes from database
    const themes = await prisma.themes.findMany({
        where: {
            status: statusThemes
        }
    })

    // return data themes
    return JSON.parse(JSON.stringify(themes))
}