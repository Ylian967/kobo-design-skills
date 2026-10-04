#!/usr/bin/env python3
"""
kobo-studio — génération des fiches de correspondance (contract/maps/<id>.css).

Ce script écrit ou réécrit une fiche à partir du tokens.css d'un skill. Il ne modifie jamais le skill.

Ce qu'il fait tout seul
  - relie chaque rôle à la première variable du skill dont le nom est attendu pour ce rôle
    (table CANDIDATES ci-dessous), en vérifiant qu'une couleur est bien une couleur ;
  - met un repli neutre quand le skill ne dit rien (commentaire « repli ») ;
  - dérive --k-success, --k-warning, --k-danger (teintes 150°, 40°, 0°, saturation de l'accent du skill)
    et corrige --k-text-2 / --k-text-muted s'ils n'atteignent pas 4.5:1 sur --k-bg, --k-surface et
    --k-surface-2 (commentaire « dérivé ») ;
  - calcule le drapeau --k-accent-on-bg ;
  - liste en --k-sig-* toutes les variables du skill restées sans rôle, et écrit les blocs d'intensité ;
  - reprend l'URL Google Fonts de examples/demo.html.

Ce qu'il ne touche pas : les lignes marquées [main]
  Une ligne dont le commentaire commence par [main] a été décidée à la main. Le script la recopie
  telle quelle à chaque régénération. Exemple :
      --k-accent: var(--ink); /* [main] accent neutre : l'action est en encre */
  Pour corriger une fiche : modifier la ligne, ajouter [main] au début de son commentaire.
  Pour rendre une ligne au script : retirer [main].

Usage (depuis n'importe où)
  python3 tools/gen_maps.py <id> [<id> …]   crée ou régénère ces fiches
  python3 tools/gen_maps.py --all           régénère toutes les fiches existantes
  python3 tools/gen_maps.py --check [<id>]  n'écrit rien ; dit quelles fiches changeraient (code 1 s'il y en a)
  python3 tools/gen_maps.py --adopt [<id>]  marque [main] toute ligne dont la valeur diffère de ce que le
                                            script produirait seul : à lancer après une retouche à la main
                                            faite sans marqueur, pour la protéger

Pour un nouveau skill : lancer `gen_maps.py <id>`, relire la fiche ligne à ligne (le script devine d'après
les noms : il se trompe sur les skills aux noms inhabituels), corriger et marquer [main], puis lancer
`check_contract.py <id>` et regarder le skill dans contract/preview.html (ajouter son identifiant à DATA).
"""
import colorsys
import re
import sys
from pathlib import Path

sys.dont_write_bytecode = True
sys.path.insert(0, str(Path(__file__).resolve().parent))
import check_contract as cc  # noqa: E402

SKILLS = cc.STUDIO.parent
MAPS = cc.MAPS
MARK = "[main]"
COLOR_ROLES = {"bg", "surface", "surface-2", "overlay", "scrim", "bg-inverse", "text", "text-2", "text-muted",
               "on-accent", "text-inverse", "accent", "accent-edge", "accent-2", "success", "warning", "danger",
               "focus", "line", "line-strong"}
STATE_HUES = {"success": 150, "warning": 40, "danger": 0}
ON = "sur --k-bg, --k-surface et --k-surface-2"

# Noms de variables attendus pour chaque rôle, par ordre de préférence ; puis le repli (None = valeur de roles.css).
CANDIDATES = {
    "bg": (["bg", "paper", "page"], None), "surface": (["surface", "panel", "card", "tile"], None),
    "surface-2": (["surface-2", "card-soft"], None),
    "overlay": (["menu-veil", "veil-strong", "veil-2", "veil"], "var(--k-scrim)"),
    "scrim": (["veil-1", "veil", "shade-1"], "color-mix(in srgb, var(--k-bg) 60%, transparent)"),
    "bg-inverse": ([], "var(--k-text)"), "text-inverse": ([], "var(--k-bg)"),
    "text": (["text", "ink"], None), "text-2": (["text-2", "text-soft", "body", "soft"], None),
    "text-muted": (["muted"], None), "on-accent": (["on-accent"], None),
    "accent": (["accent"], None), "accent-edge": ([], None), "accent-2": (["accent-2"], None),
    "focus": (["focus"], None), "focus-w": ([], None), "focus-offset": ([], None),
    "line": (["line", "rule"], None), "line-strong": (["line-strong"], None),
    "font-display": (["font-display"], None), "font-body": (["font-body", "font", "font-ui", "font-sans"], None),
    "font-mono": (["font-mono"], None),
    "fs-hero": (["fs-hero", "text-hero"], None), "fs-h1": (["fs-h1"], None), "fs-h2": (["fs-h2"], None),
    "fs-h3": (["fs-h3", "text-h3"], None), "fs-body": (["fs-body", "text-base"], None),
    "fs-small": (["fs-small", "text-sm"], None),
    "fs-label": (["fs-label", "fs-nav", "fs-tiny", "fs-ui", "text-xs"], None),
    "lh-tight": (["lh-hero", "lh-title", "leading-tight", "lh-h2"], "1.05"),
    "lh-body": (["lh-body", "leading-body", "leading", "lh-lead", "lh-ui"], "1.5"),
    "ls-display": (["ls-hero", "ls-title", "ls-display", "ls-tight"], "0em"),
    "ls-caps": (["ls-label", "ls-nav", "tracking-nav", "tracking-caps", "ls-ui", "ls-btn", "tracking"], "0.06em"),
    "fw-display": (["display-weight", "weight", "w-title", "weight-display", "fw-bold"], "700"),
    "radius": (["radius", "r", "r-btn"], "0px"), "radius-lg": (["radius-lg", "r-card"], None),
    "radius-pill": (["r-pill"], "999px"), "border-w": (["bw", "hairline", "stroke", "hair"], "1px"),
    "cut": (["chamfer"], "0px"), "angle": (["slant", "angle", "tilt"], "0deg"), "shadow": (["drop", "hard"], "none"),
    "edge": (["edge", "gutter", "pad"], None), "container": (["container", "page", "page-w"], None),
    "section-y": (["section-y", "space-24"], None), "control-h": (["btn-h", "pill-h", "field-h"], "44px"),
    "nav-h": (["nav-h", "bar-h"], "64px"),
    "ease-out": (["ease-out", "ease"], None), "ease-in-out": (["ease-in-out", "ease-io"], None),
    "ease-spring": (["ease-spring", "ease-back", "ease-pop", "ease-drop"], None),
    "dur-fast": (["dur-fast"], None), "dur-base": (["dur-base", "dur", "dur-ui"], None), "dur-slow": (["dur-slow"], None),
}


def hsl_hex(h, s, l):
    r, g, b = colorsys.hls_to_rgb(h / 360, l, s)
    return "#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))


def to_hsl(c):
    h, l, s = colorsys.rgb_to_hls(c[0] / 255, c[1] / 255, c[2] / 255)
    return h * 360, s, l


def push(h, s, l, grounds, target=4.6):
    """Éclaircit (fond sombre) ou assombrit (fond clair) jusqu'à tenir le contraste sur tous les fonds."""
    lighten = cc.lum(grounds[0]) < 0.18
    hx, r = hsl_hex(h, s, l), 0
    for i in range(201):
        hx = hsl_hex(h, s, l + (i / 200) * ((1 - l) if lighten else -l))
        r = min(cc.ratio(cc.color(hx, {}), g) for g in grounds)
        if r >= target:
            break
    return hx, r


def read_map(path):
    """Lignes de rôle d'une fiche existante : rôle -> (valeur, commentaire)."""
    if not path.exists():
        return {}, []
    css = path.read_text(encoding="utf-8")
    m = re.search(r"\n:root\s*\{(.*?)\n\}", css, re.S)
    lines = {}
    for line in (m.group(1) if m else "").splitlines():
        lm = re.match(r"\s*--k-([\w-]+)\s*:\s*(.*?);\s*(?:/\*\s*(.*?)\s*\*/)?\s*$", line)
        if lm and not lm.group(1).startswith("sig-"):
            lines[lm.group(1)] = (lm.group(2), lm.group(3) or "")
    return lines, re.findall(r'@import url\("([^"]+)"\);', css)


def build(skill, adopt=False):
    tpath = SKILLS / skill / "references" / "tokens.css"
    if not tpath.exists():
        raise SystemExit(f"{skill} : references/tokens.css introuvable")
    tokens = cc.root_block(tpath.read_text(encoding="utf-8"))
    roles_css = (cc.CONTRACT / "roles.css").read_text(encoding="utf-8")
    defaults = cc.root_block(roles_css)
    roles = [r[4:] for r in defaults if not r.startswith(cc.NOT_ROLES)]
    group, cur = {}, None
    for line in roles_css.splitlines():
        gm = re.match(r"\s*/\* ---- (.*?) ---- \*/", line)
        if gm:
            cur = gm.group(1).split(" :")[0]
        rm = re.match(r"\s*--k-([\w-]+)\s*:", line)
        if rm and cur:
            group[rm.group(1)] = cur
    old, old_fonts = read_map(MAPS / f"{skill}.css")
    manual = {r: v for r, v in old.items() if v[1].startswith(MARK)}
    out, note = {}, {}

    def env():
        return {**defaults, **tokens, **{"--k-" + r: v for r, v in out.items()}}

    def auto_static(role):
        names, fallback = CANDIDATES.get(role, ([], None))
        for n in names:
            if "--" + n in tokens and (role not in COLOR_ROLES or cc.color(tokens["--" + n], tokens) is not None) \
                    and (role in COLOR_ROLES or cc.color(tokens["--" + n], tokens) is None):
                return f"var(--{n})", ""
        if fallback is not None:
            return fallback, "repli"
        return defaults["--k-" + role], "repli du contrat"

    late = ["text-2", "text-muted", "success", "warning", "danger", "accent-on-bg"]
    for role in roles:
        if role in manual:
            out[role], note[role] = manual[role]
        elif role not in late:
            out[role], note[role] = auto_static(role)

    def adopt_lines(which):  # --adopt : protège toute ligne existante qui diffère de la proposition du script
        for role in which if adopt else ():
            if role in old and role in out and role not in manual and old[role][0] != out[role]:
                out[role], note[role] = old[role][0], f"{MARK} {old[role][1]}".strip()
                manual[role] = (out[role], note[role])

    adopt_lines([r for r in roles if r not in late])
    bg = cc.color("var(--k-bg)", env())
    if bg is None or bg[3] < 1:
        raise SystemExit(f"{skill} : --k-bg illisible ; fixer la ligne à la main avec {MARK}")
    grounds = [bg] + [cc.over(cc.color(f"var(--k-{g})", env()) or bg, bg) for g in ("surface", "surface-2")]
    worst = lambda c: min(cc.ratio(cc.over(c, g), g) for g in grounds)
    for role in ("text-2", "text-muted"):
        if role in manual:
            continue
        out[role], note[role] = auto_static(role)
        c = cc.color(f"var(--k-{role})", env())
        if c is not None and worst(c) < 4.5:
            h, s, l = to_hsl(cc.over(c, bg))
            hx, r = push(h, s, l, grounds)
            note[role] = f"dérivé de {out[role]} ({worst(c):.2f}:1 au pire) : même teinte, clarté ajustée → {r:.2f}:1 au moins {ON}"
            out[role] = hx
        adopt_lines([role])
    acc = cc.color("var(--k-accent-2)", env()) or cc.color("var(--k-accent)", env())
    sat = to_hsl(cc.over(acc, bg))[1] if acc else 0
    sat = 0.35 if sat < 0.12 else min(0.65, max(0.3, sat))
    for role, hue in STATE_HUES.items():
        if role in manual:
            continue
        hx, r = push(hue, sat, 0.5, grounds)
        out[role] = hx
        note[role] = f"dérivé : teinte {hue}°, saturation calée sur celle de son accent, clarté ajustée → {r:.2f}:1 au moins {ON}"
    if "accent-on-bg" not in manual:
        ra = cc.ratio(cc.over(cc.color("var(--k-accent)", env()), bg), bg)
        out["accent-on-bg"] = "1" if ra >= 3 else "0"
        note["accent-on-bg"] = (f"accent à {ra:.2f}:1 sur le fond : il peut porter seul une information" if ra >= 3 else
                                f"accent à {ra:.2f}:1 sur le fond : jamais de texte, d'icône, de filet fin ni d'état actif "
                                f"en accent seul ; aplat cerné de --k-accent-edge uniquement")

    adopt_lines(late)

    used = set(re.findall(r"var\(--([\w-]+)", " ".join(out.values())))
    sig = [k[2:] for k in tokens if k[2:] not in used and not re.fullmatch(r"space-\d+", k[2:])]
    motion = [n for n in sig if re.fullmatch(r"-?[\d.]+m?s", tokens["--" + n])]
    demo = SKILLS / skill / "examples" / "demo.html"
    fonts = [u.replace("&amp;", "&") for u in re.findall(r'https://fonts\.googleapis\.com/css2[^"]*',
             demo.read_text(encoding="utf-8"))] if demo.exists() else []
    fonts = fonts or old_fonts
    plain = lambda r: note[r].removeprefix(MARK).strip()
    n_der = sum(plain(r).startswith("dérivé") for r in roles)
    n_rep = sum(plain(r).startswith("repli") for r in roles)
    n_man = sum(note[r].startswith(MARK) for r in roles)

    L = ["/*", f" * kobo-studio — fiche de correspondance : {skill}", " *",
         " * Relie les rôles du contrat (--k-*) aux variables du skill. Le skill n'est pas modifié.",
         f" * Rôles : {len(roles) - n_der - n_rep} reliés ou relevés, {n_der} dérivés, {n_rep} en repli.",
         f" * {n_man} ligne(s) marquée(s) {MARK} : décidées à la main, conservées telles quelles par tools/gen_maps.py.",
         " *", " * Polices (Google Fonts) :"] + [f" *   {u}" for u in fonts] + [" *",
         f" * Signature : {len(sig)} variable(s) --k-sig-* (lisibles seulement par les composants de signature) :"]
    line = " *   "
    for s in sig:
        if len(line) + len(s) + 9 > 112:
            L.append(line.rstrip())
            line = " *   "
        line += f"--k-sig-{s}, "
    if sig:
        L.append(line.rstrip(", "))
    L += [" *", ' * Intensité : data-k-intensity="full" | "reduced" | "off" sur <html> ou sur un parent (blocs en fin de fiche).', " */", ""]
    L += [f'@import url("{u}");' for u in fonts] + ['@import "../roles.css";',
                                                     f'@import "../../../{skill}/references/tokens.css";', "", ":root {"]
    g = None
    for role in roles:
        if group[role] != g:
            if g:
                L.append("")
            g = group[role]
            L.append(f"  /* ---- {g} ---- */")
        L.append(f"  --k-{role}: {out[role]};" + (f" /* {note[role]} */" if note[role] else ""))
    L += ["", "  /* ---- Signature : variables propres au skill, sous leur nom d'origine ---- */"]
    L += [f"  --k-sig-{s}: var(--{s});" for s in sig] + ["}", ""]
    zero = "\n".join(f"  --k-sig-{m}: 0s;" for m in motion) or \
        "  /* aucune durée de signature dans ce skill : les interrupteurs --k-sig et --k-sig-motion suffisent */"
    L += ["/* Intensité « reduced » : ornements gardés, mouvements de signature coupés. */",
          '[data-k-intensity="reduced"] {', zero, "}", "",
          "/* Intensité « off » : couleurs, typo et formes gardées ; ornements et mouvements de signature coupés. */",
          '[data-k-intensity="off"] {', zero, "}", ""]
    return "\n".join(L), n_man


def main():
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    ids = [a for a in sys.argv[1:] if not a.startswith("--")]
    if "--all" in flags or (not ids and flags & {"--check", "--adopt"}):
        ids = sorted(p.stem for p in MAPS.glob("*.css"))
    if not ids:
        print(__doc__)
        return 1
    changed = 0
    for skill in ids:
        text, n_man = build(skill, adopt="--adopt" in flags)
        path = MAPS / f"{skill}.css"
        same = path.exists() and path.read_text(encoding="utf-8") == text
        changed += not same
        if "--check" not in flags and not same:
            MAPS.mkdir(parents=True, exist_ok=True)
            path.write_text(text, encoding="utf-8")
        state = "inchangée" if same else ("changerait" if "--check" in flags else "écrite")
        print(f"{skill:<28} {state:<11} {n_man} ligne(s) {MARK}")
    return 1 if ("--check" in flags and changed) else 0


if __name__ == "__main__":
    sys.exit(main())
