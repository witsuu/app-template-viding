export const getDataThemes = async () => {
    const res = await fetch(`https://app-template-viding.vercel.app/api/themes/`)
    return res.json()
}