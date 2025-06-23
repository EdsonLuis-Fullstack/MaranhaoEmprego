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

  const response = await fetch(`${process.env.URL_API_SECRET}/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.API_KEY_SECRET}`
    },
    body: JSON.stringify(usuario),
  });
  return response;

}
