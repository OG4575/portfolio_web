# Ondřej Gola – Osobní portfolio

Mé osobní portfolio. Web je postaven na čistém HTML5, CSS3 a Vanilla JavaScriptu bez použití jakýchkoliv frameworků.

🔗 **Živý web:** [zde](https://og4575.github.io/portfolio_web/)

---

## Použité technologie

- **HTML5** – sémantické značky, strukturovaná data (JSON-LD)
- **CSS3** – Flexbox, Grid, CSS Custom Properties, Media Queries
- **JavaScript ES6+** – Intersection Observer API, vanilla DOM manipulace
- **IDE:** Visual Studio Code
- **Nástroje:** Git, GitHub Pages, Claude AI

---

## Adresářová struktura

```
portfolio/
├── index.html       # Hlavní stránka
├── sitemap.xml      # Mapa webu pro vyhledávače
├── robots.txt       # Instrukce pro roboty vyhledávačů
├── README.md        # Tato dokumentace
├── css/
│   └── style.css    # Veškeré styly
└── js/
    └── main.js      # Veškerá interaktivita
```

---

## Technický rozbor

### 1. Výkon (Performance)

Web minimalizuje počet HTTP požadavků – veškeré styly jsou v jednom souboru `style.css` a veškerý JavaScript v jednom souboru `main.js`. Písma jsou načítána přes Google Fonts s `preconnect` pro rychlejší připojení. JavaScript je načítán s atributem `defer`, takže neblokuje vykreslení stránky. Pro obrázky je připravena podpora lazy loadingu.

```html
<!-- Preconnect zkracuje dobu navázání spojení s Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- defer zajistí, že JS se spustí až po načtení HTML -->
<script src="js/main.js" defer></script>
```

```javascript
// Nativní lazy loading – záloha pro starší prohlížeče přes Intersection Observer
if (!('loading' in HTMLImageElement.prototype)) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}
```

---

### 2. SEO

Web používá správné sémantické HTML5 elementy (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`). Každá stránka má unikátní `<title>`, `meta description` a kanonický odkaz. Strukturovaná data ve formátu JSON-LD popisují autora webu pro vyhledávače. Přiloženy jsou také `sitemap.xml` a `robots.txt`.

```html
<!-- Meta tagy pro vyhledávače -->
<meta name="description" content="Ondřej Gola – student IT, webový vývojář a síťový nadšenec." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://og4575.github.io/portfolio/" />

<!-- Strukturovaná data JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ondřej Gola",
  "url": "https://og4575.github.io/portfolio/",
  "email": "ondrej.gola@email.cz",
  "sameAs": ["https://github.com/OG4575", "https://www.instagram.com/tucinek/"]
}
</script>
```

---

### 3. Přístupnost (Accessibility)

Web splňuje standardy WCAG. Obsahuje skip link pro přeskočení navigace, ARIA atributy na všech interaktivních prvcích a správný kontrast barev (červená na černém pozadí). Veškeré prvky jsou ovladatelné klávesnicí přes `focus-visible`. Animace jsou vypnuty pro uživatele s nastaveným `prefers-reduced-motion`.

```html
<!-- Skip link – umožní čtečkám obrazovky přeskočit navigaci -->
<a href="#main-content" class="skip-link">Přejít na hlavní obsah</a>

<!-- ARIA atributy na hamburger menu -->
<button class="nav__burger"
        aria-label="Otevřít menu"
        aria-expanded="false"
        aria-controls="nav-menu">
```

```css
/* Viditelný focus pro klávesnicové uživatele */
:focus-visible {
  outline: 2px solid var(--clr-accent);
  outline-offset: 3px;
}

/* Vypnutí animací pro citlivé uživatele */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 4. Sociální sítě (Open Graph & Twitter Cards)

Web implementuje Open Graph protokol pro správné zobrazení náhledu při sdílení na Facebooku a LinkedInu, a Twitter Cards pro platformu X. Při sdílení odkazu se zobrazí název, popis a obrázek.

```html
<!-- Open Graph – Facebook, LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Ondřej Gola – Portfolio" />
<meta property="og:description" content="Student IT, webový vývojář a síťový nadšenec." />
<meta property="og:image" content="https://og4575.github.io/portfolio/images/og-image.png" />

<!-- Twitter / X Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Ondřej Gola – Portfolio" />
<meta name="twitter:image" content="https://og4575.github.io/portfolio/images/og-image.png" />
```

---

### 5. UI/UX

Web je navržen metodou Mobile First – základní styly jsou pro mobilní zařízení a pomocí media queries se layout přizpůsobuje větším obrazovkám. Layout využívá CSS Grid a Flexbox. Typografie je řešena přes `clamp()` pro plynulé škálování velikosti písma. Barevný kontrast a vizuální hierarchie jsou řešeny přes CSS Custom Properties.

```css
/* Mobile First – základní styl pro mobil */
.projects__grid {
  display: grid;
  gap: 1.25rem;
}

/* Tablet a větší */
@media (min-width: 768px) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Plynulá typografie přes clamp() */
.hero__name {
  font-size: clamp(3.5rem, 11vw, 8rem);
}
```

---

### 6. AI Integrace

Při tvorbě projektu jsem využil Claude AI jako hlavní nástroj pro generování kódu, obsahu a struktury dokumentace. AI pomohla zejména se správnou implementací ARIA atributů, strukturovaných dat a optimalizačních technik, které by bylo jinak obtížné správně zapsat ručně.

---

## AI Deník

| Prompt | Co AI přinesla |
|--------|---------------|
| `"Přidej všechny potřebné meta tagy pro SEO, Open Graph a Twitter Cards."` | Správně napsané OG a Twitter Card meta tagy včetně JSON-LD strukturovaných dat |
| `"Zajisti přístupnost webu – ARIA atributy, skip link, focus-visible, prefers-reduced-motion."` | Implementace WCAG standardů, které bych sám těžko psal správně |

---

## Instalace a spuštění

### Lokálně přes Live Server (VS Code)

1. Stáhni nebo naklonuj repozitář:
   ```bash
   git clone https://github.com/OG4575/portfolio.git
   ```
2. Otevři složku `portfolio/` ve Visual Studio Code.
3. Nainstaluj rozšíření **Live Server** (Ritwick Dey).
4. Klikni pravým tlačítkem na `index.html` → **Open with Live Server**.
5. Web se otevře na `http://127.0.0.1:5500`.

### Alternativně přes Python

```bash
cd portfolio
python -m http.server 5500
```

Poté otevři `http://localhost:5500` v prohlížeči.

---

## Galerie

| Mobilní verze | `images/screenshot-mobile.png` |
| Hamburger menu (mobile) | `images/screenshot-mobile-menu.png` |
