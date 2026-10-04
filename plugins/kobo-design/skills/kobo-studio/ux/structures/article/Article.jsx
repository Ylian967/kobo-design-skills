// kobo-studio — structure « article / page éditoriale » (React). Mêmes classes et même comportement que article.html.
import React, { useEffect, useState } from 'react';
import { Bouton } from '../../../components/bouton/Bouton.jsx';
import { useNotifications } from '../../../components/notification/Notification.jsx';
import { Page, Emplacement, TitreSection, Image, Finale, FilAriane, Collant } from '../Page.jsx';

/**
 * page : props de <Page>
 * chemin : [{ libelle, href }] pour le fil d'Ariane
 * entete : { surtitre, titre, chapo, auteur, date, duree }
 * couverture : { src, alt, legende, ratio }
 * sommaire : [{ libelle, id }] — les id des <h2> du texte
 * children : le texte, en HTML sémantique (p, h2 avec id, ol, <blockquote className="k-pull">, <Image>) — rendu dans .k-prose
 * lectures : [{ surtitre, titre, href }] — deux au plus
 * suite : { titre, appui, action }
 * À placer dans <ZoneNotifications> (components/notification).
 */
export function Article({ page, chemin, entete, couverture, sommaire = [], children, lectures = [], suite, emplacements }) {
  const [courant, setCourant] = useState(-1);
  const { notifier } = useNotifications();

  // Le sommaire dit le titre en cours de lecture : lecture seule, une fois par image affichée
  useEffect(() => {
    if (!sommaire.length) return undefined;
    let attente = 0;
    const mesurer = () => {
      attente = 0;
      const ligne = window.innerHeight * 0.35;
      let rang = -1;
      sommaire.forEach((s, i) => { const titre = document.getElementById(s.id); if (titre && titre.getBoundingClientRect().top <= ligne) rang = i; });
      setCourant(rang);
    };
    const planifier = () => { if (!attente) attente = requestAnimationFrame(mesurer); };
    window.addEventListener('scroll', planifier, { passive: true });
    window.addEventListener('resize', planifier);
    planifier();
    return () => { window.removeEventListener('scroll', planifier); window.removeEventListener('resize', planifier); cancelAnimationFrame(attente); };
  }, [sommaire]);

  const copier = () => {
    const adresse = window.location.href.split('#')[0];
    const echec = () => notifier({ type: 'error', titre: 'Le lien n’a pas pu être copié', texte: `Copiez-le depuis la barre d’adresse : ${adresse}` });
    if (!navigator.clipboard) { echec(); return; }
    navigator.clipboard.writeText(adresse).then(() => notifier({ type: 'success', titre: 'Lien copié', texte: 'Collez-le où vous voulez le partager.' }), echec);
  };

  const parts = {
    kicker: <p className="k-kicker">{entete.surtitre}</p>,
    title: <h1 className="k-h1 ar-title" id="titre">{entete.titre}</h1>,
    lead: <p className="k-lead">{entete.chapo}</p>,
    meta: <p className="k-note ar-meta"><span>{entete.auteur}</span><span>{entete.date}</span><span>{entete.duree}</span></p>,
  };
  const liens = lectures.map((l) => (
    <li key={l.href}><a href={l.href}><span className="k-kicker">{l.surtitre}</span><span className="k-h3">{l.titre}</span></a></li>
  ));

  return (
    <Page {...page} emplacements={emplacements}>
      <article>
        <Emplacement nom="hero" comme="header" gabarits={emplacements} parts={parts} className="ar-head" aria-labelledby="titre">
          <div className="k-wrap k-stack"><FilAriane chemin={chemin} />{parts.kicker}{parts.title}{parts.lead}{parts.meta}</div>
        </Emplacement>
        {couverture && <Image image={couverture} differee={false} gabarits={emplacements} className="k-wrap ar-cover" />}
        <div className="k-wrap k-split ar-body">
          <Collant comme="aside" className="ar-side" aria-labelledby="t-sommaire">
            <h2 className="k-kicker" id="t-sommaire">Dans cet article</h2>
            <nav className="k-toc" aria-labelledby="t-sommaire">
              <ol>{sommaire.map((s, i) => <li key={s.id}><a className="k-link" href={`#${s.id}`} aria-current={i === courant ? 'true' : undefined}>{s.libelle}</a></li>)}</ol>
            </nav>
            <Bouton variante="secondary" onClick={copier}>Copier le lien de l'article</Bouton>
          </Collant>
          <div className="k-split__main k-prose ar-prose">{children}</div>
        </div>
      </article>

      {lectures.length > 0 && (
        <section className="k-section k-section--tight k-section--rule" aria-labelledby="t-suite-lecture">
          <div className="k-wrap k-wrap--text">
            <TitreSection id="t-suite-lecture" titre="À lire ensuite" taille="k-h3" gabarits={emplacements} />
            <Emplacement nom="grid" comme="ul" gabarits={emplacements} parts={{ items: liens }} className="ar-next">{liens}</Emplacement>
          </div>
        </section>
      )}

      <Finale titre={suite.titre} appui={suite.appui} action={suite.action} gabarits={emplacements} />
    </Page>
  );
}
