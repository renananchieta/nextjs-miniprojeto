import { PostProps } from "../../page"


export async function PostInfo({id}: {id: string}) {

    await new Promise(resolve => setTimeout(resolve, 3000))

    const response = await fetch(`https://dummyjson.com/posts/${id}`)
    const data: PostProps = await response.json()

    return (
        <div className="flex flex-col gap-4 mx-2">
          <div key={data.id} className="bg-gray-200 p-4 rounded-md">
            <h2 className="font-bold text-2xl mb-2">{data.id} - {data.title}</h2>
            <p>{data.body}</p>
          </div>
      </div>
    )
}