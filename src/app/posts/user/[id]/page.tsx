import { Suspense } from "react";
import {  UserPosts } from "./_components/post";


export default async function DetailsPost({
    params
}:{
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    return (
        <div>
            <h1 className="text-center mt-5 mb-2 font-bold text-3xl">Detalhes do Usuário: {id}</h1>

            <Suspense fallback={<div className="text-center mt-5 mb-2">Carregando...</div>}>
                <UserPosts userId={id} />
            </Suspense>
        </div>
  )
}