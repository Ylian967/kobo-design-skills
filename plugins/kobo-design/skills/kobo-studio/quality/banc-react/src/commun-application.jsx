// Banc d'essai : ce que les trois écrans de la structure « application » partagent (barre latérale, recherche fictive).
import React from 'react';
import './styles.js';
import '@k/ux/structures/application/application.css';
import { Icone } from '@k/components/Icone.jsx';

export const marque = { libelle: 'Cordée Brume · guides', href: 'application.html' + location.search };
const lien = (libelle, page, icone, courant, compte) => ({ libelle, href: page + location.search, icone: <Icone nom={icone} />, courant: courant === libelle, compte });
export const sections = (courant) => [{ titre: 'Suivi', liens: [lien('Tableau de bord', 'tableau-de-bord.html', 'info', courant), lien('Réservations', 'application.html', 'menu', courant, 8), lien('Clients', 'application.html', 'recherche', courant)] }];
// Hors de la liste, Entrée dans la recherche mène à l'écran de liste
export const versLaListe = (q) => { if (q.trim()) location.href = 'application.html' + (location.search ? location.search + '&' : '?') + 'q=' + encodeURIComponent(q.trim()); };
