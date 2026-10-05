import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.js';
import '@k/ux/structures/recit-collant/recit-collant.css';
import { RecitCollant } from '@k/ux/structures/recit-collant/RecitCollant.jsx';
import { page, suite, PHOTOS } from './donnees.js';

const P = [PHOTOS.raquettes, PHOTOS.pente, PHOTOS.tentes, PHOTOS.nuit];
createRoot(document.getElementById('racine')).render(
  <RecitCollant page={page('recit')} suite={suite} ouverture={{ surtitre: 'Récit · 6 minutes de lecture', titre: 'Une nuit là-haut', appui: 'Du parking du col au lever du jour.' }}
    chapitres={['Le parking du col', 'La montée', 'Le camp', 'La nuit'].map((titre, i) => ({ id: `ch-${i + 1}`, quand: ['15 h', '16 h', '18 h', '23 h'][i], titre, image: P[i], textes: ['On répartit le matériel entre les sacs. '.repeat(5), 'Le guide vérifie les raquettes une à une. '.repeat(5)] }))} />
);
