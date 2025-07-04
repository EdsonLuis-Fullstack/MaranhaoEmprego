"use server";

export async function SolicitarCodigo(data: string) {
  const response = await fetch(`${process.env.URL_API_SECRET}/verificar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_KEY_SECRET}`,
    },
    body: JSON.stringify({ email: data }),
    cache:"no-cache"
  });

  return response.json();
}

export async function SolicitarCodigo_EMAIL_NOVO(data: string,Token) {
  const response = await fetch(`${process.env.URL_API_SECRET}/verificar/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_KEY_SECRET}`,
      "Authorization":`Bearer ${Token}`
    },
    body: JSON.stringify({ email: data }),
    cache:"no-cache"
  });

  return response.json();
}

export async function EnviarCodigo_Senha(email:string,senha:string,codigo:string) {
  const response = await fetch(
    `${process.env.URL_API_SECRET}/verificar/alterar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.API_KEY_SECRET}`,
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
        codigo: codigo,
      }),
    }
  );

  return response.json();
}
