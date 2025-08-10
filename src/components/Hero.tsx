import { Button } from "./ui/button";
import { Star } from "lucide-react";
import heroImage from "@assets/hero-beauty.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center section-padding bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-wide uppercase text-xs sm:text-sm">
                L'artisane de votre beauté
              </p>
              <h1 className="font-elegant hero-responsive font-bold text-foreground leading-tight drop-shadow-sm">
                Une Approche
                <span className="block bg-gradient-luxury bg-clip-text text-transparent drop-shadow-lg">
                  Unique
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg drop-shadow-sm">
                Passionnée par l'art du maquillage et la transmission, je vous accompagne avec 
                bienveillance pour révéler votre beauté naturelle et développer votre confiance.
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-muted-foreground text-sm sm:text-base">4.9/5 • 120+ clientes satisfaites</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className="bg-gradient-luxury text-primary-foreground hover-glow shadow-luxury text-sm sm:text-base font-semibold"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Découvrir mes services
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary/30 text-primary hover:bg-gradient-luxury hover:text-primary-foreground hover:border-primary shadow-md text-sm sm:text-base font-semibold"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Voir la galerie
              </Button>
            </div>

            {/* Decorative Line */}
            <div className="flex items-center space-x-4 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="h-px bg-gradient-luxury w-16"></div>
              <Star className="w-4 h-4 text-primary" />
              <div className="h-px bg-gradient-luxury w-16"></div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 border border-border/20">
              <img
                src={heroImage.src}
                alt="Artisan Beauty - Maquillage professionnel"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-card backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-luxury border border-border/30 animate-float">
              <div className="text-center">
                <p className="font-elegant text-xl sm:text-2xl font-bold bg-gradient-luxury bg-clip-text text-transparent">15+</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Années d'expérience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;