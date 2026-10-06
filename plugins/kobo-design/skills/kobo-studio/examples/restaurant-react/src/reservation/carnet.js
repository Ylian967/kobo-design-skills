// Carnet de réservations SIMULÉ : rien ne part au restaurant, tout reste dans le navigateur du client (localStorage).
// Le jour où un vrai service de réservation existe, seules ces fonctions sont à remplacer par des appels à ce service.
import { COUVERTS, dateDe } from './regles.js';

const CLE = 'chez-odile.reservations';

export function lire() {
  try { const v = JSON.parse(window.localStorage.getItem(CLE)); return Array.isArray(v) ? v : []; } catch (e) { return []; }
}
function ecrire(liste) {
  try { window.localStorage.setItem(CLE, JSON.stringify(liste)); return true; } catch (e) { return false; }
}

/** Couverts encore libres pour un service d'un jour. */
export const couvertsLibres = (jour, service) =>
  COUVERTS - lire().filter((r) => r.jour === jour && r.service === service).reduce((n, r) => n + r.personnes, 0);

/** Les réservations dont l'heure n'est pas passée, la plus proche d'abord. */
export const aVenir = (maintenant) =>
  lire().filter((r) => dateDe(r.jour, r.heure) >= maintenant).sort((a, b) => dateDe(a.jour, a.heure) - dateDe(b.jour, b.heure));

const reference = () => `ODILE-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

/** Enregistre la demande. Rend { reservation } ou { erreur: 'complet' | 'stockage' }. */
export function ajouter(demande) {
  if (couvertsLibres(demande.jour, demande.service) < demande.personnes) return { erreur: 'complet' };
  const reservation = { ...demande, reference: reference() };
  return ecrire([...lire(), reservation]) ? { reservation } : { erreur: 'stockage' };
}

/** Annule : la table est rendue. */
export const retirer = (ref) => ecrire(lire().filter((r) => r.reference !== ref));
