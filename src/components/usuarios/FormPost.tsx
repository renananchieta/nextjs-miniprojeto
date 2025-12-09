'use client';

import { Post } from "@/interfaces/model/Post";

export interface FormPostProps {
    post: Partial<Post>;
    cancelar: () => void;
    editarPost: (post: Partial<Post>) => void;
    salvar: (post: Partial<Post>) => void;
}

export default function FormPost(props: FormPostProps) {

    const { post, editarPost, cancelar, salvar } = props;

    return (
        <div className="flex flex-col gap-4 mx-2">
            <h1 className="text-center mt-20 mb-2 font-bold text-3xl">{ post.id ? 'Edição' : 'Cadastro'} de Postagem</h1>

            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label>Título da Postagem</label>
                    <input 
                    type="text" 
                    required 
                    value={post.title ?? ""}
                    onChange={(e) => 
                        editarPost({ ...post, title: e.target.value })
                    }
                    className="input" />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Descrição da postagem</label>
                    <input 
                    type="text"
                    required 
                    value={post.last_comments ?? ""} 
                    onChange={(e) => 
                        editarPost({ ...post, last_comments: e.target.value })
                    }
                    className="input" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label>Agradecimentos</label>
                    <input 
                    type="text" 
                    required
                    value={post.thanks ?? ""} 
                    onChange={(e) => 
                        editarPost({ ...post, thanks: e.target.value })
                    }
                    className="input" />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Foto Principal</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                editarPost({ ...post, image_main: file });
                            }
                        }}
                        className="input"
                    />

                    {post?.image_main instanceof File ? (
                        <img
                            src={URL.createObjectURL(post.image_main)}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded mt-2 border"
                        />
                    ) : (
                        post?.image_main && (
                            <img
                                src={`http://localhost:8888/api/post/${post.id}/image_main`}
                                alt="Imagem da postagem"
                                className="w-32 h-32 object-cover rounded mt-2 border"
                            />
                        )
                    )}
                </div>
                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <label>Publicar Postagem</label>
                    <input
                        type="checkbox"
                        checked={post.status ?? false}
                        onChange={(e) =>
                            editarPost({ ...post, status: e.target.checked })
                        }
                        className="w-5 h-5 accent-blue-600"
                    />
                </div>
            </div>
           
            <div className="flex gap-2 flex-col sm:flex-row justify-end w-full">
                <button className="botao azul" onClick={() => salvar(post)}>{post.id ? 'Alterar' : 'Salvar'}</button>
                <button className="botao cinza" onClick={cancelar}>Cancelar</button>
            </div>
        </div>
    );
}