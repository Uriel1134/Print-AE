"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Shirt, 
  Car, 
  Tv, 
  CreditCard, 
  Layers, 
  Box, 
  Scissors, 
  Printer, 
  Sparkles, 
  Image, 
  Coffee 
} from "lucide-react";

// Types definition
export interface Service {
  id: string;
  name: string;
  category: string;
  price: string;
  deliveryTime: string;
  description: string;
  details?: string[];
  unit?: string;
  minQty?: number;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  video?: string;
  client?: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
}

export interface QuoteRequest {
  id: string;
  lastName: string;
  firstName: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  serviceType: string;
  description: string;
  quantity: number;
  budget?: string;
  desiredDate: string;
  file?: { name: string; size: number; type: string; dataUrl?: string } | null;
  status: "En attente" | "Contacté" | "Terminé";
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  history: string;
  mission: string;
  vision: string;
  values: { title: string; desc: string }[];
}

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  services: Service[];
  updateService: (id: string, updated: Partial<Service>) => void;
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: string) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, "id" | "date" | "author" | "readTime">) => void;
  updateBlogPost: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  quotes: QuoteRequest[];
  addQuoteRequest: (quote: Omit<QuoteRequest, "id" | "status" | "createdAt">) => void;
  updateQuoteStatus: (id: string, status: QuoteRequest["status"]) => void;
  deleteQuoteRequest: (id: string) => void;
  settings: SiteSettings;
  updateSettings: (updated: Partial<SiteSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Static Data
const initialServices: Service[] = [
  {
    id: "dtf",
    name: "Impression DTF (Textile)",
    category: "textile",
    price: "À partir de 2 000 FCFA / unité",
    deliveryTime: "24H - 48H",
    description: "Impression haute définition sur textile (coton, polyester, etc.) avec transfert thermique direct-to-film.",
    details: ["Haute résistance aux lavages", "Couleurs éclatantes", "Pour T-shirts, pulls, sacs, etc."],
    minQty: 1,
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.14.jpeg"
  },
  {
    id: "textile-blanc",
    name: "T-shirt Blanc Personnalisé",
    category: "textile",
    price: "2 500 FCFA / unité",
    deliveryTime: "24H maximum",
    description: "T-shirt blanc de haute qualité avec marquage couleur inclus.",
    details: ["Commande minimale de 50 unités", "Marquage poitrine ou dos", "Rapport qualité-prix excellent"],
    minQty: 50,
    unit: "T-shirt",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.33.jpeg"
  },
  {
    id: "textile-couleur",
    name: "T-shirt Couleur Personnalisé",
    category: "textile",
    price: "3 500 FCFA / unité",
    deliveryTime: "24H maximum",
    description: "T-shirt coloré avec marquage haute qualité inclus.",
    details: ["Commande minimale de 50 unités", "Large choix de couleurs", "Coton robuste"],
    minQty: 50,
    unit: "T-shirt",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.33.jpeg"
  },
  {
    id: "tshirt-coton",
    name: "T-shirt Coton Premium",
    category: "textile",
    price: "4 000 FCFA / unité",
    deliveryTime: "24H maximum",
    description: "T-shirt 100% coton de qualité supérieure, idéal pour le merchandising.",
    details: ["Commande minimale de 50 unités", "Toucher doux", "Durabilité maximale"],
    minQty: 50,
    unit: "T-shirt",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.33.jpeg"
  },
  {
    id: "casquette-blanche",
    name: "Casquette Blanche Personnalisée",
    category: "textile",
    price: "2 000 FCFA / unité",
    deliveryTime: "24H maximum",
    description: "Casquette blanche avec personnalisation pour vos événements.",
    details: ["Commande minimale de 50 unités", "Idéal événements & promotions", "Impression résistante"],
    minQty: 50,
    unit: "Casquette",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.28.jpeg"
  },
  {
    id: "foulard",
    name: "Foulard Personnalisé",
    category: "textile",
    price: "2 500 FCFA / unité",
    deliveryTime: "24H maximum",
    description: "Foulard promotionnel personnalisé avec votre logo.",
    details: ["Commande minimale de 50 unités", "Marquage précis", "Léger et agréable"],
    minQty: 50,
    unit: "Foulard",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.28.jpeg"
  },
  {
    id: "branding-auto",
    name: "Branding Véhicule (Auto)",
    category: "habillage",
    price: "60 000 FCFA / véhicule",
    deliveryTime: "24H maximum",
    description: "Marquage publicitaire partiel ou total pour vos voitures de fonction.",
    details: ["Vinyle adhésif haute résistance", "Protection anti-UV", "Visibilité locale maximale"],
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.26.jpeg"
  },
  {
    id: "packaging",
    name: "Packaging Personnalisé",
    category: "objets",
    price: "Sur devis (à la demande)",
    deliveryTime: "24H maximum",
    description: "Conception de boîtes, sacs en papier et emballages avec votre identité de marque.",
    details: ["Design sur mesure", "Différents grammages de carton", "Finitions premium"],
    image: "https://images.unsplash.com/photo-1512445253540-02ffbc70076d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "broderie",
    name: "Broderie & Sérigraphie",
    category: "textile",
    price: "À partir de 2 000 FCFA",
    deliveryTime: "48H à 72H",
    description: "Personnalisation haut de gamme par broderie ou marquage en sérigraphie en volume.",
    details: ["Rendu très professionnel", "Durabilité à toute épreuve", "Idéal pour vêtements professionnels"],
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.28.jpeg"
  },
  {
    id: "cachet",
    name: "Gravure de Cachets & Tampons",
    category: "conception",
    price: "15 000 FCFA / unité",
    deliveryTime: "24H maximum",
    description: "Fabrication de tampons encreurs professionnels durables et précis.",
    details: ["Mécanisme robuste", "Encre , noire , bleue ou rouge", "Personnalisation du texte et logo"],
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.36.jpeg"
  },
  {
    id: "kakemono-petite",
    name: "Impression Kakémono (Petite Base)",
    category: "kakemonos",
    price: "55 000 FCFA",
    deliveryTime: "48H à 72H",
    description: "Support de communication vertical (roll-up) avec structure incluse.",
    details: ["Bâche PVC résistante", "Sac de transport fourni", "Idéal foires & salons"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "kakemono-grande",
    name: "Impression Kakémono (Grande Base)",
    category: "kakemonos",
    price: "65 000 FCFA",
    deliveryTime: "48H à 72H",
    description: "Kakémono grand format pour une présence visuelle maximale.",
    details: ["Structure premium renforcée", "Excellente stabilité", "Impression éclatante"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "vip-syntissole",
    name: "Impression VIP Syntissole",
    category: "baches",
    price: "75 000 FCFA",
    deliveryTime: "48H à 72H",
    description: "Impression haut de gamme sur tissu synthétique indéchirable (Syntissole).",
    details: ["Rendu mat élégant", "Sans reflets", "Idéal pour photoshoots & événements"],
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "enseigne-double",
    name: "Enseigne Lumineuse Double Face",
    category: "enseignes",
    price: "400 000 FCFA / m²",
    deliveryTime: "48H à 72H",
    description: "Enseigne lumineuse double face à LED pour installation perpendiculaire à votre façade.",
    details: ["Caisson aluminium étanche", "Éclairage LED éco-énergétique", "Visibilité maximale jour & nuit"],
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.35.jpeg"
  },
  {
    id: "enseigne-simple",
    name: "Enseigne Lumineuse Simple Face",
    category: "enseignes",
    price: "350 000 FCFA / m²",
    deliveryTime: "48H à 72H",
    description: "Enseigne lumineuse simple face pour fixer directement sur le mur principal.",
    details: ["Design épuré", "Glow homogène", "Installation professionnelle"],
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.35.jpeg"
  },
  {
    id: "agrandissement-photo",
    name: "Traitement & Agrandissement Photo",
    category: "conception",
    price: "Sur devis (via WhatsApp)",
    deliveryTime: "24H maximum",
    description: "Retouche d'images, restauration et impression en très grand format sur papier photo.",
    details: ["Papier photo brillant ou mat", "Correction des couleurs", "Impression de vos souvenirs"],
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "tasse-sublimation",
    name: "Mug / Tasse Personnalisé",
    category: "objets",
    price: "De 2 500 à 5 000 FCFA / unité",
    deliveryTime: "24H maximum",
    description: "Mugs personnalisés par sublimation. Tarifs dégressifs selon quantité.",
    details: ["De 50 à 99 commandes: 5000F y compris tasse", "À partir de 100 commandes: 3000F / unité", "Tarif dégressif max: 2500F / unité"],
    minQty: 50,
    unit: "Tasse",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "carte-visite",
    name: "Carte de Visite Laser Xerox",
    category: "cartes",
    price: "15 000 FCFA / 100 cartes",
    deliveryTime: "24H maximum",
    description: "Impression numérique haute fidélité de cartes de visite sur papier 350g, maquette incluse.",
    details: ["Grammage rigide 350g", "Maquette graphique incluse", "Conditionnement en boîte"],
    minQty: 100,
    unit: "Cartes",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.36.jpeg"
  },
  {
    id: "banderole-vinyl",
    name: "Impression Numérique Banderole & Vinyle",
    category: "baches",
    price: "À partir de 15 000 FCFA / m²",
    deliveryTime: "24H maximum",
    description: "Impression grand format sur bâche PVC (banderole) ou vinyle adhésif brillant/mat.",
    details: ["Résistant aux intempéries", "Qualité photo extérieure", "Idéal événements et signalétique"],
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=600&auto=format&fit=crop"
  }
];

const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Impression DTF en Atelier",
    category: "textile",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.14.jpeg",
    client: "Atelier AEF",
    description: "Production en série de marquage DTF haute définition."
  },
  {
    id: "gal-2",
    title: "Branding Véhicule Utilitaire",
    category: "habillage",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.26.jpeg",
    client: "Express Transit",
    description: "Pose de vinyle adhésif haute durabilité sur véhicule de livraison."
  },
  {
    id: "gal-3",
    title: "Broderie Polo Corporate",
    category: "textile",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.28.jpeg",
    client: "Gabon Telecom",
    description: "Broderie en relief haute précision du logo sur polos premium."
  },
  {
    id: "gal-4",
    title: "Impression T-shirts Événementiels",
    category: "textile",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.33.jpeg",
    client: "Festival de Libreville",
    description: "Production de T-shirts événementiels en grande série."
  },
  {
    id: "gal-5",
    title: "Finition Enseigne Lumineuse",
    category: "enseignes",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.35.jpeg",
    client: "Boutique Prestige",
    description: "Contrôle d'éclairage LED sur enseigne double face."
  },
  {
    id: "gal-6",
    title: "Gravure Tampons d'Entreprise",
    category: "conception",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.36.jpeg",
    client: "Office des Mines",
    description: "Gravure laser de tampons encreurs officiels pour professionnels."
  },
  {
    id: "gal-7",
    title: "Habillage Flotte Commerciale",
    category: "habillage",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.40.jpeg",
    client: "Gabon Gaz",
    description: "Marquage publicitaire sur véhicule léger."
  },
  {
    id: "gal-8",
    title: "Processus d'Impression DTF (Vidéo)",
    category: "textile",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.14.jpeg",
    video: "/gallery/WhatsApp Video 2026-07-21 at 14.15.15.mp4",
    client: "Lancement Presse",
    description: "Lancement de l'impression DTF couleur en atelier."
  },
  {
    id: "gal-9",
    title: "Marquage Presse Thermique (Vidéo)",
    category: "textile",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.33.jpeg",
    video: "/gallery/WhatsApp Video 2026-07-21 at 14.15.16.mp4",
    client: "Atelier AEF",
    description: "Application thermique directe sur textile."
  },
  {
    id: "gal-10",
    title: "Découpe Vinyle Signalétique (Vidéo)",
    category: "enseignes",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.35.jpeg",
    video: "/gallery/WhatsApp Video 2026-07-21 at 14.15.18.mp4",
    client: "Atelier AEF",
    description: "Découpe numérique automatisée de vinyle extérieur."
  },
  {
    id: "gal-11",
    title: "Pose Adhésif Carrosserie (Vidéo)",
    category: "habillage",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.26.jpeg",
    video: "/gallery/WhatsApp Video 2026-07-21 at 14.15.22.mp4",
    client: "Atelier AEF",
    description: "Technique d'application thermoformable sur carrosserie."
  },
  {
    id: "gal-12",
    title: "Contrôle Qualité Enseigne (Vidéo)",
    category: "enseignes",
    image: "/gallery/WhatsApp Image 2026-07-21 at 14.15.35.jpeg",
    video: "/gallery/WhatsApp Video 2026-07-21 at 14.15.37.mp4",
    client: "Atelier AEF",
    description: "Vérification de l'alimentation LED avant expédition."
  }
];

const initialBlog: BlogPost[] = [
  {
    id: "blog-1",
    title: "5 Conseils indispensables pour réussir vos cartes de visite",
    excerpt: "Votre carte de visite est le reflet de votre professionnalisme. Découvrez comment faire bonne impression en 5 étapes clés.",
    content: "La carte de visite reste un outil de réseautage incontournable, même à l'ère du numérique. Pour qu'elle soit efficace, elle doit être soignée. 1. Restez simple : limitez les informations à l'essentiel (Nom, Prénom, Poste, Téléphone, Email, Logo). 2. Choisissez la bonne typographie : elle doit être lisible au premier coup d'œil. 3. Optez pour un papier de qualité : un grammage de 350g minimum donne une sensation de robustesse et de sérieux. 4. Utilisez les couleurs de votre charte graphique de manière harmonieuse. 5. Laissez du vide : cela permet à la carte de respirer et rend la lecture agréable.",
    category: "Conseils en communication visuelle",
    date: "22 Juillet 2026",
    image: "/blog-cards.png",
    author: "Directeur Technique",
    readTime: "3 min read"
  },
  {
    id: "blog-2",
    title: "Pourquoi le marquage textile est un atout pour vos équipes",
    excerpt: "Personnaliser les vêtements de vos employés renforce l'esprit d'équipe tout en faisant la promotion gratuite de votre entreprise.",
    content: "Le vêtement d'entreprise personnalisé est un excellent levier de communication et d'esprit d'appartenance. D'abord, il unifie l'image de marque : vos clients identifient instantanément vos collaborateurs lors des salons ou sur le terrain. Ensuite, c'est une publicité mobile à faible coût. Enfin, cela crée un fort sentiment d'appartenance chez vos salariés. La broderie offre un rendu prestigieux et durable pour les polos et chemises, tandis que l'impression DTF ou la sérigraphie convient avant tout pour les événements décontractés avec des T-shirts.",
    category: "Astuces d'impression",
    date: "15 Juillet 2026",
    image: "/blog-textile.png",
    author: "Responsable Atelier",
    readTime: "4 min read"
  },
  {
    id: "blog-3",
    title: "Enseigne lumineuse : maximisez la visibilité de votre boutique",
    excerpt: "Votre enseigne est le premier point de contact avec vos clients. Découvrez comment l'optimiser pour attirer plus de trafic.",
    content: "Avoir une enseigne lumineuse performante peut augmenter la fréquentation de votre point de vente de plus de 20%. Pour y parvenir, vous devez veiller à plusieurs critères. La hauteur et la taille de l'enseigne doivent être calculées selon le recul nécessaire pour les passants et véhicules. L'éclairage LED est à privilégier pour son homogénéité, sa longévité et sa faible consommation électrique. Pensez également à choisir le bon format : une enseigne double face (drapeau) est indispensable dans les rues commerçantes étroites pour capter le flux de piétons, alors qu'une enseigne simple face convient aux grands boulevards.",
    category: "Tendances graphiques",
    date: "05 Juillet 2026",
    image: "/blog-signage.png",
    author: "Directeur Créatif",
    readTime: "5 min read"
  }
];

const defaultSettings: SiteSettings = {
  companyName: "AE PRINT Services",
  slogan: "L'excellence dans l'impression & la communication visuelle",
  phone: "+24166720013",
  whatsapp: "+24177883005",
  email: "direction@aeprintservices.com",
  address: "Libreville, Gabon (Centre-Ville)",
  hours: "Lundi - Samedi : 08h00 - 18h00",
  facebook: "https://facebook.com/aeprintservices",
  instagram: "https://instagram.com/aeprintservices",
  tiktok: "https://tiktok.com/@aeprintservices",
  linkedin: "https://linkedin.com/company/ae-print-services",
  history: "Créé en 2020-2021, AE PRINT Services s'est imposé comme un acteur clé dans l'impression numérique et la personnalisation de supports à Libreville.",
  mission: "Satisfaire toutes les niches de clientèle en offrant un rapport qualité-prix exceptionnel.",
  vision: "Offrir un service d'une qualité inégalée aux clients et apporter le sourire sur chaque visage.",
  values: [
    { title: "Intégrité", desc: "Nous respectons nos engagements commerciaux et tenons des tarifs honnêtes." },
    { title: "Qualité", desc: "Des équipements modernes et une finition méticuleuse pour chaque projet." },
    { title: "Prix juste", desc: "Offrir la meilleure qualité de travail à des tarifs compétitifs adaptés à vos budgets." },
    { title: "Réactivité", desc: "Des livraisons express en moins de 24 heures pour la plupart de nos prestations." }
  ]
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [services, setServices] = useState<Service[]>(initialServices);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGallery);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlog);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  // Load from localstorage on mount
  useEffect(() => {
    // Theme
    const savedTheme = localStorage.getItem("ae-theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    // Services
    const savedServices = localStorage.getItem("ae-services");
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }

    // Gallery
    const savedGallery = localStorage.getItem("ae-gallery");
    if (savedGallery) {
      setGalleryItems(JSON.parse(savedGallery));
    }

    // Blog
    const savedBlog = localStorage.getItem("ae-blog");
    if (savedBlog) {
      setBlogPosts(JSON.parse(savedBlog));
    }

    // Quotes
    const savedQuotes = localStorage.getItem("ae-quotes");
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }

    // Settings
    const savedSettings = localStorage.getItem("ae-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save utility helpers
  const saveServices = (data: Service[]) => {
    setServices(data);
    localStorage.setItem("ae-services", JSON.stringify(data));
  };

  const saveGallery = (data: GalleryItem[]) => {
    setGalleryItems(data);
    localStorage.setItem("ae-gallery", JSON.stringify(data));
  };

  const saveBlog = (data: BlogPost[]) => {
    setBlogPosts(data);
    localStorage.setItem("ae-blog", JSON.stringify(data));
  };

  const saveQuotes = (data: QuoteRequest[]) => {
    setQuotes(data);
    localStorage.setItem("ae-quotes", JSON.stringify(data));
  };

  const saveSettings = (data: SiteSettings) => {
    setSettings(data);
    localStorage.setItem("ae-settings", JSON.stringify(data));
  };

  // Actions
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("ae-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    const list = services.map((s) => (s.id === id ? { ...s, ...updated } : s));
    saveServices(list);
  };

  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    saveGallery([newItem, ...galleryItems]);
  };

  const deleteGalleryItem = (id: string) => {
    saveGallery(galleryItems.filter((item) => item.id !== id));
  };

  const addBlogPost = (post: Omit<BlogPost, "id" | "date" | "author" | "readTime">) => {
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`,
      date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      author: "AE Administrateur",
      readTime: "3 min read"
    };
    saveBlog([newPost, ...blogPosts]);
  };

  const updateBlogPost = (id: string, updated: Partial<BlogPost>) => {
    const list = blogPosts.map((p) => (p.id === id ? { ...p, ...updated } : p));
    saveBlog(list);
  };

  const deleteBlogPost = (id: string) => {
    saveBlog(blogPosts.filter((post) => post.id !== id));
  };

  const addQuoteRequest = (quote: Omit<QuoteRequest, "id" | "status" | "createdAt">) => {
    const newQuote: QuoteRequest = {
      ...quote,
      id: `q-${Date.now()}`,
      status: "En attente",
      createdAt: new Date().toISOString()
    };
    saveQuotes([newQuote, ...quotes]);
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest["status"]) => {
    const list = quotes.map((q) => (q.id === id ? { ...q, status } : q));
    saveQuotes(list);
  };

  const deleteQuoteRequest = (id: string) => {
    saveQuotes(quotes.filter((q) => q.id !== id));
  };

  const updateSettings = (updated: Partial<SiteSettings>) => {
    const newSettings = { ...settings, ...updated };
    saveSettings(newSettings);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        services,
        updateService,
        galleryItems,
        addGalleryItem,
        deleteGalleryItem,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        quotes,
        addQuoteRequest,
        updateQuoteStatus,
        deleteQuoteRequest,
        settings,
        updateSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export function getServiceIcon(serviceId: string) {
  switch (serviceId) {
    case "dtf":
      return Layers;
    case "textile-blanc":
    case "textile-couleur":
    case "tshirt-coton":
      return Shirt;
    case "casquette-blanche":
      return Sparkles;
    case "foulard":
      return Scissors;
    case "branding-auto":
      return Car;
    case "packaging":
      return Box;
    case "broderie":
      return Shirt;
    case "cachet":
      return Printer;
    case "kakemono-petite":
    case "kakemono-grande":
      return Tv;
    case "vip-syntissole":
      return Image;
    case "banderole-vinyl":
      return Printer;
    case "enseigne-double":
    case "enseigne-simple":
      return Tv;
    case "agrandissement-photo":
      return Image;
    case "tasse-sublimation":
      return Coffee;
    case "carte-visite":
      return CreditCard;
    default:
      return Printer;
  }
}
