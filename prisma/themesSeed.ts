import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface themeType {
    name: string,
    path: string,
    status: string
}

async function main() {
    const res = await fetch(`https://witsuu.github.io/new-theme-viding/data.json`)
    const themes = await res.json()

    themes.map(async (theme: themeType) => {
        await prisma.themes.create({
            data: {
                name: theme.name,
                path: theme.path,
                status: theme.status
            }
        })
        console.log(`theme ${theme.name} added`)
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })