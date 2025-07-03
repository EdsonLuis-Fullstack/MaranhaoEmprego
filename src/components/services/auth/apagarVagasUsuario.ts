"use server";

export async function ApagarMinhasVagas(token: string, uuid_vaga: string) {
    console.log("Apagando vaga com UUID:", uuid_vaga, "e token:", token);
  const response = await fetch(
    `${process.env.URL_API_SECRET}/dash/vagas/deletar`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "x-api-key": `${process.env.API_KEY_SECRET}`,
      },
      body: JSON.stringify({ uuid: uuid_vaga }),
    }
  );
  const resposta = await response.json();
  console.log(resposta );

  return resposta;
}
