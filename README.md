# PRC Impact — Website

Static HTML/CSS site for PRC Impact. No build step. Drop into any static host (Netlify, Vercel, GitHub Pages, S3).

## Structure

```
prc-site/
├── index.html                                # Home
├── research-services.html                    # Research Services
├── who-we-center.html                        # Who We Center
├── work.html                                 # Selected Work (index)
├── about.html                                # About
├── contact.html                              # Contact + form
├── work/
│   ├── birmingham-violence-prevention.html   # Case study 1
│   ├── prescriber-comprehension.html         # Case study 2
│   └── montgomery-public-schools.html        # Case study 3
├── css/
│   └── site.css                              # All styles
└── README.md
```

## Deploy to Netlify (via GitHub)

1. Create a new GitHub repo, e.g. `prc-impact-site`.
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/prc-impact-site.git
   git push -u origin main
   ```
3. In Netlify → Add new site → Import an existing project → connect the repo.
4. Build settings: **Build command** = (leave blank). **Publish directory** = `/` (root).
5. Click Deploy.

## Contact form

The form on `contact.html` is wired to **Formspree** but uses a placeholder endpoint:

```html
<form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
```

Replace `your-form-id` with your actual Formspree (or Basin, Formsubmit, Netlify Forms, etc.) endpoint. If using Netlify Forms instead, add `data-netlify="true"` to the form tag and remove the `action` attribute.

## Design system

- **Palette**: pure white (#ffffff) primary · near-black (#15151a) ink · antique gold (#b8924a / #8a6a2e) accent
- **Type**: Barlow Condensed (display) + Inter (body), loaded from Google Fonts
- **Rhythm**: white sections punctuated by one dark services band and the dark footer

## Editing

All copy lives directly in the HTML files. The shared design system is in `css/site.css`. Update once, applies everywhere.
