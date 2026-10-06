// Règles de réservation de Chez Odile (validées par la cliente le 6 octobre 2026) et calcul des jours et des heures.
export const COUVERTS = 28;            // par service
export const MAX_PERSONNES = 6;        // au-delà : téléphone
export const JOURS_A_L_AVANCE = 30;
export const DELAI_MINUTES = 60;       // en ligne jusqu'à une heure avant le début du service
export const JOURS_EN_RANGEE = 6;      // ensuite : « Plus tard »

export const SERVICES = [
  { id: 'midi', nom: 'Midi', debut: '12:00', heures: ['12:00', '12:30', '13:00', '13:30'] },
  { id: 'soir', nom: 'Soir', debut: '19:30', heures: ['19:30', '20:00', '20:30', '21:00'] },
];
const OUVERT = [2, 3, 4, 5, 6];        // du mardi au samedi (0 = dimanche)

const deux = (n) => String(n).padStart(2, '0');
export const cleDe = (d) => `${d.getFullYear()}-${deux(d.getMonth() + 1)}-${deux(d.getDate())}`;
export const dateDe = (cle, heure = '00:00') => new Date(`${cle}T${heure}:00`);

// « 12:30 » → « 12 h 30 », « 20:00 » → « 20 h »
export const heureLisible = (h) => { const [a, b] = h.split(':'); return b === '00' ? `${Number(a)} h` : `${Number(a)} h ${b}`; };
const format = (options) => new Intl.DateTimeFormat('fr-FR', options);
export const jourLong = (cle) => format({ weekday: 'long', day: 'numeric', month: 'long' }).format(dateDe(cle));
export const jourCourt = (cle) => format({ weekday: 'short', day: 'numeric', month: 'short' }).format(dateDe(cle));

/** Les jours d'ouverture d'aujourd'hui à J+30 : [cle]. */
export function joursOuverts(maintenant) {
  const jours = [];
  for (let i = 0; i <= JOURS_A_L_AVANCE; i += 1) {
    const d = new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate() + i);
    if (OUVERT.includes(d.getDay())) jours.push(cleDe(d));
  }
  return jours;
}

/** Un service est-il encore réservable en ligne ? Non à moins d'une heure de son début. */
export const serviceOuvert = (cle, service, maintenant) =>
  dateDe(cle, service.debut).getTime() - maintenant.getTime() >= DELAI_MINUTES * 60000;

/** Le jour a-t-il au moins un service encore réservable en ligne ? */
export const jourOuvert = (cle, maintenant) => SERVICES.some((s) => serviceOuvert(cle, s, maintenant));

export const serviceDe = (id) => SERVICES.find((s) => s.id === id);
export const personnes = (n) => `${n} personne${n > 1 ? 's' : ''}`;
/** « mardi 6 octobre à 20 h, pour 2 personnes » */
export const resume = (r) => `${jourLong(r.jour)} à ${heureLisible(r.heure)}, pour ${personnes(r.personnes)}`;
