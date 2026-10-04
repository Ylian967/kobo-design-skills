// kobo-studio — Carte (React). Mêmes classes et mêmes états que carte.css.
import React from 'react';
import { Icone } from '../Icone.jsx';

/**
 * titre : texte du titre ; niveau : balise de titre ('h3' par défaut)
 * href : rend la carte entièrement cliquable (le lien du titre couvre la carte)
 * image : { src, alt } — alt décrit la photo ; alt="" seulement pour un décor
 * meta : surtitre ; pied : contenu du pied (actions, prix)
 * selectionnee : bordure appuyée + mention écrite ; indisponible : aria-disabled
 * variante : 'flat' | 'row' ; signature : 'crochets' (variante à la demande d'acid-scan-security)
 */
export function Carte({
  titre, niveau: Titre = 'h3', href, image, meta, pied, selectionnee = false, indisponible = false,
  variante, signature, className = '', children, ...reste
}) {
  const classes = [
    'k-card', href && !indisponible && 'k-card--link', variante && `k-card--${variante}`,
    signature && `k-card--${signature}`, className,
  ].filter(Boolean).join(' ');
  return (
    <article className={classes} aria-current={selectionnee ? 'true' : undefined} aria-disabled={indisponible ? 'true' : undefined} {...reste}>
      {image && <div className="k-card__media"><img src={image.src} alt={image.alt} loading="lazy" /></div>}
      <div className="k-card__body">
        {meta && <span className="k-card__meta">{meta}</span>}
        <Titre className="k-card__title">{href && !indisponible ? <a href={href}>{titre}</a> : titre}</Titre>
        {children}
        {selectionnee && <span className="k-card__flag"><Icone nom="coche" />Sélectionnée</span>}
      </div>
      {pied && <div className="k-card__foot">{pied}</div>}
    </article>
  );
}

export const TexteCarte = ({ children }) => <p className="k-card__text">{children}</p>;
export const EncartCarte = ({ children }) => <div className="k-card__inset">{children}</div>;
