"use client";

import { useState } from "react";

export default function BotonEliminarProyecto({ id }: { id: number }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  async function eliminarProyecto() {
    await fetch("/api/proyectos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    location.reload();
  }

  return (
    <>
      <button
        onClick={() => setMostrarModal(true)}
        className="rounded-full border border-red-400/25 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-400 hover:text-white"
      >
        Eliminar
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[1.75rem] border border-white/15 bg-[#0b1220]/90 p-8 text-center text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <h2 className="text-2xl font-semibold tracking-tight">
              ¿Eliminar proyecto?
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-300">
              Esta acción eliminará el proyecto de tu espacio y no se puede deshacer.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => setMostrarModal(false)}
                className="rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Cancelar
              </button>

              <button
                onClick={eliminarProyecto}
                className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Eliminar proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
