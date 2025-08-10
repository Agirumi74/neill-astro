// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import Database from 'better-sqlite3';
import path from 'path';

// Chemin vers la base de données SQLite
const DB_PATH = path.resolve(process.cwd(), 'data', 'site.db');

// Collection pour les services
const servicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    duration: z.string(),
    price: z.string(),
    icon: z.string(),
    image: z.string().nullable(),
    features: z.array(z.string()),
  }),
  loader: async () => {
    // Ouverture à chaque appel du loader (permet le rafraîchissement en SSR/hybrid)
    const db = new Database(DB_PATH, { readonly: true });
    
    try {
      const rows = db.prepare('SELECT * FROM services').all();
      
      return rows.map((row: any) => ({
        id: row.id,
        data: {
          title: row.title,
          description: row.description,
          duration: row.duration,
          price: row.price,
          icon: row.icon,
          image: row.image,
          features: JSON.parse(row.features),
        },
      }));
    } finally {
      db.close(); // Toujours fermer la connexion
    }
  }
});

// Collection pour les membres de l'équipe
const teamMembersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    speciality: z.string(),
    image: z.string(),
    experience: z.string(),
    description: z.string(),
    certifications: z.array(z.string()),
    achievements: z.array(z.string()),
    social: z.object({
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      email: z.string().email().optional(),
    }),
  }),
  loader: async () => {
    const db = new Database(DB_PATH, { readonly: true });
    
    try {
      const rows = db.prepare('SELECT * FROM team_members').all();
      
      return rows.map((row: any) => ({
        id: row.id.toString(),
        data: {
          name: row.name,
          role: row.role,
          speciality: row.speciality,
          image: row.image,
          experience: row.experience,
          description: row.description,
          certifications: JSON.parse(row.certifications),
          achievements: JSON.parse(row.achievements),
          social: {
            instagram: row.instagram,
            linkedin: row.linkedin,
            email: row.email,
          },
        },
      }));
    } finally {
      db.close();
    }
  }
});

// Collection pour les témoignages
const testimonialsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    image: z.string(),
    rating: z.number(),
    text: z.string(),
    service: z.string(),
  }),
  loader: async () => {
    const db = new Database(DB_PATH, { readonly: true });
    
    try {
      const rows = db.prepare('SELECT * FROM testimonials').all();
      
      return rows.map((row: any) => ({
        id: row.id.toString(),
        data: {
          name: row.name,
          role: row.role,
          image: row.image,
          rating: row.rating,
          text: row.text,
          service: row.service,
        },
      }));
    } finally {
      db.close();
    }
  }
});

// Collection pour les formations
const formationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    duration: z.string(),
    price: z.string(),
    level: z.string(),
    participants: z.string(),
    description: z.string(),
    program: z.array(z.string()),
    badge: z.string(),
  }),
  loader: async () => {
    const db = new Database(DB_PATH, { readonly: true });
    
    try {
      const rows = db.prepare('SELECT * FROM formations').all();
      
      return rows.map((row: any) => ({
        id: row.id.toString(),
        data: {
          title: row.title,
          subtitle: row.subtitle,
          duration: row.duration,
          price: row.price,
          level: row.level,
          participants: row.participants,
          description: row.description,
          program: JSON.parse(row.program),
          badge: row.badge,
        },
      }));
    } finally {
      db.close();
    }
  }
});

// Collection pour les étapes de processus
const processStepsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    service_type: z.string(),
    step_number: z.string(),
    icon: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    duration: z.string(),
    color: z.string(),
  }),
  loader: async () => {
    const db = new Database(DB_PATH, { readonly: true });
    
    try {
      const rows = db.prepare('SELECT * FROM process_steps ORDER BY id').all();
      
      return rows.map((row: any) => ({
        id: row.id.toString(),
        data: {
          service_type: row.service_type,
          step_number: row.step_number,
          icon: row.icon,
          title: row.title,
          subtitle: row.subtitle,
          description: row.description,
          duration: row.duration,
          color: row.color,
        },
      }));
    } finally {
      db.close();
    }
  }
});

// Collection pour les FAQ avec regroupement par catégorie
const faqCollection = defineCollection({
  type: 'data',
  schema: z.object({
    faqData: z.array(z.object({
      category: z.string(),
      questions: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })),
    })),
  }),
  loader: async () => {
    const db = new Database(DB_PATH, { readonly: true });
    
    try {
      const rows = db.prepare('SELECT * FROM faqs ORDER BY category_order, question_order').all();
      
      // Regrouper les FAQs par catégorie
      const groupedFaqs: { category: string; questions: { question: string; answer: string }[] }[] = [];
      let currentCategory: string | null = null;
      let currentCategoryIndex = -1;

      rows.forEach((row: any) => {
        if (row.category !== currentCategory) {
          currentCategory = row.category;
          groupedFaqs.push({
            category: row.category,
            questions: [],
          });
          currentCategoryIndex++;
        }
        groupedFaqs[currentCategoryIndex].questions.push({
          question: row.question,
          answer: row.answer,
        });
      });

      return [{
        id: 'main-faq',
        data: {
          faqData: groupedFaqs,
        },
      }];
    } finally {
      db.close();
    }
  }
});

export const collections = {
  services: servicesCollection,
  team_members: teamMembersCollection,
  testimonials: testimonialsCollection,
  formations: formationsCollection,
  process_steps: processStepsCollection,
  faqs: faqCollection,
};