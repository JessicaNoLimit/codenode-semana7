export default function LoadingProyectos() {
  return (
    <main className="min-h-screen flex items-center justify-center text-white px-6">
      <div className="text-center bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-10 shadow-xl">
        <div className="mx-auto mb-6 h-14 w-14 rounded-full border-4 border-white/20 border-t-white animate-spin" />

        <h1 className="text-3xl font-bold mb-3">
          Cargando proyectos
        </h1>

        <p className="text-gray-400">
          Conectando con la base de datos...
        </p>
      </div>
    </main>
  );
}