export function VideosSection() {
  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto aspect-video bg-card border border-border/40 rounded-3xl overflow-hidden shadow-sm">
          <iframe
            src="https://www.youtube.com/embed/V_Km3Zbhxno"
            title="Tecnologia REMVITA em ação"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
