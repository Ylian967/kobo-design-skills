// Feuilles et gabarits du kit, dans l'ordre donné par kit.py : la couche de signature est la dernière feuille.
import './kobo/kobo-studio/contract/maps/retro-mission-poster.css';
import './kobo/kobo-studio/components/socle.css';
import './kobo/kobo-studio/components/bouton/bouton.css';
import './kobo/kobo-studio/components/carte/carte.css';
import './kobo/kobo-studio/components/barre-nav/barre-nav.css';
import './kobo/kobo-studio/components/menu-mobile/menu-mobile.css';
import './kobo/kobo-studio/components/fil-ariane/fil-ariane.css';
import './kobo/kobo-studio/ux/structures/page.css';
import './kobo/kobo-studio/ux/structures/site-vitrine/site-vitrine.css';
import './kobo/kobo-studio/ux/templates/cadre/cadre.css';
import './kobo/kobo-studio/ux/templates/cadre/retro-mission-poster.css';
import './kobo/kobo-studio/ux/templates/hero-photo/hero-photo.css';
import './kobo/kobo-studio/ux/templates/hero-photo/retro-mission-poster.css';
import './kobo/kobo-studio/components/signatures/retro-mission-poster.css';
import './kobo/kobo-studio/components/motion/motion.css';
import './kobo/kobo-studio/components/motion/retro-mission-poster.css';
import './kobo/kobo-studio/ux/templates/gabarits.js';
import './kobo/kobo-studio/ux/templates/cadre/cadre.js';
import './kobo/kobo-studio/ux/templates/cadre/retro-mission-poster.js';
import './kobo/kobo-studio/ux/templates/hero-photo/hero-photo.js';
import './kobo/kobo-studio/ux/templates/hero-photo/retro-mission-poster.js';
import './kobo/kobo-studio/components/motion/motion.js';
import './kobo/kobo-studio/components/motion/retro-mission-poster.js';
import { gabarits } from './kobo/kobo-studio/ux/templates/Gabarits.jsx';

// Couche mouvement du skill : useMouvement() est appelé dans chaque page.
export { useMouvement } from './kobo/kobo-studio/components/motion/Mouvement.jsx';

// Gabarits de signature du skill : le héros-affiche et le cadre de page.
export const emplacements = () => gabarits('retro-mission-poster', { familles: ['hero-photo', 'cadre'] });
