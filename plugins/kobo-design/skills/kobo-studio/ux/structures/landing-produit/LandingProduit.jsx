// kobo-studio — structure « landing produit » (React). Mêmes sections, mêmes classes et mêmes états que landing-produit.html.
import React, { useState } from 'react';
import { Bouton } from '../../../components/bouton/Bouton.jsx';
import { Champ } from '../../../components/champ/Champ.jsx';
import { Onglets } from '../../../components/onglets/Onglets.jsx';
import { useNotifications } from '../../../components/notification/Notification.jsx';
import { Page, Emplacement, TitreSection, Image, Faits } from '../Page.jsx';

/**
 * page : props de <Page> (marque, liens, action, pied)
 * hero : { surtitre, titre, appui, faits: [{ terme, valeur }], action: { libelle, href }, image }
 * deroule : { surtitre, titre, appui, image, etapes: [{ quand, titre, texte }] }
 * pratique : { surtitre, titre, onglets: [{ id, libelle, contenu }] }
 * dates : { surtitre, titre, appui, choix: [{ valeur, libelle, info, complet }] }
 * demande : { titre, appui, champs: [props de <Champ> + name], libelleEnvoi, envoyer: (donnees) => Promise, succes, echec }
 * emplacements : { nom: (parts, rang) => élément }
 * À placer dans <ZoneNotifications> (components/notification).
 */
export function LandingProduit({ page, hero, deroule, pratique, dates, demande, emplacements }) {
  const [date, setDate] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const { notifier } = useNotifications();

  const partsHero = {
    kicker: <p className="k-kicker">{hero.surtitre}</p>,
    title: <h1 className="k-h1" id="titre">{hero.titre}</h1>,
    lead: <p className="k-lead">{hero.appui}</p>,
    facts: <Faits faits={hero.faits} className="lp-facts" />,
    action: <Bouton href={hero.action.href}>{hero.action.libelle}</Bouton>,
    media: <Image image={hero.image} differee={false} gabarits={emplacements} className="k-hero__side" />,
  };

  const envoyer = (e) => {
    e.preventDefault();
    const formulaire = e.currentTarget;
    if (envoi) return;
    if (!date) { document.getElementById('envoi-aide').focus(); return; }
    if (!formulaire.checkValidity()) {                 // chaque Champ écrit son erreur à la sortie ; on y conduit
      const premier = formulaire.querySelector(':invalid');
      premier.focus(); premier.blur(); premier.focus();
      return;
    }
    setEnvoi(true);
    demande.envoyer({ date, ...Object.fromEntries(new FormData(formulaire)) })
      .then(() => { notifier({ type: 'success', titre: demande.succes.titre, texte: demande.succes.texte }); formulaire.reset(); },
        () => notifier({ type: 'error', titre: demande.echec.titre, texte: demande.echec.texte }))
      .then(() => setEnvoi(false));
  };

  return (
    <Page {...page} emplacements={emplacements}>
      <Emplacement nom="hero" comme="section" gabarits={emplacements} parts={partsHero} aria-labelledby="titre">
        <div className="k-wrap k-hero">
          <div className="k-hero__text">{partsHero.kicker}{partsHero.title}{partsHero.lead}{partsHero.facts}{partsHero.action}</div>
          {partsHero.media}
        </div>
      </Emplacement>

      <section className="k-section k-section--rule" id="deroule" aria-labelledby="t-deroule">
        <div className="k-wrap k-split">
          <div>
            <TitreSection id="t-deroule" surtitre={deroule.surtitre} titre={deroule.titre} appui={deroule.appui} gabarits={emplacements} />
            {deroule.image && <Image image={deroule.image} gabarits={emplacements} className="lp-aside-media" />}
          </div>
          <ol className="lp-steps k-split__main">
            {deroule.etapes.map((etape) => (
              <li key={etape.quand}><span className="lp-steps__when">{etape.quand}</span><h3 className="k-h3">{etape.titre}</h3><p>{etape.texte}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="k-section k-section--alt" id="pratique" aria-labelledby="t-pratique">
        <div className="k-wrap k-split">
          <TitreSection id="t-pratique" surtitre={pratique.surtitre} titre={pratique.titre} gabarits={emplacements} />
          <div className="k-split__main"><Onglets libelle={pratique.titre} onglets={pratique.onglets} /></div>
        </div>
      </section>

      <section className="k-section" id="dates" aria-labelledby="t-dates">
        <div className="k-wrap">
          <TitreSection id="t-dates" surtitre={dates.surtitre} titre={dates.titre} appui={dates.appui} gabarits={emplacements} />
          <Emplacement nom="grid" gabarits={emplacements} parts={{ items: dates.choix }} className="lp-dates" role="radiogroup" aria-labelledby="t-dates">
            {dates.choix.map((choix) => (
              <label className="lp-date" key={choix.valeur}>
                <input type="radio" name="date" value={choix.valeur} disabled={choix.complet} checked={date === choix.valeur} onChange={() => setDate(choix.valeur)} />
                <span className="lp-date__day">{choix.libelle}</span>
                <span className="lp-date__info">{choix.complet ? 'Complet' : choix.info}</span>
              </label>
            ))}
          </Emplacement>
        </div>
      </section>

      <Emplacement nom="finale" comme="section" gabarits={emplacements} id="demande" aria-labelledby="t-demande" data-k-tone="inverse">
        <div className="k-wrap k-split">
          <div className="k-stack">
            <h2 className="k-h2" id="t-demande">{demande.titre}</h2>
            <p>{demande.appui}</p>
            <p className="k-note" role="status">{date ? `Date choisie : ${date}.` : 'Aucune date choisie pour l’instant.'}</p>
          </div>
          <form className="k-stack k-split__main" noValidate onSubmit={envoyer}>
            {demande.champs.map((champ) => <Champ key={champ.name} {...champ} />)}
            <div className="lp-send">
              <Bouton type="submit" enCours={envoi} libelleEnCours="Envoi en cours…" aria-disabled={date ? undefined : 'true'} aria-describedby={date ? undefined : 'envoi-aide'}>{demande.libelleEnvoi}</Bouton>
              {!date && <a className="k-link" id="envoi-aide" href="#dates">Choisissez d'abord une date.</a>}
            </div>
          </form>
        </div>
      </Emplacement>
    </Page>
  );
}
