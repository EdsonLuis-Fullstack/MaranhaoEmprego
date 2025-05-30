'use server'

export async function getJobsFiltros(area:string, cidade:string, pesquisa:string) {

  const response = await fetch(
    `http://127.0.0.1:8080/accessv4/vagas/filtros`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c='
      },
      body: JSON.stringify({
        area: area,
        cidade: cidade,
        pesquisa: pesquisa
      })
    }
  );


  const data = await response.json();
  return data;

}