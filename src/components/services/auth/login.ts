"use server";
export default async function realizarLogin(FormData) {
  const response = await fetch('http://127.0.0.1:8080/accessv4/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-api-key": "rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c="
    },
    body: JSON.stringify({
      email: FormData.email, 
      senha: FormData.senha
    }),
  });
  const data = await response.json();
  return data;

}
