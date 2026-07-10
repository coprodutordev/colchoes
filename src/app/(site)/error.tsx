"use client";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-2xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-foreground">Algo deu errado</h2>
        <p className="text-muted-foreground text-sm">
          {error.message || "Não foi possível carregar esta página. Tente novamente."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-full bg-remvita-blue text-white font-medium hover:bg-remvita-blue/90 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
