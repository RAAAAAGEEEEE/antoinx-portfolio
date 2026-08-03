#!/usr/bin/env python3
"""Regenere le blog d'antoinx.com : metadonnees machine, maillage et sitemap.

Idempotent : peut etre relance sans dupliquer ce qu'il injecte.

Pour chaque article de blog/ :
  - Open Graph + Twitter Card (absents avant : aucun partage n'avait d'apercu)
  - JSON-LD BlogPosting date (aucun article n'en avait)
  - <time datetime> machine-lisible autour de la date deja affichee
  - <main> (landmark manquant, signale par Lighthouse)
  - nav reconstruite : les liens pointaient vers des ancres mortes et un compte X inexistant
  - variables CSS mortes remappees vers celles qui existent reellement
  - CTA newsletter en fin d'article (le trafic blog n'avait aucun point de conversion)

Puis regenere blog.html (les 54 articles, pas 13) et sitemap.xml.

Usage :
    python3 rebuild_blog.py [--dry-run]
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from datetime import date, datetime
from pathlib import Path

from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parent.parent  # ce script vit dans tools/
BLOG_DIR = REPO / "blog"
SITE = "https://antoinx.com"
AUTHOR = "Antoine"
BRAND = "Antoinx"
X_HANDLE = "Anto1nx"
OG_IMAGE = f"{SITE}/og-image.png"

# Ces variables sont utilisees par tout le blog mais ne sont definies nulle part
# dans styles.css. Les couleurs de texte s'en sortaient par heritage, mais les
# fonds devenaient transparents et les bordures tombaient sur currentColor.
CSS_VAR_FIXES = {
    "--text-primary": "--text",
    "--text-secondary": "--text-light",
    "--bg-secondary": "--secondary",
    "--border-color": "--border",
    "--accent-color": "--accent",
}

MOIS_FR = {
    "janvier": 1, "février": 2, "fevrier": 2, "mars": 3, "avril": 4,
    "mai": 5, "juin": 6, "juillet": 7, "août": 8, "aout": 8,
    "septembre": 9, "octobre": 10, "novembre": 11, "décembre": 12, "decembre": 12,
}
MOIS_FR_INV = {
    1: "janvier", 2: "février", 3: "mars", 4: "avril", 5: "mai", 6: "juin",
    7: "juillet", 8: "août", 9: "septembre", 10: "octobre", 11: "novembre",
    12: "décembre",
}

NAV_HTML = """
<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="logo" style="cursor:pointer;text-decoration:none;">Antoinx</a>
    <ul class="nav-links">
      <li><a href="/#siteservi">SiteServi</a></li>
      <li><a href="/#projets">Projets</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/#newsletter">Newsletter</a></li>
    </ul>
    <div class="nav-controls">
      <a href="https://x.com/{handle}" class="social-link twitter-link" aria-label="X @{handle}" rel="me" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.694-5.867 6.694h-3.306l7.75-8.863-8.16-10.764h6.523l4.828 6.383 5.306-6.383zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <button class="theme-toggle" id="theme-toggle" aria-label="Changer de theme">
        <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>
    </div>
  </div>
</nav>
""".replace("{handle}", X_HANDLE)

NL_CTA_HTML = """
<aside class="article-nl-cta" data-generated="nl-cta">
  <h2>Ce genre de trucs, directement par mail</h2>
  <p>Stack, fails, ce qui marche : ce que je teste vraiment en construisant mes SaaS en solo.</p>
  <a href="/#newsletter" class="cta-button primary">Recevoir la newsletter</a>
  <p class="nl-cta-note">Gratuit. Pas de spam, desinscription en un clic.</p>
</aside>
"""

NL_CTA_CSS = """
    .article-nl-cta {
      margin: 56px 0 8px;
      padding: 32px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--secondary);
      text-align: center;
    }
    .article-nl-cta h2 { font-size: 1.35rem; margin: 0 0 10px; }
    .article-nl-cta p { color: var(--text-light); margin: 0 0 18px; }
    .article-nl-cta .nl-cta-note { font-size: .85rem; margin: 14px 0 0; }
    .article-related { margin-top: 48px; }
    .article-related h2 { font-size: 1.25rem; margin-bottom: 12px; }
    .article-related ul { padding-left: 20px; }
    .article-related li { margin-bottom: 8px; }
"""


def run_git(args: list[str]) -> str:
    try:
        return subprocess.run(
            ["git"] + args, cwd=REPO, capture_output=True, text=True, check=False
        ).stdout.strip()
    except Exception:
        return ""


def git_added_date(path: Path) -> date | None:
    out = run_git(["log", "--diff-filter=A", "--format=%aI", "--", str(path.relative_to(REPO))])
    if not out:
        return None
    first = out.splitlines()[-1]
    try:
        return datetime.fromisoformat(first).date()
    except ValueError:
        return None


def parse_fr_date(text: str) -> date | None:
    m = re.search(r"(\d{1,2})\s+([A-Za-zéûôàèêÉ]+)\s+(\d{4})", text or "")
    if not m:
        return None
    day, month_name, year = m.group(1), m.group(2).lower(), m.group(3)
    month = MOIS_FR.get(month_name)
    if not month:
        return None
    try:
        return date(int(year), month, int(day))
    except ValueError:
        return None


def fr_date_str(d: date) -> str:
    return f"{d.day} {MOIS_FR_INV[d.month]} {d.year}"


def fix_dead_handles(html: str) -> str:
    """Le compte @Antoinx_x n'existe pas ; le vrai est @Anto1nx.

    Il apparaissait dans la nav mais aussi dans le corps redactionnel de
    plusieurs articles ("suis @Antoinx_x sur X").
    """
    html = html.replace("x.com/Antoinx_x", f"x.com/{X_HANDLE}")
    html = html.replace("twitter.com/Antoinx_x", f"x.com/{X_HANDLE}")
    html = html.replace("@Antoinx_x", f"@{X_HANDLE}")
    return html


def fix_css_vars(html: str) -> str:
    for dead, alive in CSS_VAR_FIXES.items():
        html = html.replace(f"var({dead})", f"var({alive})")
        # certaines regles utilisent un fallback : var(--accent-color, #0066ff)
        html = re.sub(
            r"var\(" + re.escape(dead) + r"\s*,[^)]*\)", f"var({alive})", html
        )
    return html


def clean_head_injections(soup: BeautifulSoup) -> None:
    """Retire ce que ce script injecte, pour rester idempotent."""
    for tag in soup.head.find_all("meta", attrs={"property": True}):
        prop = tag.get("property", "")
        if prop.startswith("og:") or prop.startswith("article:"):
            tag.decompose()
    for tag in soup.head.find_all("meta", attrs={"name": True}):
        if tag.get("name", "").startswith("twitter:"):
            tag.decompose()
    for tag in soup.head.find_all("script", attrs={"type": "application/ld+json"}):
        tag.decompose()


def add_head_meta(soup: BeautifulSoup, *, title: str, desc: str, url: str,
                  published: date) -> None:
    head = soup.head
    iso = published.isoformat()

    def meta(attr: str, key: str, value: str) -> None:
        tag = soup.new_tag("meta")
        tag[attr] = key
        tag["content"] = value
        head.append(tag)

    meta("property", "og:type", "article")
    meta("property", "og:title", title)
    meta("property", "og:description", desc)
    meta("property", "og:url", url)
    meta("property", "og:image", OG_IMAGE)
    meta("property", "og:site_name", BRAND)
    meta("property", "og:locale", "fr_FR")
    meta("property", "article:published_time", iso)
    meta("property", "article:author", AUTHOR)
    meta("name", "twitter:card", "summary_large_image")
    meta("name", "twitter:title", title)
    meta("name", "twitter:description", desc)
    meta("name", "twitter:image", OG_IMAGE)
    meta("name", "twitter:creator", f"@{X_HANDLE}")

    person = {
        "@type": "Person",
        "name": AUTHOR,
        "url": f"{SITE}/",
        "sameAs": [f"https://x.com/{X_HANDLE}", "https://github.com/RAAAAAGEEEEE"],
    }
    payload = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title[:110],
        "description": desc,
        "datePublished": iso,
        "dateModified": iso,
        "author": person,
        "publisher": person,
        "mainEntityOfPage": {"@type": "WebPage", "@id": url},
        "image": OG_IMAGE,
        "inLanguage": "fr-FR",
        "url": url,
    }
    script = soup.new_tag("script", type="application/ld+json")
    script.string = json.dumps(payload, ensure_ascii=False, indent=2)
    head.append(script)


def process_article(path: Path, dry_run: bool) -> dict | None:
    raw = path.read_text(encoding="utf-8")
    raw = fix_css_vars(fix_dead_handles(raw))
    soup = BeautifulSoup(raw, "html.parser")

    if not soup.head or not soup.body:
        print(f"  ! {path.name} : structure HTML inattendue, ignore")
        return None

    slug = path.stem
    url = f"{SITE}/blog/{slug}"

    h1 = soup.find("h1")
    title_tag = soup.find("title")
    headline = h1.get_text(strip=True) if h1 else (
        title_tag.get_text(strip=True) if title_tag else slug
    )

    desc_tag = soup.find("meta", attrs={"name": "description"})
    desc = desc_tag.get("content", "").strip() if desc_tag else headline

    meta_div = soup.find(class_="article-meta")
    published = parse_fr_date(meta_div.get_text(" ", strip=True)) if meta_div else None
    if published is None:
        published = git_added_date(path) or date.today()

    # <title> : la casse de la marque etait en minuscule sur les 54 articles
    if title_tag and title_tag.string:
        title_tag.string = re.sub(r"\bantoinx\b", BRAND, title_tag.string)

    # canonical sans .html (cleanUrls est actif cote Vercel)
    canon = soup.find("link", attrs={"rel": "canonical"})
    if canon:
        canon["href"] = url
    else:
        tag = soup.new_tag("link", rel="canonical", href=url)
        soup.head.append(tag)

    clean_head_injections(soup)
    add_head_meta(soup, title=headline, desc=desc, url=url, published=published)

    # date machine-lisible : elle n'etait affichee qu'en texte brut
    if meta_div:
        span = meta_div.find("span")
        if span and not meta_div.find("time"):
            time_tag = soup.new_tag("time")
            time_tag["datetime"] = published.isoformat()
            time_tag.string = fr_date_str(published)
            span.replace_with(time_tag)

    # nav : ancres mortes (/#news, /#portfolio, /#contact) + mauvais compte X
    old_nav = soup.find("nav", class_="navbar")
    new_nav = BeautifulSoup(NAV_HTML, "html.parser")
    if old_nav:
        old_nav.replace_with(new_nav)
    else:
        soup.body.insert(0, new_nav)

    container = soup.find(class_="article-container")

    # Nettoie les wrappers vides laisses par une execution precedente.
    for stale in soup.find_all(class_="article-related"):
        if not stale.find("a"):
            stale.decompose()

    # bloc "A lire aussi" : il trainait apres </footer>, hors de toute structure.
    # Ne le deplace qu'une fois : s'il est deja range, on n'y touche plus.
    if container and not soup.find(class_="article-related"):
        related = None
        for h2 in soup.find_all("h2"):
            if "lire aussi" in h2.get_text(strip=True).lower():
                related = h2
                break
        if related:
            ul = related.find_next_sibling("ul")
            wrapper = soup.new_tag("section")
            wrapper["class"] = "article-related"
            related.extract()
            wrapper.append(related)
            if ul:
                ul.extract()
                for a in ul.find_all("a", href=True):
                    a["href"] = re.sub(r"^/blog/(.+)\.html$", r"/blog/\1", a["href"])
                wrapper.append(ul)
            if wrapper.find("a"):
                container.append(wrapper)

    # CTA newsletter : le trafic blog n'avait aucun point de conversion.
    # Remplace seulement si le texte a change, sinon chaque execution
    # deplacerait le bloc et produirait un diff sans fin.
    target_cta = BeautifulSoup(NL_CTA_HTML, "html.parser")
    target_text = target_cta.get_text(" ", strip=True)
    existing = soup.find_all(attrs={"data-generated": "nl-cta"})
    up_to_date = (
        len(existing) == 1 and existing[0].get_text(" ", strip=True) == target_text
    )
    if container and not up_to_date:
        for old_cta in existing:
            old_cta.decompose()
        container.append(target_cta)

    # <main> : landmark absent (echec Lighthouse landmark-one-main)
    if container and not soup.find("main"):
        main = soup.new_tag("main")
        container.wrap(main)

    style = soup.find("style")
    if style and style.string and ".article-nl-cta" not in style.string:
        style.string = style.string + NL_CTA_CSS

    if not dry_run:
        path.write_text(str(soup), encoding="utf-8")

    return {
        "slug": slug,
        "url": url,
        "title": headline,
        "desc": desc,
        "date": published,
    }


BLOG_INDEX_TEMPLATE = """<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7VVNEP13FL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'G-7VVNEP13FL');
</script>
<script>
  try {{
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  }} catch (e) {{}}
</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - {brand}</title>
  <meta name="description" content="Ce que j'apprends en construisant des SaaS en solo avec l'IA : stack, outils, fails et ce qui marche vraiment. {count} articles, en francais.">
  <meta name="author" content="{brand}">
  <link rel="canonical" href="{site}/blog">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Blog - {brand}">
  <meta property="og:description" content="Ce que j'apprends en construisant des SaaS en solo avec l'IA : stack, outils, fails et ce qui marche.">
  <meta property="og:url" content="{site}/blog">
  <meta property="og:image" content="{og_image}">
  <meta property="og:site_name" content="{brand}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Blog - {brand}">
  <meta name="twitter:description" content="Ce que j'apprends en construisant des SaaS en solo avec l'IA.">
  <meta name="twitter:image" content="{og_image}">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' font-weight='bold' fill='%230066ff'>A</text></svg>">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">
{blog_schema}
  </script>
  <style>
    .blog-header {{
      padding: 72px 20px 40px;
      text-align: center;
      border-bottom: 1px solid var(--border);
    }}
    .blog-header h1 {{
      font-family: Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Times New Roman', serif;
      font-size: clamp(2.2rem, 6vw, 3rem);
      margin-bottom: 12px;
    }}
    .blog-header p {{
      font-size: 1.05rem;
      color: var(--text-light);
      max-width: 620px;
      margin: 0 auto;
    }}
    .blog-articles {{
      max-width: 860px;
      margin: 56px auto 72px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }}
    .article-card {{
      padding: 26px 28px;
      border: 1px solid var(--border);
      border-radius: 12px;
      transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
      text-decoration: none;
      color: inherit;
      display: block;
      background: var(--bg);
    }}
    .article-card:hover {{
      border-color: var(--accent);
      box-shadow: 0 2px 12px rgba(0, 0, 0, .05);
      transform: translateY(-2px);
    }}
    .article-title {{
      font-size: 1.25rem;
      line-height: 1.35;
      margin-bottom: 8px;
      color: var(--text);
    }}
    .article-meta {{
      font-size: .85rem;
      color: var(--text-light);
      margin-bottom: 10px;
    }}
    .article-excerpt {{
      color: var(--text-light);
      font-size: .95rem;
      line-height: 1.6;
      margin: 0;
    }}
    .blog-nl-cta {{
      max-width: 860px;
      margin: 0 auto 72px;
      padding: 32px 28px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--secondary);
      text-align: center;
    }}
    .blog-nl-cta h2 {{ font-size: 1.35rem; margin: 0 0 10px; }}
    .blog-nl-cta p {{ color: var(--text-light); margin: 0 0 18px; }}
  </style>
</head>
<body>
{nav}
  <header class="blog-header">
    <h1>Blog</h1>
    <p>Ce que j'apprends en construisant des SaaS en solo avec l'IA. Stack, outils, fails et ce qui marche vraiment.</p>
  </header>

  <main>
    <section class="blog-articles">
{cards}
    </section>

    <aside class="blog-nl-cta">
      <h2>Recois les prochains articles</h2>
      <p>Stack, fails, ce qui marche. En francais, directement par mail.</p>
      <a href="/#newsletter" class="cta-button primary">Recevoir la newsletter</a>
    </aside>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>&copy; 2026 {brand}. <a href="/">Retour a l'accueil</a></p>
      </div>
    </div>
  </footer>

  <script defer src="/script.js"></script>
  <script defer src="/cookie-banner.js"></script>
</body>
</html>
"""


def esc(text: str) -> str:
    return (
        text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def build_blog_index(articles: list[dict], dry_run: bool) -> None:
    cards = []
    for a in articles:
        cards.append(
            f'      <a href="/blog/{a["slug"]}" class="article-card">\n'
            f'        <h2 class="article-title">{esc(a["title"])}</h2>\n'
            f'        <div class="article-meta"><time datetime="{a["date"].isoformat()}">'
            f'{fr_date_str(a["date"])}</time></div>\n'
            f'        <p class="article-excerpt">{esc(a["desc"])}</p>\n'
            f"      </a>"
        )

    blog_schema = json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": f"Blog - {BRAND}",
            "url": f"{SITE}/blog",
            "inLanguage": "fr-FR",
            "author": {"@type": "Person", "name": AUTHOR, "url": f"{SITE}/"},
            "blogPost": [
                {
                    "@type": "BlogPosting",
                    "headline": a["title"][:110],
                    "url": a["url"],
                    "datePublished": a["date"].isoformat(),
                }
                for a in articles
            ],
        },
        ensure_ascii=False,
        indent=2,
    )

    html = BLOG_INDEX_TEMPLATE.format(
        brand=BRAND,
        site=SITE,
        og_image=OG_IMAGE,
        count=len(articles),
        nav=NAV_HTML,
        cards="\n".join(cards),
        blog_schema=blog_schema,
    )
    if not dry_run:
        (REPO / "blog.html").write_text(html, encoding="utf-8")


LATEST_START = "<!-- LATEST_POSTS:START -->"
LATEST_END = "<!-- LATEST_POSTS:END -->"


def inject_latest_posts(articles: list[dict], dry_run: bool, count: int = 3) -> bool:
    """Remplit la section 'derniers articles' de la home.

    Le blog est le principal actif de contenu du site et n'apparaissait nulle
    part sur la home, hors un lien de nav.
    """
    index = REPO / "index.html"
    if not index.exists():
        return False
    html = index.read_text(encoding="utf-8")
    if LATEST_START not in html or LATEST_END not in html:
        print("  ! index.html : marqueurs LATEST_POSTS absents, section non mise a jour")
        return False

    cards = []
    for a in articles[:count]:
        cards.append(
            f'          <a href="/blog/{a["slug"]}" class="post-card">\n'
            f'            <time datetime="{a["date"].isoformat()}">{fr_date_str(a["date"])}</time>\n'
            f'            <h3>{esc(a["title"])}</h3>\n'
            f"          </a>"
        )
    block = (
        LATEST_START
        + "\n"
        + "\n".join(cards)
        + f'\n          <a href="/blog" class="post-card post-card-all">\n'
        f"            <span>Tous les articles</span>\n"
        f'            <h3>{len(articles)} articles publies</h3>\n'
        f"          </a>\n          "
        + LATEST_END
    )
    start = html.index(LATEST_START)
    end = html.index(LATEST_END) + len(LATEST_END)
    new_html = html[:start] + block + html[end:]
    if not dry_run and new_html != html:
        index.write_text(new_html, encoding="utf-8")
    return True


STATIC_PAGES = [
    ("/", "1.0"),
    ("/blog", "0.9"),
    ("/legal", "0.3"),
    ("/privacy", "0.3"),
    ("/terms", "0.3"),
    ("/cookies", "0.3"),
]


def build_sitemap(articles: list[dict], dry_run: bool) -> None:
    today = date.today().isoformat()
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for path, prio in STATIC_PAGES:
        lines += ["  <url>", f"    <loc>{SITE}{path}</loc>",
                  f"    <lastmod>{today}</lastmod>",
                  f"    <priority>{prio}</priority>", "  </url>"]
    for a in articles:
        lines += ["  <url>", f"    <loc>{a['url']}</loc>",
                  f"    <lastmod>{a['date'].isoformat()}</lastmod>",
                  "    <priority>0.8</priority>", "  </url>"]
    lines.append("</urlset>")
    if not dry_run:
        (REPO / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    files = sorted(BLOG_DIR.glob("*.html"))
    if not files:
        print("Aucun article trouve.", file=sys.stderr)
        return 1

    print(f"{len(files)} articles a traiter...")
    articles = []
    for path in files:
        result = process_article(path, args.dry_run)
        if result:
            articles.append(result)

    articles.sort(key=lambda a: a["date"], reverse=True)

    build_blog_index(articles, args.dry_run)
    build_sitemap(articles, args.dry_run)
    injected = inject_latest_posts(articles, args.dry_run)

    print(f"  articles traites : {len(articles)}")
    print(f"  blog.html        : {len(articles)} cartes")
    print(f"  sitemap.xml      : {len(articles) + len(STATIC_PAGES)} URLs")
    print(f"  home             : {'3 derniers articles injectes' if injected else 'non modifiee'}")
    if articles:
        print(f"  periode          : {articles[-1]['date']} -> {articles[0]['date']}")
    if args.dry_run:
        print("  (dry-run : rien ecrit)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
