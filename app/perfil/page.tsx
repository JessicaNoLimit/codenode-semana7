import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import EditarNombreForm from "@/components/EditarNombreForm";

export default async function PerfilPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen text-white px-6 py-16 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Mi perfil</h1>

        <p className="text-gray-400 mb-2">Nombre:</p>
        <p className="text-xl mb-6">{session.user.name || "Sin nombre"}</p>
        <EditarNombreForm nombreActual={session.user.name || ""} />

        <p className="text-gray-400 mb-2">Email:</p>
        <p className="text-xl mb-8">{session.user.email}</p>

        <Link href="/proyectos" className="underline hover:opacity-70">
          ← Ir a proyectos
        </Link>
      </div>
    </main>
  );
}