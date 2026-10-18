
export const DEFAULT_REPAIR_SHEET_URL = "https://docs.google.com/spreadsheets/d/11gcqXigapzkfJaBHMUt7rOXgt-OMLaXnB4cO9miRxlw/edit?usp=sharing";
export const DEFAULT_REPAIR_SHEET_GID = "244880143";

type SheetRow = { cells: string[]; headers: string[] };
export type StatusKey = "received" | "repairing" | "delayed" | "ready" | "cancelled";
export type RepairStep = { label: string; date: string; done: boolean; current?: boolean };
export type RepairRecord = { device: string; status: StatusKey; statusLabel: string; statusTone: "orange" | "green" | "red" | "blue"; detail: string; updatedAt: string; history: RepairStep[] };
export type RepairLookup = { record?: RepairRecord; message?: string; status?: number };

function normalize(value: unknown) {
  return String(value ?? "").trim().toLocaleLowerCase("fr-FR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
}

function normalizedHeader(value: unknown) {
  return normalize(value).replace(/[^a-z0-9]/g, "");
}

function normalizedCode(value: unknown) {
  return normalize(value).replace(/\s+/g, "");
}

function nameKey(value: unknown) {
  return normalize(value).replace(/[^a-z0-9]+/g, " ").trim();
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

function normalizedRows(rows: string[][]): SheetRow[] {
  if (rows.length === 0) return [];
  const headerTerms = ["nom", "contact", "casier", "etat", "statut", "status", "appareil", "date", "miseajour", "avancement"];
  const hasHeader = rows[0].some((value) => headerTerms.some((term) => normalizedHeader(value).includes(term)));
  const headers = hasHeader ? rows[0] : rows[0].map((_, index) => `colonne_${index + 1}`);
  return (hasHeader ? rows.slice(1) : rows).map((cells) => ({ headers, cells }));
}

function rowsFromCsv(csv: string) {
  return normalizedRows(parseDelimited(csv, delimiterFor(csv)));
}

function rowsFromJson(value: unknown): SheetRow[] {
  const rows = Array.isArray(value) ? value : value && typeof value === "object" && "rows" in value ? (value as { rows?: unknown }).rows : [];
  if (!Array.isArray(rows) || rows.length === 0) return [];
  if (Array.isArray(rows[0])) return normalizedRows(rows as string[][]);
  if (typeof rows[0] === "object" && rows[0] !== null) {
    return (rows as Record<string, unknown>[]).map((item) => {
      const headers = Object.keys(item);
      return { headers, cells: headers.map((header) => String(item[header] ?? "")) };
    });
  }
  return [];
}

function column(row: SheetRow, aliases: string[], fallbackIndex?: number) {
  const wanted = aliases.map(normalizedHeader);
  const headerIndex = row.headers.findIndex((header) => {
    const key = normalizedHeader(header);
    return wanted.some((alias) => key === alias || key.includes(alias) || alias.includes(key));
  });
  const index = headerIndex >= 0 ? headerIndex : fallbackIndex;
  return index === undefined ? "" : String(row.cells[index] ?? "").trim();
}

function contactName(contact: string) {
  const parts = contact.split(/\s+-\s+/).map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 2) return parts.slice(0, 2).join(" ");
  return contact.replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, "").replace(/\+?\d[\d .-]{5,}/g, "").replace(/\s+-\s+/g, " ").trim();
}

function namesMatch(searchName: string, contact: string) {
  const searched = nameKey(searchName);
  const candidate = nameKey(contactName(contact));
  if (!searched || !candidate) return false;
  if (searched === candidate || candidate.includes(searched) || searched.includes(candidate)) return true;
  return searched.split(" ").every((part) => candidate.includes(part));
}

const lockerAliases = ["casier", "numero de casier", "numéro de casier", "locker", "code casier", "code dossier", "numero dossier", "n° dossier"];

function lockerMatches(row: SheetRow, searchedLocker: string) {
  const wanted = normalizedCode(searchedLocker);
  const explicitLocker = column(row, lockerAliases);
  if (explicitLocker) return normalizedCode(explicitLocker) === wanted || normalizedCode(explicitLocker).includes(wanted);
  return row.cells.some((value, index) => {
    if (index === 1 || index === 5) return false;
    const candidate = normalizedCode(value);
    return candidate === wanted || (wanted.length >= 3 && candidate.includes(wanted));
  });
}

function statusFrom(value: string): StatusKey {
  const status = normalize(value);
  if (status.includes("annul")) return "cancelled";
  if (status.includes("termine") || status.includes("pret") || status.includes("recup")) return "ready";
  if (status.includes("retard")) return "delayed";
  if (status.includes("en cours") || status.includes("repar") || status.includes("diagnostic") || status.includes("atelier")) return "repairing";
  return "received";
}

function makeHistory(status: StatusKey, updated: string): RepairStep[] {
  if (status === "cancelled") return [
    { label: "Dossier pris en charge", date: "Étape validée", done: true },
    { label: "Réparation annulée", date: updated, done: true, current: true },
    { label: "Dossier clôturé", date: "—", done: false },
  ];
  const stages = [
    { key: "received", label: "Dossier pris en charge" },
    { key: "repairing", label: "En cours" },
    { key: "delayed", label: "Retard signalé" },
    { key: "ready", label: "Terminé · prêt à récupérer" },
  ] as const;
  const currentIndex = stages.findIndex((stage) => stage.key === status);
  return stages.map((stage, index) => ({ label: stage.label, date: index === currentIndex ? updated : index < currentIndex ? "Étape validée" : "À venir", done: index <= currentIndex, current: index === currentIndex }));
}

function sheetUrls(source: string) {
  if (process.env.GOOGLE_SHEET_WEB_APP_URL) return [source];
  const match = source.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return [source];
  const gid = source.match(/[?&#]gid=([^&#]+)/)?.[1] || process.env.GOOGLE_SHEET_GID || DEFAULT_REPAIR_SHEET_GID;
  const encodedGid = encodeURIComponent(gid);
  return [
    `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv&gid=${encodedGid}`,
    `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:csv&gid=${encodedGid}`,
  ];
}

async function getSheetRows(): Promise<SheetRow[]> {
  const source = process.env.GOOGLE_SHEET_WEB_APP_URL || process.env.GOOGLE_SHEET_CSV_URL || process.env.GOOGLE_SHEET_URL || DEFAULT_REPAIR_SHEET_URL;
  let lastError = "";
  for (const url of sheetUrls(source)) {
    try {
      const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15000) });
      const text = await response.text();
      if (!response.ok || text.trimStart().startsWith("<")) {
        lastError = `Réponse Google Sheets ${response.status}`;
        continue;
      }
      if (process.env.GOOGLE_SHEET_WEB_APP_URL) {
        try {
          const jsonRows = rowsFromJson(JSON.parse(text));
          if (jsonRows.length > 0) return jsonRows;
        } catch {
          // Web App can also return CSV.
        }
      }
      const csvRows = rowsFromCsv(text);
      if (csvRows.length > 0) return csvRows;
      lastError = "La feuille ne contient aucune ligne";
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Erreur réseau";
    }
  }
  throw new Error(`Google Sheet inaccessible (${lastError}). Vérifiez le partage du document et le gid ${process.env.GOOGLE_SHEET_GID || DEFAULT_REPAIR_SHEET_GID}.`);
}

export async function lookupRepair(name: string, locker: string): Promise<RepairLookup> {
  const searchName = name.trim();
  const searchLocker = locker.trim();
  if (searchName.length < 2 || searchLocker.length < 2) return { message: "Saisissez votre nom et votre numéro de casier.", status: 400 };

  let rows: SheetRow[];
  try {
    rows = await getSheetRows();
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Le Google Sheet est inaccessible.", status: 503 };
  }
  if (rows.length === 0) return { message: `La feuille de réparations est vide ou inaccessible. Vérifiez le partage et le gid ${process.env.GOOGLE_SHEET_GID || DEFAULT_REPAIR_SHEET_GID}.`, status: 503 };

 const row = rows.find((item) => {
  const contact = column(item, ["contact", "client", "nom du client", "coordonnees", "coordonnées"], 5);
  const nom = item.cells[6] || "";
  const prenom = item.cells[7] || "";
  const fullName = `${nom} ${prenom}`.trim();
  return (namesMatch(searchName, contact) || namesMatch(searchName, fullName) || namesMatch(searchName, nom)) && lockerMatches(item, searchLocker);
});
  if (!row) return { message: "Aucun dossier trouvé.", status: 404 };

  const rawStatus = column(row, ["statut", "status", "etat", "état", "avancement"], 1) || "En cours";
  const status = statusFrom(rawStatus);
  const statusLabels: Record<StatusKey, string> = { received: "Pris en charge", repairing: "En cours", delayed: "Retardé", ready: "Terminé · prêt à récupérer", cancelled: "Annulé" };
  const statusTones: Record<StatusKey, "orange" | "green" | "red" | "blue"> = { received: "orange", repairing: "orange", delayed: "red", ready: "green", cancelled: "red" };
  const updatedAt = column(row, ["mise a jour", "mise_a_jour", "updatedat", "date", "dernier mouvement", "derniere mise a jour", "horodateur", "timestamp"]) || "Dernière mise à jour récente";
  const device = column(row, ["appareil", "device", "produit", "materiel", "matériel"]) || "Appareil confié à l’atelier";
  const detail = column(row, ["detail", "détail", "commentaire", "message", "probleme", "problème"]) || (status === "ready" ? "Votre appareil est prêt à être récupéré en boutique." : status === "cancelled" ? "Votre dossier a été annulé. Contactez l’atelier si besoin." : "Votre dossier est bien suivi par notre atelier.");
  return { record: { device, status, statusLabel: statusLabels[status], statusTone: statusTones[status], detail, updatedAt, history: makeHistory(status, updatedAt) } };
}
