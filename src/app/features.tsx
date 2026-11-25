"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

type Product = { name: string; description: string; price: number; image: string };
const image = (id: string) => `https://images.unsplash.com/${id}?w=420&q=75`;
const cocktail = image("photo-1470337458703-46ad1756a187");
const drink = image("photo-1544145945-f90425340c7e");
const wine = image("photo-1510812431401-41d2bd2722f3");
const soft = image("photo-1546173159-315724a31696");
const dessert = image("photo-1563805042-7684c019e1cb");
const plate = image("photo-1559847844-5315695dadae");
const bar = image("photo-1514933651103-005eec06c04b");
const dinner = image("photo-1515003197210-e0cd71810b5f");
const product = (name: string, description: string, price: number, imageUrl: string): Product => ({ name, description, price, image: imageUrl });
const menuCategories: { name: string; description: string; products: Product[] }[] = [
  { name: "Cocktails", description: "Des classiques et des créations pour lancer la soirée.", products: [
    product("Babi Sunset", "Ananas, citron vert et note de gingembre.", 6500, cocktail),
    product("Mojito maison", "Menthe fraîche, citron vert et eau pétillante.", 5500, drink),
    product("Passion Fizz", "Fruit de la passion et bulles fraîches.", 6000, cocktail),
    product("Old Fashioned", "Whisky, sucre et bitters aromatiques.", 7500, bar),
    product("Spritz doré", "Apéritif amer, agrumes et prosecco.", 7000, drink),
    product("Virgin Hibiscus", "Bissap, agrumes et tonic, sans alcool.", 4500, cocktail),
    product("Ginger Mule", "Gingembre, citron et vodka.", 6500, drink),
  ] },
  { name: "Spiritueux", description: "Une sélection de verres pour prendre son temps.", products: [
    product("Whisky classique", "Un verre servi avec ou sans glaçons.", 5500, bar),
    product("Whisky premium", "Sélection de la maison, selon arrivage.", 9500, drink),
    product("Rhum ambré", "Notes rondes et épicées.", 6000, bar),
    product("Rhum vieux", "Dégustation de caractère.", 8500, drink),
    product("Gin tonic", "Gin, tonic et touche d'agrumes.", 6500, cocktail),
    product("Vodka glace", "Servie fraîche, simplement.", 5000, bar),
    product("Cognac", "Un verre à savourer lentement.", 9000, drink),
  ] },
  { name: "Vins", description: "Des accords à explorer entre amis.", products: [
    product("Rouge du moment", "Verre de vin rouge sélectionné.", 5000, wine),
    product("Blanc du moment", "Verre de vin blanc servi frais.", 5000, wine),
    product("Rosé du moment", "Verre léger et fruité.", 5000, wine),
    product("Rouge à partager", "Bouteille de la sélection maison.", 22000, wine),
    product("Blanc à partager", "Bouteille de la sélection maison.", 22000, wine),
    product("Rosé à partager", "Bouteille de la sélection maison.", 22000, wine),
    product("Bulles festives", "Coupe de vin effervescent.", 7000, wine),
  ] },
  { name: "Bières & softs", description: "Des boissons fraîches pour tous les goûts.", products: [
    product("Bière blonde", "Bière fraîche, format individuel.", 3500, drink),
    product("Bière brune", "Une robe plus intense.", 4000, bar),
    product("Bière sans alcool", "Tout le plaisir, sans alcool.", 3500, drink),
    product("Jus d'ananas", "Un grand classique tropical.", 3500, soft),
    product("Jus de gingembre", "Une boisson vive et épicée.", 3500, soft),
    product("Bissap", "Infusion d'hibiscus servie fraîche.", 3000, soft),
    product("Eau pétillante", "À savourer bien fraîche.", 2500, soft),
  ] },
  { name: "Snacks & tapas", description: "De petites assiettes à picorer ou partager.", products: [
    product("Alloco à partager", "Bananes plantains dorées et sauce maison.", 4500, plate),
    product("Brochettes de poulet", "Poulet grillé et marinade parfumée.", 6500, dinner),
    product("Accras du moment", "Bouchées croustillantes à partager.", 5500, plate),
    product("Frites maison", "Dorées et servies chaudes.", 3500, dinner),
    product("Planche mixte", "Assortiment de bouchées salées.", 12000, plate),
    product("Mini burgers", "Petites portions généreuses.", 7500, dinner),
    product("Crevettes épicées", "Sautées aux épices douces.", 9500, plate),
  ] },
  { name: "Desserts", description: "Un peu de douceur avant de prolonger la nuit.", products: [
    product("Moelleux au chocolat", "Chocolat fondant et touche de vanille.", 5500, dessert),
    product("Salade de fruits", "Fruits frais selon la saison.", 4500, dessert),
    product("Glace deux parfums", "Une pause fraîche et gourmande.", 4000, dessert),
    product("Cheesecake du moment", "Crémeux et généreux.", 5500, dessert),
    product("Tiramisu maison", "Crème douce et note de café.", 5500, dessert),
    product("Ananas rôti", "Fruits caramélisés et épices.", 5000, dessert),
    product("Café gourmand", "Expresso et petites douceurs.", 6000, dessert),
  ] },
];

export function MenuCatalog() {
  const [selected, setSelected] = useState(0);
  const active = menuCategories[selected];
  return <div className="ft-menu">
    <div className="ft-tabs" role="tablist" aria-label="Catégories de la carte">
      {menuCategories.map((category, index) => <button key={category.name} type="button" role="tab" id={`ft-tab-${index}`} aria-selected={selected === index} aria-controls="ft-menu-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => { if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return; event.preventDefault(); const next = (index + (event.key === "ArrowRight" ? 1 : -1) + menuCategories.length) % menuCategories.length; setSelected(next); document.getElementById(`ft-tab-${next}`)?.focus(); }}>{category.name}</button>)}
    </div>
    <div className="ft-menu-panel" role="tabpanel" id="ft-menu-panel" aria-labelledby={`ft-tab-${selected}`} tabIndex={0}>
      <div className="ft-menu-intro"><span className="ft-kicker">LA CARTE</span><h3>{active.name}</h3><p>{active.description}</p></div>
      <ul className="ft-products">{active.products.map(item => <li className="ft-product" key={item.name}><div className="ft-product-image"><Image src={item.image} alt={`Visuel d’illustration pour ${item.name}`} width={96} height={96} unoptimized /></div><div className="ft-product-body"><h4>{item.name}</h4><span className="ft-product-meta">{item.price.toLocaleString("fr-FR")} FCFA</span><p>{item.description}</p></div></li>)}</ul>
    </div>
    <p className="ft-disclaimer">Carte fictive de démonstration. Produits, prix, photos et disponibilités à remplacer par les informations officielles de Bardebabi.</p>
  </div>;
}

export function EventsList() {
  return <div className="ft-events"><article className="ft-event"><span className="ft-kicker">PROGRAMMATION</span><h3>Des soirées à vivre ensemble.</h3><p>Musique, rencontres et rendez-vous à thème : la programmation de Bardebabi sera annoncée ici prochainement.</p><a href="#reservation" className="ft-text-link">Faire une demande de réservation</a></article><p className="ft-disclaimer">Aucune date d’événement n’est annoncée pour le moment.</p></div>;
}

function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending"); setMessage("");
    const payload = Object.fromEntries(new FormData(form).entries());
    if ("guests" in payload) payload.guests = Number(payload.guests) as unknown as FormDataEntryValue;
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result: { ok?: boolean; message?: string; error?: string } = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Envoi impossible pour le moment. Réessayez plus tard.");
      setStatus("success"); setMessage(result.message || "Votre demande a été envoyée."); form.reset();
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Envoi impossible pour le moment.");
    }
  };
  return { status, message, submit };
}

function SubmitStatus({ status, message }: { status: string; message: string }) {
  return <p role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"} className={`ft-status ft-${status}`}>{message}</p>;
}

export function ReservationForm() {
  const { status, message, submit } = useSubmit("/api/reservations");
  return <form className="ft-form" onSubmit={submit}>
    <div className="ft-form-grid"><label>Prénom<input name="firstName" autoComplete="given-name" required maxLength={80} /></label><label>Nom<input name="lastName" autoComplete="family-name" required maxLength={80} /></label><label>Téléphone<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={25} /></label><label>E-mail<input name="email" type="email" autoComplete="email" required maxLength={254} /></label><label>Date souhaitée<input name="date" type="date" required /></label><label>Heure souhaitée<input name="time" type="time" required /></label><label>Nombre de personnes<input name="guests" type="number" min="1" max="20" required /></label></div>
    <label>Un détail à partager ? <span className="ft-optional">(facultatif)</span><textarea name="message" rows={3} maxLength={1500} /></label>
    <div className="ft-honeypot" aria-hidden="true"><label>Ne pas remplir ce champ<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="ft-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Envoi en cours…" : "Demander une table"}</button>
    <p className="ft-disclaimer">Une demande ne garantit pas une table. L’établissement vous répondra pour confirmer la disponibilité.</p>
    <SubmitStatus status={status} message={message}/>
  </form>;
}

export function ContactForm() {
  const { status, message, submit } = useSubmit("/api/contact");
  return <form className="ft-form" onSubmit={submit}>
    <div className="ft-form-grid"><label>Votre nom<input name="name" autoComplete="name" required maxLength={120} /></label><label>Votre e-mail<input name="email" type="email" autoComplete="email" required maxLength={254} /></label></div>
    <label>Sujet<select name="subject" required defaultValue=""><option value="" disabled>Choisir un sujet</option><option value="information">Information</option><option value="privatisation">Privatisation</option><option value="evenement">Événement</option><option value="partenariat">Partenariat</option></select></label>
    <label>Votre message<textarea name="message" rows={4} minLength={10} maxLength={2000} required /></label>
    <div className="ft-honeypot" aria-hidden="true"><label>Ne pas remplir ce champ<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="ft-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Envoi en cours…" : "Envoyer le message"}</button>
    <SubmitStatus status={status} message={message}/>
  </form>;
}

export function OpeningHours() {
  return <div className="ft-hours"><h3>Horaires d’ouverture</h3><p>Les horaires officiels seront communiqués prochainement.</p><p className="ft-disclaimer">L’état « ouvert maintenant » sera disponible une fois les horaires confirmés.</p></div>;
}
