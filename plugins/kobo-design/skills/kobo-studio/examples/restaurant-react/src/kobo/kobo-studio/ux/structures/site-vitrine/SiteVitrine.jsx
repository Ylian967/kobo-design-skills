// kobo-studio — structure « site vitrine » (React) : page d'accueil et page intérieure type. Mêmes classes que accueil.html et page-interieure.html.
import React, { useMemo, useState } from 'react';
import { Bouton } from '../../../components/bouton/Bouton.jsx';
import { Champ } from '../../../components/champ/Champ.jsx';
import { Carte, TexteCarte } from '../../../components/carte/Carte.jsx';
import { EtatVide } from '../../../components/etat-vide/EtatVide.jsx';
import { Page, Emplacement, TitreSection, Image, Finale, Faits, FilAriane, Collant } from '../Page.jsx';

const sansAccent = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/**
 * Accueil
 * page : props de <Page>
 * hero : { surtitre, titre, appui, action: { libelle, href }, image }
 * offre : { surtitre, titre, recherche: { libelle, exemple }, vide: { titre, texte },
 *           elements: [{ id, titre, meta, texte, image, href, pied, indisponible, enAvant, mots }] } — un seul élément enAvant
 * maison : { surtitre, titre, image, textes: [paragraphes], faits: [{ terme, valeur }] }
 * suite : { titre, appui, action }
 */
export function Accueil({ page, hero, offre, maison, suite, emplacements }) {
  const [recherche, setRecherche] = useState('');
  const visibles = useMemo(() => {
    const mots = sansAccent(recherche).split(/\s+/).filter(Boolean);
    return offre.elements.filter((e) => { const foin = sansAccent([e.titre, e.meta, e.texte, e.mots].join(' ')); return mots.every((m) => foin.includes(m)); });
  }, [recherche, offre.elements]);
  const etat = visibles.length === 0 ? 'Aucun résultat pour cette recherche.' : `${visibles.length} résultat${visibles.length > 1 ? 's' : ''} affiché${visibles.length > 1 ? 's' : ''}.`;

  const partsHero = {
    kicker: <p className="k-kicker">{hero.surtitre}</p>,
    title: <h1 className="k-h1" id="titre">{hero.titre}</h1>,
    lead: <p className="k-lead">{hero.appui}</p>,
    action: <Bouton href={hero.action.href}>{hero.action.libelle}</Bouton>,
    media: <Image image={hero.image} differee={false} gabarits={emplacements} className="k-hero__side" />,
  };
  const cartes = visibles.map((e) => (
    <Carte key={e.id} titre={e.titre} meta={e.meta} image={e.image} href={e.href} indisponible={e.indisponible}
      variante={e.enAvant ? 'row' : undefined} className={e.enAvant ? 'k-grid__wide' : ''} pied={e.pied}>
      <TexteCarte>{e.texte}</TexteCarte>
    </Carte>
  ));

  return (
    <Page {...page} emplacements={emplacements}>
      <Emplacement nom="hero" comme="section" gabarits={emplacements} parts={partsHero} aria-labelledby="titre">
        <div className="k-wrap k-hero">
          <div className="k-hero__text">{partsHero.kicker}{partsHero.title}{partsHero.lead}{partsHero.action}</div>
          {partsHero.media}
        </div>
      </Emplacement>

      <section className="k-section k-section--rule" id="offre" aria-labelledby="t-offre">
        <div className="k-wrap">
          <div className="k-split sv-head">
            <TitreSection id="t-offre" surtitre={offre.surtitre} titre={offre.titre} gabarits={emplacements} className="k-split__main" />
            <form role="search" className="sv-search" onSubmit={(e) => e.preventDefault()}>
              <Champ libelle={offre.recherche.libelle} type="search" placeholder={offre.recherche.exemple} autoComplete="off" valider={false}
                value={recherche} onChange={(e) => setRecherche(e.target.value)} aide={<span role="status">{etat}</span>} />
            </form>
          </div>
          {visibles.length > 0 ? (
            <Emplacement nom="grid" gabarits={emplacements} parts={{ items: cartes }} className="sv-grid">{cartes}</Emplacement>
          ) : (
            <EtatVide titre={offre.vide.titre} icone="recherche" variante="center" actions={<Bouton variante="secondary" onClick={() => setRecherche('')}>Effacer la recherche</Bouton>}>
              {offre.vide.texte}
            </EtatVide>
          )}
        </div>
      </section>

      <section className="k-section k-section--alt" id="maison" aria-labelledby="t-maison">
        <div className="k-wrap k-split">
          <Image image={maison.image} gabarits={emplacements} />
          <div className="k-split__main k-stack k-stack--lg">
            <TitreSection id="t-maison" surtitre={maison.surtitre} titre={maison.titre} gabarits={emplacements} />
            <div className="k-prose">{maison.textes.map((t) => <p key={t}>{t}</p>)}</div>
            <Faits faits={maison.faits} />
          </div>
        </div>
      </section>

      <Finale titre={suite.titre} appui={suite.appui} action={suite.action} lien={suite.lien} gabarits={emplacements} />
    </Page>
  );
}

/**
 * Page intérieure type
 * page : props de <Page>
 * chemin : [{ libelle, href }] pour le fil d'Ariane (le dernier est la page courante)
 * titre, appui : en-tête de page
 * children : le contenu, en HTML sémantique (h2 avec id, p, ul, <Image>) — rendu dans .k-prose
 * encart : { titre, sommaire: [{ libelle, href }], faits: [{ terme, valeur }], action: { libelle, href } }
 * lectures : { surtitre, titre, elements: [{ id, titre, meta, texte, image, href }] } — deux au plus
 * suite : { titre, appui, action }
 */
export function PageInterieure({ page, chemin, titre, appui, children, encart, lectures, suite, emplacements }) {
  const partsHero = { title: <h1 className="k-h1" id="titre">{titre}</h1>, lead: <p className="k-lead">{appui}</p> };
  const cartes = lectures ? lectures.elements.map((e) => (
    <Carte key={e.id} titre={e.titre} meta={e.meta} image={e.image} href={e.href} variante="row"><TexteCarte>{e.texte}</TexteCarte></Carte>
  )) : [];
  return (
    <Page {...page} emplacements={emplacements}>
      <Emplacement nom="hero" comme="section" gabarits={emplacements} parts={partsHero} className="sv-inner-hero" aria-labelledby="titre">
        <div className="k-wrap k-stack"><FilAriane chemin={chemin} />{partsHero.title}{partsHero.lead}</div>
      </Emplacement>

      <section className="k-section k-section--tight k-section--rule">
        <div className="k-wrap k-split">
          <div className="k-split__main k-prose">{children}</div>
          {encart && (
            <Collant comme="aside" className="k-stack sv-aside" aria-labelledby="t-bref">
              <h2 className="k-h3" id="t-bref">{encart.titre}</h2>
              <nav aria-label="Dans cette page" className="k-toc">
                <ol>{encart.sommaire.map((l) => <li key={l.href}><a className="k-link" href={l.href}>{l.libelle}</a></li>)}</ol>
              </nav>
              <Faits faits={encart.faits} />
              <Bouton href={encart.action.href} bloc>{encart.action.libelle}</Bouton>
            </Collant>
          )}
        </div>
      </section>

      {lectures && (
        <section className="k-section k-section--alt" aria-labelledby="t-lire">
          <div className="k-wrap">
            <TitreSection id="t-lire" surtitre={lectures.surtitre} titre={lectures.titre} gabarits={emplacements} />
            <Emplacement nom="grid" gabarits={emplacements} parts={{ items: cartes }} className="sv-grid">{cartes}</Emplacement>
          </div>
        </section>
      )}

      <Finale titre={suite.titre} appui={suite.appui} action={suite.action} lien={suite.lien} gabarits={emplacements} />
    </Page>
  );
}
