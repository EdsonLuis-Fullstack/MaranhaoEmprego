"use server"

export async function MudarNome(token: string,nome: string) {

  const response = await fetch(
    `${process.env.URL_API_SECRET}/dash/alterar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "x-api-key": `${process.env.API_KEY_SECRET}`,
      },
      body: JSON.stringify({ nome:nome }),
      cache:"no-cache"
    }
  );
  const resposta = await response.json();

  return resposta;
}

export async function MudarEmail_Com_codigo(token: string,email: string,codigo:string) {

  const response = await fetch(
    `${process.env.URL_API_SECRET}/verificar/alterar/email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "x-api-key": `${process.env.API_KEY_SECRET}`,
      },
      body: JSON.stringify({ email:email,codigo:codigo }),
      cache:"no-cache"
    }
  );
  const resposta = await response.json();

  return resposta;
}
