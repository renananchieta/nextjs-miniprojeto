import Link from "next/link";
import { cookies } from "next/headers";
import { logoutAction } from "@/actions/logoutAction";

export async function Header() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const estaLogado = !!token;

    return (
        <header className="bg-zinc-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 py-4">
                
                <div className="text-lg font-bold">NextJS</div>

                <nav>
                    <ul className="flex items-center gap-4">
                        {estaLogado && (
                            <>
                                <li><Link href="/">Home</Link></li>
                                {/* <li><Link href="/usuarios">Usuários</Link></li> */}
                                <li><Link href="/feed">Feed</Link></li>
                                <li><Link href="/blog">Minhas Postagens</Link></li>
                            </>
                        )}

                        {estaLogado && (
                            <li>
                                <form action={logoutAction}>
                                    <button 
                                        type="submit" 
                                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                                    >
                                        Sair
                                    </button>
                                </form>
                            </li>
                        )}
                    </ul>
                </nav>

            </div>
        </header>
    );
}
