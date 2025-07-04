"use server"

export async function getAnalysis(token:string) {
      const res = await fetch(`${process.env.URL_API_SECRET}/addas/dashboard`, {
        headers:{
          'Content-Type': 'application/json',
          'x-api-key': `${process.env.API_KEY_SECRET_ADMINISTRADOR}`,
          'Authorization':`Bearer ${token}`
        },
        method: 'GET',
      });    
      return await res.json()
    }
    

export async function vagasAprovacao(token:string) {
      const res = await fetch(`${process.env.URL_API_SECRET}/addas/aprovar/list`, {
        headers:{
          'Content-Type': 'application/json',
          'x-api-key': `${process.env.API_KEY_SECRET_ADMINISTRADOR}`,
          'Authorization':`Bearer ${token}`
        },
        method: 'GET',
      });    
      return await res.json()
    }


export async function AprovarVagas(token:string,uuid_vaga:string) {
      const res = await fetch(`${process.env.URL_API_SECRET}/addas/aprovar/`, {
        headers:{
          'Content-Type': 'application/json',
          'x-api-key': `${process.env.API_KEY_SECRET_ADMINISTRADOR}`,
          'Authorization':`Bearer ${token}`
        },
        method: 'POST',
        body:JSON.stringify({uuid:uuid_vaga})
      });    
      return await res.json()
    }
    


export async function RejeitarVagas(token:string,uuid_vaga:string) {
      const res = await fetch(`${process.env.URL_API_SECRET}/addas/rejeitar/`, {
        headers:{
          'Content-Type': 'application/json',
          'x-api-key': `${process.env.API_KEY_SECRET_ADMINISTRADOR}`,
          'Authorization':`Bearer ${token}`
        },
        method: 'POST',
        body:JSON.stringify({uuid_vaga:uuid_vaga})
      });    
      return await res.json()
    }



export async function AtualizarPlanos(token:string,valor:number) {
      const res = await fetch(`${process.env.URL_API_SECRET}/addas/planos/alterar`, {
        headers:{
          'Content-Type': 'application/json',
          'x-api-key': `${process.env.API_KEY_SECRET_ADMINISTRADOR}`,
          'Authorization':`Bearer ${token}`
        },
        method: 'POST',
        body:JSON.stringify({valor:valor})
      });    
      return await res.json()
    }