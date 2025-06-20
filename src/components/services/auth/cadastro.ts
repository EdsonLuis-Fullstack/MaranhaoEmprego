'use server';

interface UsuarioFormData {
  empresa: string;
  email: string;
  senha: string;
  telefone: string;
}

export default async function cadastrarUsuario(FormData: UsuarioFormData) {
  const usuario = {
    nome: FormData.empresa,
    email: FormData.email,
    senha: FormData.senha,
    telefone: FormData.telefone,
  };

  const response = await fetch('http://127.0.0.1:8080/accessv4/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c='
    },
    body: JSON.stringify(usuario),
  });
  return response;

}
