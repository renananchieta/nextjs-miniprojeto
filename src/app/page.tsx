import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Next JS",
  description: "Construindo uma aplicação com Next JS.",
  openGraph: {
    title: "Passos Iniciais",
    description: "Construindo uma aplicação com Next JS.",
    images: ['https://teamraft.com/wp-content/uploads/nextjs.jpg']
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
};

export const revalidate = 60; 

export default function Home() {

  return (
    <div>
      <h2 className="min-h-screen flex items-center justify-center bg-zinc-100 text-center mt-5 mb-2 font-bold text-3xl">
        Projeto em Next Js 
        <br/><br /> 
        Por Renan Anchieta
      </h2>
    </div>
  )
}