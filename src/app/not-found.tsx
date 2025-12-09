import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-center font-bold text-6xl">
            <p>404 Page Not Found</p>
        </h1>

        <Link href="/">
            Voltar para Home
        </Link>
    </div>
  )
}