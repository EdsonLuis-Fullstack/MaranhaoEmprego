'use server';

export default async function cadastrarUsuario(FormData:any) {
  const usuario = {
    nome: FormData.empresa,
    email: FormData.email,
    senha: FormData.senha,
    telefone: FormData.telefone,
  };

  const response = await fetch('http://localhost:8080/accessv4/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c='
    },
    body: JSON.stringify(usuario),
  });
  
  if (response.status === 201) {
    return response;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao cadastrar usuário');
  }
}
