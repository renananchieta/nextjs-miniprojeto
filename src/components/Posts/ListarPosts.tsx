'use client';

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Post } from "@/interfaces/model/Post";
import ListaPosts from "@/interfaces/model/ListaPosts";
import FormPost from "../usuarios/FormPost";

export default function ListarUsuarios() { 

    const [postSelecionado, setPostSelecionado] = useState<Partial<Post> | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        getMeusPosts();
    }, []);

    function getMeusPosts() {
        const token = getToken();
        
        fetch(api.url("/posts/meus-posts"), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
            .then(res => res.json())
            .then((data) => {
                setPosts(data);
            })
        .catch(console.error)
    }

    function getToken() {
        const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

        if (!token) {
            console.error("Nenhum token encontrado no cookie!");
            return;
        }

        return token;
    }

    function selecionarPost(post: Partial<Post>) {
        setPostSelecionado(post);
    }

    function cancelar() {
        setPostSelecionado(null);
        setSuccessMessage('');
        setErrorMessage('');
    }

    function salvarPost(post: Partial<Post>) {
        const postExistente = posts.find(p => p.id === post?.id)

        if(postExistente) {
            atualizarPost(post);
        } else {
            cadastrarPost(post);
        }
        setPostSelecionado(null);
    }

    function removerPost(post: Post) {
        fetch(api.url(`/post/${post.id}`), { 
            method: 'DELETE' 
        })
        .then(async (response) => {
            const data = await response.json(); 

            if (!response.ok) {
                setErrorMessage(data.error || 'Erro ao remover post');
                throw new Error(data.error || 'Erro ao remover post');
            }

            setPosts(posts.filter(p => p.id !== post.id));
            setSuccessMessage(data.message || 'Post deletado com sucesso');
        })
        .catch((error) => {
            console.log(error);
            setErrorMessage(error.message);
        })
        .finally(() => {
            setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 3000); 
        });
    }

    function cadastrarPost(post: Partial<Post>) {
        const token = getToken();

        const formData = new FormData();

        formData.append("title", post.title ?? "");
        formData.append("thanks", post.thanks ?? "");
        formData.append("last_comments", post.last_comments ?? "");
        formData.append("status", post.status ? "1" : "0");

        if (post.image_main instanceof File) {
            formData.append("image_main", post.image_main);
        }

        fetch(api.url(`/post/store`), {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: formData
        })
            .then(async response => {
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message);
                }
                return response.json();
            })
            .then(() => {
                setSuccessMessage("Post cadastrado com sucesso");
                getMeusPosts();
            })
            .catch(err => setErrorMessage(err.message))
            .finally(() => {
                setTimeout(() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                }, 2500);
            });
    }

    function atualizarPost(post: Partial<Post>) {
        const token = getToken();

        const formData = new FormData();

        formData.append("title", post.title ?? "");
        formData.append("thanks", post.thanks ?? "");
        formData.append("last_comments", post.last_comments ?? "");
        formData.append("status", post.status ? "1" : "0");

        if (post.image_main instanceof File) {
            formData.append("image_main", post.image_main);
        }

        fetch(api.url(`/post/${post.id}`), {
            method: "POST",      
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: formData
        })
            .then(async response => {
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message);
                }
                return response.json();
            })
            .then((postAtualizado) => {
                setPosts(posts.map(p => p.id === postAtualizado.id ? postAtualizado : p));
                setSuccessMessage("Post atualizado com sucesso");
                getMeusPosts();
            })
            .catch(err => setErrorMessage(err.message))
            .finally(() => {
                setTimeout(() => {
                    setSuccessMessage("");
                    setErrorMessage("");
                }, 2500);
            });
    }

    return (

        <div className="flex flex-col gap-4 mx-2">

            {postSelecionado ? (
                    <div className="flex flex-col gap-4 mx-2">
                        <FormPost post={postSelecionado}
                        salvar={salvarPost}
                        editarPost={setPostSelecionado}
                        cancelar={cancelar} /> 
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 mx-2">
                        <h1 className="text-center mt-20 mb-2 font-bold text-3xl">Minhas Postagens</h1>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
                            <div className="flex-1 flex flex-col">
                                {errorMessage && <p className="text-red-600 text-left bg-red-100 rounded-md font-semibold p-2">{errorMessage}</p>}
                                {successMessage && <p className="text-green-600 text-left bg-green-100 rounded-md p-2">{successMessage}</p>}
                            </div>
                            <div className="flex gap-2 flex-col sm:flex-row justify-end w-full">
                                <button 
                                className="botao verde"
                                onClick={() => selecionarPost({})}>
                                    Novo Post
                                </button>
                            </div>
                        </div>

                        <ListaPosts posts={posts} 
                        selecionarPost={selecionarPost}
                        removerPost={removerPost}/>
                    </div>
            )}

        </div>
    );
}