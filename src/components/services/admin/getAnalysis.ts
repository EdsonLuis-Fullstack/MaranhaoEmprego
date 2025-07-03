export async function getAnalysis(parametro: string, valor:string) {
      const res = await fetch(`${process.env.URL_API_SECRET}/addas/dashboard`, {
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
      const data = await res.json();
      return data?.data ?? [];
    }
    

