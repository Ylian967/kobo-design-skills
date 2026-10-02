---
name: acid-scan-security
description: Direction artistique « Acid Scan Security » pour sites de cybersécurité et de protection des données (SaaS sécurité, chiffrement, détection de menaces, VPN, identité, conformité), inspirée d'un concept Dribbble de landing « data security » nouvelle génération. Photo plein cadre traitée en monochrome vert acide (duotone noir-vert → citron) avec trame de points et lignes de balayage, réticule fin (verticale au centre, horizontale sur les yeux), bande citron de scan sur le regard avec cadre de détection, titre en capitales pixel hautes sur trois lignes (la dernière plus sombre), surtitre jaune-citron, bouton carré translucide, carte CTA vert sombre avec cadenas et crochets d'angle. À utiliser pour une landing de produit sécurité, un tableau de bord de menaces, une page de tarifs ou une app au style « hacker, terminal, scan biométrique, matrice, rétro-numérique ».
---

# Acid Scan Security

> Un visage passé au scanner : tout est vert acide, pixelisé, quadrillé — et une bande citron éclaire le regard au moment de l'identification.

## L'idée

Toute la page vit sur **une seule rampe de couleur**, du noir-vert `--bg` au citron pâle `--text`. Le héros est une **photo plein cadre en duotone vert**, tramée en points comme un écran LED, traversée de **lignes de balayage** et d'un **réticule** fin. Sur les yeux, une **bande citron** saturée (la « détection ») est entourée d'un **cadre de scan** avec étiquette. Le titre, en **capitales pixel hautes**, s'empile en bas à gauche sur trois lignes, la dernière en vert éteint. L'interface est **carrée**, en mono espacée, avec des **crochets d'angle** comme seule décoration.

Inspiré de : voir `source.md`. On reprend le langage visuel (duotone acide, trame, réticule, bande de scan, typo pixel, crochets), jamais l'identité : pas de nom, logo, photo ni texte d'origine.

## Règles prioritaires

1. **Monochrome strict** : uniquement la rampe `--bg → --deep → --mid → --acid → --text` + `--signal` (bande, actif) + `--label` (surtitres). Aucune autre teinte, sauf `--danger` pour une alerte.
2. **L'image est un signal** : toute photo passe en duotone vert tramé (points + lignes de balayage). Jamais de photo en couleurs naturelles.
3. **Une bande de scan par écran** : rectangle `--signal` sur la zone clé (les yeux, un document, un écran), avec cadre et étiquette « Sujet 07 · scan ».
4. **Trois voix** : pixel haute (titres, chiffres), mono espacée capitales (nav, étiquettes, boutons), sans neutre (texte courant).
5. **Tout est carré** (`--radius: 0`) ; la décoration se limite aux crochets d'angle, réticules et trames.
6. **Hiérarchie des titres** : lignes en `--text`, dernière ligne en `--muted` ; surtitre en `--label` avec un carré qui clignote.
7. Contraste : `--text` sur `--bg` 17,6:1, `--muted` 9,2:1, `--dim` 6:1 (métadonnées) ; texte sur `--signal`/`--acid` toujours `--on-signal` (≥ 14,5:1).
8. Accessibilité : cibles ≥ 44px, focus `--signal` visible, journal en `role="log"`, `prefers-reduced-motion` coupe balayage et clignotements.
9. Aucune valeur en dur : tout vient de `references/tokens.css` (le canvas lit les couleurs dans les variables CSS).

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Boutons (plein, translucide, contour), nav, crochets d'angle, photo duotone tramée, bande + cadre de scan, réticule, carte CTA cadenas, cartes, puces, champ terminal, bascules, journal, jauge segmentée. |
| `references/layouts.md` | Héros scan, bandeau de mesures, grille de couches, console d'analyse, bandeau final, mobile. |
| `references/motion.md` | Balayage, clignotement, tramage, journal qui s'écrit, jauge en pas. |
| `examples/demo.html` | Page complète (marque fictive « Gridward »). |
| `source.md` | Shot de référence, ce qui a été vu, écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titre héros, titres de section, chiffres | **Jersey 10** (pixel haute et étroite) | capitales, `--text-hero` 48–112px, interligne 0.82 ; repli VT323 |
| Nav, étiquettes, boutons, journal | **JetBrains Mono** 500/700 | 11px capitales +0.18em (boutons 700) ; journal 12px / 1.9 |
| Texte courant | **Inter** 400 | 14px / 1.55, `--text` ou `--muted` |

La police du shot n'est pas identifiée : c'est une grotesque pixelisée haute. Jersey 10 en est l'équivalent le plus proche à l'œil ; Silkscreen est trop large, Pixelify Sans trop ronde.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Fond | `--bg` | page, ombres de la photo |
| Rampe photo | `--deep`, `--mid`, `--acid` | duotone, icônes, bouton plein (`--acid`) |
| Signal | `--signal` / `--on-signal` | bande de scan, étiquette du cadre, puce active |
| Texte | `--text`, `--muted`, `--dim` | titres, texte, métadonnées |
| Surtitre | `--label` | « CHIFFREMENT DE GRADE MILITAIRE » |
| Surfaces | `--panel`, `--glass`, `--glass-hi` | carte CTA, bouton translucide, bascule active |
| Filets | `--line`, `--line-hi` | bordures, réticule, crochets |
| Alerte | `--danger` | lignes « ALERTE », champ en erreur |

## Signature

**Le scan du regard** : photo duotone tramée + réticule (verticale à 50 %, horizontale à la hauteur des yeux) + bande `--signal` sur les yeux + cadre fin décalé avec crochets épais et étiquette citron. Une fois, dans le héros. Ailleurs, on rappelle la signature par les **crochets d'angle** (cartes, terminal, bandeau final) et le **carré clignotant**.

## À éviter

- Ajouter du bleu, du violet ou un dégradé « néon » multicolore : le style est monochrome.
- Arrondir les coins, utiliser des ombres portées douces ou du verre dépoli coloré.
- Mettre la typo pixel en petit corps (illisible sous 28px) : en dessous, passer en mono.
- Des cadenas, boucliers et globes en 3D génériques.
- Reprendre le nom, le logo, la photo ou les textes du shot de référence.

## Adaptation React / React Native

- Duotone tramé : en web, `<canvas>` (voir la démo : tramage Bayer sur la rampe lue dans les variables CSS) ou image pré-traitée côté serveur. En natif, préférer une image déjà traitée ; sinon `@shopify/react-native-skia` (`ColorMatrix` + shader de trame).
- Trame de points et lignes de balayage : en natif, un PNG répété en `ImageBackground` (`resizeMode="repeat"`) avec opacité.
- Crochets d'angle : 4 `View` absolues de 14×1 / 1×14 par coin, ou un `Path` SVG.
- Balayage : `Animated.loop` sur `translateY` d'une `LinearGradient` (`expo-linear-gradient`), coupé si `isReduceMotionEnabled`.
- Polices : `@expo-google-fonts/jersey-10`, `jetbrains-mono`, `inter`.
- Journal : `FlatList` inversée, `accessibilityLiveRegion="polite"` (Android) / annonce `AccessibilityInfo.announceForAccessibility` (iOS).

## Avant de livrer

- [ ] Tokens importés, aucune teinte hors de la rampe verte (sauf `--danger`).
- [ ] Photo en duotone tramé, réticule et une bande de scan avec cadre.
- [ ] Titre pixel 3 lignes, dernière ligne en `--muted`, surtitre `--label`.
- [ ] Coins carrés partout, crochets d'angle sur les cartes clés.
- [ ] Boutons : repos, survol, appui, focus, désactivé, chargement (`aria-busy`).
- [ ] Testé à 390px et 1440px, sans défilement horizontal ; mouvement réduit respecté.
- [ ] Aucun élément de la marque d'origine.
