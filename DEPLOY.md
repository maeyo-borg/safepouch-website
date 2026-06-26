# Deploying the SafePouch website

This is a **static site** — plain HTML/CSS/JS, no build step. Any static host works.
Below: a 5-minute path (Netlify), plus Vercel and GitHub Pages.

---

## ✅ Before you launch (2-minute checklist)

1. **Domain in 2 files** — `robots.txt` and `sitemap.xml` currently use `https://safepouch.co`.
   If your real domain differs, find-and-replace it in both files.
2. **Legal pages** — in `privacy.html` and `terms.html`, replace "SafePouch" with your
   real legal/business name if different, and confirm the **governing-law state** in
   `terms.html` (currently California).
3. **Contact form** — it currently opens the visitor's email app (`mailto:`). That works,
   but if you want leads captured even when no mail app is set up, wire it to Formspree
   later (ask and I'll do it).

## Files you DON'T need to deploy (dev-only)

`serve.mjs`, `screenshot.mjs`, `temporary screenshots/`, `CLAUDE.md`,
`www.yeldra.com_.png`, `.DS_Store`. These are ignored by `.gitignore` if you deploy via git.

## Files that ARE the site

`*.html`, `images/`, `BRAND_ASSETS/`, `robots.txt`, `sitemap.xml`, `netlify.toml`.

---

## Option A — Netlify (recommended, easiest)

**Drag-and-drop (fastest):**
1. Go to https://app.netlify.com/drop
2. Drag this project **folder** onto the page. It deploys instantly to a
   `random-name.netlify.app` URL.
3. To use your domain: Site settings → Domain management → Add custom domain →
   follow the DNS steps Netlify gives you.

**Git-based (better — auto-deploys on every change):**
1. Push this folder to a GitHub repo (see "Put it on GitHub" below).
2. In Netlify: Add new site → Import from Git → pick the repo → Deploy.
   `netlify.toml` already configures it (publish = root, no build command).

## Option B — Vercel
1. Push to GitHub (below).
2. https://vercel.com → New Project → import the repo → Framework Preset:
   **Other** → Deploy. (No build command, output dir = root.)
3. Add your domain under Project → Settings → Domains.

## Option C — GitHub Pages (free, simple)
1. Push to GitHub (below).
2. Repo → Settings → Pages → Source: **Deploy from a branch** → Branch: `main`,
   folder: `/ (root)` → Save.
3. Live at `https://<username>.github.io/<repo>/` in ~1 min.
   Note: for a custom domain, add it under Settings → Pages → Custom domain.

---

## Put it on GitHub (needed for B, C, and git-based A)

```bash
cd "SAFEPOUCH WEBSITE"
git init
git add .
git commit -m "SafePouch website"
# create an empty repo at github.com/new (no README), then:
git remote add origin https://github.com/<you>/safepouch-website.git
git branch -M main
git push -u origin main
```

---

## Custom domain (any host)
- At your domain registrar, point the domain to the host (each host shows exact records —
  usually an `A`/`ALIAS` record for the root and a `CNAME` for `www`).
- HTTPS is automatic and free on all three hosts.
- After the domain is live, double-check `robots.txt` and `sitemap.xml` use it.
