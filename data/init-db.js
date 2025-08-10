// Script pour initialiser la base de données SQLite avec les données actuelles
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'site.db');
const db = new Database(dbPath);

// Créer les tables
db.exec(`
  -- Table pour les services
  CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    price TEXT,
    icon TEXT,
    image TEXT,
    features TEXT
  );

  -- Table pour les membres de l'équipe
  CREATE TABLE IF NOT EXISTS team_members (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    speciality TEXT,
    image TEXT,
    experience TEXT,
    description TEXT,
    certifications TEXT,
    achievements TEXT,
    instagram TEXT,
    linkedin TEXT,
    email TEXT
  );

  -- Table pour les témoignages
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    image TEXT,
    rating INTEGER,
    text TEXT,
    service TEXT
  );

  -- Table pour les FAQ
  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category_order INTEGER,
    question_order INTEGER
  );

  -- Table pour les formations
  CREATE TABLE IF NOT EXISTS formations (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    duration TEXT,
    price TEXT,
    level TEXT,
    participants TEXT,
    description TEXT,
    program TEXT,
    badge TEXT
  );

  -- Table pour les étapes de processus
  CREATE TABLE IF NOT EXISTS process_steps (
    id INTEGER PRIMARY KEY,
    service_type TEXT,
    step_number TEXT,
    icon TEXT,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    duration TEXT,
    color TEXT
  );
`);

// Insérer les données des services
const insertService = db.prepare(`
  INSERT OR REPLACE INTO services (id, title, description, duration, price, icon, image, features)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const services = [
  ['maquillage-professionnel', 'Maquillage Professionnel', 'Maquillage personnalisé pour tous vos événements spéciaux', '1h30 à 3h', 'À partir de 80€', 'Palette', '/src/assets/service-makeup.jpg', JSON.stringify(['Mariages', 'Événements', 'Shooting photo', 'Soirées'])],
  ['formations-beaute', 'Formations Beauté', 'Cours privés et ateliers pour maîtriser l\'art du maquillage', '3h à 20h', 'À partir de 120€', 'GraduationCap', '/src/assets/service-formation.jpg', JSON.stringify(['Cours individuels', 'Ateliers groupe', 'Techniques avancées', 'Certification'])],
  ['consultations-vip', 'Consultations VIP', 'Service premium avec analyse personnalisée complète', '2h à 3h', 'À partir de 200€', 'Crown', null, JSON.stringify(['Analyse morphologique', 'Sélection produits', 'Routine beauté', 'Suivi personnalisé'])],
  ['relooking-complet', 'Relooking Complet', 'Transformation complète pour révéler votre potentiel', '4h à 8h', 'À partir de 350€', 'Sparkles', null, JSON.stringify(['Conseil style', 'Maquillage', 'Coiffure', 'Shooting photo'])]
];

services.forEach(service => insertService.run(...service));

// Insérer les données de l'équipe
const insertTeamMember = db.prepare(`
  INSERT OR REPLACE INTO team_members (id, name, role, speciality, image, experience, description, certifications, achievements, instagram, linkedin, email)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const teamMembers = [
  [1, 'Marie Dubois', 'Fondatrice & Artiste Maquilleuse', 'Maquillage Mariée & Formations', '/src/assets/team-marie.jpg', '15 ans', 'Passionnée par l\'art du maquillage depuis plus de 15 ans, Marie a formé des centaines de professionnels et sublimé plus de 500 mariées.', JSON.stringify(['CAP Esthétique-Cosmétique', 'Formation Internationale MUA', 'Spécialisation Maquillage Artistique']), JSON.stringify(['Prix Excellence Beauté 2023', 'Formatrice certifiée', '500+ mariées sublimées']), '@marie.artisanbeauty', 'marie-dubois-mua', 'marie@artisanbeauty.fr'],
  [2, 'Camille Leroux', 'Assistante & Formatrice', 'Maquillage Naturel & Conseil', '/src/assets/team-assistant.jpg', '5 ans', 'Spécialiste du maquillage naturel et du conseil beauté, Camille accompagne nos clientes dans leur quête de l\'élégance au quotidien.', JSON.stringify(['Formation Avancée MUA', 'Spécialisation Conseil Beauté', 'Certification Produits Bio']), JSON.stringify(['Experte maquillage naturel', '200+ consultations beauté', 'Spécialiste produits bio']), '@camille.beautycoach', 'camille-leroux-beauty', 'camille@artisanbeauty.fr']
];

teamMembers.forEach(member => insertTeamMember.run(...member));

// Insérer les témoignages
const insertTestimonial = db.prepare(`
  INSERT OR REPLACE INTO testimonials (id, name, role, image, rating, text, service)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const testimonials = [
  [1, 'Sophie Laurent', 'Mariée', '/lovable-uploads/451e8faf-a8ac-48e3-ad49-12d88d956273.png', 5, 'Marie a su créer le look parfait pour mon mariage. Son professionnalisme et sa douceur m\'ont mise en confiance immédiatement. Le résultat était au-delà de mes attentes !', 'Maquillage Mariée'],
  [2, 'Camille Dubois', 'Directrice Marketing', '/lovable-uploads/451e8faf-a8ac-48e3-ad49-12d88d956273.png', 5, 'Les formations de Marie sont exceptionnelles. J\'ai appris des techniques que j\'utilise au quotidien. Son approche pédagogique est remarquable.', 'Formation Beauté'],
  [3, 'Élise Martin', 'Photographe', '/lovable-uploads/451e8faf-a8ac-48e3-ad49-12d88d956273.png', 5, 'Je travaille régulièrement avec Marie pour mes shootings. Sa créativité et sa maîtrise technique sont impressionnantes. Mes clientes adorent !', 'Maquillage Artistique'],
  [4, 'Anne-Claire Petit', 'Entrepreneuse', '/lovable-uploads/451e8faf-a8ac-48e3-ad49-12d88d956273.png', 5, 'La consultation VIP a transformé ma routine beauté. Marie a su comprendre mes besoins et m\'a donné des conseils précieux pour révéler ma beauté naturelle.', 'Consultation VIP']
];

testimonials.forEach(testimonial => insertTestimonial.run(...testimonial));

// Insérer les FAQ
const insertFaq = db.prepare(`
  INSERT OR REPLACE INTO faqs (category, question, answer, category_order, question_order)
  VALUES (?, ?, ?, ?, ?)
`);

const faqs = [
  ['Services', 'Combien de temps à l\'avance dois-je réserver ?', 'Pour les mariages, je recommande de réserver 3-6 mois à l\'avance. Pour les autres prestations, 2-4 semaines suffisent généralement. Cependant, n\'hésitez pas à me contacter même à la dernière minute, je ferai de mon mieux pour vous accommoder.', 1, 1],
  ['Services', 'Proposez-vous des essais maquillage ?', 'Absolument ! Je propose systématiquement un essai maquillage pour les mariées, inclus dans la prestation. Pour les autres événements importants, l\'essai peut être ajouté moyennant supplément.', 1, 2],
  ['Services', 'Quels produits utilisez-vous ?', 'J\'utilise exclusivement des produits haut de gamme : MAC, Urban Decay, Charlotte Tilbury, Dior, et des marques professionnelles hypoallergéniques. Tous mes produits sont testés et approuvés pour leur tenue longue durée.', 1, 3],
  ['Formations', 'Faut-il avoir des prérequis pour les formations ?', 'Mes formations s\'adaptent à tous les niveaux. Pour l\'initiation, aucun prérequis n\'est nécessaire. Pour les formations avancées, une base en maquillage est recommandée mais pas obligatoire.', 2, 1],
  ['Formations', 'Les formations sont-elles certifiantes ?', 'Oui, toutes mes formations donnent lieu à une certification Artisan Beauty. La formation professionnelle de 30h délivre une certification reconnue dans le milieu professionnel.', 2, 2],
  ['Formations', 'Le matériel est-il fourni pendant les formations ?', 'Tout le matériel professionnel est fourni pendant les formations. Pour l\'initiation, vous repartez avec un kit de démarrage. Pour les formations avancées, vous bénéficiez d\'un kit professionnel complet.', 2, 3],
  ['Tarifs & Réservation', 'Comment se déroule la réservation ?', 'Contactez-moi via le formulaire, par téléphone ou email. Nous discutons de vos besoins, je vous propose un devis personnalisé, puis nous fixons un rendez-vous. Un acompte de 30% confirme la réservation.', 3, 1],
  ['Tarifs & Réservation', 'Quels sont les moyens de paiement acceptés ?', 'J\'accepte les paiements par espèces, chèque, virement bancaire et carte bancaire. Le solde est réglé le jour de la prestation.', 3, 2],
  ['Tarifs & Réservation', 'Que comprennent vos prestations ?', 'Mes prestations incluent la consultation, la préparation de peau, le maquillage complet, les retouches si nécessaire, et des conseils personnalisés. Pour les mariées, je reste disponible pour les retouches le jour J.', 3, 3],
  ['Pratique', 'Vous déplacez-vous à domicile ?', 'Oui, je me déplace à domicile dans un rayon de 50km autour de Paris. Des frais de déplacement peuvent s\'appliquer selon la distance. Pour les mariages, le déplacement est souvent inclus.', 4, 1],
  ['Pratique', 'Que se passe-t-il en cas d\'allergie ?', 'Je réalise systématiquement un test de tolérance lors du premier contact. J\'utilise des produits hypoallergéniques et peux adapter ma sélection selon vos sensibilités.', 4, 2],
  ['Pratique', 'Proposez-vous des forfaits groupe ?', 'Oui, je propose des forfaits avantageux pour les groupes (EVJF, événements d\'entreprise, etc.). Plus le groupe est important, plus le tarif unitaire est dégressif.', 4, 3]
];

faqs.forEach(faq => insertFaq.run(...faq));

// Insérer les formations
const insertFormation = db.prepare(`
  INSERT OR REPLACE INTO formations (id, title, subtitle, duration, price, level, participants, description, program, badge)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const formations = [
  [1, 'Initiation au Maquillage', 'Les Fondamentaux', '3 heures', '120€', 'Débutant', '1-3 personnes', 'Découvrez les bases du maquillage et apprenez à sublimer votre beauté naturelle au quotidien.', JSON.stringify(['Préparation de la peau', 'Techniques de base du teint', 'Mise en valeur du regard', 'Harmonisation des couleurs', 'Kit de démarrage offert']), 'Populaire'],
  [2, 'Perfectionnement', 'Techniques Avancées', '6 heures', '250€', 'Intermédiaire', '1-2 personnes', 'Perfectionnez vos techniques et découvrez les secrets des professionnels pour des looks sophistiqués.', JSON.stringify(['Contouring et highlighting', 'Maquillage des yeux avancé', 'Techniques de lèvres', 'Looks jour/soir', 'Certification incluse']), 'Nouveau'],
  [3, 'Formation Professionnelle', 'Devenir MUA', '30 heures', '1200€', 'Professionnel', '1-5 personnes', 'Formation complète pour devenir maquilleur(se) professionnel(le) avec certification reconnue.', JSON.stringify(['Anatomie et morphologie', 'Techniques professionnelles', 'Maquillage artistique', 'Gestion clientèle', 'Stage pratique inclus']), 'Certifiante'],
  [4, 'Atelier Mariée', 'Le Jour J', '4 heures', '180€', 'Tous niveaux', '1-4 personnes', 'Spécialisez-vous dans le maquillage mariée et créez des looks inoubliables pour le plus beau jour.', JSON.stringify(['Tendances maquillage mariée', 'Techniques longue tenue', 'Essais et retouches', 'Conseils personnalisés', 'Photos souvenirs']), 'Spécialisé']
];

formations.forEach(formation => insertFormation.run(...formation));

// Insérer les étapes de processus
const insertProcessStep = db.prepare(`
  INSERT OR REPLACE INTO process_steps (id, service_type, step_number, icon, title, subtitle, description, duration, color)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const processSteps = [
  [1, 'general', '01', 'Search', 'Consultation', 'Découverte & Analyse', 'Nous échangeons sur vos attentes, j\'analyse votre morphologie et votre style pour créer un look parfaitement adapté à votre personnalité.', '30 min', 'from-amber-400 to-yellow-500'],
  [2, 'general', '02', 'Palette', 'Préparation', 'Sélection & Préparation', 'Je sélectionne les produits et teintes parfaites pour votre carnation. Préparation minutieuse de votre peau pour un rendu optimal.', '15 min', 'from-orange-400 to-amber-500'],
  [3, 'general', '03', 'Brush', 'Réalisation', 'Création Artistique', 'Application experte du maquillage avec des techniques professionnelles. Chaque geste est pensé pour sublimer votre beauté naturelle.', '45-90 min', 'from-yellow-500 to-orange-400'],
  [4, 'general', '04', 'Sparkles', 'Finalisation', 'Retouches & Conseils', 'Dernières retouches pour un résultat parfait. Je vous donne mes conseils pour maintenir votre look et réaliser des retouches si besoin.', '15 min', 'from-orange-400 to-amber-500']
];

processSteps.forEach(step => insertProcessStep.run(...step));

console.log('Base de données initialisée avec succès !');
db.close();