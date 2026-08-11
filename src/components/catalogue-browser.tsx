"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Gamepad2, HardDrive, Laptop, Monitor, Smartphone } from "@/components/icons";
import type { CatalogProduct } from "@/lib/catalogue-data";

function ProductArt({ type, image, name }: { type: string; image?: string; name: string }) {
  const icons = { phone: <Smartphone size={25} />, laptop: <Laptop size={25} />, monitor: <Monitor size={25} />, console: <Gamepad2 size={25} />, drive: <HardDrive size={25} />, keyboard: <span>⌨</span> };
  if (image) return <img className="product-art-image" src={image} alt={name} />;
  return <div className={`product-art product-art-${type}`}>{icons[type as keyof typeof icons] || <Laptop size={25} />}</div>;
}

type CatalogueBrowserProps = {
  products: CatalogProduct[];
  source: "sheet" | "demo" | "error";
  message?: string;
};

export function CatalogueBrowser({ products, source, message }: CatalogueBrowserProps) {
  const [active, setActive] = useState("Tous");
  const categories = useMemo(() => ["Tous", ...Array.from(new Set(products.map((product) => product.category)))], [products]);
  const filtered = useMemo(() => active === "Tous" ? products : products.filter((product) => product.category === active), [active, products]);

  return (
    <section className="catalogue-section"><div className="container"><div className="catalogue-toolbar"><div className="filter-tabs" role="tablist" aria-label="Filtrer le catalogue">{categories.map((category) => <button type="button" role="tab" aria-selected={active === category} className={`filter-tab ${active === category ? "filter-tab-active" : ""}`} key={category} onClick={() => setActive(category)}>{category}</button>)}</div><span className="catalogue-count">{filtered.length} référence{filtered.length > 1 ? "s" : ""} présentée{filtered.length > 1 ? "s" : ""} {source === "sheet" && <span className="catalogue-live"><i /> Stock actualisé</span>}</span></div>{message && <div className="catalogue-error" role="alert"><strong>Catalogue indisponible</strong><span>{message}</span><button type="button" onClick={() => window.location.reload()}>Réessayer</button></div>}{!message && filtered.length === 0 && <div className="catalogue-empty"><strong>Aucun produit à afficher.</strong><span>Ajoutez une ligne dans votre Google Sheet catalogue pour la voir apparaître ici.</span></div>}<div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><div className="product-art-wrap"><ProductArt type={product.art} image={product.image} name={product.name} /></div><div className="product-info"><div className="product-meta"><span>{product.category}</span><span>{product.tag}</span></div><h3>{product.name}</h3><p>{product.description}</p><div className="product-stock"><span className={`stock-dot stock-dot-${product.stockStatus}`} />{product.stockLabel}</div><div className="product-bottom"><span className="product-price">{product.price}<small>à partir de</small></span><Link className="product-link" href="/contact">En savoir plus <ArrowUpRight size={14} /></Link></div></div></article>)}</div><div className="catalogue-note"><span>ℹ</span><p>Les stocks et tarifs peuvent évoluer. Pour une configuration personnalisée ou une disponibilité précise, <Link href="/contact">contactez l’atelier</Link>.</p></div></div></section>
  );
}
