'use client';

import { Post } from "@/interfaces/model/Post";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";


export default function FeedPostagens() {

    const [posts, setPosts] = useState<Partial<Post[]>>([]);

    useEffect(() => {
        getPosts();
    }, []);

    function getToken() {
        return document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
    }

    function getPosts() {
        const token = getToken();

        fetch(api.url("/posts"), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
        .then(res => res.json())
        .then((data) => setPosts(data))
        .catch(console.error);
    }


        return (
            <div className="mt-10">
                <div className="min-h-screen bg-zinc-100 flex justify-center items-start py-10">
                    <div className="w-full max-w-3xl flex flex-col gap-6">
                        {posts.map(post => (
                        <div key={post?.id} className="bg-white text-md rounded-lg shadow-md p-6 flex flex-col gap-4 relative">
                            <h2 className="font-bold uppercase text-xl">{post?.title}</h2>

                            {post?.last_comments && (
                                <p className="text-zinc-800">{post?.last_comments}</p>
                            )}

                            {post?.image_main && (
                                <img
                                    src={`http://localhost:8888/api/post/${post.id}/image_main`}
                                    alt="Imagem da postagem"
                                    className="w-full max-h-130 object-cover rounded-md border"
                                />
                            )}

                            {post?.thanks && (
                                <p className="text-zinc-500">{post?.thanks}</p>
                            )}

                            <div className="flex justify-end items-center text-zinc-600 mt-4 space-x-4">
                                {post?.usuario?.nome && <span><strong>Autor:</strong> {post?.usuario.nome}</span>}
                                {post?.date && <strong>{post.date?.split('-').reverse().join('/')}</strong>}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        )
}