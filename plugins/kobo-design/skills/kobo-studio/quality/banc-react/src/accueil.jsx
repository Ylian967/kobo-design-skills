import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.js';
import '@k/components/fil-ariane/fil-ariane.css';
import '@k/ux/structures/site-vitrine/site-vitrine.css';
import { Accueil } from '@k/ux/structures/site-vitrine/SiteVitrine.jsx';
import { page, suite, PHOTOS } from './donnees.js';

createRoot(document.getElementById('racine')).render(
  <Accueil page={page('accueil')} suite={suite}
    hero={{ surtitre: 'Guides de haute montagne · Chamonix', titre: 'Dormir sur la neige, avec un guide', appui: 'Bivouacs, raquettes et igloos pour celles et ceux qui ne l’ont jamais fait.', action: { libelle: 'Voir les sorties', href: '#sorties' }, image: PHOTOS.tentes }}
    offre={{ surtitre: 'Les sorties', titre: 'Cet hiver', recherche: { libelle: 'Chercher une sortie', exemple: 'bivouac, raquettes…' }, vide: { titre: 'Aucune sortie ne correspond', texte: 'Essayez un autre mot, ou effacez la recherche.' },
      elements: [
        { id: 'bivouac', titre: 'Bivouac au-dessus des nuages', meta: 'Deux jours', texte: 'Une nuit sous tente à 2 300 m.', image: PHOTOS.tentes, href: 'landing.html', pied: '180 €', enAvant: true, mots: 'tente nuit' },
        { id: 'raquettes', titre: 'Raquettes en forêt', meta: 'Demi-journée', texte: 'Trois heures dans les sapins.', image: PHOTOS.raquettes, href: '#raquettes', pied: '65 €', mots: 'marche' },
        { id: 'cascade', titre: 'Cascade de glace', meta: 'Journée', texte: 'Complet jusqu’en mars.', image: PHOTOS.pente, indisponible: true, pied: 'Complet', mots: 'glace' },
      ] }}
    maison={{ surtitre: 'La maison', titre: 'Deux guides, six personnes par sortie', image: PHOTOS.nuit, textes: ['Maël et Suzanne encadrent chaque sortie.', 'Le matériel est prêté, le rythme est celui du groupe.'], faits: [{ terme: 'Depuis', valeur: '2014' }, { terme: 'Par sortie', valeur: '6 personnes' }] }} />
);
