import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.js';
import '@k/ux/structures/site-vitrine/site-vitrine.css';
import { PageInterieure } from '@k/ux/structures/site-vitrine/SiteVitrine.jsx';
import { Image } from '@k/ux/structures/Page.jsx';
import { page, suite, PHOTOS } from './donnees.js';

createRoot(document.getElementById('racine')).render(
  <PageInterieure page={page('interieure')} suite={suite} titre="Préparer sa sortie" appui="Le sac, le froid, la météo, l'annulation."
    chemin={[{ libelle: 'Accueil', href: 'accueil.html' }, { libelle: 'Sorties', href: 'accueil.html#sorties' }, { libelle: 'Préparer sa sortie' }]}
    encart={{ titre: 'En bref', sommaire: [{ libelle: 'Le sac', href: '#sac' }, { libelle: 'Le froid', href: '#froid' }, { libelle: 'La météo', href: '#meteo' }], faits: [{ terme: 'Altitude', valeur: '2 300 m' }, { terme: 'Nuit', valeur: '−12 °C' }], action: { libelle: 'Voir les sorties', href: 'accueil.html#sorties' } }}
    lectures={{ surtitre: 'À lire aussi', titre: 'Avant de partir', elements: [{ id: 'a', titre: 'Une nuit là-haut', meta: 'Récit', texte: 'Six minutes de lecture.', image: PHOTOS.nuit, href: 'recit.html' }, { id: 'b', titre: 'Choisir ses gants', meta: 'Journal', texte: 'Deux paires valent mieux qu’une.', image: PHOTOS.raquettes, href: 'article.html' }] }}>
    <h2 id="sac">Le sac</h2><p>Trente litres suffisent : une doudoune, deux paires de gants, un thermos. Le duvet et le matelas sont prêtés.</p>
    <Image image={{ ...PHOTOS.pente, legende: 'La pente du premier jour.' }} />
    <h2 id="froid">Le froid</h2><p>La nuit descend à −12 °C. Le duvet prêté est donné pour −15 °C.</p><ul><li>Un bonnet pour dormir</li><li>Des chaussettes sèches</li></ul>
    <h2 id="meteo">La météo</h2><p>Le guide décide la veille à 18 h. La sortie est reportée, ou remboursée si aucune date ne vous convient.</p>
    <p>{'Texte long pour faire défiler la page et vérifier que l’encart reste collé à côté du texte. '.repeat(14)}</p>
  </PageInterieure>
);
