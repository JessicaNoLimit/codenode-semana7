"use client";

export default function ScrollToTopButton() {
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
    >
      Subir arriba
    </button>
  );
}
