import { Suspense } from "react";
import { PostProps } from "../page";
import { PostInfo } from "./_components/post";


export default async function DetailsPost({
    params
}:{
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    return (
        <div>
            <h1 className="text-center mt-5 mb-2 font-bold text-3xl">Detalhes do Post: {id}</h1>

            <Suspense fallback={<div className="text-center mt-5 mb-2">Carregando...</div>}>
                <PostInfo id={id} />
            </Suspense>
        </div>
  )
}