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
        className="mt-3 text-red-400 hover:text-red-200 text-sm"
      >
        Eliminar
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-8 text-white max-w-sm w-full text-center">
            
            <h2 className="text-xl font-bold mb-4">
              ¿Eliminar proyecto?
            </h2>

            <p className="text-gray-300 mb-6">
              Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
              >
                Cancelar
              </button>

              <button
                onClick={eliminarProyecto}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}