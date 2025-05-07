'use server'
export default async function cadastrarUsuario(FormData: any) {
    const usuario = {
        nome: FormData.empresa,
        email: FormData.email,
        senha: FormData.senha,
        telefone: FormData.telefone,
    };
    console.log(usuario)
  const response = await fetch('http://localhost:8080/accessv4/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key':'rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c='
    },
    body: JSON.stringify(usuario),
  });
  console.log(response)

  if (!response.ok) {
    throw new Error('Erro ao cadastrar usuário');
  }


  return response.json();
}