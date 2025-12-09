"use client";

import { useState } from "react";
import { loginAction } from "./_components/loginAction";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchLogin(formData: FormData) {
    const result = await loginAction(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <form
        action={fetchLogin}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-sm space-y-4"
      >
        <div className="text-xl font-bold text-center">NextJS</div>
        <h1 className="text-xl font-bold text-center">Login</h1>

        {errorMessage && (
          <p className="text-red-600 text-center">{errorMessage}</p>
        )}

        <input
          type="text"
          name="login"
          placeholder="Login"
          className="w-full border px-3 py-2 rounded input"
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          className="w-full border px-3 py-2 rounded input"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
        >
          Entrar
        </button>

        <a href="/usuarios/create">
          <button type="button" className="botao cinza w-full">
            Cadastrar
          </button>
        </a>
      </form>
    </div>
  );
}
