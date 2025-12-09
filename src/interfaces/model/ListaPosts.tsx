'use client';

import { Post } from "./Post";

export interface ListaPostProps {
    posts: Post[];
    selecionarPost: (post: Post) => void;
    removerPost: (post: Post) => void;
}

export default function ListaPosts( props: ListaPostProps ) {
    function renderizarPost(post: Post) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-6 gap-3 px-6 py-4 rounded-md bg-zinc-200">
                <div className="flex-1 flex flex-col">
                    <span className="text-sm text-zinc-600">Título da Postagem</span>
                    <span className="font-semibold">{post.title}</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="text-sm text-zinc-600">Descrição</span>
                    <span className="font-semibold">{post.last_comments?.slice(0, 25) + (post.last_comments?.length > 25 ? "..." : "")}</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="text-sm text-zinc-600">Agradecimentos</span>
                    <span className="font-semibold">{post.thanks?.slice(0, 25) + (post.thanks?.length > 25 ? "..." : "")}</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="text-sm text-zinc-600">Status</span>
                    <span className="font-semibold">{post.status == true ? 'ATIVO' : 'INATIVO'}</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="text-sm text-zinc-600">Data de Criação</span>
                    <span className="font-semibold">{post.date?.split('-').reverse().join('/')}</span>
                </div>
                <div className="flex gap-2 flex-col sm:flex-row justify-end w-full">
                    <button 
                    className="botao azul"
                    onClick={() => props.selecionarPost(post)}>
                        Editar
                    </button>
                    <button 
                    className="botao vermelho"
                    onClick={() => props.removerPost(post)}>
                        Excluir
                    </button>    
                </div>
            </div>
        ) 
    }

    return (
        <ul className="flex flex-col gap-2">
            {props.posts.map((post: Post) => {
                return <li key={post?.id}>{renderizarPost(post)}</li>
            })}
        </ul>
    )
}