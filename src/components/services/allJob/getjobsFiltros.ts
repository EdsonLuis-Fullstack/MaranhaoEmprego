'use server'

export async function getJobsFiltros(area:string, cidade:string, pesquisa:string) {

  const response = await fetch(
    `${process.env.URL_API_SECRET}/vagas/filtros`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.API_KEY_SECRET}`
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