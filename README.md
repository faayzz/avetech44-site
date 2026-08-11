# AvéTech44

Site vitrine AvéTech44 — réparation, vente informatique, téléphonie et gaming à Ligné.

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir :

```text
http://localhost:3000
```

Le site ne nécessite pas de base de données, PostgreSQL, Drizzle, Resend ou Google Apps Script.

## Prendre contact

La page `/contact` ne contient plus de formulaire. Elle indique simplement les deux moyens de contact :

- Appeler le `06 95 45 07 71`.
- Venir à l’atelier au `26 rue des Palmiers, 44850 Ligné`.

Le bouton d’adresse utilise directement ce lien Google Maps :

```text
https://maps.app.goo.gl/d4fB7NpwH1VduaJFA?g_st=ic
```

## Changer le numéro facilement

Modifier uniquement ce fichier :

```text
src/lib/site-config.ts
```

Changer ces deux lignes :

```ts
phoneDisplay: "06 95 45 07 71",
phoneHref: "tel:+33695450771",
```

Le numéro se met à jour dans le header, le footer, la page Contact et le suivi.

## Suivi des réparations

Document :

```text
https://docs.google.com/spreadsheets/d/11gcqXigapzkfJaBHMUt7rOXgt-OMLaXnB4cO9miRxlw/edit?usp=sharing
```

Onglet utilisé : `gid=244880143`.

Le suivi lit :

- Colonne B : statut (`En cours`, `Terminé`, `Retardé`, `Annulé`).
- Colonne F : contact au format `NOM - Prénom - téléphone - email`.
- Première colonne : référence du dossier/casier, par exemple `R50`.
- Colonne D : appareil.
- Colonne E : problème.

Le formulaire utilise une recherche GET et fonctionne également si le JavaScript mobile ne se charge pas.

Test :

```text
Nom : ROGER
Casier : R50
```

## Catalogue

Document :

```text
https://docs.google.com/spreadsheets/d/1fvEH8v9SCly9PS8WbPpm3tfC_fTLLbCTBLDPtDtn7Ag/edit?usp=sharing
```

Onglet utilisé : `gid=0`.

En-têtes attendus :

```text
Photo (lien) | Nom du produit | Description/Caractéristique | Prix | Catégorie | Etat
```

Les produits sont rendus côté serveur : ils s’affichent dès l’ouverture de la page, y compris sur mobile.

## Fichier `.env`

Le suivi et le catalogue ont déjà des valeurs par défaut dans le code. Le fichier `.env` est donc facultatif en local.

Si vous souhaitez le créer, mettez uniquement :

```env
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/11gcqXigapzkfJaBHMUt7rOXgt-OMLaXnB4cO9miRxlw/edit?usp=sharing
GOOGLE_SHEET_GID=244880143
GOOGLE_CATALOG_SHEET_URL=https://docs.google.com/spreadsheets/d/1fvEH8v9SCly9PS8WbPpm3tfC_fTLLbCTBLDPtDtn7Ag/edit?usp=sharing
GOOGLE_CATALOG_SHEET_GID=0
```

Aucune variable `DATABASE_URL`, `RESEND_API_KEY` ou `GOOGLE_CONTACT_WEB_APP_URL` n’est nécessaire.

## Google Sheets inaccessible

Dans chaque document Google Sheets :

1. Cliquer sur **Partager**.
2. Dans **Accès général**, choisir **Tous ceux qui disposent du lien**.
3. Choisir **Lecteur**.
4. Redémarrer le site avec `Ctrl+C`, puis `npm run dev`.

## Mobile sur un autre appareil

Sur l’ordinateur qui fait tourner le site :

```bash
npm run dev -- --hostname 0.0.0.0
```

Trouver son adresse avec :

```powershell
ipconfig
```

Depuis un téléphone ou un autre PC connecté au même Wi-Fi :

```text
http://ADRESSE_IP_DU_PC:3000
```

## Déploiement

Le projet est compatible avec un hébergement Next.js comme Vercel. Il n’y a aucune base de données à créer.

Si les valeurs par défaut sont conservées, aucune variable d’environnement n’est requise. Sinon, ajoutez les quatre variables Google Sheets dans les variables d’environnement de l’hébergeur.

## Logo

Remplacer ce fichier en conservant son nom :

```text
public/logo-avetech44.svg
```
