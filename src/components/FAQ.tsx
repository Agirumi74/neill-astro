import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

// Interface pour les props
interface FAQData {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

interface FAQProps {
  faqData: FAQData[];
}

const FAQ = ({ faqData }: FAQProps) => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            FAQ
          </p>
          <h2 className="font-elegant text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Questions
            <span className="block bg-gradient-luxury bg-clip-text text-transparent">
              Fréquentes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes. 
            Pour toute autre question, n'hésitez pas à me contacter directement.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="font-elegant text-2xl font-semibold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  {categoryIndex + 1}
                </div>
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <Card 
                      key={questionIndex} 
                      className="bg-gradient-card border-border/50 overflow-hidden animate-fade-in"
                      style={{ animationDelay: `${questionIndex * 0.1}s` }}
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-6 text-left hover:bg-primary/5 transition-colors duration-300 flex items-center justify-between group"
                        >
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {faq.question}
                          </h4>
                          <div className="ml-4 flex-shrink-0">
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-primary transition-transform duration-300" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            )}
                          </div>
                        </button>
                        
                        <div className={`
                          overflow-hidden transition-all duration-500 ease-in-out
                          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                          <div className="px-6 pb-6 pt-0">
                            <div className="h-px bg-border/30 mb-4"></div>
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <Card className="inline-block bg-gradient-card border-border/50 luxury-shadow">
            <CardContent className="p-8">
              <h3 className="font-elegant text-xl font-semibold text-foreground mb-4">
                Vous ne trouvez pas votre réponse ?
              </h3>
              <p className="text-muted-foreground mb-6">
                N'hésitez pas à me contacter directement, je serai ravie de répondre 
                à toutes vos questions personnalisées.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-luxury text-primary-foreground rounded-lg hover-glow transition-all font-medium"
                >
                  Me contacter
                </a>
                <a 
                  href="tel:+33123456789" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-medium"
                >
                  +33 1 23 45 67 89
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQ;