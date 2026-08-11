export type CatalogProduct = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  art: string;
  tag: string;
  stockLabel: string;
  stockStatus: "available" | "unavailable" | "order";
  image?: string;
};

export const fallbackProducts: CatalogProduct[] = [
  { id: "iphone-13", category: "Téléphones", name: "iPhone 13 reconditionné", description: "128 Go · Batterie contrôlée · Garantie 12 mois", price: "399 €", art: "phone", tag: "Reconditionné", stockLabel: "En stock", stockStatus: "available" },
  { id: "samsung-a55", category: "Téléphones", name: "Samsung Galaxy A55", description: "256 Go · Double SIM · Neuf sous garantie", price: "349 €", art: "phone", tag: "Nouveauté", stockLabel: "En stock", stockStatus: "available" },
  { id: "macbook-air-m1", category: "Ordinateurs", name: "MacBook Air M1", description: "8 Go RAM · SSD 256 Go · Excellent état", price: "629 €", art: "laptop", tag: "Reconditionné", stockLabel: "En stock", stockStatus: "available" },
  { id: "pc-portable", category: "Ordinateurs", name: "PC portable polyvalent", description: "Intel i5 · 16 Go RAM · SSD 512 Go", price: "499 €", art: "laptop", tag: "Sélection", stockLabel: "En stock", stockStatus: "available" },
  { id: "ecran-gaming", category: "Gaming", name: "Écran gaming 27 pouces", description: "165 Hz · 1 ms · QHD · Adaptive Sync", price: "229 €", art: "monitor", tag: "Gaming", stockLabel: "En stock", stockStatus: "available" },
  { id: "console", category: "Gaming", name: "Console nouvelle génération", description: "Manette incluse · Stock limité en boutique", price: "549 €", art: "console", tag: "Gaming", stockLabel: "Stock limité", stockStatus: "available" },
  { id: "ssd-externe", category: "Accessoires", name: "SSD externe Avé Data", description: "1 To · USB-C · Sauvegardes rapides", price: "89 €", art: "drive", tag: "Essentiel", stockLabel: "En stock", stockStatus: "available" },
  { id: "clavier-mecanique", category: "Accessoires", name: "Clavier compact mécanique", description: "Sans fil · Rétroéclairé · AZERTY", price: "79 €", art: "keyboard", tag: "Coup de cœur", stockLabel: "En stock", stockStatus: "available" },
];
