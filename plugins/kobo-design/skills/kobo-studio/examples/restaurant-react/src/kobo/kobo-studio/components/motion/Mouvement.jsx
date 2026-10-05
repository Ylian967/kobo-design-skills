// kobo-studio — couche mouvement en React.
// Le moteur et la couche du skill sont les mêmes fichiers que pour les pages HTML : on les importe, puis on appelle ce crochet
// dans le composant de la page. Il relance la recherche des éléments après chaque rendu (un élément déjà pris est ignoré).
//
//   import '…/components/motion/motion.css';
//   import '…/components/motion/<skill>.css';      // après la couche de signature
//   import '…/components/motion/motion.js';
//   import '…/components/motion/<skill>.js';
//   import { useMouvement } from '…/components/motion/Mouvement.jsx';
//   function Accueil() { useMouvement(); return <Page …>…</Page>; }
//
// Limite : un texte découpé ou décodé par la couche (titres mot à mot, décodage) est réécrit hors de React. Ne l'appliquer qu'à
// des textes qui ne changent pas après le premier rendu ; pour un texte piloté par un état, donner data-k-reveal="aucun" à l'élément.
import { useEffect } from 'react';

export function useMouvement() {
  useEffect(() => {
    const moteur = typeof window !== 'undefined' && window.Kobo && window.Kobo.motion;
    if (moteur) moteur.start();
  });
}
