import { Download } from "lucide-react";

export function TechnicalTable() {
  const specs = [
    { label: "Altura", value: "32 cm" },
    { label: "Suporte de Peso", value: "Até 150kg por pessoa" },
    { label: "Espuma Base", value: "Rabatan Vulcanizado High-Tech" },
    { label: "Tecnologias", value: "Infravermelho Longo, Magnetoterapia" },
    { label: "Revestimento", value: "Tecido Jacquard Premium com tratamento antialérgico" },
    { label: "Garantia", value: "15 anos na estrutura" },
  ];

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container px-4 md:px-6 max-w-4xl">
        <h2 className="text-3xl font-bold mb-10 text-center">Ficha Técnica</h2>
        
        <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm mb-8">
          {specs.map((spec, i) => (
            <div key={i} className={`flex flex-col sm:flex-row border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}>
              <div className="p-4 sm:w-1/3 font-semibold text-foreground border-r border-border/50">
                {spec.label}
              </div>
              <div className="p-4 sm:w-2/3 text-muted-foreground">
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        {/* Downloads */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background hover:bg-muted transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2 text-remvita-teal" />
            Manual do Usuário (PDF)
          </button>
          <button className="flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background hover:bg-muted transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2 text-remvita-teal" />
            Certificado de Garantia (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}
