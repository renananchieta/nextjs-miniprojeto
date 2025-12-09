'use client';

import { Usuario } from "./Usuario";

export interface ListaUsuariosProps {
    usuarios: Usuario[];
    selecionarUsuario: (usuario: Usuario) => void;
    removerUsuario: (usuario: Usuario) => void;
}

export default function ListaUsuarios( props: ListaUsuariosProps ) {
    function renderizarUsuario(usuario: Usuario) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-3 px-6 py-4 rounded-md bg-zinc-200">
                <div className="flex-1 flex flex-col">
                    <span className="font-semibold">{usuario.nome}</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="font-semibold">{usuario.email}</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="font-semibold">{usuario.ativo == 1 ? 'ATIVO' : 'INATIVO'}</span>
                    {/* <span className="text-sm text-zinc-600">Status</span> */}
                </div>
                <div className="flex gap-2 flex-col sm:flex-row justify-end w-full">
                    <button 
                    className="botao azul"
                    onClick={() => props.selecionarUsuario(usuario)}>
                        Editar
                    </button>
                    <button 
                    className="botao vermelho"
                    onClick={() => props.removerUsuario(usuario)}>
                        Excluir
                    </button>    
                </div>
            </div>
        ) 
    }

    return (
        <ul className="flex flex-col gap-2">
            {props.usuarios.map((usuario: Usuario) => {
                return <li key={usuario.id}>{renderizarUsuario(usuario)}</li>
            })}
        </ul>
    )
}