// Banc d'essai : les vingt composants React de kobo-studio sur une page, chacun dans une section à id stable.
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.js';
import { Bouton } from '@k/components/bouton/Bouton.jsx';
import { Champ } from '@k/components/champ/Champ.jsx';
import { Carte, TexteCarte } from '@k/components/carte/Carte.jsx';
import { BarreNav } from '@k/components/barre-nav/BarreNav.jsx';
import { MenuMobile } from '@k/components/menu-mobile/MenuMobile.jsx';
import { Modale } from '@k/components/modale/Modale.jsx';
import { Onglets } from '@k/components/onglets/Onglets.jsx';
import { ZoneNotifications, useNotifications } from '@k/components/notification/Notification.jsx';
import { EtatVide } from '@k/components/etat-vide/EtatVide.jsx';
import { Squelette, ZoneEnChargement, BarreProgression } from '@k/components/chargement/Chargement.jsx';
import { Icone } from '@k/components/Icone.jsx';
import { Selection } from '@k/components/selection/Selection.jsx';
import { CaseACocher, GroupeCases } from '@k/components/case-a-cocher/CaseACocher.jsx';
import { GroupeRadio } from '@k/components/bouton-radio/BoutonRadio.jsx';
import { Interrupteur } from '@k/components/interrupteur/Interrupteur.jsx';
import { Tableau } from '@k/components/tableau/Tableau.jsx';
import { Accordeon } from '@k/components/accordeon/Accordeon.jsx';
import { Pagination } from '@k/components/pagination/Pagination.jsx';
import { FilAriane } from '@k/components/fil-ariane/FilAriane.jsx';
import { InfoBulle } from '@k/components/info-bulle/InfoBulle.jsx';
import { MenuDeroulant } from '@k/components/menu-deroulant/MenuDeroulant.jsx';
import { PHOTOS } from './donnees.js';

const liens = [{ libelle: 'Sorties', href: '#sorties', courant: true }, { libelle: 'Guides', href: '#guides' }, { libelle: 'Préparer sa sortie', href: '#preparer' }, { libelle: 'Journal', href: '#journal' }];
const niveaux = ['Jamais marché sur la neige', 'Quelques sorties en raquettes', 'Randonneur régulier', 'Ski de randonnée'].map((l) => ({ valeur: l, libelle: l })).concat({ valeur: 'alpi', libelle: 'Alpinisme (complet)', desactive: true });
const materiel = [{ valeur: 'raquettes', libelle: 'Raquettes' }, { valeur: 'batons', libelle: 'Bâtons' }, { valeur: 'duvet', libelle: 'Duvet grand froid', aide: 'Confort −15 °C' }];
const dates = [{ valeur: '17-01', libelle: 'Samedi 17 janvier', aide: '4 places' }, { valeur: '24-01', libelle: 'Samedi 24 janvier', aide: '2 places' }, { valeur: '31-01', libelle: 'Samedi 31 janvier', aide: 'Complet', desactivee: true }];
const reservations = [
  { id: 'am', nom: 'Agathe Morel', sortie: 'Bivouac', prix: 180 }, { id: 'cr', nom: 'Camille Roux', sortie: 'Raquettes', prix: 65 },
  { id: 'ib', nom: 'Idriss Benali', sortie: 'Igloo', prix: 240 }, { id: 'jl', nom: 'Jeanne Lortat', sortie: 'Bivouac', prix: 180, indisponible: true }, { id: 'nv', nom: 'Noé Vasseur', sortie: 'Raquettes', prix: 65 },
];
const colonnes = [{ id: 'nom', libelle: 'Nom', triable: true }, { id: 'sortie', libelle: 'Sortie', triable: true }, { id: 'prix', libelle: 'Prix', type: 'number', triable: true, rendu: (l) => `${l.prix} €` }];
const attendre = (ms, ok = true) => new Promise((oui, non) => setTimeout(ok ? oui : () => non(new Error('refus')), ms));

function Section({ id, titre, children }) {
  return <section id={id} className="k-stack" style={{ paddingBlock: 'var(--k-space-8)', borderBlockEnd: 'var(--k-border-w) solid var(--k-line)' }}><h2 className="k-h3">{titre}</h2>{children}</section>;
}
const Rangee = ({ children }) => <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--k-space-6)', alignItems: 'flex-start' }}>{children}</div>;

function Banc() {
  const { notifier } = useNotifications();
  const [menu, setMenu] = useState(false);
  const [modale, setModale] = useState(null);
  const [retour, setRetour] = useState('aucune');
  const [envoi, setEnvoi] = useState(false);
  const [charge, setCharge] = useState(false);
  const [progres, setProgres] = useState(0.4);
  const [niveau, setNiveau] = useState('');
  const [pret, setPret] = useState(['raquettes']);
  const [date, setDate] = useState('17-01');
  const [rappel, setRappel] = useState(true);
  const [photos, setPhotos] = useState(false);
  const [lettre, setLettre] = useState(false);
  const [selection, setSelection] = useState(['cr']);
  const [filtre, setFiltre] = useState('');
  const [pageCourante, setPageCourante] = useState(3);
  const [tri, setTri] = useState('date');
  const [action, setAction] = useState('aucune');
  const [bascule, setBascule] = useState('');
  const lignes = reservations.filter((r) => !filtre || r.sortie === filtre);
  return (
    <div className="k-wrap">
      <h1 className="k-h2" style={{ paddingBlock: 'var(--k-space-8)' }}>Essai React des composants</h1>

      <Section id="nav" titre="Barre de navigation et menu mobile">
        <BarreNav marque={{ libelle: 'Cordée Brume', href: '#' }} liens={liens} idMenu="menu-essai" menuOuvert={menu} surOuvrirMenu={() => setMenu(true)} actions={<Bouton href="#reserver" className="k-nav__extra">Réserver</Bouton>} />
        <MenuMobile id="menu-essai" ouvert={menu} surFermer={() => setMenu(false)} liens={liens} pied={<Bouton href="#reserver" bloc>Réserver</Bouton>} />
        <div style={{ maxInlineSize: 'calc(var(--k-space-32) * 3)' }} id="nav-etroite"><BarreNav marque={{ libelle: 'Cordée Brume', href: '#' }} liens={liens} idMenu="menu-essai" menuOuvert={menu} surOuvrirMenu={() => setMenu(true)} libelle="Navigation étroite" /></div>
      </Section>

      <Section id="boutons" titre="Bouton">
        <Rangee>
          <Bouton>Réserver</Bouton><Bouton variante="secondary">Programme</Bouton><Bouton variante="ghost">Plus tard</Bouton><Bouton variante="danger">Annuler la sortie</Bouton>
          <Bouton pilule>Pilule</Bouton><Bouton desactive>Complet</Bouton><Bouton href="#lien">Lien-bouton</Bouton>
          <Bouton iconeSeule variante="secondary" aria-label="Fermer"><Icone nom="fermer" /></Bouton>
          <Bouton id="envoi" enCours={envoi} libelleEnCours="Envoi en cours…" onClick={() => { setEnvoi(true); setTimeout(() => setEnvoi(false), 1200); }}>Envoyer</Bouton>
        </Rangee>
      </Section>

      <Section id="champs" titre="Champ">
        <form noValidate style={{ display: 'grid', gap: 'var(--k-space-6)', maxInlineSize: 'calc(var(--k-space-32) * 3)' }} onSubmit={(e) => e.preventDefault()}>
          <Champ libelle="Adresse e-mail" name="mail" type="email" required aide="Pour la confirmation." />
          <Champ libelle="Un mot pour le guide" name="mot" multiligne facultatif maxLength={120} />
          <Champ libelle="Code de réduction" name="code" erreur="Ce code a expiré le 3 janvier." defaultValue="NEIGE24" />
          <Champ libelle="Téléphone" name="tel" disabled defaultValue="04 50 00 00 00" />
        </form>
      </Section>

      <Section id="cartes" titre="Carte">
        <div data-k-slot="grid">
          <Carte titre="Bivouac au-dessus des nuages" meta="Deux jours" href="#bivouac" image={PHOTOS.tentes} pied={<span>180 €</span>}><TexteCarte>Une nuit sous tente à 2 300 m.</TexteCarte></Carte>
          <Carte titre="Raquettes en forêt" meta="Demi-journée" selectionnee image={PHOTOS.raquettes}><TexteCarte>Trois heures dans les sapins.</TexteCarte></Carte>
          <Carte titre="Cascade de glace" meta="Journée" indisponible><TexteCarte>Complet jusqu'en mars.</TexteCarte></Carte>
        </div>
      </Section>

      <Section id="onglets" titre="Onglets">
        <Onglets libelle="Préparer la sortie" onglets={[{ id: 'sac', libelle: 'Le sac', contenu: <p>Trente litres suffisent.</p> }, { id: 'froid', libelle: 'Le froid', compte: 3, contenu: <p>−12 °C la nuit.</p> }, { id: 'meteo', libelle: 'La météo', contenu: <p>Décision la veille à 18 h.</p> }, { id: 'off', libelle: 'Factures', desactive: true, contenu: <p>—</p> }]} />
      </Section>

      <Section id="modale" titre="Modale">
        <Rangee><Bouton id="ouvrir-modale" onClick={() => setModale('reserver')}>Réserver une place</Bouton><Bouton id="ouvrir-alerte" variante="danger" onClick={() => setModale('annuler')}>Annuler la réservation</Bouton><span id="retour-modale">retour : {retour}</span></Rangee>
        <Modale ouverte={modale === 'reserver'} surFermer={(v) => { setModale(null); setRetour(v || 'fermée'); }} titre="Réserver « Bivouac au-dessus des nuages »" fermableParLeVoile
          pied={<><Bouton variante="secondary" value="plus-tard" type="submit" formMethod="dialog">Plus tard</Bouton><Bouton value="reserve" type="submit" formMethod="dialog" data-k-autofocus>Confirmer</Bouton></>}>
          <p>Samedi 17 janvier, 180 €. Annulation gratuite jusqu'à sept jours avant.</p>
        </Modale>
        <Modale ouverte={modale === 'annuler'} surFermer={(v) => { setModale(null); setRetour(v || 'fermée'); }} titre="Annuler la réservation ?" alerte
          pied={<><Bouton variante="secondary" value="garder" type="submit" formMethod="dialog" data-k-autofocus>Garder ma place</Bouton><Bouton variante="danger" value="annule" type="submit" formMethod="dialog">Annuler la réservation</Bouton></>}>
          <p>La place sera proposée à quelqu'un d'autre.</p>
        </Modale>
      </Section>

      <Section id="notifications" titre="Notification">
        <Rangee>
          <Bouton id="n-ok" variante="secondary" onClick={() => notifier({ type: 'success', titre: 'Réservation enregistrée', texte: 'La confirmation part vers votre adresse.' })}>Succès</Bouton>
          <Bouton id="n-err" variante="secondary" onClick={() => notifier({ type: 'error', titre: 'Paiement refusé', texte: 'Rien n’a été débité.' })}>Erreur</Bouton>
        </Rangee>
      </Section>

      <Section id="vide" titre="État vide">
        <EtatVide titre="Aucune réservation ce mois-ci" actions={<Bouton>Voir les sorties</Bouton>}>Les demandes reçues apparaîtront ici.</EtatVide>
        <EtatVide titre="Impossible de charger les sorties" variante="error" icone="erreur" actions={<Bouton variante="secondary">Réessayer</Bouton>}>Le serveur ne répond pas.</EtatVide>
      </Section>

      <Section id="chargement" titre="Chargement">
        <Rangee><Bouton id="charger" variante="secondary" onClick={() => { setCharge(true); setTimeout(() => setCharge(false), 1200); }}>Recharger</Bouton><Bouton id="avancer" variante="secondary" onClick={() => setProgres((p) => Math.min(1, p + 0.3))}>Avancer</Bouton></Rangee>
        <div id="zone"><ZoneEnChargement enCours={charge} annonce="Chargement des guides…" squelette={<><Squelette forme="title" /><Squelette forme="medium" /></>}><p>Maël Ferrand, Suzanne Albrecht.</p></ZoneEnChargement></div>
        <BarreProgression libelle="Import des réservations" valeur={progres} />
        <BarreProgression libelle="Synchronisation" />
        <BarreProgression libelle="Import de février" valeur={0.37} echec="Import interrompu à la ligne 47 : date illisible." />
      </Section>

      <Section id="selection" titre="Sélection">
        <div style={{ display: 'grid', gap: 'var(--k-space-6)', maxInlineSize: 'calc(var(--k-space-32) * 3)' }}>
          <Selection libelle="Votre niveau" vide="Choisir…" options={niveaux} valeur={niveau} surChangement={setNiveau} requis="Choisissez un niveau : le guide en a besoin pour composer le groupe." aide="Le guide adapte l'allure du groupe." name="niveau" />
          <span id="niveau-lu">niveau : {niveau || '—'}</span>
          <Selection libelle="Refuge" options={[{ valeur: 'lb', libelle: 'Refuge du Lac Blanc' }]} parDefaut="lb" desactive />
          <Selection libelle="Date" vide="Choisir…" options={dates} erreur="Choisissez une date : sans elle, la demande ne peut pas partir." />
          <Selection libelle="Matériel" options={materiel} multiple parDefaut={['raquettes']} />
        </div>
      </Section>

      <Section id="cases" titre="Case à cocher">
        <Rangee>
          <div className="k-stack">
            <CaseACocher libelle="Tout le matériel" cochee={pret.length === materiel.length} partielle={pret.length > 0 && pret.length < materiel.length} surChangement={(v) => setPret(v ? materiel.map((m) => m.valeur) : [])} />
            <GroupeCases legende="Matériel à prêter" options={materiel} valeurs={pret} surChangement={setPret} aide="Compris dans le prix." name="pret" />
            <span id="pret-lu">prêt : {pret.join(',') || '—'}</span>
          </div>
          <div className="k-stack"><CaseACocher libelle="Désactivée" desactivee /><CaseACocher libelle="Désactivée et cochée" desactivee parDefaut /><CaseACocher libelle="En erreur" invalide /></div>
          <GroupeCases legende="Options (en erreur)" options={materiel} erreur="Cochez au moins une option." enLigne />
        </Rangee>
      </Section>

      <Section id="radios" titre="Bouton radio">
        <Rangee>
          <div><GroupeRadio legende="Date de la sortie" options={dates} valeur={date} surChangement={setDate} aide="Six places par sortie." name="date" /><span id="date-lue">date : {date}</span></div>
          <GroupeRadio legende="Couchage" options={[{ valeur: 't', libelle: 'Tente' }, { valeur: 'i', libelle: 'Igloo' }]} erreur="Choisissez un couchage." enLigne name="couchage" requis />
        </Rangee>
      </Section>

      <Section id="interrupteurs" titre="Interrupteur">
        <div className="k-stack" style={{ maxInlineSize: 'calc(var(--k-space-32) * 4)' }}>
          <Interrupteur libelle="Rappel par e-mail la veille" actif={rappel} surChangement={setRappel} enLigne />
          <Interrupteur libelle="Partager mes photos avec le groupe" actif={photos} surChangement={(v) => attendre(700).then(() => setPhotos(v))} enLigne />
          <Interrupteur libelle="Lettre mensuelle (l'enregistrement échoue)" actif={lettre} surChangement={(v) => attendre(700, false).then(() => setLettre(v))} enLigne />
          <Interrupteur libelle="Alerte météo (non piloté)" parDefaut />
          <Interrupteur libelle="Réservé aux guides" desactive />
        </div>
      </Section>

      <Section id="tableau" titre="Tableau">
        <Selection libelle="Filtrer par sortie" vide="Toutes les sorties" options={['Bivouac', 'Raquettes', 'Igloo', 'Cascade de glace'].map((s) => ({ valeur: s, libelle: s }))} valeur={filtre} surChangement={setFiltre} name="filtre" />
        <Tableau legende="Réservations de février (données fictives)" colonnes={colonnes} lignes={lignes} selectionnable selection={selection} surSelection={setSelection} tri={{ colonne: 'nom', sens: 'ascending' }}
          nomLigne={(l) => l.nom} vide={{ titre: 'Aucune réservation pour cette sortie', texte: 'Les demandes reçues apparaîtront ici.' }} />
        <span id="selection-lue">sélection : {selection.join(',') || '—'}</span>
        <Tableau legende="Guides de la saison" dense enCours colonnes={[{ id: 'nom', libelle: 'Guide' }, { id: 'n', libelle: 'Sorties', type: 'number' }]} lignes={[{ id: 'mf', nom: 'Maël Ferrand', n: 12 }, { id: 'sa', nom: 'Suzanne Albrecht', n: 9 }]} />
      </Section>

      <Section id="accordeon" titre="Accordéon">
        <Accordeon unSeul ouverts={['meteo']} surBascule={(id, o) => setBascule(`${id}:${o}`)} elements={[
          { id: 'meteo', titre: 'Et si la météo est mauvaise ?', contenu: <p>Le guide décide la veille à 18 h.</p> },
          { id: 'dehors', titre: 'Faut-il déjà avoir dormi dehors ?', contenu: <p>Non. Le guide dort à côté.</p> },
          { id: 'groupe', titre: 'Tarifs de groupe (bientôt)', contenu: <p>À venir.</p>, desactive: true },
          { id: 'sac', titre: 'Que mettre dans le sac ?', contenu: <p>Une doudoune, deux paires de gants, un thermos.</p> }]} />
        <span id="bascule-lue">bascule : {bascule || '—'}</span>
        <Accordeon titres ouverts={['a', 'b']} elements={[{ id: 'a', titre: 'Le sac', contenu: <p>Trente litres.</p> }, { id: 'b', titre: 'Le froid', contenu: <p>−12 °C.</p> }]} />
      </Section>

      <Section id="pagination" titre="Pagination">
        <Pagination libelle="Pages des sorties" page={pageCourante} total={12} surChangement={setPageCourante} />
        <span id="page-lue">page : {pageCourante}</span>
        <Pagination libelle="Pages du journal" page={2} total={9} href={(p) => `?page=${p}`} />
        <div style={{ maxInlineSize: 'calc(var(--k-space-32) * 2.5)' }} id="pagination-etroite"><Pagination libelle="Pages des guides" page={1} total={24} surChangement={() => {}} /></div>
      </Section>

      <Section id="fil" titre="Fil d'Ariane">
        <FilAriane chemin={[{ libelle: 'Accueil', href: '#' }, { libelle: 'Sorties', href: '#sorties' }, { libelle: 'Préparer sa sortie' }]} />
        <FilAriane libelle="Fil d'Ariane replié" replier chemin={[{ libelle: 'Accueil', href: '#' }, { libelle: 'Sorties', href: '#s' }, { libelle: 'Hiver', href: '#h' }, { libelle: 'Massif du Mont-Blanc', href: '#m' }, { libelle: 'Bivouac au-dessus des nuages', href: '#b' }, { libelle: 'Préparer sa sortie' }]} />
      </Section>

      <Section id="bulles" titre="Info-bulle">
        <Rangee>
          <InfoBulle texte="Remboursée en entier jusqu'à 7 jours avant le départ."><Bouton id="bulle-1" variante="secondary" iconeSeule aria-label="Supprimer la réservation"><Icone nom="fermer" /></Bouton></InfoBulle>
          <InfoBulle texte="Parking du Tour, au pied du télécabine." place="bottom"><Bouton id="bulle-2" variante="secondary">Départ 14 h</Bouton></InfoBulle>
        </Rangee>
      </Section>

      <Section id="menus" titre="Menu déroulant">
        <Rangee>
          <MenuDeroulant libelle="Actions" nom="actions" elements={[
            { id: 'modifier', libelle: 'Modifier', indice: 'E', surChoix: () => setAction('modifier') }, { id: 'dupliquer', libelle: 'Dupliquer', surChoix: () => setAction('dupliquer') },
            { id: 'archiver', libelle: 'Archiver (sortie à venir)', desactive: true }, { separateur: true }, { id: 'supprimer', libelle: 'Supprimer…', danger: true, surChoix: () => setAction('supprimer') }]} />
          <span id="action-lue">action : {action}</span>
          <MenuDeroulant libelle="Trier par" nom="tri" choix={tri} surChangement={setTri} elements={[{ titre: 'Ordre des sorties' }, { id: 'date', libelle: 'Date' }, { id: 'prix', libelle: 'Prix' }, { id: 'niveau', libelle: 'Niveau' }]} />
          <span id="tri-lu">tri : {tri}</span>
        </Rangee>
      </Section>
      <div style={{ blockSize: 'var(--k-space-32)' }} />
    </div>
  );
}

createRoot(document.getElementById('racine')).render(<ZoneNotifications><Banc /></ZoneNotifications>);
