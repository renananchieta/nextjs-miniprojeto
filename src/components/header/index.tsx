"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [estaLogado, setEstaLogado] = useState(false);

    useEffect(() => {
        const temToken = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="));
        
        setEstaLogado(!!temToken);
    }, []);

    function logout() {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";

        setEstaLogado(false);

        window.location.href = "/login";
    }

    return (
        <header className="bg-zinc-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-4 py-4">
                
                <div className="text-lg font-bold">NextJS</div>

                <nav>
                    <ul className="flex items-center gap-4">
                        {estaLogado && (
                            <>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/feed">Feed</Link></li>
                                <li><Link href="/blog">Minhas Postagens</Link></li>
                            </>
                        )}

                        {estaLogado && (
                            <li>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                                >
                                    Sair
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

            </div>
        </header>
    );
}
