'use server'

export default async function getUuid(uuid: string) {
    //C:\Users\User\Documents\GitHub\API_Maranhaoempregos
      const res = await fetch(`http://127.0.0.1:8080/accessv4/vagas/${uuid}`, {
        headers:{
          'Content-Type': 'application/json',
          'x-api-key': 'rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c=',
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
    