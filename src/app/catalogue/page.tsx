import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { readCatalog } from "@/lib/google-catalog";

export const dynamic = "force-dynamic";

export default async function CataloguePage() {
  const catalogue = await readCatalog();
  return (
    <main className="page-main">
      <section className="page-hero"><div className="container page-hero-grid"><div><p className="eyebrow">Choisir mieux, garder plus longtemps</p><h1>Le bon<br />matériel, <span>au bon prix.</span></h1></div><p className="page-hero-copy">Des appareils testés, conseillés et préparés par notre atelier. Disponible en boutique à Ligné — demandez-nous les stocks du jour.</p></div></section>
      <CatalogueBrowser products={catalogue.products} source={catalogue.source} message={catalogue.message} />
      <section className="cta-section"><div className="container cta-inner"><h2>Vous ne savez pas quoi choisir ?</h2><Link className="button" href="/contact">Parler à un conseiller <ArrowUpRight size={17} /></Link></div></section>
    </main>
  );
}
