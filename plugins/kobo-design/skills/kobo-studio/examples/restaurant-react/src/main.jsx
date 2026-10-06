import React from 'react';
import { createRoot } from 'react-dom/client';
import { emplacements, useMouvement } from './styles.js';
import { Bouton } from './kobo/kobo-studio/components/bouton/Bouton.jsx';
import { Carte } from './kobo/kobo-studio/components/carte/Carte.jsx';
import { Page, Emplacement, TitreSection, Image, Finale, Faits } from './kobo/kobo-studio/ux/structures/Page.jsx';
import { page, suite, PLATS, PAGES, RESERVER } from './site.js';

const facade = { src: 'images/facade.jpg', alt: "Façade d'un petit restaurant d'angle, vitrine à petits carreaux, dans une rue en pente", largeur: 1600, hauteur: 1067, sujet: '70% 55%' };
const portrait = { src: 'images/odile-cuisine.jpg', alt: 'Une cuisinière en chemise claire et tablier dresse des assiettes, dans une cuisine sombre', largeur: 1200, hauteur: 1500, ratio: '4 / 5', sujet: '55% 30%' };

const maison = [
  { terme: 'Ouverture', valeur: '2019' },
  { terme: 'En cuisine', valeur: 'Odile Ferrand' },
  { terme: 'En salle', valeur: 'Karim Belhadj' },
  { terme: 'Couverts', valeur: '28' },
];

// Accueil composé avec les pièces de la structure : la recherche de <Accueil> n'a pas d'objet pour quatre plats.
function Accueil() {
  useMouvement();
  const gab = emplacements();
  // Les parts du héros : le gabarit du skill (affiche, titre incliné) les redispose ; sans gabarit, le contenu neutre reste.
  const hero = {
    kicker: <p className="k-kicker">Chez Odile · pentes de la Croix-Rousse, Lyon</p>,
    title: <h1 className="k-h1" id="titre">La cuisine du marché, chez Odile</h1>,
    lead: <p className="k-lead">Une carte courte qui change chaque semaine, 28 couverts, et Odile seule aux fourneaux. Du mardi au samedi, midi et soir.</p>,
    action: <Bouton href={RESERVER.href}>{RESERVER.libelle}</Bouton>,
    media: <Image image={facade} differee={false} className="k-hero__side" />,
  };
  return (
    <Page {...page('accueil')} emplacements={gab}>
      <Emplacement nom="hero" comme="section" gabarits={gab} parts={hero} aria-labelledby="titre">
        <div className="k-wrap k-hero">
          <div className="k-hero__text">{hero.kicker}{hero.title}{hero.lead}{hero.action}</div>
          {hero.media}
        </div>
      </Emplacement>

      <section className="k-section k-section--rule" id="plats" aria-labelledby="t-plats">
        <div className="k-wrap k-stack k-stack--lg">
          <TitreSection id="t-plats" surtitre="Cette semaine" titre="Les plats du moment"
            appui="Midi : 19 € ou 23 €. Soir : menu unique à 34 €." />
          <Emplacement nom="grid" className="sv-grid">
            {PLATS.map((p) => <Carte key={p.id} titre={p.titre} meta={p.meta} image={p.image} />)}
          </Emplacement>
          <p className="k-note">Photos provisoires, en attendant celles du restaurant.</p>
          <div><Bouton variante="secondary" href={PAGES.carte}>Voir la carte, les horaires et l'adresse</Bouton></div>
        </div>
      </section>

      <section className="k-section k-section--alt" id="maison" aria-labelledby="t-maison">
        <div className="k-wrap k-split">
          <Image image={portrait} />
          <div className="k-split__main k-stack k-stack--lg">
            <TitreSection id="t-maison" surtitre="La maison" titre="Deux personnes, une petite salle" />
            <div className="k-prose">
              <p>Odile Ferrand a ouvert ici en 2019, après dix ans en brasserie. Elle cuisine seule ; Karim Belhadj vous accueille en salle.</p>
              <p>La carte suit le marché et change chaque semaine. Côté cave, une trentaine de vins, surtout du Beaujolais et de la vallée du Rhône, au verre dès 5 €.</p>
            </div>
            <Faits faits={maison} />
          </div>
        </div>
      </section>

      <Finale {...suite} />
    </Page>
  );
}

createRoot(document.getElementById('root')).render(<Accueil />);
