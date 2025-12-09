import Header from "@/components/header";
import "./globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Next JS",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header></Header>

        <main className="flex-1">
          {children}
        </main>
        
      </body>
    </html>
  );
}
