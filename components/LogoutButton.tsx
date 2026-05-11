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
      className="rounded-full border border-red-500/30 bg-red-500/8 px-5 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500 hover:text-white"
    >
      Cerrar sesión
    </button>
  );
}
