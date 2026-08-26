# Vansh Digitals — Portfolio Project Brief & Design Direction

Hand this file to any new chat/assistant to get full context. It covers what's being built, the design system, every section, the theme rules, and the image-hosting workflow.

---

## 1. What this is
A personal graphic-design portfolio website for **Vansh Gupta** (brand: **Vansh Digitals**), positioned strictly as a **Graphic Designer** (social media, carousels, reel covers, posters, brand content). Not a developer/technical portfolio.

- **Stack:** React + Vite + Tailwind.
- **Built with:** an AI coding agent called **Antigravity** (Gemini-powered). Antigravity needs extremely explicit, surgical prompts — exact px, token names, numbered steps, and clear "do not touch" lists. Vague instructions fail.
- **Workflow:** vision/decisions are made first (often previewed via AI-generated demo images), then turned into precise Antigravity build prompts.
- **Contact:** vanshdigitalsiscreative@gmail.com · +91 63936 08801 · Raebareli, Uttar Pradesh, India.
- **Socials:** Instagram https://www.instagram.com/vanshdigitals/ · LinkedIn https://www.linkedin.com/in/vanshdigitals/ · Behance · X · YouTube · Discord.

---

## 2. Design direction (the vibe)
Editorial, crafty, **playful-premium**. Big confident typography, hand-drawn accents used with restraint, one bold "signature" moment per section, everything else quiet. Warm off-white canvas, never pure white/black. No corporate-stock feel, no clutter.

**House rules**
- One signature per section (a wave, a badge, a brush underline, a ghost watermark) — not many.
- Doodles only where they mean something (arrow = direction, star = highlight, brush = emphasis). Never scattered filler.
- No purple, no neon glow, no glassmorphism, no heavy shadows, no emoji-as-icon. **Lucide icons only** (brand glyphs like Behance/X/YouTube/Discord as clean inline SVG).
- Prefer removing the weakest decoration before shipping ("one accessory less").

---

## 3. THEME + ACCENT-SWAP RULE (important)
The site has **light and dark** modes with a smooth transition.

**The core rule:** the primary accent is **BLUE in light mode** and becomes **YELLOW in dark mode**. Anything that is blue in light (nav wave, active nav item, brand dot, links, primary buttons, hover states, timeline nodes, accents) switches to yellow in dark. Text on a yellow button is black.

### Tokens
**Light**
```
--bg:#FAFAF7  --surface:#FFFFFF  --ink:#111214
--muted:rgba(17,18,20,.62)  --faint:rgba(17,18,20,.10)
--brand:#007BFF  --brand-strong:#006AE0
--accent:#FFD722 --accent-strong:#E6C200
```
**Dark** (accents flip to yellow)
```
--bg:#0B0C0E  --surface:#141517  --ink:#F2F3F5
--muted:#A1A5AB  --faint:rgba(255,255,255,.12)
--brand:#FFD722  --brand-strong:#E6C200   /* primary accent = yellow in dark */
--accent:#3B93FF --accent-strong:#007BFF  /* blue becomes secondary in dark */
```

---

## 4. Typography, spacing, motion
- **Fonts:** DM Sans (display/headings/brand/buttons, 700–800) · Inter (body/labels/inputs) · IBM Plex Mono ONLY for tiny eyebrow/index labels (and NOT in the footer/contact — those use Inter).
- **Scale (clamp = responsive):** display clamp(48,8vw,112) · h1 clamp(36,5vw,64) · h2 clamp(28,3.5vw,44) · body 16 · eyebrow 13.
- Heading emphasis word = brand color + optional yellow brush underline.
- **Spacing px:** 4·8·12·16·24·32·48·64·96. Section padding 96/64/48. Container max-width 1280 (footer/contact/sections all align to the same width + side padding).
- **Radius:** pill 9999 · card 20 · tile 14 · input 12.
- **Motion:** ease cubic-bezier(.65,0,.35,1); micro 180ms · swap 300ms · wave travel ~460ms. Always honor prefers-reduced-motion (disable travel/idle/scroll motion).

---

## 5. Components (presets)
- **Primary button:** pill, brand bg, white text (black in dark on yellow), DM Sans 500; optional arrow in a white circle starting at -45°, rotating to 0° on hover.
- **Secondary:** text link + ArrowRight, hover → brand color, arrow nudges.
- **Pill tag:** rounded-full, transparent, 2px border, brand text+border (light) / yellow (dark).
- **Chip:** muted text, faint border, no fill (used for deliverable counts).
- **Card:** surface/soft tint, faint border, radius 20; hover = soft lift or border-brand, image zoom ≤2–3%, no glow.
- **Inputs:** surface bg, faint border, radius 12; focus = brand border + 3px brand ring; label above (Inter).
- **Doodle assets:** blue/yellow spark, curved arrow, dot grid, yellow brush underline, badge — sparse, aria-hidden, meaningful.

---

## 6. HEADER (built)
Sticky, container max-width 1440, height ~80, nav vertically centered.
- Left: "Vansh Digitals" + brand dot (dot sits like a full-stop on the baseline).
- Center nav (order = the site's story order): **Home(#hero) · About(#about) · Work(#work) · Skills(#skills) · Experience(#experience) · [Kind Words(#testimonials)] · Contact(#contact)**.
- Right: theme toggle (pill/track, Sun/Moon, icon rotates ~180° on switch; dark = yellow track + black knob + yellow moon) + **Resume** primary pill (arrow -45°→0° on hover).
- **Signature = the nav "sea-wave":** a single shared SVG sine ribbon under the ACTIVE item, brand color, fixed natural length. It has a continuous idle "sea-flow" (phase drift) and TRAVELS to the new item only when the user actively switches (click or scroll-spy). Blue in light, yellow in dark.
- Nav hover = word turns solid brand color (no glow). Active word = brand color + wave.

### Known tricky behaviour (must stay correct)
- **No travel animation on page load / route enter** — the wave must appear INSTANTLY under the correct item (first paint with transitions disabled, then enable). Travel happens ONLY when switching while browsing.
- Scroll-spy = one IntersectionObserver, centered band (rootMargin ~-45% 0 -45% 0), one active at a time, click-lock during smooth-scroll so it doesn't bounce.
- On the Work Collections page, default active = "Work", set instantly.
- Landing sections must be ordered top-to-bottom to match the nav order exactly.

---

## 7. HERO (in progress / being refined)
Concept: centered cut-out photo of Vansh with a huge **outlined "PORTFOLIO"** word behind it (head may rise above the letters — intended). Thin single-stroke outline (DM Sans), no double/broken strokes. Optional cursor-follow light on the letters. Hero fills the viewport height, generous top space. Name/tagline/CTAs and sparse doodles were tried and can be added back cleanly. (This section still needs polishing.)

---

## 8. WORK — landing preview + dedicated page
### 8a. Landing "Work" preview
Compact, brand-wise. Two-column header (eyebrow + heading left, "Explore Work Collections →" link right) that routes to **/work-collections**. Cards/rows per brand with deliverable-count chips. No fake metrics.

### 8b. /work-collections (Visual Archive) page (built)
- Hero: pill "WORK / VISUAL ARCHIVE" (Inter bold, blue/blue outline light, yellow/yellow dark, transparent) + two-line "Work Collections" ("Collections" in brand color with animated left→right shine + tight yellow brush underline) + intro.
- Signature accents: rotating **"CRAFTED WITH PURPOSE" yellow badge** (SVG curved textPath + center spark; scroll-synced + idle rotate), a curved arrow pointing down into content, dot grid. Sparse.
- A tilted **yellow marquee** strip: SOCIAL MEDIA · CAROUSELS · POSTERS · REEL COVERS · BRAND CONTENT · DIGITAL DESIGN.
- **3 category selector cards** (equal size, one row): 01 Selected (blue tint) · 02 Sample (yellow tint) · 03 Practice (violet/neutral tint) — index numbers, two-line titles, description, circular arrow, one meaningful accent each. Very low-opacity tint so text stays readable.
- **Click a card → content swaps ON THE SAME PAGE** (horizontal swipe ~300ms, no redirect). Each category has a DIFFERENT layout on purpose:
  - **Selected Work** (default) = vertical **brand timeline** (yellow node + index), real brands with dates + deliverable chips + asymmetric artwork tiles (big hero tile + small tiles). Brands: Cuts & Curves, Waterplane, Keshvi Beauty Lounge, Builders Playground, Ranjeet Raj Official (real deliverable counts, no inflation).
  - **Sample Work** = free **masonry** grid (varied heights) — placeholders for now.
  - **Practice Work** = **uniform** equal-tile grid — placeholders for now.
- Tabs pattern (role=tablist/tab/tabpanel), keyboard + reduced-motion friendly.

---

## 9. Other landing sections
- **About** — context/journey (to be built/refined).
- **Skills** — grouped proficiency + tools + AI-assisted workflow. Kept as its own light section.
- **Experience** — split timeline: **dates on the LEFT of a vertical line, details on the RIGHT**, blue nodes; roles + education + a skills-highlights chip cluster. Blue accented.
- **Kind Words (Testimonials)** — heading "What Clients Say"; **two-row auto-scroll marquee** moving in opposite directions; **blue cards, white text**, with a **vintage cut-corner** look (small white circular notches at the corners, scalloped/ticket-stub feel) and a subtle left-edge shadow for depth. Dummy content for now, sits ABOVE Contact.
- **Contact** — one large **blue rounded container**, split: left = info (AVAILABLE FOR WORK status pill with green pulse, "Let's create something together", email/phone/location with WHITE icons, socials), right = a clean **white form card** (Name, Email, Message + yellow "Send Message" button that swaps to "Let's Talk →" on hover; client-side validation; success state "Message on its way ✓"). Width matches the footer; Inter throughout (no mono).

---

## 10. FOOTER (built)
Light, aligned to the site container width.
- Top CTA: "Have a project in mind? / Let's create something **amazing** together." (amazing in brand color + yellow brush) + primary "Let's Talk" pill.
- 4 columns: **Brand** (wordmark with shine, tagline, 6 social icons, then "♥ Designed with hard work & dedication.", then copyright as the LAST line) · **Navigation** · **Work** (Selected/Sample/Practice) · **Let's Connect** (email/phone/location, Let's Talk).
- **Ghost watermark "VANSH":** DM Sans 800, very low opacity (~5–6%), big, edge-to-edge with small equal side margins, bottom ~35% clipped. It must be `position:absolute; z-index:0` (contributes ZERO layout height) with footer content at `z-index:1` — this keeps spacing stable and stops it from stretching the footer. Do NOT solve spacing with negative margins or by moving the watermark; control gaps with the content's own margins.
  - Cursor glow on the watermark must trigger ONLY when the cursor is genuinely over a letter STROKE (canvas alpha hit-test, pixel-aligned with dpr; empty space samples alpha 0 → no glow). Small, clipped-to-text glow (blue light / yellow dark).

---

## 11. Scrollbar
Thin, token-based: transparent track, thumb = --faint, hover = --brand (auto-yellow in dark). Slim and quiet, never fully hidden.

---

## 12. IMAGE HOSTING — GitHub + jsDelivr (chosen: lifetime free)
Design images are hosted **free & forever** on a **separate public GitHub repo** and served via the **jsDelivr CDN**. Chosen over Cloudinary/ImageKit (which cap free storage) and over putting images in the codebase (which bloats the repo and forces a redeploy per image).

**Workflow (repeatable):**
1. **Compress + convert to WebP** locally before upload (a Python Pillow script or Squoosh.app, quality ~88; use lossless if zero loss is wanted — quality is fully in your control, jsDelivr serves the file as-is). Transparency → PNG or lossless WebP.
2. Push WebP files to a **separate public repo** (e.g. `vanshdigitals-assets`) organized in folders: `selected/ sample/ practice/`.
3. Build the jsDelivr URL:
   `https://cdn.jsdelivr.net/gh/USERNAME/vanshdigitals-assets@main/selected/name.webp`
4. Paste URLs into a **data file** (e.g. `workData.js`: category → brand → image URLs). Adding a new image later = compress → push → paste one URL line. No code changes, no redeploy.

Notes: jsDelivr is a package/asset CDN (no on-the-fly resize/transform), so images must be pre-optimized. Fine for portfolio-scale traffic.

---

## 13. How to work with Antigravity (so nothing breaks)
- Give ONE clear scope per prompt; list explicit "DO NOT touch" items (other sections, watermark, header, wave shape, etc.).
- Use exact px, token names, and numbered steps. State the target visible result.
- Ask it to DIAGNOSE first for bugs (report the cause) before editing; then smallest fix.
- Always require a report: files changed + confirmation + light/dark + responsive + reduced-motion QA.
- Keep the accent-swap rule (blue↔yellow) and reduced-motion in every section.

---

## 14. Current status snapshot
- Header, footer, /work-collections page, contact, and the design system: built (with ongoing polish).
- Hero: still being refined (PORTFOLIO-behind-photo concept).
- Sample/Practice work + many section images: placeholders, to be filled via the GitHub+jsDelivr workflow.
- Open polish items: nav-wave load/scroll sync (must be instant on load, animate only on active-change), watermark stroke-only glow alignment, hero finalization.
