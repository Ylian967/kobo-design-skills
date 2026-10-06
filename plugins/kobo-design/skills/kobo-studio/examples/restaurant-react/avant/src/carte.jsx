import React from 'react';
import { createRoot } from 'react-dom/client';
import { emplacements, useMouvement } from './styles.js';
import { PageInterieure } from './kobo/kobo-studio/ux/structures/site-vitrine/SiteVitrine.jsx';
import { Image, Faits } from './kobo/kobo-studio/ux/structures/Page.jsx';
import { page, suite, PLATS, PAGES, TELEPHONE, ADRESSE, PLAN } from './site.js';

const salle = { src: 'images/salle.jpg', alt: 'Petite salle de restaurant : tables en bois, mur vert bouteille, lumière tamisée', largeur: 1600, hauteur: 1067,
  legende: 'Photo provisoire : la vraie salle arrive bientôt.' };

const formules = [
  { terme: 'Midi, entrée-plat ou plat-dessert', valeur: '19 €' },
  { terme: 'Midi, entrée-plat-dessert', valeur: '23 €' },
  { terme: 'Soir, menu unique', valeur: '34 €' },
];
const horaires = [
  { terme: 'Du mardi au samedi, midi', valeur: '12 h – 14 h' },
  { terme: 'Du mardi au samedi, soir', valeur: '19 h 30 – 22 h' },
  { terme: 'Dimanche et lundi', valeur: 'Fermé' },
];
const encart = {
  titre: 'En bref',
  sommaire: [
    { libelle: 'Les formules', href: '#formules' },
    { libelle: 'Les plats du moment', href: '#plats' },
    { libelle: 'Les vins', href: '#vins' },
    { libelle: 'Les horaires', href: '#horaires' },
    { libelle: "L'adresse", href: '#adresse' },
  ],
  faits: [
    { terme: 'Ouvert', valeur: 'Mardi au samedi' },
    { terme: 'Réservation', valeur: 'Par téléphone' },
  ],
  action: TELEPHONE,
};
const parService = (meta) => PLATS.filter((p) => p.meta === meta).map((p) => <li key={p.id}>{p.titre}</li>);

function LaCarte() {
  useMouvement();
  return (
    <PageInterieure emplacements={emplacements()} page={page('carte')} chemin={[{ libelle: 'Accueil', href: PAGES.accueil }, { libelle: 'La carte et les infos pratiques' }]}
      titre="La carte et les infos pratiques" appui="Tout est écrit ici : rien à télécharger. La carte change chaque semaine, au gré du marché."
      encart={encart} suite={suite}>
      <h2 className="k-h2" id="formules">Les formules</h2>
      <Faits faits={formules} />

      <h2 className="k-h2" id="plats">Les plats du moment</h2>
      <h3 className="k-h3">Entrée</h3>
      <ul>{parService('Entrée')}</ul>
      <h3 className="k-h3">Plats</h3>
      <ul>{parService('Plat')}</ul>
      <h3 className="k-h3">Dessert</h3>
      <ul>{parService('Dessert')}</ul>

      <h2 className="k-h2" id="vins">Les vins</h2>
      <p>Une trentaine de références, surtout du Beaujolais et de la vallée du Rhône. Au verre dès 5 €.</p>

      <h2 className="k-h2" id="horaires">Les horaires</h2>
      <Faits faits={horaires} />

      <h2 className="k-h2" id="adresse">L'adresse</h2>
      <p>{ADRESSE}, sur les pentes de la Croix-Rousse. <a href={PLAN}>Ouvrir dans Google Maps</a></p>
      <Image image={salle} />
    </PageInterieure>
  );
}

createRoot(document.getElementById('root')).render(<LaCarte />);
