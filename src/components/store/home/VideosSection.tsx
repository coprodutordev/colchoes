export function VideosSection() {
  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Assista à Tecnologia em Ação</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Conheça de perto como a magnetoterapia e o infravermelho longo trabalham juntos para transformar seu sono.
        </p>
        <div className="max-w-4xl mx-auto aspect-video bg-card border border-border/40 rounded-3xl overflow-hidden shadow-sm">
          <div className="w-full h-full bg-gradient-to-br from-remvita-dark to-remvita-blue/20 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <p className="text-white/80 font-medium">Vídeo em breve</p>
            <p className="text-white/50 text-sm mt-1">Conteúdo multimídia sendo produzido</p>
          </div>
        </div>
      </div>
    </section>
  );
}
