---
name: acid-scan-security
description: Direction artistique « Acid Scan Security » pour sites de cybersécurité et de protection des données (SaaS sécurité, chiffrement, détection de menaces, VPN, identité, conformité), inspirée d'un concept Dribbble de landing « data security ». Portrait photo plein écran passé en vert monochrome façon vision nocturne (silhouette sombre sur vert vif), frange rouge de vieux moniteur, rangées de 0 et 1, lignes de balayage, réticule fin, bande lumineuse décalée sur les yeux, cadre jaune qui verrouille l'œil ; surtitre pixel jaune-citron, titre pixel sur trois lignes dont la dernière plus éteinte, nav en capitales espacées avec bouton translucide collé au bord, carte CTA vert sombre avec cadenas et crochets d'angle. Animée : amorçage terminal, allumage de tube cathodique, bande qui descend se caler sur le regard, verrouillage, texte qui se décode, glitch RVB, images qui se décryptent en mosaïque. À utiliser pour une landing produit sécurité, un tableau de bord de menaces, une page de tarifs ou une app au style « hacker, terminal, scan biométrique, rétro-numérique ».
---

# Acid Scan Security

> Un visage passé au scanner de vision nocturne : tout est vert, une bande lumineuse glisse sur le regard et un cadre jaune verrouille l'œil.

## L'idée

Toute la page vit sur **une seule rampe de couleur**, du noir-vert `--void` au vert vif `--hot`, avec du citron pâle pour le texte et **un seul jaune**, `--signal`, pour la détection. Le héros est une **vraie photo** recolorée sur cette rampe et empilée en 4 couches : base verte, frange rouge décalée, bande plus claire sur les yeux, intérieur jaune du cadre. Un **réticule** croise exactement sur l'œil. Le texte parle en **pixel** (titres) et en **sans-serif sobre** (nav, paragraphe). La décoration se limite aux **crochets d'angle**, aux **0 et 1** et aux **lignes de balayage**.

Le mouvement fait la moitié du style (`references/motion.md`). Attention : la référence est une image fixe, donc **toutes les animations sont proposées** par le skill (voir `source.md`).

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : ni le nom, ni le logo, ni la photo, ni les textes du shot.

## Règles prioritaires

1. **Monochrome strict** : rampe `--void → --deep → --mid → --hot`, textes `--text / --text-2 / --muted`, **jaune réservé à la détection** (`--signal` : cadre, bande, bouton principal) et au surtitre (`--label`). Aucune autre teinte, sauf la frange `--ghost`.
2. **L'image est un signal** : toute photo passe par la rampe verte. Jamais de couleurs naturelles.
3. **Le scan du regard, une fois** : réticule (50 % / `--eye-y`) + bande claire décalée + cadre jaune à moitié rempli sur l'œil. Uniquement dans le héros.
4. **Trois voix** : pixel VT323 (titres, surtitres, chiffres) ; Inter (nav en capitales espacées, paragraphes, boutons) ; mono (console, étiquettes techniques).
5. **Titre** : 3 lignes courtes (≤ 14 caractères), lignes 1–2 `--text`, ligne 3 `--muted`, en bas à gauche.
6. **Tout est carré** (`--radius: 0`) ; crochets d'angle en L comme seul ornement.
7. **Texte lisible sur la photo** : voiles `--veil` derrière le titre et le paragraphe (le shot met du texte pâle sur vert vif, 3,6–3,9:1 seulement).
8. **Fluide** : couleurs de la photo calculées une fois (canvas), aucun filtre ni fusion recalculé à chaque image, une seule boucle d'animation (`motion.md`, « Performance »).
9. **Accessibilité** : vrai texte en `aria-label` pour tout ce qui se décode ; `prefers-reduced-motion` ouvre directement sur l'état final ; cibles ≥ 44px ; focus `--signal` ; journal en `role="log"`.
10. **Aucune valeur en dur** : tout vient de `references/tokens.css` (les rampes de couleur sont lues dans les variables CSS en JS).

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : couleurs mesurées sur l'image, tailles, positions du héros. |
| `references/motion.md` | **Toujours** : les 8 mouvements signature, le code, les règles de performance. |
| `references/components.md` | Nav, photo en 4 couches, réticule et cadre, surtitre, titre, carte CTA, crochets, composants des sections, états. |
| `references/layouts.md` | Positions exactes du héros, page complète, mobile. |
| `references/assets.md` | Avant de choisir une photo : sujet, fond clair, réglage de l'œil, traitement, replis, React Native. |
| `examples/demo.html` | Page complète animée (marque fictive « Gridward »). |
| `source.md` | Ce qui a été mesuré sur l'image, ce qui est proposé, les écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titre, surtitre, titres de section, chiffres | **VT323** (pixel fine, proportions normales) | capitales ; titre `--fs-hero` ≈ 106px, interligne 1 ; surtitre ≈ 33px |
| Nav, boutons | **Inter** 600 | 12px capitales, interlettrage .14em (nav) / .06–.1em (boutons) |
| Paragraphes | **Inter** 400 | ≈ 18px / 1.6 (intro), 14px ailleurs |
| Console, étiquettes, pied | **JetBrains Mono** 400/500 | 12px capitales +.08em |

La police du shot n'est pas identifiée : une grotesque pixelisée à traits fins. VT323 est la plus proche parmi celles testées (Jersey 10 trop grasse et étroite, Silkscreen et Tiny5 trop larges et grasses, Doto en points séparés).

## Couleurs

| Rôle | Token |
|---|---|
| Rampe de la photo | `--void`, `--deep`, `--mid`, `--hot` |
| Frange rouge | `--ghost` |
| Titre / paragraphe / 3e ligne | `--text` / `--text-2` / `--muted` |
| Surtitre | `--label` |
| Détection, bouton principal | `--signal` (texte `--on-signal`) |
| Crochets | `--bracket` |
| Carte CTA | `--deep → --panel` |
| Voile de lisibilité | `--veil` |
| Fond des sections | `--bg` |

## Images et 3D

Le héros part d'une **vraie photo** : une personne de face, regard caméra, **fond clair**, recolorée sur la rampe verte et empilée en 4 couches calculées une fois dans des canvas ; repli en filtre SVG puis en dégradé. Les sections utilisent des photos de matériel (circuit, serveurs, câbles) sur la même rampe, qui se « décryptent » en mosaïque. Jamais de visage ou d'objet dessiné. 3D optionnelle (nuage de points). Détails dans `references/assets.md`.

## Signature

**Le scan du regard** : photo verte de vision nocturne + réticule qui croise sur l'œil + bande claire décalée + cadre jaune à moitié rempli, animés en séquence (la bande descend, se cale, le cadre clignote et verrouille).

## À éviter

- Ajouter du bleu, du violet, un néon multicolore ou des dégradés arc-en-ciel.
- Coins arrondis, ombres douces, verre dépoli coloré.
- La typo pixel en petit corps (sous 24px : passer en mono ou en Inter).
- Une photo à fond sombre (tout devient noir) ou un profil (le cadre ne tombe pas sur l'œil).
- Cadenas, boucliers et globes en 3D génériques.
- Des animations lentes et décoratives : tout doit évoquer une machine qui scanne.
- Le nom, le logo, la photo ou les textes du shot.

## Adaptation React / React Native

- Héros : composant `<ScanHero eye={[0.334, 0.28]} scale={1.32} />` qui calcule la rampe dans un `useEffect` après `onLoad` et dessine les 4 canvas ; un seul `requestAnimationFrame` dans un `useEffect`.
- Décodage et compteurs : hook `useInView` + `requestAnimationFrame`.
- React Native : images déjà recolorées (frange, bande, cadre en images séparées), `react-native-reanimated` pour la bande et le défilement, `MaskedView` pour les découpes.
- Polices : `@expo-google-fonts/vt323`, `@expo-google-fonts/inter`, `@expo-google-fonts/jetbrains-mono`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur (rampes lues dans les variables CSS).
- [ ] Œil de la photo sur le croisement du réticule (`data-eye`, `data-scale` réglés).
- [ ] Les 8 mouvements de `motion.md` présents, coupés en mouvement réduit.
- [ ] Règles « Performance » respectées (couleurs cuites, pas de fusion animée, une seule boucle).
- [ ] Texte lisible sur la photo (voiles), contrastes vérifiés (`python3 tools/check.py acid-scan-security`).
- [ ] Testé à 375px et 1440px, sans débordement horizontal.
- [ ] Aucun élément du shot d'origine.
