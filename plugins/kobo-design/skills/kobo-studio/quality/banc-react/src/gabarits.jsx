// Banc d'essai des gabarits en React : héros photo (21 skills) et objet 3D (2 skills), dans la landing et l'accueil.
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.js';
import '@k/ux/structures/landing-produit/landing-produit.css';
import '@k/ux/structures/site-vitrine/site-vitrine.css';
import '@k/ux/templates/gabarits.js';
import '@k/ux/templates/titre-geant/titre-geant.css';
import '@k/ux/templates/titre-geant/titre-geant.js';
import '@k/ux/templates/objet/objet.css';
import '@k/ux/templates/objet/objet.js';
import '@k/ux/templates/hero-photo/hero-photo.css';
import '@k/ux/templates/hero-photo/hero-photo.js';
import './habillages.js';
import { gabarits } from '@k/ux/templates/Gabarits.jsx';
import { ZoneNotifications } from '@k/components/notification/Notification.jsx';
import { LandingProduit } from '@k/ux/structures/landing-produit/LandingProduit.jsx';
import { Accueil } from '@k/ux/structures/site-vitrine/SiteVitrine.jsx';
import { page, suite, PHOTOS } from './donnees.js';

const q = new URLSearchParams(location.search), skill = q.get('skill') || 'glass-frame-estate';
const image = q.has('sans-image') ? { src: 'images/absente.jpg', alt: 'Photo absente pour l’essai', largeur: 1200, hauteur: 800 } : { ...PHOTOS.tentes, sujet: '50% 55%', legende: 'Photo provisoire.' };
const emplacements = gabarits(skill);
window.__gabarits = Object.fromEntries(Object.entries(emplacements).map(([k, v]) => [k, v.dom.map((d) => d.family)]));
const hero = { surtitre: 'Bivouac · deux jours', titre: 'Une nuit au-dessus des nuages', appui: 'Six personnes, un guide, une nuit sous tente à 2 300 m.', action: { libelle: 'Demander une place', href: '#demande' }, image };
function Essai() {
  const [clics, setClics] = React.useState(0);
  if (q.get('page') === 'accueil') return (
    <Accueil page={page('accueil')} suite={suite} emplacements={emplacements} hero={hero}
      offre={{ surtitre: 'Les sorties', titre: 'Cet hiver', recherche: { libelle: 'Chercher une sortie', exemple: 'bivouac…' }, vide: { titre: 'Aucune sortie', texte: 'Essayez un autre mot.' }, elements: [{ id: 'a', titre: 'Bivouac', meta: 'Deux jours', texte: 'Une nuit sous tente.', image: PHOTOS.nuit, href: '#a', enAvant: true, mots: '' }] }}
      maison={{ surtitre: 'La maison', titre: 'Deux guides', image: PHOTOS.raquettes, textes: ['Maël et Suzanne encadrent chaque sortie.'], faits: [{ terme: 'Depuis', valeur: '2014' }] }} />
  );
  return (
    <ZoneNotifications>
      <button type="button" id="rerendre" className="k-sr-only" onClick={() => setClics(clics + 1)}>Rendre à nouveau ({clics})</button>
      <LandingProduit page={{ ...page('landing'), action: hero.action }} emplacements={emplacements}
        hero={{ ...hero, titre: clics ? `Une nuit au-dessus des nuages (${clics})` : hero.titre, faits: [{ terme: 'Départ', valeur: 'Samedi 14 h' }, { terme: 'Prix', valeur: '180 €' }, { terme: 'Niveau', valeur: 'Débutant' }] }}
        deroule={{ surtitre: 'Le déroulé', titre: 'Deux jours', appui: 'Rien à prévoir.', image: PHOTOS.raquettes, etapes: [{ quand: '14 h', titre: 'Le col', texte: 'On répartit le matériel.' }] }}
        pratique={{ surtitre: 'Pratique', titre: 'Avant de venir', onglets: [{ id: 'sac', libelle: 'Le sac', contenu: <p>Trente litres.</p> }, { id: 'froid', libelle: 'Le froid', contenu: <p>−12 °C.</p> }] }}
        dates={{ surtitre: 'Les dates', titre: 'Choisir sa date', appui: 'Six places.', choix: [{ valeur: '17-01', libelle: 'Samedi 17 janvier', info: '4 places' }] }}
        demande={{ titre: 'Demander une place', appui: 'Réponse sous deux jours.', libelleEnvoi: 'Envoyer', champs: [{ libelle: 'Votre nom', name: 'nom', required: true }], envoyer: () => Promise.resolve(), succes: { titre: 'Envoyée', texte: '' }, echec: { titre: 'Échec', texte: '' } }} />
    </ZoneNotifications>
  );
}
const racine = createRoot(document.getElementById('racine'));
racine.render(q.has('strict') ? <React.StrictMode><Essai /></React.StrictMode> : <Essai />);
window.__demonter = () => racine.unmount();
