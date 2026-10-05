import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.js';
import '@k/ux/structures/article/article.css';
import { ZoneNotifications } from '@k/components/notification/Notification.jsx';
import { Article } from '@k/ux/structures/article/Article.jsx';
import { Image } from '@k/ux/structures/Page.jsx';
import { page, suite, PHOTOS } from './donnees.js';

createRoot(document.getElementById('racine')).render(
  <ZoneNotifications>
    <Article page={page('article')} suite={suite}
      chemin={[{ libelle: 'Accueil', href: 'accueil.html' }, { libelle: 'Journal', href: '#journal' }, { libelle: 'Choisir ses gants' }]}
      entete={{ surtitre: 'Journal · matériel', titre: 'Choisir ses gants pour une nuit dehors', chapo: 'Deux paires valent mieux qu’une : voici pourquoi.', auteur: 'Suzanne Albrecht', date: '8 janvier 2027', duree: '4 minutes' }}
      couverture={{ ...PHOTOS.pente, legende: 'Le col, un matin de janvier.', ratio: '2 / 1' }}
      sommaire={[{ libelle: 'La paire fine', id: 'fine' }, { libelle: 'La paire chaude', id: 'chaude' }, { libelle: 'Les erreurs', id: 'erreurs' }]}
      lectures={[{ surtitre: 'Récit', titre: 'Une nuit là-haut', href: 'recit.html' }, { surtitre: 'Guide', titre: 'Préparer sa sortie', href: 'interieure.html' }]}>
      <h2 id="fine">La paire fine</h2><p>{'Elle sert à monter la tente, à régler un bâton, à ouvrir un thermos. '.repeat(6)}</p>
      <blockquote className="k-pull">Des doigts qui bougent restent chauds.</blockquote>
      <h2 id="chaude">La paire chaude</h2><p>{'Des moufles, pas des gants : les doigts se réchauffent entre eux. '.repeat(6)}</p>
      <Image image={{ ...PHOTOS.nuit, legende: 'Le camp, à 22 h.' }} />
      <h2 id="erreurs">Les erreurs</h2><ol><li>Une seule paire.</li><li>Des gants trop serrés.</li><li>Les laisser dehors la nuit.</li></ol><p>{'On les garde au fond du duvet. '.repeat(10)}</p>
    </Article>
  </ZoneNotifications>
);
