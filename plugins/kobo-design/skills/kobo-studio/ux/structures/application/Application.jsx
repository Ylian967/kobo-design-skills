// kobo-studio — structure « application » (React). Mêmes classes que application.css ; mêmes règles que application.js :
// mesure de la place (pas de point de rupture), barre repliable ou en tiroir, panneau de détail à côté de la liste ou par-dessus.
// Ce fichier : la coquille commune (Coquille, TeteEcran, Touche) et l'écran « liste » (Application).
// Les deux autres écrans : Fiche.jsx et TableauDeBord.jsx.
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Bouton } from '../../../components/bouton/Bouton.jsx';
import { Champ } from '../../../components/champ/Champ.jsx';
import { Modale } from '../../../components/modale/Modale.jsx';
import { Icone } from '../../../components/Icone.jsx';
import { Emplacement } from '../Page.jsx';

export const Touche = ({ children }) => <span className="ap-key">{children}</span>;

const RACCOURCIS = [
  ['Chercher', ['/']], ['Changer de ligne', ['↑', '↓']], ['Première, dernière ligne', ['Début', 'Fin']], ['Cocher la ligne', ['Espace']],
  ['Ouvrir le détail de la ligne', ['Entrée']], ['Fermer le détail, le tiroir, cette fenêtre', ['Échap']], ['Replier ou ouvrir la barre latérale', ['[']], ['Cette aide', ['?']],
];

/**
 * Coquille : en-tête à recherche, barre latérale, zone de contenu, aide des raccourcis. Commune aux trois écrans.
 * marque : { libelle, href }
 * sections : [{ titre, liens: [{ libelle, href, courant, compte, icone: élément }] }] — la barre latérale
 * recherche : { libelle, exemple, valeur, surChangement(texte), surValider() } — champ de l'en-tête (raccourci « / »)
 * raccourcis : [[libellé, [touches]]] — la liste de l'aide « ? »
 * surEchap() : appelé par Échap quand ni la modale ni le tiroir ne sont ouverts (fermer un panneau)
 * emplacements : { nom: (parts, rang) => élément } — gabarits des emplacements frame et backdrop
 * children : le contenu de <main>
 */
export function Coquille({ marque, sections = [], recherche, raccourcis = RACCOURCIS, surEchap, emplacements, children }) {
  const racine = useRef(null), haut = useRef(null), boutonBarre = useRef(null), champ = useRef(null);
  const [etroit, setEtroit] = useState(false);
  const [dessus, setDessus] = useState(false);
  const [repliee, setRepliee] = useState(false);
  const [tiroir, setTiroir] = useState(false);
  const [aide, setAide] = useState(false);
  const [hauteur, setHauteur] = useState(0);

  // Mesure : la largeur de la coquille contre deux repères écrits en rôles (.ap-probe)
  useLayoutEffect(() => {
    const ap = racine.current;
    const mesurer = () => {
      const a = ap.querySelector('.ap-probe--narrow'), b = ap.querySelector('.ap-probe--detail'), zone = ap.querySelector('.ap-work');
      const e = ap.clientWidth < a.offsetWidth;
      setEtroit(e); if (!e) setTiroir(false);
      if (zone) setDessus(zone.parentElement.clientWidth < b.offsetWidth);
      setHauteur(haut.current.offsetHeight);
    };
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(ap); window.addEventListener('resize', mesurer);
    document.fonts?.ready.then(() => { if (ap.isConnected) mesurer(); });
    mesurer();
    return () => { observateur.disconnect(); window.removeEventListener('resize', mesurer); };
  }, []);

  const basculerBarre = () => { if (etroit) setTiroir((o) => !o); else setRepliee((r) => !r); };
  // Tiroir : le focus y entre à l'ouverture et revient au bouton à la fermeture
  const tiroirAvant = useRef(false);
  useEffect(() => {
    if (tiroir) racine.current.querySelector('.ap-side__link[aria-current], .ap-side__link')?.focus();
    else if (tiroirAvant.current) boutonBarre.current?.focus();
    tiroirAvant.current = tiroir;
  }, [tiroir]);

  useEffect(() => {
    const touche = (e) => {
      if (e.key === 'Escape') {
        if (document.querySelector('dialog[open]')) return;
        if (tiroir) { setTiroir(false); return; }
        surEchap?.();
        return;
      }
      const t = e.target;
      if (e.ctrlKey || e.metaKey || e.altKey || t.matches?.('input, select, textarea, [contenteditable]') || document.querySelector('dialog[open]')) return;
      if (e.key === '/' && champ.current) { e.preventDefault(); champ.current.querySelector('input')?.focus(); }
      else if (e.key === '?') { e.preventDefault(); setAide(true); }
      else if (e.key === '[') basculerBarre();
    };
    document.addEventListener('keydown', touche);
    return () => document.removeEventListener('keydown', touche);
  });

  const ouverte = etroit ? tiroir : !repliee;
  return (
    <div className="k-page ap" ref={racine} style={{ '--_top-h': `${hauteur}px` }} data-k-narrow={etroit ? '' : undefined} data-k-drawer={etroit && tiroir ? '' : undefined}
      data-k-side={repliee ? 'min' : undefined} data-k-detail={dessus ? 'over' : 'side'}
      onClick={(e) => { if (tiroir && (e.target.closest('.ap-side__link') || !e.target.closest('.ap-side, [data-ap-side]'))) setTiroir(false); }}>
      <Emplacement nom="backdrop" gabarits={emplacements} aria-hidden="true" />
      <Emplacement nom="frame" gabarits={emplacements} aria-hidden="true" />
      <Bouton href="#contenu" className="k-skip">Aller au contenu</Bouton>
      <div className="k-page__top" ref={haut}>
        <header className="ap-top">
          <Bouton ref={boutonBarre} variante="ghost" iconeSeule data-ap-side aria-expanded={ouverte} aria-controls="ap-side" aria-label="Barre latérale" onClick={basculerBarre}><Icone nom="menu" /></Bouton>
          <a className="ap-brand" href={marque.href}>{marque.libelle}</a>
          {recherche && (
            <form className="ap-search" role="search" ref={champ} onSubmit={(e) => { e.preventDefault(); recherche.surValider?.(); }}>
              <Champ libelle={<span className="k-sr-only">{recherche.libelle}</span>} type="search" placeholder={recherche.exemple} autoComplete="off" value={recherche.valeur} onChange={(e) => recherche.surChangement?.(e.target.value)} />
            </form>
          )}
          <div className="ap-top__end"><Bouton variante="ghost" aria-haspopup="dialog" onClick={() => setAide(true)}>Raccourcis <span className="ap-key" aria-hidden="true">?</span></Bouton></div>
        </header>
      </div>
      <div className="ap-body">
        <nav className="ap-side" id="ap-side" aria-label="Sections de l'application" inert={etroit && !tiroir ? '' : undefined}>
          {sections.map((s) => (
            <React.Fragment key={s.titre}>
              <h2 className="ap-side__title">{s.titre}</h2>
              <ul>{s.liens.map((l) => (
                <li key={l.libelle}><a className="ap-side__link" href={l.href} aria-current={l.courant ? 'page' : undefined} title={l.libelle}>
                  {l.icone}<span className="ap-side__label">{l.libelle}</span>{l.compte !== undefined && <span className="ap-side__count">{l.compte}</span>}
                </a></li>
              ))}</ul>
            </React.Fragment>
          ))}
        </nav>
        <main id="contenu" className="ap-main" tabIndex={-1}>{children}</main>
      </div>
      <span className="ap-probe ap-probe--narrow" aria-hidden="true" /><span className="ap-probe ap-probe--detail" aria-hidden="true" />
      <Modale ouverte={aide} surFermer={() => setAide(false)} titre="Raccourcis clavier" fermableParLeVoile>
        <ul className="ap-keys">{raccourcis.map(([nom, touches]) => <li key={nom}><span>{nom}</span><span>{touches.map((t) => <Touche key={t}>{t}</Touche>)}</span></li>)}</ul>
      </Modale>
    </div>
  );
}

/**
 * TeteEcran : la tête d'un écran (emplacement « title »).
 * entete : { surtitre, titre, resume, action: { libelle, surClic | href }, annonce, mot }
 *   annonce (vrai par défaut) : le résumé est annoncé quand il change (role="status") — à couper quand il ne change pas ;
 *   mot : le mot géant d'un gabarit de titre (data-k-word), sinon pris dans le surtitre
 * secondaires : boutons en plus de l'action principale (éléments), placés avant elle
 */
export function TeteEcran({ entete, secondaires, emplacements }) {
  const parts = {
    kicker: entete.surtitre && <p className="k-kicker">{entete.surtitre}</p>,
    title: <h1 id="titre" data-k-word={entete.mot}>{entete.titre}</h1>,
    lead: entete.resume && <p className="ap-head__sum" role={entete.annonce === false ? undefined : 'status'}>{entete.resume}</p>,
    action: entete.action && <Bouton href={entete.action.href} onClick={entete.action.surClic}>{entete.action.libelle}</Bouton>,
  };
  return (
    <Emplacement nom="title" comme="header" className="ap-head" gabarits={emplacements} parts={parts}>
      <div className="ap-head__text">{parts.kicker}{parts.title}{parts.lead}</div>
      {(parts.action || secondaires) && <div className="ap-head__actions">{secondaires}{parts.action}</div>}
    </Emplacement>
  );
}

/**
 * Application : l'écran « liste » — tête d'écran, filtres, liste, panneau de détail.
 * marque, sections, recherche, raccourcis, emplacements : voir Coquille (emplacements : frame, backdrop, title, grid)
 * entete : voir TeteEcran ; son résumé est annoncé
 * outils : les filtres (éléments), au-dessus de la liste
 * children : la liste — en général <Tableau surOuvrir={…} ouverte={…} />
 * detail : { titre, sousTitre, contenu, actions } ou null — le panneau de détail ; surFermerDetail() le ferme (bouton, Échap)
 */
export function Application({ marque, sections, recherche, entete, outils, children, detail, surFermerDetail, raccourcis, emplacements }) {
  const zone = useRef(null), titreDetail = useRef(null);
  // Panneau de détail : le focus va à son titre quand il s'ouvre ou change de sujet…
  const cle = detail ? detail.titre : null;
  // … et revient à la ligne quand il se ferme (la ligne ouverte est celle qui est dans l'ordre de tabulation)
  const cleAvant = useRef(null);
  useEffect(() => {
    if (cle) titreDetail.current?.focus();
    else if (cleAvant.current) zone.current.querySelector('.ap-list tbody tr[tabindex="0"]')?.focus();
    cleAvant.current = cle;
  }, [cle]);

  return (
    <Coquille marque={marque} sections={sections} recherche={recherche} raccourcis={raccourcis} emplacements={emplacements} surEchap={() => { if (detail) surFermerDetail?.(); }}>
      <TeteEcran entete={entete} emplacements={emplacements} />
      {outils && <div className="ap-tools">{outils}</div>}
      <div className="ap-work" ref={zone}>
        <Emplacement nom="grid" comme="section" className="ap-list" gabarits={emplacements} aria-labelledby="titre">{children}</Emplacement>
        {detail && (
          <aside className="ap-detail" id="ap-detail" aria-labelledby="ap-detail-titre">
            <div className="ap-detail__head">
              <div><h2 className="ap-detail__title" id="ap-detail-titre" tabIndex={-1} ref={titreDetail}>{detail.titre}</h2>{detail.sousTitre && <p className="ap-detail__sub">{detail.sousTitre}</p>}</div>
              <Bouton variante="ghost" iconeSeule aria-label="Fermer le détail" onClick={surFermerDetail}><Icone nom="fermer" /></Bouton>
            </div>
            {detail.contenu}
            {detail.actions && <div className="ap-detail__actions">{detail.actions}</div>}
          </aside>
        )}
      </div>
    </Coquille>
  );
}
