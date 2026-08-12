"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "./icons";
import { AvetechLogo } from "./brand";

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
      <header className="site-header"><div className="container header-inner"><AvetechLogo compact /><nav className="main-nav" aria-label="Navigation principale">{links.map((link) => <Link key={link.href} className={isCurrent(link.href) ? "nav-link nav-link-active" : "nav-link"} href={link.href}>{link.label}</Link>)}<Link className="button button-small nav-cta" href="/contact">Nous trouver <ArrowUpRight size={15} /></Link></nav><details className="mobile-menu"><summary className="menu-button" aria-label="Ouvrir le menu"><Menu size={23} /></summary><nav className="mobile-nav-panel" aria-label="Navigation mobile">{links.map((link) => <Link key={link.href} className={isCurrent(link.href) ? "nav-link nav-link-active" : "nav-link"} href={link.href}>{link.label}</Link>)}<Link className="button button-small nav-cta" href="/contact">Nous trouver <ArrowUpRight size={15} /></Link></nav></details></div></header>
    </>
  );
}
