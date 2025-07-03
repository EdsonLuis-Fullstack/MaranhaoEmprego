'use server'
export default async function getAllJobs() {
  //C:\Users\User\Documents\GitHub\API_Maranhaoempregos
    const res = await fetch(`${process.env.URL_API_SECRET}`, {
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

    if(res.status == 404){
      return [];
    }
    if (!res.ok) {
      console.log(res)
      
      throw new Error('Erro ao buscar as vagas');
    }
    const data = await res.json();
    return data?.data ?? [];
  }
  
export async function getParamet(parametro: string, valor:string) {
    //C:\Users\User\Documents\GitHub\API_Maranhaoempregos
      const res = await fetch(`${process.env.URL_API_SECRET}/?${parametro}=${valor}`, {
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

      return data?.data ?? [];
    }
    

