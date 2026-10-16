# Brick House Fine Art Conservation

SvelteKit port of the Jekyll site at https://www.brickhouseconservation.co.uk, built on the sveltekit-cube-starter. Fully prerendered with adapter-static. The design follows the old site: Georgia headings, system sans, gold and grey.

```bash
npm install
npm run dev
npm run build   # → build/
```

## Content

- `src/lib/content/site.js`: name, description, nav, conservators, client list (was `_config.yml`, `_data/nav.yaml` and the footer include)
- `src/lib/content/services/*.md`, `src/lib/content/work/*.md`: the original Jekyll Markdown, unchanged apart from one image path fixed to the right letter case
- `parse.js` reads the front matter and renders the Markdown with marked. `{{ site.baseurl }}` is stripped out.

URLs are the same as the old site, with no trailing slash: `/services/<slug>`, `/work`, `/work/<slug>`. Slugs come from the `slug` front matter, slugified the way Jekyll does it (`consolidation of gilded frame` → `consolidation-of-gilded-frame`).

## Content editing (Sveltia CMS)

Sveltia CMS replaces the old Netlify CMS. The admin is a static page: `static/admin/index.html` loads the CMS from unpkg, and `static/admin/config.yml` describes the content.

- **Services** and **Work** edit the Markdown in `src/lib/content/{services,work}/`. Images upload to `static/images/`.
- **Site settings** edits `src/lib/content/site.json`: tagline, description, email, the "What we do" and "Our work" copy, clients, conservators and areas covered. `site.js` reads it.
- Every save is a commit to GitHub, and Netlify rebuilds the site from it.
- Front matter is parsed with the `yaml` package, so anything the CMS writes will parse.

**Sign-in.** Netlify Identity and git-gateway aren't supported, so editors sign in with GitHub and need write access to the repo. One-off setup:

1. Create a GitHub OAuth app at https://github.com/settings/applications/new. Set the callback URL to `https://api.netlify.com/auth/done`.
2. In Netlify, go to Project configuration → Security → OAuth → Install provider → GitHub, and paste in the Client ID and Secret.
3. `config.yml` points at `wearethoughtfox/brickhouse`, branch `main`. This project folder is the repo root.

Then open https://www.brickhouseconservation.co.uk/admin/ and choose **Sign In with GitHub**. Without the OAuth app, **Sign In Using Access Token** works with a GitHub personal access token (Contents read/write).

**Locally:** run `npm run dev`, open http://localhost:5181/admin/index.html in Chrome, and choose **Work with Local Repository**. This edits the files on disk. It needs the project to be a git repo, and there's no sign-in.

## Deploy (Netlify)

- `netlify.toml` builds with `npm run build` and publishes `build/`. It overrides the old Jekyll build settings in the Netlify UI.
- The footer contact form is a Netlify Form (`name="contact"`, honeypot `bot-field`) with the same field names as before (`name`, `email`, `comment`), so existing notifications keep working. It posts to `/thanks`.
- `static/_redirects` sends the old WordPress URLs (the `link` field in each Markdown file) to the current pages.

## Launch checklist

The new site lives on branch `main` of `wearethoughtfox/brickhouse`. The live Jekyll site stays on `master` until the switch, using the same Netlify site.

**1. Test locally**
- `npm run build && npm run preview`, then click through every page, desktop and phone.
- `git init`, then `npm run dev` and open `/admin/index.html` in Chrome → Work with Local Repository. Edit a project, check the Markdown diff, and undo it.

**2. Push the branch**
```bash
git init -b main
git add -A && git commit -m "SvelteKit rebuild"
git remote add origin git@github.com:wearethoughtfox/brickhouse.git
git push -u origin main
```
`main` has no shared history with `master`. That's fine: it's a separate branch and `master` is untouched.

**3. Branch deploy on Netlify**
- Site configuration → Build & deploy → Branches and deploy contexts → Branch deploys → add `main`.
- Test at `https://main--<site-name>.netlify.app`:
  - every page
  - a couple of old WordPress URLs (redirects only work on Netlify)
  - a test message through the contact form (check it appears under Forms)

**4. CMS sign-in**
- Create the GitHub OAuth app and add the Netlify OAuth provider (see Content editing).
- Sign in at `/admin/` on the branch URL. If GitHub sign-in fails there, add `site_domain: <site-name>.netlify.app` under `backend` in `config.yml`, or test with an access token.
- Make one real edit and check that it commits to `main` and triggers a branch deploy.

**5. Switch**
- Netlify: Branches and deploy contexts → Production branch → `main`, then trigger a deploy. The domain, HTTPS and forms stay as they are.
- GitHub: Settings → Default branch → `main`. Optionally rename `master` to `jekyll-archive`.
- Rollback: Deploys → pick the last Jekyll deploy → Publish deploy, or set the production branch back to `master`.

**6. After the switch**
- Netlify: turn off Identity (no longer used) and check form notification emails.
- Check the live domain: home, a service, a work page, `/sitemap.xml`, `/admin/`.
- Google Search Console: submit `https://www.brickhouseconservation.co.uk/sitemap.xml`. The verification meta tag is kept.

## Design

The refresh (Oct 2026) builds on the brand Brick House already had, not a new look:

- **Colours:** gold #FFC843, the logo grey, white page, black footer. Grey bands use #565656 so gold and white text on them pass 4.5:1. Gold text on white uses `--color-gold-deep`.
- **Type:** Georgia headings with the system sans, as before. No web fonts.
- **Site frame:** a gold border round the browser window, like the logo's square (`body::after` in `global-styles.css`, width `--frame-width`).
- **The brick:** `Logo.svelte` redraws the logo as SVG. `BrickFrame.svelte` puts its grey square in the top-right corner of a photo (home hero).
- **Marks:** `Marks.svelte` draws thin gold lines running past an image's edges, like a frame-maker's measuring marks. A gold rule also runs down the left margin on wide screens (`main::before` in `+layout.svelte`).
- **Staggered grids:** alternate service and work cards step down on wider screens.
- **Small photos:** most project photos are 250–450px wide. Markdown images become "plates" (`parse.js` → `framePlates`) shown at natural size, and pairs sit side by side. Only the two large `jd_stour_*` photos (`hand-*.webp`, `on-site-*.webp`) are used big.
- **Layout:** same structure as the old site: photo and name hero, grey "What we do" band holding the service cards, client list, black footer with the team and the contact form.

## Changes from the Jekyll site

- Replaced Netlify CMS with Sveltia CMS (same `/admin/` address). Removed: Netlify Identity, reCAPTCHA on the form (the honeypot is still there), AOS. The starter's `reveal` action now does the fade-up.
- New photos on the home page from the unused `jd_stour_*` shots, converted to WebP. The old 8000px hero is gone.
- Service pages have a sidebar listing all services. Work pages keep the title | content layout, with previous/next links.
- Email address is now shown in the footer.
- Added `sitemap.xml`, `robots.txt`, `llms.txt`, JSON-LD and Open Graph tags.
