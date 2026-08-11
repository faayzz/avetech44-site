"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Phone } from "./icons";
import { AvetechLogo } from "./brand";
import { businessInfo } from "@/lib/site-config";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/#prestations", label: "Prestations" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/suivi", label: "Suivre ma réparation" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isCurrent = (href: string) => href === "/" ? pathname === "/" : pathname === href;

  return (
    <>
      <div className="topline"><div className="container topline-inner"><span><span className="topline-dot" /> Horaires : mardi 9h–12h30 puis 14h30–18h · Ligné</span><a href={businessInfo.phoneHref}><Phone size={14} /> {businessInfo.phoneDisplay}</a></div></div>
      <header className="site-header"><div className="container header-inner"><AvetechLogo compact /><nav className="main-nav" aria-label="Navigation principale">{links.map((link) => <Link key={link.href} className={isCurrent(link.href) ? "nav-link nav-link-active" : "nav-link"} href={link.href}>{link.label}</Link>)}<Link className="button button-small nav-cta" href="/contact">Nous trouver <ArrowUpRight size={15} /></Link></nav><details className="mobile-menu"><summary className="menu-button" aria-label="Ouvrir le menu"><Menu size={23} /></summary><nav className="mobile-nav-panel" aria-label="Navigation mobile">{links.map((link) => <Link key={link.href} className={isCurrent(link.href) ? "nav-link nav-link-active" : "nav-link"} href={link.href}>{link.label}</Link>)}<Link className="button button-small nav-cta" href="/contact">Nous trouver <ArrowUpRight size={15} /></Link></nav></details></div></header>
    </>
  );
}
