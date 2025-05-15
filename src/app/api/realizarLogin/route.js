import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

// Função para lidar com a requisição POST
export async function POST(request) {
  const { email, senha } = await request.json();

  try {
    const response = await fetch('http://127.0.0.1:8080/accessv4/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-api-key": "rUOEHZ2EwFiBXOQHgI8aHJQxiE3Y+fp9J0XOgrs7s7c="
      },
      body: JSON.stringify({ email, senha })
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;

      const responseCookie = NextResponse.json({ success: true });
      responseCookie.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: '/'
      });

      return responseCookie;
    } else {
      return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erro no servidor' }, { status: 500 });
  }
}
