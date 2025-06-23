'use server'

export default async function getUuid(uuid: string) {
    //C:\Users\User\Documents\GitHub\API_Maranhaoempregos
      const res = await fetch(`${process.env.URL_API_SECRET}/vagas/${uuid}`, {
        headers:{
          'Content-Type': 'application/json',
          'x-api-key': `${process.env.API_KEY_SECRET}`,
        },
        method: 'GET',
        cache: 'force-cache',
        next: {
          revalidate: 60,
        }
      });
    
      if (!res.ok) {
        throw new Error('Erro ao buscar as vagas');
      }
    
      const data = await res.json();
      console.log(data)
      return data;
    }
    