import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Database, ShieldCheck } from "@/components/icons";
import { RepairTracker } from "@/components/repair-tracker";
import { lookupRepair } from "@/lib/google-repair";

export const dynamic = "force-dynamic";

type TrackingPageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

function queryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function TrackingPage({ searchParams }: TrackingPageProps) {
  const params = searchParams ? await searchParams : {};
  const name = queryValue(params.name);
  const locker = queryValue(params.locker);
  const lookup = name && locker ? await lookupRepair(name, locker) : {};

  return (
    <main className="page-main">
      <section className="page-hero tracker-hero"><div className="container page-hero-grid"><div><p className="eyebrow">Votre dossier, à portée de main</p><h1>Suivez<br /><span>chaque étape.</span></h1></div><p className="page-hero-copy">De la prise en charge à la récupération, retrouvez l’avancement de votre réparation en quelques secondes.</p></div></section>
      <section className="tracker-page-section"><div className="container"><RepairTracker initialRecord={lookup.record || null} initialError={lookup.message || ""} initialName={name} initialLocker={locker} /><div className="tracker-guide"><div className="guide-item"><span className="guide-number">01</span><div><h3>Déposez votre appareil</h3><p>Un numéro de casier vous est remis lors de la prise en charge.</p></div></div><div className="guide-item"><span className="guide-number">02</span><div><h3>Consultez l’avancement</h3><p>Votre nom et votre numéro suffisent pour retrouver le dossier.</p></div></div><div className="guide-item"><span className="guide-number">03</span><div><h3>Récupérez sereinement</h3><p>Nous vous indiquons quand l’appareil est prêt en boutique.</p></div></div></div></div></section>
      <section className="section testimonial-section"><div className="container"><div className="section-header"><div><p className="eyebrow">Un suivi pensé pour vous</p><h2 className="section-heading section-heading-small">Pas besoin de<br />relancer. <span className="orange-text">On vous tient au courant.</span></h2></div><p className="section-copy">Les statuts sont actualisés par l’équipe AvéTech44 au fil du diagnostic et des réparations.</p></div><div className="tracker-promise-grid"><div><Database size={23} /><strong>Une information centralisée</strong><p>Votre dossier est synchronisé avec le tableau de suivi de l’atelier.</p></div><div><ShieldCheck size={23} /><strong>Vos données protégées</strong><p>Seules les informations nécessaires à la recherche sont demandées.</p></div><div><CheckCircle2 size={23} /><strong>Des étapes lisibles</strong><p>Un statut clair pour savoir exactement où en est votre appareil.</p></div></div></div></section>
      <section className="cta-section"><div className="container cta-inner"><h2>Une question sur votre dossier ?</h2><Link className="button" href="/contact">Contacter l’atelier <ArrowUpRight size={17} /></Link></div></section>
    </main>
  );
}
