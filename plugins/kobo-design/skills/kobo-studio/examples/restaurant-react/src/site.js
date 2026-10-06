// Contenu commun aux deux pages : tout vient de la cliente.
export const TELEPHONE = { libelle: '04 72 55 01 43', href: 'tel:+33472550143' };
// Écran tactile : le numéro est un lien d'appel. Ailleurs il est écrit, sans lien (un lien tel: ne mène nulle part sur un ordinateur).
export const AU_DOIGT = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
// Quand le téléphone répond : écrit partout où le numéro est proposé pour réserver.
export const QUAND_APPELER = 'Karim répond du mardi au samedi, en dehors du service (12 h – 14 h et 19 h 30 – 22 h).';
export const ADRESSE = '8 rue des Tables-Claudiennes, 69001 Lyon';
export const PLAN = 'https://www.google.com/maps/search/?api=1&query=8+rue+des+Tables-Claudiennes+69001+Lyon';
export const PAGES = { accueil: './index.html', carte: './carte.html', reserver: './reserver.html', maReservation: './ma-reservation.html' };
// L'action principale du site, la même dans la barre, le premier écran et la fin de chaque page.
export const RESERVER = { libelle: 'Réserver une table', href: PAGES.reserver };

export const page = (courante) => ({
  marque: { libelle: 'Chez Odile', href: PAGES.accueil },
  liens: [
    { libelle: 'Accueil', href: PAGES.accueil, courant: courante === 'accueil' },
    { libelle: 'La carte et les infos pratiques', href: PAGES.carte, courant: courante === 'carte' },
    { libelle: 'Ma réservation', href: PAGES.maReservation, courant: courante === 'ma-reservation' },
  ],
  action: RESERVER,
  pied: {
    mention: `${ADRESSE} · du mardi au samedi, midi et soir${AU_DOIGT ? '' : ` · ${TELEPHONE.libelle}`}`,
    liens: [
      { libelle: 'Accueil', href: PAGES.accueil },
      { libelle: 'La carte et les infos pratiques', href: PAGES.carte },
      { libelle: 'Ma réservation', href: PAGES.maReservation },
    ].concat(AU_DOIGT ? [{ libelle: TELEPHONE.libelle, href: TELEPHONE.href }] : []),
  },
});

export const suite = {
  titre: 'Une table cette semaine ?',
  appui: 'On réserve en ligne, de 1 à 6 personnes, jusqu’à 30 jours à l’avance. La salle compte 28 couverts : mieux vaut réserver.'
    + (AU_DOIGT ? '' : ` Plus de 6 personnes : par téléphone, au ${TELEPHONE.libelle}, en dehors du service.`),
  action: RESERVER,
  lien: AU_DOIGT ? { libelle: `Plus de 6 personnes : ${TELEPHONE.libelle}, en dehors du service`, href: TELEPHONE.href } : undefined,
};

export const PLATS = [
  { id: 'oeuf', meta: 'Entrée', titre: 'Œuf mollet, poireaux brûlés, noisettes',
    image: { src: 'images/plat-oeuf.jpg', alt: 'Assiette vue de dessus : un œuf mollet posé sur des légumes verts grillés', largeur: 1200, hauteur: 900 } },
  { id: 'quenelle', meta: 'Plat', titre: 'Quenelle de brochet maison, bisque',
    image: { src: 'images/plat-poisson.jpg', alt: 'Une main verse la sauce sur une assiette de poisson', largeur: 1200, hauteur: 900 } },
  { id: 'joue', meta: 'Plat', titre: 'Joue de bœuf braisée, purée au beurre demi-sel',
    image: { src: 'images/plat-boeuf.jpg', alt: 'Morceaux de bœuf braisé sur une purée, dans une assiette sombre', largeur: 1200, hauteur: 900 } },
  { id: 'poire', meta: 'Dessert', titre: 'Poire pochée au vin de Syrah, sablé',
    image: { src: 'images/plat-poire.jpg', alt: 'Une demi-poire pochée au vin rouge dans son jus', largeur: 1200, hauteur: 900 } },
];
