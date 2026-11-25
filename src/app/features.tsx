"use client";

import { FormEvent, useState } from "react";

const menuCategories = [
  { name: "Cocktails", description: "Des créations signature et des classiques à partager.", examples: ["Cocktails signature", "Cocktails classiques"] },
  { name: "Spiritueux", description: "Une sélection pour accompagner la soirée.", examples: ["Whiskies", "Rhums"] },
  { name: "Vins", description: "Des bouteilles à découvrir autour de la table.", examples: ["Vins rouges", "Vins blancs & rosés"] },
  { name: "Bières & softs", description: "Des alternatives pour toutes les envies.", examples: ["Bières", "Sans alcool"] },
  { name: "Snacks & tapas", description: "Quelques bouchées pour prolonger le moment.", examples: ["À partager", "Petites faims"] },
  { name: "Desserts", description: "Une touche sucrée pour terminer.", examples: ["Douceurs du moment"] },
];

export function MenuCatalog() {
  const [selected, setSelected] = useState(0);
  const active = menuCategories[selected];
  return <div className="ft-menu">
    <div className="ft-tabs" role="tablist" aria-label="Catégories de la carte">
      {menuCategories.map((category, index) => <button key={category.name} type="button" role="tab" id={`ft-tab-${index}`} aria-selected={selected === index} aria-controls="ft-menu-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => { if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return; event.preventDefault(); const next = (index + (event.key === "ArrowRight" ? 1 : -1) + menuCategories.length) % menuCategories.length; setSelected(next); document.getElementById(`ft-tab-${next}`)?.focus(); }}>{category.name}</button>)}
    </div>
    <div className="ft-menu-panel" role="tabpanel" id="ft-menu-panel" aria-labelledby={`ft-tab-${selected}`} tabIndex={0}>
      <div><span className="ft-kicker">LA CARTE</span><h3>{active.name}</h3><p>{active.description}</p></div>
      <ul>{active.examples.map(item => <li key={item}><span>{item}</span><span className="ft-price">À découvrir sur place</span></li>)}</ul>
    </div>
    <p className="ft-disclaimer">Carte indicative de démonstration. Produits, disponibilités et prix à confirmer par Bardebabi.</p>
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
