#!/usr/bin/env python3
"""
kobo-studio — vérification des fiches de correspondance (contract/maps/<id>.css).

Pour chaque fiche :
  - rôles du contrat (contract/roles.css) non déclarés dans la fiche ;
  - variables du skill appelées par la fiche mais absentes de son tokens.css ;
  - contrastes à 4.5:1 : text, text-2, text-muted, success, warning et danger, chacun sur
    --k-bg, --k-surface et --k-surface-2 ; on-accent/accent ; text-inverse/bg-inverse ;
  - contrastes à 3:1 : accent/bg et focus/bg ;
  - le drapeau --k-accent-on-bg.

Règle de l'accent pâle. Si --k-accent seul n'atteint pas 3:1 sur --k-bg, la fiche doit :
  - déclarer un contour --k-accent-edge différent de l'accent, qui atteint 3:1 (c'est lui qui est mesuré) ;
  - déclarer --k-accent-on-bg: 0. Les composants lisent ce drapeau : l'accent ne porte alors JAMAIS seul
    une information sur --k-bg (pas de texte, d'icône, de filet fin ni d'état actif en accent seul).
À l'inverse, une fiche dont l'accent atteint 3:1 déclare --k-accent-on-bg: 1.

Usage : python3 tools/check_contract.py            (toutes les fiches)
        python3 tools/check_contract.py <id> ...   (certaines fiches)
        python3 tools/check_contract.py --json     (résultats en JSON, pour preview ou CI)
Code de sortie 1 si une fiche a un rôle manquant, une variable inexistante ou une paire en échec.
"""
import json
import re
import sys
from pathlib import Path

STUDIO = Path(__file__).resolve().parent.parent
CONTRACT = STUDIO / "contract"
MAPS = CONTRACT / "maps"
NOT_ROLES = ("--k-space-", "--k-sig", "--k-hit-min")  # fournis par le socle : pas à déclarer dans une fiche
NAMED = {"white": "#ffffff", "black": "#000000", "transparent": "rgb(0 0 0 / 0)"}

GROUNDS = ("bg", "surface", "surface-2")
PAIRS = (  # (texte, fond, seuil)
    [(fg, back, 4.5) for fg in ("text", "text-2", "text-muted") for back in GROUNDS]
    + [("on-accent", "accent", 4.5), ("text-inverse", "bg-inverse", 4.5)]
    + [(fg, back, 4.5) for fg in ("success", "warning", "danger") for back in GROUNDS]
    + [("accent", "bg", 3.0), ("focus", "bg", 3.0)]
)


def strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def declarations(block):
    return {k: re.sub(r"\s+", " ", v.strip()) for k, v in re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", block)}


def root_block(css):
    """Déclarations du premier bloc `:root { … }` sans sélecteur d'attribut."""
    m = re.search(r"(?:^|[;}])\s*:root\s*\{(.*?)\}", strip_comments(css), re.S)
    return declarations(m.group(1)) if m else {}


def split_args(s):
    out, depth, cur = [], 0, ""
    for ch in s:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == "," and depth == 0:
            out.append(cur.strip())
            cur = ""
        else:
            cur += ch
    out.append(cur.strip())
    return out


def color(value, env, seen=()):
    """Résout une valeur CSS en (r, g, b, a) ; None si ce n'est pas une couleur lisible."""
    v = NAMED.get(value.strip().lower(), value.strip())
    m = re.fullmatch(r"var\((--[\w-]+)\s*(?:,(.*))?\)", v, re.S)
    if m:
        name = m.group(1)
        if name in env and name not in seen:
            return color(env[name], env, seen + (name,))
        return color(m.group(2), env, seen) if m.group(2) else None
    m = re.fullmatch(r"#([0-9a-fA-F]{3,8})", v)
    if m:
        h = m.group(1)
        if len(h) in (3, 4):
            h = "".join(c * 2 for c in h)
        a = int(h[6:8], 16) / 255 if len(h) == 8 else 1.0
        return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), a)
    m = re.fullmatch(r"rgba?\(([^)]*)\)", v)
    if m:
        parts = [p for p in re.split(r"[\s,/]+", m.group(1).strip()) if p]
        if len(parts) < 3:
            return None
        num = lambda p: float(p[:-1]) * 2.55 if p.endswith("%") else float(p)
        a = 1.0
        if len(parts) > 3:
            a = float(parts[3][:-1]) / 100 if parts[3].endswith("%") else float(parts[3])
        return (num(parts[0]), num(parts[1]), num(parts[2]), a)
    m = re.fullmatch(r"color-mix\(\s*in srgb\s*,(.*)\)", v, re.S)
    if m:
        args = split_args(m.group(1))
        if len(args) != 2:
            return None
        items = []
        for arg in args:
            pm = re.search(r"\s([\d.]+)%\s*$", arg)
            items.append((color(arg[:pm.start()] if pm else arg, env, seen), float(pm.group(1)) / 100 if pm else None))
        (c1, p1), (c2, p2) = items
        if c1 is None or c2 is None:
            return None
        if p1 is None and p2 is None:
            p1 = p2 = 0.5
        elif p1 is None:
            p1 = 1 - p2
        elif p2 is None:
            p2 = 1 - p1
        total = p1 + p2 or 1
        p1, p2 = p1 / total, p2 / total
        a = c1[3] * p1 + c2[3] * p2  # mélange en alpha prémultiplié, comme le navigateur
        if a == 0:
            return (0, 0, 0, 0)
        return tuple((c1[i] * c1[3] * p1 + c2[i] * c2[3] * p2) / a for i in range(3)) + (a,)
    return None


def over(fg, bg):
    """Pose fg (avec alpha) sur bg opaque."""
    a = fg[3]
    return tuple(fg[i] * a + bg[i] * (1 - a) for i in range(3)) + (1.0,)


def lum(c):
    ch = [x / 255 for x in c[:3]]
    ch = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in ch]
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]


def ratio(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def hexa(c):
    return "#%02x%02x%02x" % tuple(round(max(0, min(255, x))) for x in c[:3])


def check_map(path, roles_default):
    errs, lines = [], []
    css = path.read_text(encoding="utf-8")
    imp = re.search(r'@import\s+(?:url\()?["\']([^"\']*tokens\.css)["\']', css)
    tokens = {}
    if not imp:
        errs.append("aucun @import du tokens.css du skill")
    else:
        tpath = (path.parent / imp.group(1)).resolve()
        if not tpath.exists():
            errs.append(f"tokens.css introuvable : {imp.group(1)}")
        else:
            tokens = root_block(tpath.read_text(encoding="utf-8"))
    decl = root_block(css)
    required = [r for r in roles_default if not r.startswith(NOT_ROLES)]
    missing = [r for r in required if r not in decl]
    if missing:
        errs.append("rôles manquants : " + ", ".join(missing))
    unknown = sorted({v for v in re.findall(r"var\((--[\w-]+)", strip_comments(css))
                      if not v.startswith("--k-") and v not in tokens})
    if unknown:
        errs.append("variables du skill inexistantes : " + ", ".join(unknown))
    env = {**roles_default, **tokens, **decl}
    bg = color("var(--k-bg)", env)
    if bg is None or bg[3] < 1:
        errs.append("--k-bg n'est pas une couleur opaque lisible")
        return errs, lines, []
    results = []
    for fg_role, bg_role, need in PAIRS:
        fg, back = color(f"var(--k-{fg_role})", env), color(f"var(--k-{bg_role})", env)
        if fg is None or back is None:
            errs.append(f"{fg_role}/{bg_role} : couleur illisible")
            continue
        back = over(back, bg)
        r = ratio(over(fg, back), back)
        label, note = f"{fg_role}/{bg_role}", ""
        if (fg_role, bg_role) == ("accent", "bg"):
            flag = env.get("--k-accent-on-bg", "").strip()
            if r >= need and flag != "1":
                errs.append(f"--k-accent-on-bg doit valoir 1 : l'accent atteint {r:.2f}:1 sur le fond")
            if r < need:
                if flag != "0":
                    errs.append(f"--k-accent-on-bg doit valoir 0 : l'accent seul n'atteint que {r:.2f}:1 sur le fond")
                edge = color("var(--k-accent-edge)", env)
                if edge is not None and hexa(over(edge, bg)) != hexa(over(fg, bg)):
                    r_edge = ratio(over(edge, bg), bg)
                    note = f" (accent seul {r:.2f}:1, --k-accent-on-bg: 0 ; mesuré sur le contour --k-accent-edge)"
                    label, r, fg = "accent-edge/bg", r_edge, edge
        ok = r >= need
        results.append({"pair": label, "ratio": round(r, 2), "min": need, "ok": ok,
                        "fg": hexa(over(fg, back)), "bg": hexa(back)})
        line = f"{label:<24} {r:5.2f}:1  (min {need})  {hexa(over(fg, back))} sur {hexa(back)}{note}"
        (lines if ok else errs).append(line if ok else "contraste " + line)
    return errs, lines, results


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    as_json = "--json" in sys.argv
    roles_default = root_block((CONTRACT / "roles.css").read_text(encoding="utf-8"))
    maps = sorted(MAPS.glob("*.css"))
    if args:
        maps = [m for m in maps if m.stem in args]
    if not maps:
        print("Aucune fiche à vérifier.")
        return 1
    failed, out = 0, {}
    for m in maps:
        errs, lines, results = check_map(m, roles_default)
        out[m.stem] = {"errors": errs, "pairs": results}
        failed += bool(errs)
        if as_json:
            continue
        print(f"\n[{'ÉCHEC' if errs else 'OK'}] {m.stem}")
        for e in errs:
            print("  ✗", e)
        for line in lines:
            print("  ·", line)
    if as_json:
        print(json.dumps(out, ensure_ascii=False, indent=1))
    else:
        print(f"\n{len(maps) - failed}/{len(maps)} fiche(s) valides.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
