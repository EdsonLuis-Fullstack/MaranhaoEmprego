"use server"

export async function pegarInfomacao() {
    const response = await fetch(
        `${process.env.URL_API_SECRET}/planos`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": `${process.env.API_KEY_SECRET}`,
        }
    
})

    return response.json()
}