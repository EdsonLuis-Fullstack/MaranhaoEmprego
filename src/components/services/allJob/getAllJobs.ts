export default async function getAllJobs() {
  //C:\Users\User\Documents\GitHub\API_Maranhaoempregos
    const res = await fetch("http://127.0.0.1:8080/accessv4/", {
      headers:{
        'Content-Type': 'application/json',
        'x-api-key': 'rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c=',
      },
      method: 'GET',
      cache: 'no-store'
    });
  
    if (!res.ok) {
      throw new Error('Erro ao buscar as vagas');
    }
  
    const data = await res.json();
    return data?.data ?? [];
  }
  