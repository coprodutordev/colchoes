import { getApprovedTestimonials } from "@/lib/queries";
import { Star } from "lucide-react";

export async function SocialProof() {
  const testimonials = await getApprovedTestimonials();

  return (
    <section className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          O que dizem os <span className="text-remvita-blue">nossos clientes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-muted p-8 rounded-3xl relative">
              {testimonial.rating && (
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-remvita-teal text-remvita-teal" />
                  ))}
                </div>
              )}
              <p className="text-muted-foreground italic mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-remvita-teal/10 rounded-full flex items-center justify-center text-remvita-teal font-bold text-sm mr-3">
                  {testimonial.client_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{testimonial.client_name}</h4>
                  {testimonial.role && (
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
