import { useState } from "react";
import { format, addDays, isSameDay, isAfter, isBefore } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Calendar, Clock, User, CreditCard, CheckCircle, Star } from "lucide-react";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { Calendar as CalendarComponent } from "@components/ui/calendar";
import { Badge } from "@components/ui/badge";
import { Separator } from "@components/ui/separator";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { cn } from "@lib/utils";

const ReservationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    message: ""
  });

  const services = [
    {
      id: "maquillage-mariee",
      title: "Maquillage Mariée",
      price: 150,
      duration: "2h",
      description: "Maquillage longue tenue pour votre jour J",
      features: ["Essai inclus", "Retouches", "Photos", "Produits haut de gamme"]
    },
    {
      id: "maquillage-soiree",
      title: "Maquillage Soirée",
      price: 80,
      duration: "1h30",
      description: "Look glamour pour vos événements",
      features: ["Conseils personnalisés", "Produits longue tenue", "Retouches"]
    },
    {
      id: "formation-particuliere",
      title: "Formation Particulière",
      price: 200,
      duration: "3h",
      description: "Cours privé personnalisé",
      features: ["Support de cours", "Kit de démarrage", "Suivi personnalisé"]
    },
    {
      id: "consultation-vip",
      title: "Consultation VIP",
      price: 250,
      duration: "2h30",
      description: "Analyse complète et conseils experts",
      features: ["Analyse morphologique", "Sélection produits", "Routine personnalisée"]
    }
  ];

  // Simulation des disponibilités (en réalité, cela viendrait d'une API)
  const unavailableDates = [
    new Date(2024, 11, 25), // Noël
    new Date(2024, 11, 26),
    new Date(2025, 0, 1),   // Jour de l'an
    addDays(new Date(), 2), // Dans 2 jours (exemple)
    addDays(new Date(), 5), // Dans 5 jours (exemple)
  ];

  const availableTimeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const bookedSlots = {
    [format(addDays(new Date(), 1), "yyyy-MM-dd")]: ["09:00", "14:00"],
    [format(addDays(new Date(), 3), "yyyy-MM-dd")]: ["10:00", "15:00", "16:00"],
  };

  const getAvailableSlots = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const booked = bookedSlots[dateKey] || [];
    return availableTimeSlots.filter(slot => !booked.includes(slot));
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      isSameDay(date, unavailableDate)
    ) || isBefore(date, new Date()) || isAfter(date, addDays(new Date(), 60));
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep(3);
    }
  };

  const handleCustomerInfoSubmit = () => {
    setCurrentStep(4);
  };

  const handleFinalConfirmation = () => {
    // Ici, vous intégreriez avec votre système de paiement/réservation
    console.log("Réservation confirmée:", {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo
    });
    setCurrentStep(5);
  };

  const resetReservation = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime("");
    setCustomerInfo({
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      message: ""
    });
  };

  const steps = [
    { number: 1, title: "Service", completed: currentStep > 1 },
    { number: 2, title: "Date & Heure", completed: currentStep > 2 },
    { number: 3, title: "Informations", completed: currentStep > 3 },
    { number: 4, title: "Confirmation", completed: currentStep > 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-elegant text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Réservation
            <span className="block bg-gradient-luxury bg-clip-text text-transparent">
              en Ligne
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Réservez votre séance beauté en quelques clics
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold
                  ${step.completed || currentStep === step.number
                    ? "bg-primary text-white border-primary"
                    : "bg-background text-muted-foreground border-border"
                  }
                `}>
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`ml-3 font-medium ${
                  step.completed || currentStep === step.number
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-6 ${
                    step.completed ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <Card className="bg-gradient-card border-border/50 luxury-shadow">
              <CardHeader className="text-center">
                <CardTitle className="font-elegant text-2xl">
                  Choisissez votre service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover-glow
                        ${selectedService?.id === service.id ? "ring-2 ring-primary" : ""}
                      `}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-elegant text-xl font-semibold">
                              {service.title}
                            </h3>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {service.duration}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground text-sm">
                            {service.description}
                          </p>
                          
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-primary mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="pt-4 border-t border-border/50">
                            <div className="flex justify-between items-center">
                              <span className="font-elegant text-2xl font-bold text-primary">
                                {service.price}€
                              </span>
                              <Button
                                className="bg-gradient-luxury text-white hover-glow"
                                onClick={() => handleServiceSelect(service)}
                              >
                                Sélectionner
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && selectedService && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <Card className="bg-gradient-card border-border/50 luxury-shadow">
                <CardHeader>
                  <CardTitle className="font-elegant text-xl flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Choisissez une date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateUnavailable}
                    locale={fr}
                    className={cn("w-full pointer-events-auto")}
                  />
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                      <span>Disponible</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-muted rounded-full mr-2"></div>
                      <span>Indisponible</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time Slots */}
              <Card className="bg-gradient-card border-border/50 luxury-shadow">
                <CardHeader>
                  <CardTitle className="font-elegant text-xl flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Créneaux disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {getAvailableSlots(selectedDate).map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                            className={selectedTime === slot 
                              ? "bg-gradient-luxury text-white" 
                              : "border-primary text-primary hover:bg-primary hover:text-white"
                            }
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                      
                      {selectedDate && selectedTime && (
                        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary mb-2">Résumé de votre réservation</h4>
                          <p className="text-sm">
                            <strong>{selectedService.title}</strong><br />
                            {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })} à {selectedTime}<br />
                            Durée: {selectedService.duration} • Prix: {selectedService.price}€
                          </p>
                          
                          <Button
                            onClick={handleDateTimeConfirm}
                            className="w-full mt-4 bg-gradient-luxury text-white hover-glow"
                          >
                            Continuer
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Sélectionnez d'abord une date
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Customer Information */}
          {currentStep === 3 && (
            <Card className="bg-gradient-card border-border/50 luxury-shadow">
              <CardHeader>
                <CardTitle className="font-elegant text-2xl flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Vos informations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleCustomerInfoSubmit();
                }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={customerInfo.prenom}
                        onChange={(e) => setCustomerInfo({...customerInfo, prenom: e.target.value})}
                        required
                        className="border-border/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={customerInfo.nom}
                        onChange={(e) => setCustomerInfo({...customerInfo, nom: e.target.value})}
                        required
                        className="border-border/50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        required
                        className="border-border/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={customerInfo.telephone}
                        onChange={(e) => setCustomerInfo({...customerInfo, telephone: e.target.value})}
                        required
                        className="border-border/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message (optionnel)</Label>
                    <Textarea
                      id="message"
                      value={customerInfo.message}
                      onChange={(e) => setCustomerInfo({...customerInfo, message: e.target.value})}
                      placeholder="Précisez vos souhaits, couleurs préférées, occasion spéciale..."
                      className="border-border/50"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-luxury text-white hover-glow"
                    >
                      Continuer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <Card className="bg-gradient-card border-border/50 luxury-shadow">
              <CardHeader>
                <CardTitle className="font-elegant text-2xl flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Confirmation de réservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Résumé de la réservation */}
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="font-elegant text-xl font-semibold mb-4">Résumé de votre réservation</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-medium">{selectedService?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">
                          {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heure:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Durée:</span>
                        <span className="font-medium">{selectedService?.duration}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span className="text-primary">{selectedService?.price}€</span>
                      </div>
                    </div>
                  </div>

                  {/* Informations client */}
                  <div className="bg-muted/20 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">Vos informations</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nom:</strong> {customerInfo.prenom} {customerInfo.nom}</p>
                      <p><strong>Email:</strong> {customerInfo.email}</p>
                      <p><strong>Téléphone:</strong> {customerInfo.telephone}</p>
                      {customerInfo.message && (
                        <p><strong>Message:</strong> {customerInfo.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p>• Annulation possible jusqu'à 24h avant le rendez-vous</p>
                    <p>• Un acompte de 30% peut être demandé pour certains services</p>
                    <p>• Vous recevrez une confirmation par email</p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={handleFinalConfirmation}
                      className="flex-1 bg-gradient-luxury text-white hover-glow"
                    >
                      Confirmer la réservation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Success */}
          {currentStep === 5 && (
            <Card className="bg-gradient-card border-border/50 luxury-shadow text-center">
              <CardContent className="p-12">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="font-elegant text-3xl font-bold text-foreground">
                      Réservation confirmée !
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Merci {customerInfo.prenom}, votre rendez-vous a été réservé avec succès.
                    </p>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg max-w-md mx-auto">
                    <h3 className="font-semibold mb-4">Votre rendez-vous</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>{selectedService?.title}</strong></p>
                      <p>{selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })} à {selectedTime}</p>
                      <p className="text-primary font-medium">{selectedService?.price}€</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Vous allez recevoir un email de confirmation à {customerInfo.email}
                    </p>
                    
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={resetReservation}
                        variant="outline"
                      >
                        Nouvelle réservation
                      </Button>
                      <Button
                        onClick={() => window.location.href = "/"}
                        className="bg-gradient-luxury text-white hover-glow"
                      >
                        Retour à l'accueil
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReservationPage;