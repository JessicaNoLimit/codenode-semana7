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
    <main className="min-h-screen px-6 py-12 text-white md:py-16">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
          <div className="space-y-8">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-300/75">
                Perfil
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Mi perfil
              </h1>
              <p className="max-w-xl text-sm leading-7 text-gray-400">
                Gestiona la información básica de tu espacio privado sin salir de la app.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.4fr_0.9fr]">
              <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5 md:p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-gray-500">
                  Nombre actual
                </p>
                <p className="mt-3 text-2xl font-medium text-white md:text-3xl">
                  {session.user.name || "Sin nombre"}
                </p>

                <div className="mt-6">
                  <EditarNombreForm nombreActual={session.user.name || ""} />
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.035] p-5 md:p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-gray-500">
                  Email
                </p>
                <p className="mt-3 break-all text-base leading-7 text-gray-200">
                  {session.user.email}
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <Link
                href="/proyectos"
                className="inline-flex rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-gray-200 transition hover:border-white/25 hover:bg-white hover:text-black"
              >
                Ir a proyectos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
