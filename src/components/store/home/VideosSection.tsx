export function VideosSection() {
  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Assista à Tecnologia em Ação</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Conheça de perto como a magnetoterapia e o infravermelho longo trabalham juntos para transformar seu sono.
        </p>
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
