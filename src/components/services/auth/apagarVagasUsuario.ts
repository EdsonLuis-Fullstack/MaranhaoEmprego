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
      cache:"no-cache"
    }
  );
  const resposta = await response.json();
  console.log(resposta.msg);

  return resposta;
}

// "use server";

// export async function ApagarMinhasVagas(token: string, uuid_vaga: string) {
//     console.log("Apagando vaga com UUID:", uuid_vaga, "e token:", token);
//   const response = await fetch(
//     `http://127.0.0.1:8080/accessv4/dash/vagas/deletar`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//         "x-api-key": `rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c=`,
//       },
//       body: JSON.stringify({ uuid: uuid_vaga }),
//       cache:"no-cache"
//     }
//   );
//   const resposta = await response.json();
//   console.log(resposta.msg);

//   return resposta;
// }
