'use client'

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AcessoNegadoPage() {
  const router = useRouter();
  const executado = useRef(false);

  useEffect(() => {
    if (executado.current) return; 
    executado.current = true;

    alert("Acesso negado! Você será redirecionado.");
    setTimeout(() => {
      router.push("/login");
    }, 100);
  }, []);

  return null;
}
