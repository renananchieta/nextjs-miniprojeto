import Link from "next/link";
import { redirect } from "next/navigation";

export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ResponseProps{
  posts: PostProps[];
}

export const revalidate = 30;

export default async function PostsPage() {

  const response = await fetch('https://dummyjson.com/posts', {
    cache: 'force-cache',
    next: {
      revalidate: 60
    }
  })
  const data: ResponseProps = await response.json()

  async function handleFetchPosts() {
    'use server'
    const response = await fetch('https://dummyjson.com/posts')
    const data: ResponseProps = await response.json()
    console.log(data);
  }

  async function handleSearchUsers(formData: FormData) {
    'use server'
    
    const userId = formData.get('userId')

    redirect(`/posts/user/${userId}`)
  }
  

  return (
    <div>
      <h1 className="text-center mt-5 mb-2 font-bold text-3xl">Página Posts</h1>


      <form 
      className="flex gap-2 my-4 m-2"
      action={handleSearchUsers}>
        <input 
        type="text"
        placeholder="ID do post"
        className="border border-gray-200 p-2" 
        name="userId"/>

        <button 
        className="bg-blue-500 text-white p-2"
        type="submit">
          Buscar Posts
        </button>
      </form>

      <div className="flex flex-col gap-4 mx-2">
        {data.posts.map((post) => (
          <div key={post.id} className="bg-gray-200 p-4 rounded-md">
            <h2 className="font-bold text-2xl mb-2">{post.id} - {post.title}</h2>
            <p>{post.body}</p>
            <Link href={`/posts/${post.id}`}
            className="text-blue-500">
              Detalhes - Usuário {post.userId}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}