# PRC Impact — Website

Static HTML/CSS site for [prcimpact.com](https://prcimpact.com). No build step, no framework, no dependencies. The files in this repo are the files on the web.

---

## Hosting

| | |
|---|---|
| Host | Netlify |
| Netlify site | `golden-elf-52cfd6` (301s to the custom domain) |
| Primary domain | `prcimpact.com` (apex) |
| `www` | 301 redirect to apex |
| Deploy trigger | Every push to `main` |
| Build command | none |
| Publish directory | `/` (root) |

Source and live internal links use clean extensionless routes such as `/contact` and `/work/montgomery-public-schools`. Netlify redirects legacy `.html` variants to their clean canonical routes.

---

## Structure

```
├── index.html                                # Home
├── research-services.html                    # Research
├── who-we-center.html                        # Who We Center
├── work.html                                 # Selected Work (index)
├── about.html                                # About
├── contact.html                              # Contact + form
├── thank-you.html                            # Form confirmation (noindex)
├── privacy.html                              # Privacy Notice
├── terms.html                                # Terms of Service
├── work/
│   ├── montgomery-public-schools.html        # Case study
│   ├── birmingham-violence-prevention.html   # Case study
│   ├── prescriber-comprehension.html         # Case study
│   ├── steven-reed-mayoral-campaign.html     # Case study
│   └── mps-capital-improvement.html          # Case study
├── css/
│   └── site.css                              # All styles
├── assets/                                   # Logo, favicon, OG image
├── netlify.toml                              # Redirects, security headers, caching
├── robots.txt
└── sitemap.xml
```

---

## Contact form

> **History:** this page previously used `action="mailto:..."`, which silently fails for most
> visitors — no submission, no error, no record. It was live from June 15 to July 27, 2026 and
> lost an unknown number of inquiries. Never use a `mailto:` form action.

The contact page uses a **hosted CRM form widget**, loaded from `cdnstyles.com` and submitting to `forms-prod.apigateway.co`. Configuration is base64-encoded in the script's `data` attribute.

Current config:

```json
{
  "formId": "FormConfigID-3840db3e-afb3-4cf3-a59e-eb2e1a1e2f26",
  "baseURL": "https://forms-prod.apigateway.co",
  "backgroundColor": "#F7F5F0",
  "primaryColor": "#17171C",
  "primaryFontColor": "#1B1B20",
  "borderColor": "#DDDAD3",
  "borderWidth": "1px",
  "borderRadius": "4px",
  "padding": "10px",
  "width": "100%"
}
```

To change settings, decode the `data` attribute, edit the JSON, re-encode as base64, and replace it.

### Fallbacks — do not remove

The form is rendered client-side by a third-party script. If that script is blocked or fails, the form does not exist on the page at all. Two safety nets handle this while presenting the same fallback message:

1. **`<noscript>` block** — shows email and phone when JavaScript is disabled.
2. **8-second watchdog** (inline script near the bottom of `contact.html`) — if the embedded form has not rendered, it unhides `#form-fallback-timeout`, which shows the same email and phone fallback.

This matters because a meaningful share of visitors are public-agency staff on restricted networks that block unknown third-party domains and sometimes Google reCAPTCHA.

### The CSP dependency

`netlify.toml` sets a Content-Security-Policy that explicitly allowlists the form's domains:

- `https://www.cdnstyles.com` — widget script
- `https://forms-prod.apigateway.co` — form API (`connect-src`, `form-action`)
- `https://www.google.com`, `https://www.gstatic.com` — reCAPTCHA
- `https://maps.googleapis.com`, `https://places.googleapis.com` — address autocomplete

**If the form vendor changes, the CSP must be updated in the same commit or the new form will be blocked.** Symptom: the form does not appear and the browser console shows a `Refused to load…` CSP violation naming the blocked domain.

### Not yet done

- Set `redirectUrl` to `/thank-you` in the CRM's form settings. `thank-you.html` already exists. Without it there is no conversion tracking.
- No analytics installed. There is currently no way to detect that the form has stopped working.

---

## netlify.toml

Four things live in this file:

1. **Canonical host redirect** — `golden-elf-52cfd6.netlify.app` → `prcimpact.com`, so the Netlify subdomain is not indexed as a duplicate site.
2. **Legacy and canonical redirects** — old Wix-era paths and `.html` variants redirect to current clean routes.
3. **Security headers** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Public-sector and enterprise buyers run automated scans against vendor sites.
4. **Caching** — HTML, CSS, and assets are currently configured to revalidate rather than serve stale copies while the site is actively changing.

---

## Editing

All copy lives directly in the HTML files. Shared styles are in `css/site.css` — update once, applies everywhere.

**Editing in the GitHub web UI:** use the pencil icon to edit an existing file. Do not select-all and paste in a snippet — that replaces the entire page. On July 27, 2026 this wiped the nav, hero, footer, and schema markup from `contact.html`.

Safer workflow for anything non-trivial: make the change on a branch, let Netlify build a deploy preview, review it, then merge.

Each page carries its own `<title>`, meta description, canonical URL, Open Graph tags, and JSON-LD. When adding a page, copy an existing one and update all of them, then add the URL to `sitemap.xml`.

---

## Design system

- **Palette:** near-black ink `#15151a` · antique gold `#b8924a` / `#8a6a2e` · cream `#F7F5F0` · white
- **Type:** Barlow Condensed (display) + Inter (body), from Google Fonts
- **Rhythm:** white sections punctuated by one dark services band and the dark footer

---

## Known issues

- **Homepage contrast.** The H1 and the second hero paragraph are light grey on white and likely fail WCAG AA. Should be fixed — the site is sold to organizations with Section 508 obligations.
- **Stale search index.** `www.prcimpact.com` is still indexed with the pre-relaunch Wix content. Requires a Google Search Console **Domain** property (DNS-verified, so it covers both `www` and apex), sitemap submission, URL inspection requests, and a temporary removal for the old URL. Bing Webmaster Tools too, since Bing feeds ChatGPT search and Copilot.
- **No analytics.**
