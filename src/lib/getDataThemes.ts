export const getDataThemes = async () => {
    const res = await fetch('https://witsuu.github.io/new-theme-viding/data.json')
    return res.json()
}