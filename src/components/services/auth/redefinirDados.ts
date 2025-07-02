"use server";

export async function SolicitarCodigo(data: string) {
  const response = await fetch(`${process.env.URL_API_SECRET}/verificar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_KEY_SECRET}`,
    },
    body: JSON.stringify({ email: data }),
  });

  return response.json();
}



export async function EnviarCodigo_Senha(email,senha,codigo) {
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
