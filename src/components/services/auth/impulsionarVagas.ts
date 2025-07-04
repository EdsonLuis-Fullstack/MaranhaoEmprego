"use server"


export async function ImpulsionarVagas(token: string,uuid_vagas: string) {
  const resposta = await fetch(
    `${process.env.URL_API_SECRET}/dash/vagas/impulsionar/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`,
        "x-api-key": `${process.env.API_KEY_SECRET}`,
      },
      body: JSON.stringify({uuid_vaga:uuid_vagas})
    }
  );
  return await resposta.json()
}

