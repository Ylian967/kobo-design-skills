import { BoutonAppel } from './Appel.jsx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { emplacements, useMouvement } from './styles.js';
import { PageInterieure } from './kobo/kobo-studio/ux/structures/site-vitrine/SiteVitrine.jsx';
import { Image, Faits } from './kobo/kobo-studio/ux/structures/Page.jsx';
import { Bouton } from './kobo/kobo-studio/components/bouton/Bouton.jsx';
import { page, suite, PLATS, PAGES, TELEPHONE, QUAND_APPELER, RESERVER, ADRESSE, PLAN } from './site.js';

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
    { libelle: 'Le téléphone', href: '#telephone' },
    { libelle: "L'adresse", href: '#adresse' },
  ],
  faits: [
    { terme: 'Ouvert', valeur: 'Mardi au samedi' },
    { terme: 'Réservation', valeur: 'En ligne, 1 à 6 personnes' },
  ],
  action: RESERVER,
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

      <h2 className="k-h2" id="telephone">Le téléphone</h2>
      <p>Pour une table de plus de 6 personnes, ou pour le jour même quand la réservation en ligne est fermée. {QUAND_APPELER}</p>
      <p><BoutonAppel /></p>

      <h2 className="k-h2" id="adresse">L'adresse</h2>
      <p>{ADRESSE}, sur les pentes de la Croix-Rousse.</p>
      <p><Bouton href={PLAN} variante="secondary">Ouvrir dans Google Maps</Bouton></p>
      <Image image={salle} />
    </PageInterieure>
  );
}

createRoot(document.getElementById('root')).render(<LaCarte />);
