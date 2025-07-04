"use server";

export async function verificarCreditos(token: string) {
  const resposta = await fetch(
    `${process.env.URL_API_SECRET}/dash/vagas/impulsionar/creditos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`,
        "x-api-key": `${process.env.API_KEY_SECRET}`,
      },
      cache:"no-cache"
    }
  );
  return await resposta.json()
}

