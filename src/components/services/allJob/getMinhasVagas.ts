"use server"

export default async function getMinhasVagas(token:string) {
  const response = await fetch(`${process.env.URL_API_SECRET}/dash/vagas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-api-key': `${process.env.API_KEY_SECRET}`
    },
    cache: 'no-store'
  });
  const a = await response.json()
  console.log(a.vagas)

  return a
}
