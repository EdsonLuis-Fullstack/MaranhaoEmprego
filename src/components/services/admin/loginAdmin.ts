"use server";

export async function Login_ADMIN(username: string, senha: string) {
  const response = await fetch(`${process.env.URL_API_SECRET}/addas/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_KEY_SECRET_ADMINISTRADOR}`,
    },
    body: JSON.stringify({ usuario:username,senha:senha }),
    cache: "no-cache",
  });
  const resposta = await response.json();
  console.log(resposta.msg);

  return resposta;
}


