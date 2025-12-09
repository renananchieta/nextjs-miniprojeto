'use client';

import ListaUsuarios from "@/interfaces/model/ListaUsuarios";
import { Usuario } from "@/interfaces/model/Usuario";
import { useEffect, useState } from "react";
import FormUsuario from "./FormUsuario";
import { api } from "@/lib/api";

export default function ListarUsuarios() { 

    const [usuarioSelecionado, setUsuarioSelecionado] = useState<Partial<Usuario> | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    function selecionarUsuario(user: Partial<Usuario>) {
        setUsuarioSelecionado(user);
    }

    function cancelar() {
        setUsuarioSelecionado(null);
    }

    function removerUsuario2(user: Usuario) {

        fetch(`http://localhost:8888/api/admin/usuario/${user.id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao remover usuário');
            }

            const usuariosAtualizados = usuarios.filter(usuario => usuario.id !== user.id);
            setUsuarios(usuariosAtualizados);
            
            alert('Usuário removido com sucesso');
        })
        .catch((error) => {
            console.log(error);
            alert('Erro ao remover usuário');            
        })
    }

    function removerUsuario(user: Usuario) {
        fetch(api.url(`admin/usuario/${user.id}`), { 
            method: 'DELETE' 
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao remover Usuário');
            }

            const usuariosAtualizados = usuarios.filter(u => u.id !== user.id);
            setUsuarios(usuariosAtualizados);

            alert('Usuário removido com sucesso');
        })
        .catch((error) => {
            console.log(error);
            alert('Erro ao remover post');
        });
    }   

    useEffect(() => {
        fetch(api.url("/admin/usuarios"))
            .then(res => res.json())
            .then((data) => {
                setUsuarios(data)
            })
        .catch(console.error)
    }, []);

    return (

        <div className="flex flex-col gap-4 mx-2">

            {usuarioSelecionado ? (
                    <div className="flex flex-col gap-4 mx-2">
                        <FormUsuario usuario={usuarioSelecionado}
                        editarUsuario={setUsuarioSelecionado}
                        cancelar={cancelar} /> 
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 mx-2">
                        <h1 className="text-center mt-20 mb-2 font-bold text-3xl">Lista de Usuários</h1>

                        <button 
                        className="botao verde self-end mx-2"
                        onClick={() => selecionarUsuario({})}>
                            Novo Usuário
                        </button>

                        <ListaUsuarios usuarios={usuarios} 
                        selecionarUsuario={selecionarUsuario}
                        removerUsuario={removerUsuario}/>
                    </div>
            )}

        </div>
    );
}