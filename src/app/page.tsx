import Image from "next/image";
import { ArrowDown, Menu as MenuIcon, Music2, Wine } from "lucide-react";
import { MobileMenu } from "./ui";

const photos = {
  hero: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=2200&q=85",
  story: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1100&q=85",
  drinks: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=900&q=85",
  cocktails: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=85",
  food: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=900&q=85",
  event: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=85",
};
const items = [
  { name: "Cocktails signature", text: "Des créations pour prolonger la soirée.", image: photos.cocktails, icon: Wine },
  { name: "À grignoter", text: "Des assiettes à savourer ensemble.", image: photos.food, icon: MenuIcon },
  { name: "L'ambiance", text: "Une bande-son qui donne envie de rester.", image: photos.drinks, icon: Music2 },
];
function Photo({ src, alt, priority = false, sizes = "(max-width: 768px) 100vw, 50vw" }: { src: string; alt: string; priority?: boolean; sizes?: string }) {
  return <Image src={src} alt={alt} fill priority={priority} unoptimized sizes={sizes} className="photo" />;
}
export default function Home() {
  return <main>
    <header className="header" id="accueil"><a className="wordmark" href="#accueil" aria-label="Bardebabi, retour à l'accueil">BAR<span>DE</span>BABI<span className="mark-dot">.</span></a><nav className="desktop-nav" aria-label="Navigation principale"><a href="#histoire">Le lieu</a><a href="#carte">La carte</a><a href="#ambiance">L’ambiance</a><a href="#contact">Contact</a></nav><a className="header-cta" href="#contact">Nous trouver</a><MobileMenu /></header>
    <section className="hero" aria-labelledby="hero-title"><Photo src={photos.hero} alt="Table dressée dans un restaurant chaleureux" priority sizes="100vw" /><div className="hero-shade" /><div className="hero-content"><span className="eyebrow light">UN LIEU POUR SE RETROUVER</span><h1 id="hero-title">Les belles soirées<br />commencent <em>ici.</em></h1><p>Un verre, de la musique, des histoires à raconter.<br />Bienvenue chez Bardebabi.</p><a className="button button-light" href="#histoire">Découvrir le lieu</a></div><a className="scroll" href="#histoire" aria-label="Découvrir la suite"><ArrowDown size={18}/><span>FAITES DÉFILER</span></a><span className="hero-side">BARDÉBABI · BAR & RENCONTRES</span></section>
    <section className="intro section-wrap" id="histoire"><div className="intro-label"><span className="eyebrow">NOTRE HISTOIRE</span><span className="fine-line"/></div><div className="intro-copy"><h2>Un endroit où l’on<br /><em>prend le temps.</em></h2><p>Bardebabi, c’est l’envie simple de se retrouver. De s’installer, de partager un verre et de laisser la soirée suivre son cours. Une atmosphère chaleureuse, des saveurs à découvrir et toujours une bonne raison de revenir.</p><a href="#carte" className="text-link">Explorer la carte <span aria-hidden="true">↗</span></a></div><div className="intro-image"><Photo src={photos.story} alt="Intérieur accueillant d'un bar et restaurant" /></div></section>
    <section className="offer" id="carte"><div className="section-heading"><span className="eyebrow">À DÉCOUVRIR</span><h2>À chaque moment,<br /><em>son plaisir.</em></h2><p>Des envies différentes, une même invitation : profiter de l’instant.</p></div><div className="cards">{items.map(({name,text,image,icon:Icon})=><article className="card" key={name}><div className="card-image"><Photo src={image} alt={name} sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="card-content"><Icon size={20} strokeWidth={1.3} aria-hidden="true"/><h3>{name}</h3><p>{text}</p></div></article>)}</div><p className="demo-note">Carte et tarifs à venir · Visuels d’illustration</p></section>
    <section className="mood" id="ambiance"><div className="mood-image"><Photo src={photos.event} alt="Lumières et public lors d'une soirée musicale" sizes="100vw" /></div><div className="mood-overlay"/><div className="mood-content"><span className="eyebrow light">PLUS QU’UN RENDEZ-VOUS</span><h2>Restez pour<br /><em>l’ambiance.</em></h2><p>Les discussions qui s’étirent, les morceaux que l’on reconnaît, les soirées que l’on n’avait pas prévues. Ici, chaque instant a sa place.</p><a className="button button-outline" href="#contact">Nous contacter</a></div></section>
    <section className="contact section-wrap" id="contact"><div><span className="eyebrow">ON SE RETROUVE ?</span><h2>La prochaine soirée<br /><em>commence avec vous.</em></h2></div><div className="contact-details"><p>Les horaires, l’adresse et les coordonnées de Bardebabi seront annoncés prochainement.</p><p className="demo-note">Page de démonstration · Aucune réservation en ligne pour le moment.</p></div></section>
    <footer className="footer"><div className="footer-main"><a className="wordmark" href="#accueil">BAR<span>DE</span>BABI<span className="mark-dot">.</span></a><p>Les moments qu’on aime partager.</p><nav aria-label="Navigation de pied de page"><a href="#histoire">Le lieu</a><a href="#carte">La carte</a><a href="#ambiance">L’ambiance</a><a href="#contact">Contact</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Bardebabi · Site de démonstration</span><span>Créé pour les beaux moments.</span></div></footer>
  </main>;
}
