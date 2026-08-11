import { fallbackProducts, type CatalogProduct } from "@/lib/catalogue-data";

export const DEFAULT_CATALOG_SHEET_URL = "https://docs.google.com/spreadsheets/d/1fvEH8v9SCly9PS8WbPpm3tfC_fTLLbCTBLDPtDtn7Ag/edit?usp=sharing";
export const DEFAULT_CATALOG_SHEET_GID = "0";

type SheetRow = { headers: string[]; cells: string[] };
export type CatalogResult = {
  products: CatalogProduct[];
  source: "sheet" | "demo" | "error";
  message?: string;
};

function normalize(value: unknown) {
  return String(value ?? "").trim().toLocaleLowerCase("fr-FR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
}

function headerKey(value: unknown) {
  return normalize(value).replace(/[^a-z0-9]/g, "");
}

function delimiterFor(text: string) {
  const firstLine = text.replace(/^\uFEFF/, "").split(/\r?\n/, 1)[0] || "";
  if (firstLine.includes("\t")) return "\t";
  return (firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length ? ";" : ",";
}

function parseDelimited(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (character === delimiter && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if (character === "\n" && !quoted) {
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else if (character !== "\r") cell += character;
  }
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function rowsFromCsv(text: string): SheetRow[] {
  const arrays = parseDelimited(text, delimiterFor(text));
  if (arrays.length < 2) return [];
  const headers = arrays[0];
  return arrays.slice(1).map((cells) => ({ headers, cells }));
}

function field(row: SheetRow, aliases: string[], fallbackIndex?: number) {
  const wanted = aliases.map(headerKey);
  const foundIndex = row.headers.findIndex((header) => {
    const current = headerKey(header);
    return wanted.some((alias) => current === alias || current.includes(alias) || alias.includes(current));
  });
  const index = foundIndex >= 0 ? foundIndex : fallbackIndex;
  return index === undefined ? "" : String(row.cells[index] ?? "").trim();
}

function slug(value: string) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function category(value: string, art: string) {
  const normalized = normalize(value);
  if (normalized.includes("telephone") || normalized.includes("smartphone") || normalized.includes("mobile")) return "Téléphones";
  if (normalized.includes("gaming") || normalized.includes("jeu") || normalized.includes("console")) return "Gaming";
  if (normalized.includes("accessoire") || normalized.includes("peripherique")) return "Accessoires";
  if (normalized.includes("ordinateur") || normalized.includes("pc") || normalized.includes("mac")) return "Ordinateurs";
  if (art === "phone") return "Téléphones";
  if (["monitor", "console"].includes(art)) return "Gaming";
  if (["drive", "keyboard"].includes(art)) return "Accessoires";
  return "Ordinateurs";
}

function artFor(categoryName: string, value: string) {
  const normalized = normalize(value || categoryName);
  if (normalized.includes("telephone") || normalized.includes("smartphone") || normalized.includes("iphone") || normalized.includes("samsung")) return "phone";
  if (normalized.includes("ecran") || normalized.includes("monitor")) return "monitor";
  if (normalized.includes("console") || normalized.includes("gaming")) return "console";
  if (normalized.includes("ssd") || normalized.includes("disque") || normalized.includes("stockage")) return "drive";
  if (normalized.includes("clavier") || normalized.includes("keyboard")) return "keyboard";
  return "laptop";
}

function stockInfo(raw: string) {
  const value = normalize(raw);
  const number = Number(value.replace(",", ".").match(/-?\d+(?:\.\d+)?/)?.[0]);
  if (value.includes("rupture") || value.includes("epuise") || value.includes("indisponible") || value === "non" || value === "false" || number === 0) return { stockLabel: "Rupture", stockStatus: "unavailable" as const };
  if (value.includes("commande") || value.includes("bientot") || value.includes("bientôt")) return { stockLabel: "Sur commande", stockStatus: "order" as const };
  if (Number.isFinite(number) && number > 0) return { stockLabel: number === 1 ? "1 en stock" : `${number} en stock`, stockStatus: "available" as const };
  if (value.includes("stock") || value.includes("oui") || value.includes("disponible") || !value) return { stockLabel: "En stock", stockStatus: "available" as const };
  return { stockLabel: raw || "Nous consulter", stockStatus: "available" as const };
}

function productFromRow(row: SheetRow, index: number): CatalogProduct | null {
  const name = field(row, ["nom", "produit", "article", "designation", "désignation", "modele", "modèle"], 0);
  if (!name || ["nom", "produit", "article", "stock"].includes(normalize(name))) return null;
  const visibleValue = normalize(field(row, ["visible", "publie", "publié", "actif", "afficher"]));
  if (["non", "false", "0", "masque", "masquee", "invisible", "archive"].includes(visibleValue)) return null;

  const rawArt = field(row, ["type", "illustration", "art"]);
  const productCategory = category(field(row, ["categorie", "catégorie", "famille", "rayon", "type"]), rawArtForCategory(rawArt));
  const stock = stockInfo(field(row, ["stock", "quantite", "quantité", "disponibilite", "disponibilité", "disponible", "etat", "état", "etat stock", "état stock"]));
  const rawPrice = field(row, ["prix", "tarif", "prix ttc", "montant"]);
  const price = rawPrice ? (/\d/.test(rawPrice) && !/[€$]/.test(rawPrice) ? `${rawPrice} €` : rawPrice) : "Sur devis";
  const image = field(row, ["image", "photo", "url image", "visuel"]);

  return {
    id: field(row, ["id", "reference", "référence", "ref"]) || `${slug(name)}-${index}`,
    category: productCategory,
    name,
    description: field(row, ["description", "détail", "detail", "caracteristiques", "caractéristiques", "specifications", "spécifications"]) || "Disponible et préparé par l’atelier AvéTech44.",
    price,
    art: artFor(productCategory, `${rawArt} ${name}`),
    tag: field(row, ["etiquette", "étiquette", "tag", "badge", "marque"]) || "Sélection atelier",
    stockLabel: stock.stockLabel,
    stockStatus: stock.stockStatus,
    image: /^https?:\/\//i.test(image) ? image : undefined,
  };
}

function rawArtForCategory(value: string) {
  const normalized = normalize(value);
  if (normalized.includes("telephone")) return "phone";
  if (normalized.includes("gaming") || normalized.includes("console")) return "console";
  if (normalized.includes("accessoire")) return "drive";
  return "laptop";
}

function sheetUrls(source: string) {
  const match = source.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return [source];
  const gid = process.env.GOOGLE_CATALOG_SHEET_GID || DEFAULT_CATALOG_SHEET_GID;
  const encodedGid = encodeURIComponent(gid);
  return [
    `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv&gid=${encodedGid}`,
    `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:csv&gid=${encodedGid}`,
  ];
}

export async function readCatalog(): Promise<CatalogResult> {
  const source = process.env.GOOGLE_CATALOG_SHEET_URL || DEFAULT_CATALOG_SHEET_URL;
  let lastError = "";
  for (const url of sheetUrls(source)) {
    try {
      const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15000) });
      const text = await response.text();
      if (!response.ok || text.trimStart().startsWith("<")) {
        lastError = `Réponse Google Sheets ${response.status}`;
        continue;
      }
      const products = rowsFromCsv(text).map(productFromRow).filter((item): item is CatalogProduct => Boolean(item));
      if (products.length > 0) return { products, source: "sheet" };
      lastError = "La feuille ne contient aucun produit exploitable";
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Erreur réseau";
    }
  }
  if (lastError.includes("aucun produit")) return { products: [], source: "sheet", message: "Votre feuille catalogue est accessible mais ne contient aucun produit exploitable." };
  return { products: [], source: "error", message: `Impossible de lire le catalogue Google Sheets (${lastError}). Vérifiez le partage du document et le gid ${process.env.GOOGLE_CATALOG_SHEET_GID || DEFAULT_CATALOG_SHEET_GID}.` };
}

export { fallbackProducts };
