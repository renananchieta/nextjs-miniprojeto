'use client';

import { Usuario } from "@/interfaces/model/Usuario";
import Link from "next/link";
import { useState } from "react";

export interface FormUsuarioProps {
    usuario: Partial<Usuario>;
    editarUsuario: (usuario: Partial<Usuario>) => void;
    salvar: (usuario: Partial<Usuario>) => void;
}

export default function FormUsuarioCreate(props: FormUsuarioProps) {

    const { usuario, editarUsuario, salvar } = props;
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");

    function validarForm(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault(); 

        if (!usuario.nome || !usuario.email || !usuario.dtNascimento || !usuario.login || !usuario.senha) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        if (usuario.senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setErro("");
        salvar(usuario);
    }


    return (
        <div className="flex flex-col gap-4 mx-2">
            <h1 className="text-center mt-5 mb-2 font-bold text-3xl">Cadastro de Usuário</h1>

            <hr />

            {erro && (
                <div className="bg-red-200 text-red-800 border border-red-400 p-2 rounded">
                    {erro}
                </div>
            )}

            <form action="" className="flex flex-col gap-4 mx-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label>Nome</label>
                        <input 
                        type="text" 
                        value={usuario.nome ?? ""} 
                        onChange={(e) => 
                            editarUsuario({ ...usuario, nome: e.target.value })
                        }
                        className="input border" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>E-mail</label>
                        <input 
                        type="text" 
                        value={usuario.email ?? ""} 
                        onChange={(e) => 
                            editarUsuario({ ...usuario, email: e.target.value })
                        }
                        className="input border" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label>Nascimento</label>
                        <input 
                        type="date" 
                        value={usuario.dtNascimento ?? ""} 
                        onChange={(e) => 
                            editarUsuario({ ...usuario, dtNascimento: e.target.value })
                        }
                        className="input border" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Login</label>
                        <input 
                        type="text" 
                        value={usuario.login ?? ""} 
                        onChange={(e) => 
                            editarUsuario({ ...usuario, login: e.target.value })
                        }
                        className="input border" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label>Senha</label>
                        <input 
                        type="password" 
                        value={usuario.senha ?? ""} 
                        onChange={(e) => 
                            editarUsuario({ ...usuario, senha: e.target.value })
                        }
                        className="input border" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Confirmar Senha *</label>
                        <input 
                            type="password" 
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            className="input border"
                        />
                    </div>
                </div>
                <div className="flex gap-2 flex-col sm:flex-row justify-end w-full">
                    <button className="botao azul" onClick={validarForm}>{usuario.id ? 'Alterar' : 'Salvar'}</button>
                    <Link href="/login">
                        <button className="botao cinza" type="button">Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}