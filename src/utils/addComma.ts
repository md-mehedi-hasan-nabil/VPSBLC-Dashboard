export function addComma(text: string) {
    const tx = text.replace("$", "")?.trim()

    return Number(tx)?.toLocaleString()
}