// kobo-studio — structure « récit en sections collantes » (React). Mêmes classes et même comportement que recit-collant.html.
import React, { useEffect, useRef, useState } from 'react';
import { Page, Emplacement, Image, Finale } from '../Page.jsx';

/**
 * page : props de <Page> (la barre se cache à la descente : barre="cachee" est posé ici)
 * ouverture : { surtitre, titre, appui }
 * chapitres : [{ id, quand, titre, image: { src, alt }, textes: [paragraphes] }]
 * suite : { titre, appui, action: { libelle, href } }
 * emplacements : { nom: (parts, rang) => élément }
 */
export function RecitCollant({ page, ouverture, chapitres, suite, emplacements }) {
  const recit = useRef(null);
  const [courant, setCourant] = useState(0);
  const [progression, setProgression] = useState(0);
  const [dispositions, setDispositions] = useState([]);

  // Lecture seule de la mise en page, une fois par image affichée ; le défilement n'est jamais intercepté
  useEffect(() => {
    let attente = 0;
    const mesurer = () => {
      attente = 0;
      const blocs = Array.from(recit.current.querySelectorAll('.rc-chapter'));
      const milieu = window.innerHeight / 2;
      let enCours = 0;
      const cotes = blocs.map((bloc, i) => {
        if (bloc.getBoundingClientRect().top <= milieu) enCours = i;
        const image = bloc.querySelector('.rc-chapter__media'), texte = bloc.querySelector('.rc-chapter__text');
        return texte.getBoundingClientRect().left > image.getBoundingClientRect().left + 1 ? 'side' : 'stacked';
      });
      const boite = recit.current.getBoundingClientRect(), course = boite.height - window.innerHeight;
      setCourant(enCours);
      setProgression(course > 0 ? Math.min(1, Math.max(0, -boite.top / course)) : 0);
      setDispositions((avant) => (avant.join() === cotes.join() ? avant : cotes));
    };
    const planifier = () => { if (!attente) attente = requestAnimationFrame(mesurer); };
    window.addEventListener('scroll', planifier, { passive: true });
    window.addEventListener('resize', planifier);
    planifier();
    return () => { window.removeEventListener('scroll', planifier); window.removeEventListener('resize', planifier); cancelAnimationFrame(attente); };
  }, [chapitres.length]);

  const sommaire = (
    <nav className="k-hero__side rc-toc" aria-label="Chapitres">
      <ol>{chapitres.map((c) => <li key={c.id}><a href={`#${c.id}`}><span className="rc-toc__when">{c.quand}</span><span>{c.titre}</span></a></li>)}</ol>
    </nav>
  );
  const partsHero = {
    kicker: <p className="k-kicker">{ouverture.surtitre}</p>,
    title: <h1 className="k-h1" id="titre">{ouverture.titre}</h1>,
    lead: <p className="k-lead">{ouverture.appui}</p>,
    toc: sommaire,
  };

  return (
    <Page {...page} barre="cachee" emplacements={emplacements}>
      <Emplacement nom="hero" comme="section" gabarits={emplacements} parts={partsHero} aria-labelledby="titre">
        <div className="k-wrap k-hero">
          <div className="k-hero__text">{partsHero.kicker}{partsHero.title}{partsHero.lead}</div>
          {partsHero.toc}
        </div>
      </Emplacement>

      <div className="rc-story" ref={recit}>
        <nav className="rc-rail" aria-label="Progression dans le récit">
          <ol>
            {chapitres.map((c, i) => (
              <li key={c.id}><a href={`#${c.id}`} aria-current={i === courant ? 'step' : undefined}><span className="k-sr-only">Chapitre {i + 1} : </span>{c.quand}</a></li>
            ))}
          </ol>
          <span className="rc-rail__bar" aria-hidden="true" style={{ '--_progress': progression.toFixed(3) }} />
        </nav>
        {chapitres.map((c, i) => {
          const parts = {
            media: <Image image={c.image} differee={i > 0} gabarits={emplacements} className="rc-chapter__media" />,
            kicker: <p className="k-kicker">Chapitre {i + 1} sur {chapitres.length} · {c.quand}</p>,
            title: <h2 className="k-h2" id={`${c.id}-t`}>{c.titre}</h2>,
            text: c.textes.map((t) => <p key={t}>{t}</p>),
          };
          return (
            <Emplacement key={c.id} nom="chapter" comme="section" gabarits={emplacements} parts={parts} rang={i}
              className="rc-chapter" id={c.id} aria-labelledby={`${c.id}-t`} data-k-layout={dispositions[i]}>
              {parts.media}
              <div className="rc-chapter__text">{parts.kicker}{parts.title}{parts.text}</div>
            </Emplacement>
          );
        })}
      </div>

      <Finale titre={suite.titre} appui={suite.appui} action={suite.action} gabarits={emplacements} />
    </Page>
  );
}
