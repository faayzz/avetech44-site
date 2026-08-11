import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gamepad2, HardDrive, Laptop, Monitor, Quote, Smartphone, Star, Wrench } from "@/components/icons";
import { businessInfo } from "@/lib/site-config";

const googleReviewsUrl = "https://www.google.com/maps/search/?api=1&query=47.4115124,-1.3766891";

const services = [
  { number: "01", title: "Réparation Smartphone", text: "Écran cassé, batterie défaillante, connecteur de charge… Nous réparons toutes les marques : iPhone, Samsung, Huawei, Xiaomi et plus.", icon: <Smartphone size={22} /> },
  { number: "02", title: "Réparation PC Fixe", text: "Diagnostic complet, remplacement de composants, nettoyage, optimisation et mise à niveau de votre PC de bureau.", icon: <Monitor size={22} /> },
  { number: "03", title: "Réparation PC Portable", text: "Écran, clavier, charnières, ventilateur, carte mère… Nous intervenons sur tous types de PC portables.", icon: <Laptop size={22} /> },
  { number: "04", title: "Récupération de Données", text: "Disque dur endommagé, clé USB corrompue, SSD défaillant ? Nous récupérons vos fichiers précieux.", icon: <HardDrive size={22} /> },
  { number: "05", title: "Gaming & Consoles", text: "Réparation de consoles (PS5, Xbox, Switch), montage PC Gaming sur mesure et accessoires gaming.", icon: <Gamepad2 size={22} /> },
  { number: "06", title: "Maintenance & Conseil", text: "Entretien préventif, installation de logiciels, configuration réseau et conseil personnalisé.", icon: <Wrench size={22} /> },
];

export default function HomePage() {
  return (
    <main className="page-main">
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Votre atelier tech à Ligné</p>
            <h1>On répare<br />vos <span>idées.</span></h1>
            <p>AvéTech44 accompagne vos appareils et vos projets avec des solutions simples, durables et franchement humaines.</p>
            <div className="hero-actions"><Link className="button" href="/contact">Parler à un technicien <ArrowUpRight size={17} /></Link><Link className="text-link" href="/suivi">Suivre ma réparation <ArrowRight size={16} /></Link></div>
            <div className="hero-note"><span /> Diagnostic en boutique · sans engagement</div>
          </div>
          <div className="hero-art" aria-label="Illustration d'un téléphone et d'un ordinateur portable réparés">
            <div className="hero-art-panel"><span className="art-label">atelier / 44°N</span><span className="art-orange-dot" /><span className="art-circle" /><span className="art-phone" /><div className="art-laptop"><span className="art-laptop-screen" /><span className="art-laptop-base" /></div><span className="art-sticker">TECH<br />CARE</span><span className="art-caption">AvéTech44<small>Le bon outil, au bon moment.</small></span></div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="prestations">
        <div className="container">
          <div className="section-header"><div><p className="eyebrow">Nos prestations</p><h2 className="section-heading">Des solutions<br />pour chaque <span className="orange-text">besoin.</span></h2></div><p className="section-copy">De la réparation de votre smartphone à la maintenance de votre ordinateur, notre atelier vous accompagne avec des explications claires et des tarifs raisonnables.</p></div>
          <div className="service-grid">{services.map((service) => <article className="service-item" key={service.number}><span className="service-number">{service.number}</span><span className="service-icon">{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p><Link className="service-link" href="/contact">En savoir plus <ArrowUpRight size={14} /></Link></article>)}</div>
        </div>
      </section>

      <section className="story-section"><div className="container story-grid"><div><p className="eyebrow eyebrow-light">L’esprit AvéTech44</p><h2 className="section-heading">La tech,<br />c’est plus<br />simple <span className="orange-text">ensemble.</span></h2><p className="story-copy">Un atelier indépendant où chaque appareil est traité comme s’il était le nôtre. Ici, on prend le temps d’écouter avant de démonter.</p><p className="story-copy">Notre mission : prolonger la vie de votre matériel et vous aider à faire des choix qui durent.</p><div className="stat-row"><div className="stat"><strong>9 ans</strong><span>d’existence</span></div><div className="stat"><strong>4,6/5</strong><span>avis clients</span></div><div className="stat"><strong>48h</strong><span>diagnostic moyen</span></div></div></div><div className="story-visual" aria-hidden="true"><span className="story-card-back" /><div className="story-card"><span className="story-card-label">Depuis Ligné · 44</span><span className="story-card-icon"><Wrench size={30} /></span><h3>Réparer.<br />Conseiller.<br />Transmettre.</h3></div><span className="story-stamp">LOCAL<br />&amp; INDÉPENDANT<br />✦</span></div></div></section>

      <section className="section testimonial-section"><div className="container testimonial-grid"><figure className="testimonial"><div className="quote-mark"><Quote size={46} /></div><blockquote>“J’ai fait appel à AvéTech44 pour réparer mon ordinateur, et Hichem m’a été d’une grande aide. Il était très agréable et souriant et les prix étaient raisonnables. Je recommande vivement.”</blockquote><figcaption><span className="avatar">FC</span><span><strong>Fayez C.</strong><br />Client AvéTech44</span></figcaption></figure><div className="rating-box"><div className="stars"><Star size={17} /><Star size={17} /><Star size={17} /><Star size={17} /><Star size={17} /></div><strong>4,6 / 5</strong><p>La confiance de nos clients, chaque jour.</p><a className="reviews-link" href={googleReviewsUrl} target="_blank" rel="noreferrer">Voir tous les avis Google <ArrowUpRight size={15} /></a></div></div></section>

      <section className="cta-section"><div className="container cta-inner"><h2>Un appareil qui fait des siennes ? On va s’en occuper.</h2><a className="button" href={businessInfo.phoneHref}>Appeler l’atelier <ArrowUpRight size={17} /></a></div></section>
    </main>
  );
}
