import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sophie Laurent",
      role: "Mariée",
      image: "/lovable-uploads/451e8faf-a8ac-48e3-ad49-12d88d956273.png",
      rating: 5,
      text: "Marie a su créer le look parfait pour mon mariage. Son professionnalisme et sa douceur m'ont mise en confiance immédiatement. Le résultat était au-delà de mes attentes !",
      service: "Maquillage Mariée"
    },
    {
      id: 2,
      name: "Camille Dubois",
      role: "Directrice Marketing",
      image: "/lovable-uploads/451e8faf-a8ac-48e3-ad49-12d88d956273.png",
      rating: 5,
      text: "Les formations de Marie sont exceptionnelles. J'ai appris des techniques que j'utilise au quotidien. Son approche pédagogique est remarquable.",
      service: "Formation Beauté"
    },
    {
      id: 3,
      name: "Élise Martin",
      role: "Photographe",
      image: "/lovable-uploads/451e8faf-a8ac-48e3-ad49-12d88d956273.png",
      rating: 5,
      text: "Je travaille régulièrement avec Marie pour mes shootings. Sa créativité et sa maîtrise technique sont impressionnantes. Mes clientes adorent !",
      service: "Maquillage Artistique"
    },
    {
      id: 4,
      name: "Anne-Claire Petit",
      role: "Entrepreneuse",
      image: "/lovable-uploads/451e8faf-a8ac-48e3-ad49-12d88d956273.png",
      rating: 5,
      text: "La consultation VIP a transformé ma routine beauté. Marie a su comprendre mes besoins et m'a donné des conseils précieux pour révéler ma beauté naturelle.",
      service: "Consultation VIP"
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            Témoignages
          </p>
          <h2 className="font-elegant text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ce Que Disent
            <span className="block bg-gradient-luxury bg-clip-text text-transparent">
              Mes Clientes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leurs mots touchent mon cœur et nourrissent ma passion. 
            Chaque sourire, chaque confiance retrouvée est ma plus belle récompense.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="bg-gradient-card border-border/50 hover-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="flex justify-center">
                  <div className="p-3 bg-gradient-luxury rounded-full text-white">
                    <Quote className="w-6 h-6" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-center text-sm text-muted-foreground leading-relaxed italic">
                  "{testimonial.text}"
                </blockquote>

                {/* Service Badge */}
                <div className="flex justify-center">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {testimonial.service}
                  </span>
                </div>

                {/* Client Info */}
                <div className="text-center pt-4 border-t border-border/30">
                  <div className="w-12 h-12 bg-gradient-luxury rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-elegant font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <Card className="inline-block bg-gradient-card border-border/50 luxury-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="font-elegant text-3xl font-bold text-foreground">4.9/5</div>
                  <div className="flex justify-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <div className="h-12 w-px bg-border/50"></div>
                <div className="text-center">
                  <div className="font-elegant text-3xl font-bold text-foreground">120+</div>
                  <div className="text-sm text-muted-foreground">Clientes satisfaites</div>
                </div>
                <div className="h-12 w-px bg-border/50"></div>
                <div className="text-center">
                  <div className="font-elegant text-3xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Recommandent</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;