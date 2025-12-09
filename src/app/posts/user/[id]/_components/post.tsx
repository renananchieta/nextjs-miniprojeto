import Link from "next/link"
import { ResponseProps } from "../../../page"

export async function UserPosts({userId}: {userId: string}) {

    await new Promise(resolve => setTimeout(resolve, 3000))

    const response = await fetch(`https://dummyjson.com/posts/user/${userId}`)
    const data: ResponseProps = await response.json()

    return (
      <div className="flex flex-col gap-4 mx-2">
        {data.posts?.map((post: any) => (
          <div key={post.id} className="bg-gray-200 p-4 rounded-md">
            <h2 className="font-bold text-2xl mb-2">{post.title}</h2>
            <p>{post.body}</p>
            <Link href={`/posts/${post.id}`}
            className="text-blue-500">
              Detalhes
            </Link>
          </div>
        ))}
      </div>
    )
}