"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Accueil", "#accueil"], ["À propos", "#histoire"], ["Menus", "#carte"],
  ["Événements", "#evenements"], ["Réservation", "#reservation"], ["Contact", "#contact"],
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <>
    <button className="menu-toggle" type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button>
    <nav className={`mobile-nav ${open ? "is-open" : ""}`} id="mobile-nav" aria-label="Navigation mobile" inert={!open}>
      {links.map(([label, url]) => <a key={url} href={url} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
  </>;
}
