import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { AvetechLogo } from "@/components/brand";
import { SiteHeader } from "@/components/site-header";
import { ArrowUpRight, Facebook, Instagram, MapPin, Phone, TikTok } from "@/components/icons";
import { businessInfo } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: "AvéTech44 — Informatique, téléphonie & gaming",
  description: "Vente, réparation et accompagnement informatique à Ligné (44850). AvéTech44 prend soin de vos appareils.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="container footer-main">
            <div className="footer-brand"><AvetechLogo light /><p>La tech, sans prise de tête.<br />Depuis Ligné et avec vous.</p><div className="socials"><a href="https://www.facebook.com/avetech44loireatlantique/" target="_blank" rel="noreferrer" aria-label="Facebook AvéTech44"><Facebook size={17} /></a><a href="https://www.instagram.com/avetech44loireatlantique/" target="_blank" rel="noreferrer" aria-label="Instagram AvéTech44"><Instagram size={17} /></a><a href="https://www.tiktok.com/@avetech44_ligne" target="_blank" rel="noreferrer" aria-label="TikTok AvéTech44"><TikTok size={17} /></a></div></div>
            <div className="footer-column"><p className="footer-label">Navigation</p><Link href="/">Accueil</Link><Link href="/catalogue">Catalogue</Link><Link href="/suivi">Suivre ma réparation</Link><Link href="/contact">Contact</Link></div>
            <div className="footer-column"><p className="footer-label">Nous trouver</p><a href={businessInfo.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={15} /> {businessInfo.address}<br />{businessInfo.postalCity}</a><a href={businessInfo.phoneHref}><Phone size={15} /> {businessInfo.phoneDisplay}</a></div>
            <div className="footer-callout"><span className="eyebrow eyebrow-light">Besoin d’un conseil ?</span><h3>Parlons de votre projet.</h3><Link href="/contact" className="text-link text-link-light">Nous contacter <ArrowUpRight size={16} /></Link></div>
          </div>
          <div className="container footer-bottom"><span>© {new Date().getFullYear()} AvéTech44. Tous droits réservés.</span><span>Site conçu avec soin à Ligné <span className="footer-heart">♥</span></span></div>
        </footer>
      </body>
    </html>
  );
}
