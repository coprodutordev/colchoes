export default function SiteLoading() {
  return (
    <div className="flex-1 flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-remvita-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Carregando...</p>
      </div>
    </div>
  );
}
