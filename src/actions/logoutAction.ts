"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";

export async function logoutAction() {
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
    await fetch(api.url("/logout"), {
        method: "GET",
        cache: "no-store", 
    });
    }

    cookieStore.set("token", "", {
        path: "/",
        maxAge: -1,
    });

    redirect("/login");
}
