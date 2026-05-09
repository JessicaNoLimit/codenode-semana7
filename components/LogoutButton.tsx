"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="border border-red-500/40 text-red-400 px-5 py-2 rounded-full text-sm hover:bg-red-500 hover:text-white transition"
    >
      Cerrar sesión
    </button>
  );
}