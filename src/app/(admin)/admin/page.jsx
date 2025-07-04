"use client";
import "./admin.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa";
import {Login_ADMIN,definirCookie_ADMIN} from "@/components/services/admin/loginAdmin"
import Cookies from "js-cookie"


export default function LoginAdmin() {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const criar_Erros = (msg) => {
    setErro(msg)
    setInterval(() => {
      setErro("")
    }, 3000);
  }
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !senha) {
      criar_Erros("Dados invalidos");
      return;
    }
    if (username.length < 6 || username.length > 50) {
      criar_Erros("O tamanho do username e invalido");
      return;
    }
    if (senha.length < 6) {
      criar_Erros("A senha deve ter pelomenos 6 caracteres");
      return;
    }

    const resposta = async () => {
      const data = await Login_ADMIN(username,senha)
      if(data.code != 200){
        criar_Erros(data.msg)
        return;
      }else{
        Cookies.set(`${process.env.NEXT_PUBLIC_COOKIE_NMAJD_NAME}`, data.Token, {
          sameSite: "Strict",
          expires: 2, // 2 dias
        });

        window.location.href = "/admin/dashboard"
      }
    }
    resposta()
  };

  return (
    <section className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <div className="admin-login-icon">
          <FaUserShield size={40} />
        </div>
        <h2>Login Administrativo</h2>
        {erro && <p className="login-error">{erro}</p>}
        <input
          type="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}
