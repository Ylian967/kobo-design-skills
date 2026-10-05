// Données fictives (« Cordée Brume »), les mêmes que la galerie HTML.
const U = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;
export const PHOTOS = {
  tentes: { src: U('1579624512056-3eb398311205', 1200, 800), alt: 'Deux tentes posées sur la neige face à la mer de nuages au crépuscule', largeur: 1200, hauteur: 800, ratio: '3 / 2' },
  raquettes: { src: U('1576866946478-8d0d015bf3e5', 900, 675), alt: 'Groupe de randonneurs en raquettes dans une forêt de sapins enneigés', largeur: 900, hauteur: 675 },
  pente: { src: U('1418985991508-e47386d96a71', 1400, 1050), alt: 'Pente de neige vierge sous un ciel bleu, un sommet au fond', largeur: 1400, hauteur: 1050 },
  nuit: { src: U('1517824806704-9040b037703b', 1400, 1050), alt: "Tente éclairée de l'intérieur sous la Voie lactée", largeur: 1400, hauteur: 1050 },
};
export const page = (courant) => ({
  marque: { libelle: 'Cordée Brume', href: 'accueil.html' },
  liens: [['Sorties', 'accueil.html'], ['Préparer sa sortie', 'interieure.html'], ['Bivouac', 'landing.html'], ['Journal', 'article.html'], ['Récit', 'recit.html']].map(([libelle, href]) => ({ libelle, href, courant: href.startsWith(courant) })),
  action: { libelle: 'Voir les sorties', href: 'accueil.html#sorties' },
  pied: { mention: 'Guides de haute montagne, Chamonix. Données fictives.', liens: [{ libelle: 'Contact', href: '#contact' }, { libelle: 'Mentions légales', href: '#mentions' }] },
});
export const suite = { titre: 'Jamais dormi sur la neige ?', appui: 'Le sac, le froid, la météo : tout tient sur une page.', action: { libelle: 'Voir les sorties', href: 'accueil.html#sorties' }, lien: { libelle: 'Préparer sa sortie', href: 'interieure.html' } };
