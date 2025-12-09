'use client';

import FormUsuarioCreate from "@/components/usuarios/FormUsuarioCreate";
import { Usuario } from "@/interfaces/model/Usuario";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastrarUsuario() {

    const router = useRouter();
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<Partial<Usuario> | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function salvarUsuario(usuario: Partial<Usuario>) {
        cadastrarUsuario(usuario);
        setUsuarioSelecionado(null);
    }

    function cadastrarUsuario(usuario: Partial<Usuario>) {
        fetch(api.url(`/admin/usuario`), {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        })
            .then(async response => {
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message);
                }
                return response.json();
            })
            .then(() => {
                setSuccessMessage("Usuario cadastrado com sucesso");
            })
            .catch(err => setErrorMessage(err.message))
            .finally(() => {
                setTimeout(() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                }, 2500);
            });
    }

    return (
        <div className="flex flex-col gap-4 mx-2">
            <h1 className="text-center mt-5 mb-2 font-bold text-3xl">Cadastrar Usuário</h1>
            
            <div className="flex flex-col gap-4 mx-2">
                <div className="flex-1 flex flex-col">
                    {errorMessage && <p className="text-red-600 text-left bg-red-100 rounded-md font-semibold p-2">{errorMessage}</p>}
                    {successMessage && <p className="text-green-600 text-left bg-green-100 rounded-md p-2">{successMessage}</p>}
                </div>

                <FormUsuarioCreate usuario={usuarioSelecionado ?? {}}
                salvar={salvarUsuario}
                editarUsuario={setUsuarioSelecionado}/> 
            </div>
        </div>

    );
}