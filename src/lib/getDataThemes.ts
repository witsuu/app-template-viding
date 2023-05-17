export const getDataThemesClient = async () => {
    const res = await fetch('https://witsuu.github.io/new-theme-viding/data.json')
    return res.json()
}

export const getDataThemesServer = async () => {
    const res = await fetch('/api/themes')
    return res.json()
}