"use server"

export async function pegarInfomacao() {
    const response = await fetch(
        `${process.env.URL_API_SECRET}/planos`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": `${process.env.API_KEY_SECRET}`,
        },
        cache:"no-cache",
        // next: {
        //     revalidate:  7200, // Revalidar a cada 2 horas
        // },
    
})

    return response.json()
}