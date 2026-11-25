import Image from "next/image";
import { ArrowDown, Clock3, MapPin, Music2, Wine } from "lucide-react";
import { MobileMenu } from "./ui";
import { ContactForm, EventsList, MenuCatalog, OpeningHours, ReservationForm } from "./features";

const photos = {
  hero: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=2200&q=85",
  story: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1100&q=85",
  detail: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=850&q=85",
  night: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=85",
};
function Photo({ src, alt, priority = false, sizes = "(max-width: 768px) 100vw, 50vw" }: { src: string; alt: string; priority?: boolean; sizes?: string }) {
  return <Image src={src} alt={alt} fill priority={priority} unoptimized sizes={sizes} className="photo" />;
}
const nav = [["Accueil", "#accueil"], ["À propos", "#histoire"], ["Menus", "#carte"], ["Événements", "#evenements"], ["Réservation", "#reservation"], ["Contact", "#contact"]];
export default function Home() {
  return <main>
    <header className="header" id="accueil">
      <a className="wordmark" href="#accueil" aria-label="Bardebabi, retour à l’accueil">BAR<span>DE</span>BABI<span className="mark-dot">.</span></a>
      <nav className="desktop-nav" aria-label="Navigation principale">{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <a className="button header-cta" href="#reservation">Réserver une table</a><MobileMenu />
    </header>
    <section className="hero" aria-labelledby="hero-title">
      <Photo src={photos.hero} alt="Cocktails dans une atmosphère nocturne" priority sizes="100vw"/><div className="hero-shade"/>
      <div className="hero-content"><span className="eyebrow">BARDÉBABI · BAR & LOUNGE</span><h1 id="hero-title">La nuit a trouvé<br /><em>son adresse.</em></h1><p>Cocktails, musique, jeux et moments à partager.<br/>Entrez, la soirée commence ici.</p><div className="hero-actions"><a className="button button-gold" href="#reservation">Réserver une table</a><a className="button button-outline" href="#carte">Découvrir le menu</a></div><span className="hero-note"><Clock3 size={16} aria-hidden="true"/> Horaires à annoncer prochainement</span></div>
      <a className="scroll" href="#histoire" aria-label="Découvrir Bardebabi"><ArrowDown size={18}/><span>DÉCOUVRIR LE LIEU</span></a><span className="hero-side">UN VERRE · UNE HISTOIRE · UNE SOIRÉE</span>
    </section>
    <section className="intro section-wrap" id="histoire"><div className="intro-image"><Photo src={photos.story} alt="Intérieur chaleureux d’un bar"/></div><div className="intro-copy"><span className="eyebrow">L’ESPRIT BARDEBABI</span><h2>Le plaisir de<br/><em>se retrouver.</em></h2><span className="gold-rule"/><p>Bardebabi, c’est un refuge pour ceux qui aiment laisser durer les bons moments. Un cocktail travaillé, une assiette à partager, une chanson qui rappelle quelque chose : ici, chacun vient comme il est et repart avec une histoire.</p><div className="intro-details"><span><Wine size={20}/> Cocktails & saveurs</span><span><Music2 size={20}/> Musique & rencontres</span></div><a href="#carte" className="text-link">Découvrir nos univers <span aria-hidden="true">↗</span></a></div></section>
    <section className="menu-section" id="carte"><div className="section-wrap"><div className="section-heading"><span className="eyebrow">LA CARTE</span><h2>Choisissez votre <em>plaisir.</em></h2><p>Du premier verre jusqu’à la dernière bouchée. La carte ci-dessous présente des exemples en attendant les produits et tarifs définitifs.</p></div><MenuCatalog/></div></section>
    <section className="mood" aria-labelledby="mood-heading"><div className="mood-image"><Photo src={photos.night} alt="Ambiance d’une soirée musicale" sizes="100vw"/></div><div className="mood-overlay"/><div className="mood-content"><span className="eyebrow">APRÈS LE PREMIER VERRE</span><h2 id="mood-heading">Laissez la soirée<br/><em>vous surprendre.</em></h2><p>Une playlist qui monte, des conversations qui s’étirent, et cette envie de rester encore un peu.</p></div></section>
    <section className="events-section section-wrap" id="evenements"><div className="split-heading"><div><span className="eyebrow">AU PROGRAMME</span><h2>Une soirée,<br/><em>mille façons de vibrer.</em></h2></div><p>Musique live, rencontres et soirées à thème : le programme sera publié ici dès qu’il sera confirmé.</p></div><EventsList/></section>
    <section className="reservation-section" id="reservation"><div className="section-wrap reservation-grid"><div className="reservation-intro"><span className="eyebrow">DEMANDE DE TABLE</span><h2>Préparons ensemble<br/><em>votre soirée.</em></h2><p>Demandez une table en quelques instants. La demande est soumise à disponibilité et ne vaut pas confirmation tant que l’établissement ne l’a pas validée.</p><div className="reservation-visual"><Photo src={photos.detail} alt="Cocktail servi au bar" sizes="(max-width: 768px) 100vw, 40vw"/></div></div><ReservationForm/></div></section>
    <section className="visit-section section-wrap" id="infos"><div className="visit-heading"><span className="eyebrow">INFOS PRATIQUES</span><h2>On se retrouve <em>bientôt.</em></h2><p>Les horaires et l’adresse seront affichés ici dès leur confirmation.</p></div><div className="visit-grid"><div className="visit-card"><Clock3 size={29} strokeWidth={1.5}/><OpeningHours/></div><div className="visit-card"><MapPin size={29} strokeWidth={1.5}/><h3>Nous trouver</h3><p>Adresse de Bardebabi à confirmer.</p><p className="small-note">La carte et l’itinéraire seront disponibles après publication de l’adresse officielle.</p></div></div></section>
    <section className="contact-section" id="contact"><div className="section-wrap contact-grid"><div><span className="eyebrow">ÉCRIVEZ-NOUS</span><h2>Une question ?<br/><em>Parlons-en.</em></h2><p>Un événement, une privatisation ou simplement envie d’en savoir plus ? Laissez-nous un message.</p><p className="small-note">Les coordonnées directes seront publiées après validation par l’établissement.</p></div><ContactForm/></div></section>
    <footer className="footer"><div className="footer-main section-wrap"><div><a className="wordmark" href="#accueil">BAR<span>DE</span>BABI<span className="mark-dot">.</span></a><p>Un verre. Une histoire. Une soirée.</p></div><nav aria-label="Navigation de pied de page">{nav.map(([label, href])=><a key={href} href={href}>{label}</a>)}</nav></div><div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} Bardebabi · Site de démonstration</span><span>Mentions légales et politique de confidentialité à compléter avant lancement.</span></div></footer>
    <a className="mobile-booking button button-gold" href="#reservation">Réserver une table</a>
  </main>;
}
