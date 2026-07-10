import { Star } from "lucide-react";

export function ProductReviews() {
  const reviews = [
    { name: "Carlos Andrade", title: "Adeus dores nas costas!", text: "Depois de 3 anos sofrendo com dores lombares, a troca pelo REMVITA Premium mudou minha vida logo na primeira semana.", rating: 5, date: "15 Mai 2026" },
    { name: "Mariana Souza", title: "Melhor investimento", text: "O valor parece alto no início, mas a qualidade do sono que tenho hoje não tem preço. Recomendo muito.", rating: 5, date: "02 Abr 2026" },
    { name: "Roberto Lima", title: "Excelente suporte", text: "Tenho 120kg e sempre afundei em colchões normais. A densidade progressiva desse colchão realmente funciona.", rating: 4, date: "20 Mar 2026" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Avaliações de Clientes</h2>
            <div className="flex items-center text-yellow-400">
              <span className="text-4xl font-bold text-foreground mr-4">4.9</span>
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <span className="ml-4 text-muted-foreground">(Baseado em 128 avaliações)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(rev.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <h4 className="font-bold text-lg mb-2">{rev.title}</h4>
              <p className="text-muted-foreground text-sm mb-6 flex-grow">&ldquo;{rev.text}&rdquo;</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border">
                <span className="font-medium text-foreground">{rev.name}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
