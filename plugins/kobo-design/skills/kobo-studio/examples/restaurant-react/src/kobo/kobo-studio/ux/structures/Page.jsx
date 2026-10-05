// kobo-studio — socle React des structures de page : coquille, emplacements, pièces communes.
// Mêmes classes que page.css ; mêmes règles que page.js (un bloc ne colle que s'il est à côté d'un autre ; la barre peut se cacher).
import React, { useEffect, useRef, useState } from 'react';
import { BarreNav } from '../../components/barre-nav/BarreNav.jsx';
import { MenuMobile } from '../../components/menu-mobile/MenuMobile.jsx';
import { Bouton } from '../../components/bouton/Bouton.jsx';

/**
 * Emplacement : un endroit nommé de la structure. Sans gabarit, il rend son contenu neutre (children).
 * nom : frame | backdrop | hero | title | media | grid | chapter | finale
 * gabarits : l'objet « emplacements » reçu par la structure — { nom: (parts, rang) => élément }
 * parts : les éléments du contenu neutre, déjà construits, que le gabarit redispose (titre, action, image…)
 * comme : balise rendue ('div' par défaut)
 */
export function Emplacement({ nom, gabarits, parts = {}, rang = 0, comme: Balise = 'div', children, ...reste }) {
  const rendu = gabarits && gabarits[nom] ? gabarits[nom](parts, rang) : null;
  return <Balise data-k-slot={nom} data-k-filled={rendu ? '' : undefined} {...reste}>{rendu || children}</Balise>;
}

/** Titre de section (emplacement « title ») : surtitre, titre, phrase d'appui. */
export function TitreSection({ id, surtitre, titre, appui, niveau: Titre = 'h2', taille = 'k-h2', gabarits, className }) {
  const parts = {
    kicker: surtitre && <p className="k-kicker">{surtitre}</p>,
    title: <Titre className={taille} id={id}>{titre}</Titre>,
    lead: appui && <p className="k-lead">{appui}</p>,
  };
  return <Emplacement nom="title" comme="header" gabarits={gabarits} parts={parts} className={className}>{parts.kicker}{parts.title}{parts.lead}</Emplacement>;
}

/** Image de contenu (emplacement « media ») : { src, alt, legende, ratio, largeur, hauteur, sujet } — alt décrit la photo ;
 *  largeur et hauteur réservent la place (attributs width / height) ; sujet : point d'intérêt, « x% y% » (data-k-focus). */
export function Image({ image, differee = true, gabarits, className }) {
  const parts = {
    image: <img src={image.src} alt={image.alt} width={image.largeur} height={image.hauteur} data-k-focus={image.sujet} loading={differee ? 'lazy' : undefined} style={image.ratio ? { '--_ratio': image.ratio } : undefined} />,
    caption: image.legende && <figcaption>{image.legende}</figcaption>,
  };
  return <Emplacement nom="media" comme="figure" gabarits={gabarits} parts={parts} className={className}>{parts.image}{parts.caption}</Emplacement>;
}

/** Dernière section (emplacement « finale ») : une phrase, une action, sur le ton inversé. */
export function Finale({ id = 'suite', titre, appui, action, gabarits, children }) {
  const parts = {
    title: <h2 className="k-h2" id={`${id}-t`}>{titre}</h2>,
    lead: appui && <p className="k-lead">{appui}</p>,
    action: action && <Bouton href={action.href}>{action.libelle}</Bouton>,
  };
  return (
    <Emplacement nom="finale" comme="section" gabarits={gabarits} parts={parts} id={id} aria-labelledby={`${id}-t`} data-k-tone="inverse">
      <div className="k-wrap k-split k-split--center">
        <div className="k-stack k-split__main">{parts.title}{parts.lead}</div>
        <div>{children || parts.action}</div>
      </div>
    </Emplacement>
  );
}

/** Liste de faits : [{ terme, valeur }] */
export const Faits = ({ faits, className = '' }) => (
  <dl className={`k-facts ${className}`.trim()}>{faits.map((f) => <div key={f.terme}><dt>{f.terme}</dt><dd>{f.valeur}</dd></div>)}</dl>
);

/** Fil d'Ariane : [{ libelle, href }] — le dernier élément est la page courante, sans lien. */
export const FilAriane = ({ chemin }) => (
  <nav className="k-crumbs" aria-label="Fil d'Ariane">
    <ol>{chemin.map((c, i) => <li key={c.libelle}>{i < chemin.length - 1 ? <a href={c.href}>{c.libelle}</a> : <span aria-current="page">{c.libelle}</span>}</li>)}</ol>
  </nav>
);

/** Bloc qui colle seulement quand il tient à côté d'un autre bloc de son .k-split (mesure, pas de point de rupture). */
export function Collant({ comme: Balise = 'div', className = '', children, ...reste }) {
  const ref = useRef(null);
  const [aCote, setACote] = useState(false);
  useEffect(() => {
    const el = ref.current, split = el && el.closest('.k-split');
    if (!split) return undefined;
    // « à côté » : un autre bloc du même .k-split occupe la même bande horizontale
    const mesurer = () => {
      const r = el.getBoundingClientRect();
      setACote(Array.from(split.children).some((c) => {
        if (c === el || c.contains(el)) return false;
        const b = c.getBoundingClientRect();
        return b.top < r.bottom - 1 && b.bottom > r.top + 1;
      }));
    };
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(split);
    mesurer();
    return () => observateur.disconnect();
  }, []);
  return <Balise ref={ref} className={`k-sticky ${className}`.trim()} data-k-side={aCote ? '' : undefined} {...reste}>{children}</Balise>;
}

// La barre se cache quand on descend, revient quand on remonte (lecture de scrollY une fois par image affichée)
function useBarreCachee(active) {
  const [cachee, setCachee] = useState(false);
  useEffect(() => {
    if (!active) return undefined;
    let dernier = window.scrollY, attente = 0;
    const lire = () => {
      attente = 0;
      const y = window.scrollY;
      if (Math.abs(y - dernier) > 4) { setCachee(y > dernier && y > 80); dernier = y; }
    };
    const surDefilement = () => { if (!attente) attente = requestAnimationFrame(lire); };
    window.addEventListener('scroll', surDefilement, { passive: true });
    return () => { window.removeEventListener('scroll', surDefilement); cancelAnimationFrame(attente); };
  }, [active]);
  return cachee;
}

/**
 * Page : la coquille commune. Lien d'évitement, barre, menu, <main>, pied, et les emplacements « backdrop » et « frame ».
 * marque : { libelle, href } ; liens : [{ libelle, href, courant }] ; action : { libelle, href } (une seule, celle du héros)
 * barre : 'fixe' (défaut) | 'cachee' (se cache à la descente)
 * pied : { mention, liens: [{ libelle, href }] }
 * emplacements : { nom: (parts, rang) => élément } — transmis aux structures
 */
export function Page({ marque, liens = [], action, barre = 'fixe', pied, emplacements, children }) {
  const [menu, setMenu] = useState(false);
  const cachee = useBarreCachee(barre === 'cachee');
  const haut = useRef(null);
  const [hauteur, setHauteur] = useState(0);
  // Hauteur de la barre, publiée dans --_top-h : ce qui colle sous elle (rail d'un récit) s'écarte quand elle revient
  useEffect(() => {
    const mesurer = () => setHauteur(haut.current.offsetHeight);
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(haut.current);
    mesurer();
    return () => observateur.disconnect();
  }, []);
  return (
    <div className="k-page" style={{ '--_top-h': `${hauteur}px` }}>
      <Emplacement nom="backdrop" gabarits={emplacements} aria-hidden="true" />
      <Emplacement nom="frame" gabarits={emplacements} aria-hidden="true" />
      <Bouton href="#contenu" className="k-skip">Aller au contenu</Bouton>
      <div className="k-page__top" ref={haut} data-k-hidden={cachee && !menu ? '' : undefined}>
        <BarreNav marque={marque} liens={liens} idMenu="menu" menuOuvert={menu} surOuvrirMenu={() => setMenu(true)}
          actions={action && <Bouton href={action.href} className="k-nav__extra">{action.libelle}</Bouton>} />
      </div>
      <MenuMobile id="menu" ouvert={menu} surFermer={() => setMenu(false)} liens={liens}
        pied={action && <Bouton href={action.href} bloc onClick={() => setMenu(false)}>{action.libelle}</Bouton>} />
      <main id="contenu" tabIndex={-1}>{children}</main>
      {pied && (
        <footer className="k-foot">
          <div className="k-wrap k-foot__in">
            <div className="k-stack k-stack--sm"><span className="k-foot__brand">{marque.libelle}</span>{pied.mention && <span>{pied.mention}</span>}</div>
            <ul>{(pied.liens || []).map((l) => <li key={l.href}><a href={l.href}>{l.libelle}</a></li>)}</ul>
          </div>
        </footer>
      )}
    </div>
  );
}
