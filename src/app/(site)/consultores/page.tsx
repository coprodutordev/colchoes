import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { TrendingUp, DollarSign, Users, Award } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Seja um Consultor REMVITA",
  description: "Transforme vidas e gere renda extra revendendo os colchões terapêuticos REMVITA. Seja um consultor de sucesso.",
};

const benefits = [
  {
    icon: <DollarSign className="w-6 h-6 text-remvita-teal" />,
    title: "Comissões Atrativas",
    desc: "Ganhe até 20% de comissão sobre cada venda realizada. Quanto mais você vende, maior sua rentabilidade.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-remvita-teal" />,
    title: "Mercado em Crescimento",
    desc: "O mercado de colchões terapêuticos cresce 15% ao ano no Brasil. Sua oportunidade de entrar em um setor promissor.",
  },
  {
    icon: <Users className="w-6 h-6 text-remvita-teal" />,
    title: "Suporte Exclusivo",
    desc: "Treinamento completo, material de apoio e acompanhamento de perto pela equipe REMVITA. Você não estará sozinho.",
  },
  {
    icon: <Award className="w-6 h-6 text-remvita-teal" />,
    title: "Produto Premium",
    desc: "Represente uma marca inovadora com tecnologia patenteada de magnetoterapia e infravermelho longo, reconhecida por clientes.",
  },
];

const steps = [
  { num: "01", title: "Cadastre-se", desc: "Preencha seus dadosno formulário abaixo. O processo é rápido e sem burocracia." },
  { num: "02", title: "Treinamento", desc: "Participe do nosso treinamento online e aprenda tudo sobre os produtos e técnicas de venda." },
  { num: "03", title: "Comece a Vender", desc: "Com acesso ao catálogo digital e materiais de apoio, inicie suas vendas imediatamente." },
];

export default function ConsultoresPage() {
  const whatsappUrl = getWhatsAppUrl("Olá! Quero saber mais sobre como ser um consultor REMVITA");

  return (
    <>
      <PageHero
        title="Seja um Consultor REMVITA"
        subtitle="Transforme sua renda ajudando pessoas a dormirem melhor. Junte-se à maior rede de consultores de colchões terapêuticos do Brasil."
      />
      <Breadcrumbs items={[{ label: "Seja um Consultor" }]} />

      <section className="py-24 container px-4 md:px-6 flex-1">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Por que ser um <span className="text-remvita-blue">Consultor REMVITA</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Milhares de brasileiros já transformaram suas vidas vendendo o sono de qualidade. 
            Você pode ser o próximo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
          {benefits.map((item, i) => (
            <div key={i} className="bg-card border border-border/40 rounded-3xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-remvita-teal/10 rounded-2xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Como <span className="text-remvita-teal">Funciona</span>
          </h2>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-remvita-blue/10 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-remvita-blue">{step.num}</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-bold mb-1 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-gradient-to-br from-remvita-blue to-remvita-teal rounded-3xl p-12 text-white text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Quer saber mais?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Entre em contato pelo WhatsApp e descubra como começar hoje mesmo.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-remvita-blue font-bold px-8 py-4 rounded-full text-lg hover:bg-white/90 transition-all"
          >
            Fale Conosco no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
