// Contenu commun aux deux pages : tout vient de la cliente.
export const TELEPHONE = { libelle: 'Réserver au 04 72 55 01 43', href: 'tel:+33472550143' };
export const ADRESSE = '8 rue des Tables-Claudiennes, 69001 Lyon';
export const PLAN = 'https://www.google.com/maps/search/?api=1&query=8+rue+des+Tables-Claudiennes+69001+Lyon';
export const PAGES = { accueil: './index.html', carte: './carte.html' };

export const page = (courante) => ({
  marque: { libelle: 'Chez Odile', href: PAGES.accueil },
  liens: [
    { libelle: 'Accueil', href: PAGES.accueil, courant: courante === 'accueil' },
    { libelle: 'La carte et les infos pratiques', href: PAGES.carte, courant: courante === 'carte' },
  ],
  action: TELEPHONE,
  pied: {
    mention: `${ADRESSE} · du mardi au samedi, midi et soir`,
    liens: [
      { libelle: 'Accueil', href: PAGES.accueil },
      { libelle: 'La carte et les infos pratiques', href: PAGES.carte },
      { libelle: '04 72 55 01 43', href: TELEPHONE.href },
    ],
  },
});

export const suite = {
  titre: 'Une table cette semaine ?',
  appui: 'On réserve par téléphone, du mardi au samedi. La salle compte 28 couverts : mieux vaut appeler.',
  action: TELEPHONE,
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
