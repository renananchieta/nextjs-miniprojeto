"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";

export async function loginAction(formData: FormData) {
  const login = formData.get("login") as string;
  const senha = formData.get("senha") as string;

  const response = await fetch(api.url("/my-app/login"), {
    method: "POST",
    headers: { 
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, senha }),
  });

  const data = await response.json();
  
  
  if (!response.ok) {
    console.log('renato, ');
    return { error: data };
  }

  const cookieStore = await cookies();
  cookieStore.set("token", data.token, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  return redirect("/blog");
}
