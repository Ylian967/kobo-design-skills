// kobo-studio — Bouton (React). Mêmes classes et mêmes états que bouton.css.
import React from 'react';

/**
 * variante : 'primary' (défaut) | 'secondary' | 'ghost' | 'danger'
 * pilule, bloc, iconeSeule : formes
 * signature : 'crochets' — variante à la demande d'acid-scan-security. Les couches de signature (signatures/<skill>.css)
 *             s'appliquent seules, sans prop : il suffit de charger le fichier du skill.
 * enCours : aria-busy ; le libellé devient libelleEnCours et le bouton ne réagit plus
 * href : rend un lien <a> avec l'apparence du bouton
 */
export function Bouton({
  variante = 'primary', pilule = false, bloc = false, iconeSeule = false, signature,
  enCours = false, libelleEnCours = 'En cours…', desactive = false, enfonce,
  href, type = 'button', className = '', children, ...reste
}) {
  const classes = [
    'k-btn',
    variante !== 'primary' && `k-btn--${variante}`,
    pilule && 'k-btn--pill', bloc && 'k-btn--block', iconeSeule && 'k-btn--icon',
    signature && `k-btn--${signature}`, className,
  ].filter(Boolean).join(' ');
  const contenu = (
    <>
      <span className="k-btn__spinner" aria-hidden="true" />
      {enCours ? libelleEnCours : children}
    </>
  );
  if (href && !desactive) {
    return <a className={classes} href={href} aria-busy={enCours || undefined} {...reste}>{contenu}</a>;
  }
  return (
    <button
      className={classes} type={type} disabled={desactive}
      aria-busy={enCours || undefined} aria-pressed={enfonce === undefined ? undefined : enfonce}
      {...reste}
    >
      {contenu}
    </button>
  );
}
