"use server";
interface LoginFormData {
  email: string;
  senha: string;
}


export default async function realizarLogin(FormData: LoginFormData) {
  const response = await fetch(`${process.env.URL_API_SECRET}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-api-key": `${process.env.API_KEY_SECRET}`
    },
    body: JSON.stringify({
      email: FormData.email, 
      senha: FormData.senha
    }),
  });
  const data = await response.json();
  return data;

}
