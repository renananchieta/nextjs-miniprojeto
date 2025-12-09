"use client";

import { useState } from "react";
import FormLogin from "@/components/usuarios/FormLogin";
import { Login } from "@/interfaces/model/Login";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [usuario, setUsuario] = useState<Partial<Login>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function fetchLogin(data: Partial<Login>) {

    if (!data.login || !data.senha) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(api.url(`/my-app/login`), {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Erro ao fazer login.");
      }

      document.cookie = `token=${json.token}; path=/; SameSite=Lax;`;

      window.location.href = "/blog";

    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }

  return (
    <div>
      <FormLogin
        usuario={usuario}
        editarUsuario={setUsuario}
        login={fetchLogin}
        error={errorMessage}
      />
    </div>
  );
}
