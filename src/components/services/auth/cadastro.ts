'use server';

interface UsuarioFormData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

export default async function cadastrarUsuario(FormData: UsuarioFormData) {
  console.log('Dados do usuário:', FormData);


  const response = await fetch(`${process.env.URL_API_SECRET}/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.API_KEY_SECRET}`
    },
    body: JSON.stringify({nome: FormData.nome, email: FormData.email, senha: FormData.senha, telefone: FormData.telefone}),
  });
  return response.json();

}
