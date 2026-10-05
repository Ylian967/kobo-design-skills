// kobo-studio — gabarits de signature en React.
// Un seul jeu de gabarits pour HTML et React : ce fichier pose, dans un emplacement rendu par React, les gabarits déjà écrits
// pour les pages HTML (ux/templates/<famille>/…). Rien n'est réécrit, donc rien ne peut diverger.
//
//   import '…/ux/templates/gabarits.js';                      // le moteur, puis la famille, puis l'habillage du skill
//   import '…/ux/templates/hero-photo/hero-photo.css';
//   import '…/ux/templates/hero-photo/hero-photo.js';
//   import '…/ux/templates/hero-photo/<skill>.css';
//   import '…/ux/templates/hero-photo/<skill>.js';
//   import { gabarits } from '…/ux/templates/Gabarits.jsx';
//   <Accueil … emplacements={gabarits('<skill>')} />
//
// Familles essayées en React : « hero-photo » et « objet » (3D), dans l'emplacement « hero ». Les autres familles passent par
// le même chemin (option familles) mais n'ont pas été essayées.
//
// Repli : l'emplacement rend d'abord son contenu neutre. Le gabarit ne le remplace que s'il se pose (une photo dans le héros,
// une intensité autre que « off », aucun échec). Sinon le contenu neutre reste, entier. Pour l'objet 3D, sans WebGL ou sans
// réseau, la photo du héros reste seule (c'est le repli de la famille elle-même).
//
// Props qui changent : le gabarit tient les éléments de l'emplacement (les mêmes nœuds, avec leurs écouteurs React) et peut en
// découper le texte. Quand le contenu des « parts » change (texte, image, lien), ou quand data-k-intensity ou data-k-skill
// change sur <html>, l'emplacement est remonté et le gabarit reposé : la page affiche toujours les props en cours. L'entrée du
// gabarit rejoue alors (rien en « reduced »).
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const ESSAYEES = ['hero-photo', 'objet'];

/**
 * Les gabarits d'un skill, sous la forme attendue par la prop « emplacements » d'une structure.
 * skill : identifiant du skill (celui de data-k-skill) ; familles : familles à poser (par défaut celles essayées en React).
 * Rend {} si le moteur ou l'habillage du skill n'est pas importé : la page reste neutre.
 */
export function gabarits(skill, { familles = ESSAYEES } = {}) {
  const moteur = typeof window !== 'undefined' && window.Kobo && window.Kobo.templates;
  if (!moteur || !moteur.defs) return {};
  const sortie = {};
  moteur.defs(skill).filter((d) => familles.includes(d.family)).forEach((d) => {
    const pose = sortie[d.slot] || (sortie[d.slot] = Object.assign(() => null, { dom: [] }));
    pose.dom.push(d);
  });
  return sortie;
}

// Repère dans le contenu neutre les éléments donnés en « parts » et leur pose data-k-part, comme dans les pages HTML.
function marquer(noeud, noms) {
  return React.Children.map(noeud, (enfant) => {
    if (!React.isValidElement(enfant)) return enfant;
    if (noms.has(enfant)) return React.cloneElement(enfant, { 'data-k-part': noms.get(enfant) });
    const hote = typeof enfant.type === 'string' || enfant.type === React.Fragment;
    return hote && enfant.props.children ? React.cloneElement(enfant, undefined, marquer(enfant.props.children, noms)) : enfant;
  });
}

// Empreinte du contenu des parts : textes, adresses, valeurs. Elle change quand ce que le gabarit affiche change.
function empreinte(valeur, fond = 0) {
  if (valeur === null || valeur === undefined || typeof valeur === 'boolean' || typeof valeur === 'function' || fond > 8) return '';
  if (typeof valeur !== 'object') return String(valeur);
  if (Array.isArray(valeur)) return valeur.map((v) => empreinte(v, fond + 1)).join('¦');
  const props = React.isValidElement(valeur) ? valeur.props : valeur;
  return Object.keys(props).filter((k) => k !== 'gabarits').map((k) => `${k}=${empreinte(props[k], fond + 1)}`).join('¦');
}
// Intensité et skill lus sur <html> : un changement repose le gabarit
function useReglages() {
  const lire = () => `${document.documentElement.dataset.kSkill || ''}/${document.documentElement.dataset.kIntensity || 'full'}/${document.documentElement.dataset.kTemplates || ''}`;
  const [reglages, setReglages] = useState(lire);
  useEffect(() => {
    const veille = new MutationObserver(() => setReglages(lire()));
    veille.observe(document.documentElement, { attributes: true, attributeFilter: ['data-k-skill', 'data-k-intensity', 'data-k-templates'] });
    return () => veille.disconnect();
  }, []);
  return reglages;
}

// Où se trouve chaque élément de l'emplacement avant la pose, pour tout remettre en place au retrait.
const releve = (el) => Array.from(el.querySelectorAll('*'), (n) => ({ n, parent: n.parentNode, suivant: n.nextSibling }));
const remettre = (el, neutre, places) => {
  for (let i = places.length - 1; i >= 0; i -= 1) { const p = places[i]; p.parent.insertBefore(p.n, p.suivant && p.suivant.parentNode === p.parent ? p.suivant : null); }
  el.replaceChildren(...neutre);
};
// Les éléments [data-k-part] de l'emplacement ; ceux d'un emplacement imbriqué lui appartiennent (même règle que page.js).
function lire(el) {
  const parts = {};
  el.querySelectorAll('[data-k-part]').forEach((p) => {
    if (p.parentElement.closest('[data-k-slot]') === el) (parts[p.dataset.kPart] = parts[p.dataset.kPart] || []).push(p);
  });
  return parts;
}

/** Emplacement dont le gabarit est un gabarit des pages HTML (rendu par <Emplacement> quand gabarits[nom].dom existe). */
export function EmplacementDom({ nom, defs, parts = {}, rang = 0, comme: Balise = 'div', children, ...reste }) {
  const ref = useRef(null);
  const cle = `${useReglages()}#${empreinte(parts)}`;   // change quand le contenu ou les réglages changent : l'emplacement est remonté
  const noms = useMemo(() => new Map(Object.entries(parts).filter(([, e]) => React.isValidElement(e)).map(([nom2, e]) => [e, nom2])), [parts]);
  useLayoutEffect(() => {
    const el = ref.current, racine = document.documentElement, moteur = window.Kobo && window.Kobo.templates;
    const intensite = racine.dataset.kIntensity || 'full';
    if (!moteur || intensite === 'off' || racine.dataset.kTemplates === 'neutral') return undefined;
    const ctx = { intensity: intensite, still: intensite !== 'full' || matchMedia('(prefers-reduced-motion: reduce)').matches, color: moteur.color };
    const neutre = Array.from(el.childNodes);
    let retirer = null;
    // Comme Kobo.templates.apply() : le dernier gabarit déclaré qui se pose l'emporte.
    [...defs].reverse().some((def) => {
      const places = releve(el), dom = lire(el);
      let sortie = null;
      try {
        if (def.when && !def.when(el, dom)) return false;
        sortie = def.render ? def.render(dom, el, rang, ctx) : null;
      } catch (erreur) { console.warn(`kobo-studio : le gabarit « ${def.family} » n'a pas pu se poser, le contenu neutre reste.`, erreur); sortie = null; }
      if (sortie === null || sortie === undefined) { remettre(el, neutre, places); return false; }
      if (typeof sortie === 'string') { const t = document.createElement('template'); t.innerHTML = sortie; sortie = t.content; }
      el.replaceChildren(sortie);
      el.setAttribute('data-k-filled', ''); el.setAttribute('data-k-gabarit', def.family);
      const familles = new Set((racine.dataset.kGabarits || '').split(' ').filter(Boolean)); familles.add(def.family);
      racine.dataset.kGabarits = [...familles].join(' ');
      // Image absente : pas d'icône cassée ; le fond du gabarit et le texte restent
      el.querySelectorAll('img').forEach((img) => {
        const cassee = () => img.setAttribute('data-k-broken', '');
        if (img.complete && img.naturalWidth === 0 && img.currentSrc) cassee(); else img.addEventListener('error', cassee, { once: true });
      });
      let nettoyer = null;
      try { nettoyer = def.mount ? def.mount(el, ctx) : null; } catch (erreur) { console.warn(`kobo-studio : le mouvement du gabarit « ${def.family} » n'a pas démarré.`, erreur); }
      retirer = () => {
        if (nettoyer) nettoyer();
        el.removeAttribute('data-k-filled'); el.removeAttribute('data-k-gabarit');
        remettre(el, neutre, places);
      };
      return true;
    });
    return () => { if (retirer) retirer(); };
  }, [cle]);   // reposé quand le contenu ou les réglages changent
  return <Balise key={cle} ref={ref} data-k-slot={nom} {...reste}>{marquer(children, noms)}</Balise>;
}
