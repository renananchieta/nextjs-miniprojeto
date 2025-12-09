'use client';

import { Login } from "@/interfaces/model/Login";
import Link from "next/link";
import { useState } from "react";

export interface FormLoginProps {
    usuario: Partial<Login>;
    editarUsuario: (usuario: Partial<Login>) => void;
    login: (usuario: Partial<Login>) => void;
    error?: string;
}

export default function FormLogin(props: FormLoginProps) {

    const { usuario, editarUsuario, login, error } = props;
    const [erro, setErro] = useState("");

    function validarForm(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (!usuario.login || !usuario.senha) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        setErro("");
        login(usuario);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100 px-4">
            <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-zinc-800">NextJS</h1>
                    <p className="text-zinc-500 mt-1 text-lg">Acesso ao Sistema</p>
                </div>

                {erro && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm">
                        {erro}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700">Login</label>
                        <input
                            type="text"
                            value={usuario.login ?? ""}
                            onChange={(e) => editarUsuario({ ...usuario, login: e.target.value })}
                            className="w-full border border-zinc-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700">Senha</label>
                        <input
                            type="password"
                            value={usuario.senha ?? ""}
                            onChange={(e) => editarUsuario({ ...usuario, senha: e.target.value })}
                            className="w-full border border-zinc-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={validarForm}
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition"
                    >
                        Entrar
                    </button>

                    <Link href="/usuarios/create">
                        <button
                            type="button"
                            className="w-full bg-zinc-300 text-zinc-800 py-2 rounded-md font-semibold hover:bg-zinc-200 transition"
                        >
                            Criar Conta
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
