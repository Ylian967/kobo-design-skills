// kobo-studio — Menu déroulant (React). Mêmes classes et même comportement que menu-deroulant.css / menu-deroulant.js.
import React, { useEffect, useId, useRef, useState, useLayoutEffect } from 'react';
import { Bouton } from '../bouton/Bouton.jsx';
import { Icone } from '../Icone.jsx';

/**
 * libelle : texte du bouton (un nom d'ensemble : « Actions », « Trier par ») ; variante : variante du bouton ('secondary' par défaut)
 * elements : [{ id, libelle, surChoix, icone, indice, danger, desactive, href }] ; un séparateur : { separateur: true } ; un intertitre : { titre }
 * choix, surChangement : si « choix » est donné, les éléments sont des menuitemradio et celui dont l'id vaut « choix » est coché
 * alignement : 'start' | 'end' ; sans valeur, le menu s'aligne à droite quand il dépasse de l'écran
 */
export function MenuDeroulant({ libelle, elements, variante = 'secondary', choix, surChangement, alignement, iconeSeule, nom }) {
  const id = useId();
  const racine = useRef(null), bouton = useRef(null), items = useRef([]);
  const [ouvert, setOuvert] = useState(false);
  const [place, setPlace] = useState({});
  const actifs = () => items.current.filter((n) => n && n.getAttribute('aria-disabled') !== 'true');
  const fermer = (focus) => { setOuvert(false); if (focus) bouton.current?.focus(); };
  const versDernier = useRef(false);
  const ouvrir = (dernier) => { versDernier.current = !!dernier; setPlace({}); setOuvert(true); };
  // À l'ouverture : placement mesuré et focus donné tout de suite, sans attendre une image (un onglet masqué n'en dessine pas)
  useLayoutEffect(() => {
    if (!ouvert) return;
    const menu = racine.current?.querySelector('.k-dropdown__menu');
    if (menu && !alignement) {
      const r = menu.getBoundingClientRect(), doc = document.documentElement;
      setPlace({ fin: r.right > doc.clientWidth, haut: r.bottom > doc.clientHeight && r.height < bouton.current.getBoundingClientRect().top });
    }
    const liste = actifs();
    liste[versDernier.current ? liste.length - 1 : 0]?.focus();
  }, [ouvert]);
  useEffect(() => {
    if (!ouvert) return undefined;
    const dehors = (e) => { if (!racine.current?.contains(e.target)) fermer(false); };
    document.addEventListener('pointerdown', dehors); document.addEventListener('focusin', dehors);
    return () => { document.removeEventListener('pointerdown', dehors); document.removeEventListener('focusin', dehors); };
  }, [ouvert]);
  const choisir = (el) => { if (el.desactive) return; fermer(true); el.surChoix?.(); if (choix !== undefined) surChangement?.(el.id); };
  const clavier = (e) => {
    const liste = actifs(), i = liste.indexOf(document.activeElement);
    let cible = { ArrowDown: liste[(i + 1) % liste.length], ArrowUp: liste[(i - 1 + liste.length) % liste.length], Home: liste[0], End: liste[liste.length - 1] }[e.key];
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); fermer(true); return; }
    if (e.key === 'Tab') { fermer(false); return; }
    if (!cible && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== ' ') {
      const c = e.key.toLowerCase();
      cible = [...liste.slice(i + 1), ...liste.slice(0, i + 1)].find((n) => n.textContent.trim().toLowerCase().startsWith(c));
    }
    if (cible) { e.preventDefault(); cible.focus(); }
  };
  const alignerFin = alignement === 'end' || place.fin;
  let rang = -1;
  return (
    <div className="k-dropdown" ref={racine} data-k-align={alignerFin ? 'end' : undefined} data-k-place={place.haut ? 'top' : undefined}>
      <Bouton variante={variante} iconeSeule={iconeSeule} ref={bouton} aria-haspopup="menu" aria-expanded={ouvert} aria-controls={`${id}-menu`} aria-label={nom}
        onClick={() => (ouvert ? fermer(true) : ouvrir(false))}
        onKeyDown={(e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); ouvrir(e.key === 'ArrowUp'); } }}>
        {libelle}{!iconeSeule && <span className="k-dropdown__caret" aria-hidden="true" />}
      </Bouton>
      <ul className="k-dropdown__menu" role="menu" id={`${id}-menu`} aria-label={nom || (typeof libelle === 'string' ? libelle : undefined)} hidden={!ouvert} onKeyDown={clavier}>
        {elements.map((el, i) => {
          if (el.separateur) return <li key={`s-${i}`} role="separator" className="k-dropdown__sep" />;
          if (el.titre) return <li key={`t-${i}`} role="presentation" className="k-dropdown__label">{el.titre}</li>;
          rang += 1;
          const n = rang, radio = choix !== undefined;
          const commun = {
            className: `k-dropdown__item${el.danger ? ' k-dropdown__item--danger' : ''}`, role: radio ? 'menuitemradio' : 'menuitem', tabIndex: -1,
            'aria-checked': radio ? el.id === choix : undefined, 'aria-disabled': el.desactive || undefined, ref: (node) => { items.current[n] = node; },
          };
          const contenu = <>{radio && <span className="k-dropdown__tick" aria-hidden="true" />}{el.icone && <Icone nom={el.icone} />}{el.libelle}{el.indice && <span className="k-dropdown__hint">{el.indice}</span>}</>;
          return (
            <li key={el.id} role="none">
              {el.href && !el.desactive ? <a {...commun} href={el.href} onClick={() => fermer(false)}>{contenu}</a> : <button type="button" {...commun} onClick={() => choisir(el)}>{contenu}</button>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
