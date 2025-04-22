export default async function getAllJobs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'GET',
      cache: 'no-store'
    });
  
    if (!res.ok) {
      throw new Error('Erro ao buscar as vagas');
    }
  
    const data = await res.json();
    return data;
  }
  