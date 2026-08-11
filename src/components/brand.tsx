import Link from "next/link";

type BrandProps = {
  light?: boolean;
  compact?: boolean;
};

export function AvetechLogo({ light = false, compact = false }: BrandProps) {
  return (
    <Link className={`brand ${light ? "brand-light" : ""} ${compact ? "brand-compact" : ""}`} href="/" aria-label="AvéTech44, accueil">
      {/* Pour utiliser votre logo personnel, remplacez public/logo-avetech44.svg en conservant ce nom. */}
      <img className="brand-logo-image" src="/logo-avetech44.svg" alt="AvéTech44 — Informatique, téléphonie, gaming" />
    </Link>
  );
}
