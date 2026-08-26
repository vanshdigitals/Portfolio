# Vansh Digitals — Hero + About Redesign

Scope: Hero (incl. preloader) + About only. Header, Footer, Contact, /work-collections untouched per brief §13 rule.

---

## Research synthesis (principles, not sites)

2026's actual signal in award-tier portfolios is **restraint**, not spectacle:

- Kinetic typography is now read as a craft signal *only* when purposeful — trend coverage explicitly warns that motion dominating over content comprehension is the #1 failure mode in 2026 hero sections.
- Tactile texture/grain treatments are outperforming glossy gradients as the "premium" signal — supports your brief's "ink/material, not generic web animation" instruction directly.
- Cursor-reactive subtle texture inside type/shapes (not outer glow, not particles) is a documented, respected pattern — validates Concept A/C below without copying any specific site.
- "Let the work be the hero" is the most repeated single line across current portfolio breakdowns — reinforces that your Hero's job is to earn the scroll to Selected Work, not to be the whole show.
- Mixed-weight type hierarchy (very bold + very light in the same composition) reads as more considered than one weight at multiple sizes — useful for the left/right context blocks against the huge center signature.

None of this changes your brief's existing rules — it confirms them.

---

## Section-order flag (needs your decision)

This doc's §6 story order: Hero → **Work** → About → Skills/Experience → Practice → Contact.
Your brief's header spec (§6, "must stay correct"): Home → **About** → Work → Skills → Experience → Kind Words → Contact.

I'm building to the **brief's established order** (About before Work) since it's flagged as a must-not-break rule. If you actually want Work to lead, that's a nav-order change, not a section-design change — tell me and I'll write that as its own scoped Antigravity prompt rather than sneaking it into this one.

---

## The VANSH signature — 3 interaction concepts

All three keep the same mandated skeleton (asymmetric LEFT identity / CENTER large "VANSH" / RIGHT context, eye-path left→center→right→CTA). They differ only in how the center typography behaves — that's the actual open decision per your brief §3.

### Concept A — Ink Bloom
**Visual idea:** The letterforms are filled with a very slow-moving two-tone gradient (brand blue ↔ a slightly darker blue-black in light mode; yellow ↔ deep amber in dark mode), clipped strictly inside the type using `background-clip: text`. It reads like ink still settling into paper — never a "shiny gradient text" web effect, because there's no light-mode-typical diagonal sheen, just slow tonal drift.
**User journey:** Visitor lands, eye goes to the huge word first (as intended), notices the fill isn't static within ~1–2s, doesn't chase it — it's slow enough to register as "alive" without competing with reading the left-column intro.
**Motion behavior:** Gradient position animates on a ~14–18s loop, `background-position` only (cheap, GPU-friendly), pauses entirely under `prefers-reduced-motion`. No cursor interaction in this variant — the material moves on its own, like ink, not like a UI response.
**Why it fits Vansh Digitals:** Directly matches your brief's own language — "ink, fluid, printed texture" — and requires zero new interaction paradigm, so it never competes with the left/right informational content.
**Implementation complexity:** Low. Pure CSS (`background-clip:text` + `@keyframes background-position` shift). No JS, no scroll listener, negligible performance cost.

### Concept B — Proximity Weight
**Visual idea:** "VANSH" is set in a **variable font**; individual letters interpolate weight/width slightly (e.g. 700→780 axis) based on cursor distance — the letter nearest the cursor gets marginally bolder/wider, decaying smoothly across neighbors. No color shift, no glow — purely a structural response, like the type is a physical surface with a little give.
**User journey:** Visitor's mouse naturally passes near/over the word while reading the left column; they notice the type subtly "responds" to their presence without it being the first thing they see (weight shift is small, ~8–10% axis change max).
**Motion behavior:** `requestAnimationFrame`-driven weight interpolation, distance-based falloff, no interaction on touch devices (falls back to Concept A's static/ambient state on mobile, since there's no cursor).
**Why it fits Vansh Digitals:** Most literally satisfies "letterforms responding to cursor proximity" from your brief, and reads as precise/architectural rather than decorative — closer to "designed system" than "animated text."
**Implementation complexity:** Medium-high. Requires a genuine variable font with a usable weight/width axis (verify DM Sans's variable build actually exposes this — not all Google Fonts static exports do), plus a small RAF loop. Needs careful throttling so it doesn't become the thing that hurts scroll/paint performance.

### Concept C — Halftone Settle
**Visual idea:** The letterforms are filled with a static halftone/paper-grain texture (dot pattern, brand blue in light mode / yellow in dark) at fixed opacity. On scroll (not cursor), the grain's opacity very subtly deepens (e.g. 85%→100%) as the Hero moves through its own height — as if the print is "settling in" the moment the visitor commits to scrolling past it.
**User journey:** Static, confident on load — no ambient motion competing with first impression. The one moment of change is tied directly to the visitor's own scroll action, reinforcing "you're moving the story forward," which sets up the scroll-storytelling requirement (§6) from the first section.
**Motion behavior:** Single scroll-linked opacity/texture-intensity tween via IntersectionObserver + `scrollY` percentage, no idle-loop, disabled entirely under reduced-motion (shows static end-state).
**Why it fits Vansh Digitals:** Closest of the three to "printed texture" specifically (vs. Concept A's "ink" and B's "material"), and it's the cheapest at rest — nothing animates until the user scrolls, which is the best possible default for perceived performance.
**Implementation complexity:** Low-medium. One texture asset (SVG or tiled PNG halftone), one scroll-linked CSS custom property, no continuous RAF loop.

---

## Ranking + recommendation

| Rank | Concept | Why |
|---|---|---|
| 1 | **A — Ink Bloom** | Best fit-to-effort ratio, cheapest to run continuously, most literally "ink" as briefed, zero risk of comprehension interference since it never demands cursor attention. |
| 2 | C — Halftone Settle | Very strong, arguably more distinctive than A, but ties the signature moment to scroll rather than being felt on arrival — slightly weakens the "first 2 seconds" impact your brief prioritizes. |
| 3 | B — Proximity Weight | Most impressive on paper, but real risk: variable-font axis support + RAF cursor-tracking is exactly the kind of build that's easy to get 90% right and end up janky on mid-range Android — which is where "developer showing off" starts to bleed back in despite the restrained intent. |

**Recommendation: build Concept A now.** It satisfies your brief's material/ink language directly, costs almost nothing in performance budget, and — this is the honest part — is the one your Antigravity agent is most likely to implement correctly on the first pass, since it's plain CSS with no font-axis dependency to verify and no RAF loop to tune. Concept C is a legitimate later upgrade (swap the fill treatment, keep everything else identical) once A is shipped and confirmed stable across breakpoints. Concept B stays on the shelf as a "v2 signature" idea, not a launch risk.

---

## Hero — content (real info, adapted from your existing site copy)

```
LEFT COLUMN
Open to Graphic Design opportunities · Available for work
Vansh Gupta
Graphic Designer
Social media, carousel, reel cover and brand content
design for digital-first brands.

[Explore Selected Work ↗]     About Me ↓

CENTER
VANSH  ← Concept A ink-bloom fill, full signature element

RIGHT COLUMN (stacked, small)
01 / GRAPHIC DESIGN
Social · Carousel · Poster

BASED IN
Raebareli, Uttar Pradesh, India

STATUS
● Available for work
```

Kept "Available for work" as a status line (not a claim of employment history) since it's already an established real element in your Contact section — reusing it here just surfaces it earlier in the journey, doesn't invent anything new.

---

## About — content

Headline: **"THE PERSON BEHIND THE WORK."**
Sub-line: *"I turn ideas into visuals."*

Narrative (short, real, no invented achievements):

> I'm Vansh — a graphic designer based in Raebareli, Uttar Pradesh. I design social media content, carousels, reel covers and brand visuals for real clients, built mostly in Canva with Photoshop and Illustrator in active progress. I'm currently a BCA student, and alongside design work I explore AI-assisted workflows and small technical projects — but design is the direction I'm building toward professionally.

Metadata blocks (as specified in your doc):

```
01 — DESIGN
Graphic Design
Visual Communication
Social Content

02 — CURRENTLY
BCA Student
Creative + AI-assisted projects

03 — BASED IN
Raebareli, Uttar Pradesh
India
```

---

## Preloader spec

**Total budget: 950ms** (inside your 900–1200ms ceiling).

| Time | State |
|---|---|
| 0–120ms | "V" fades + scales in, centered, DM Sans, full preloader weight |
| 120–560ms | Steps to VA → VAN → VANS → VANSH, ~110ms/step, no easing overshoot — hard, confident cuts, not a soft crossfade (reads as "resolving," not "typing") |
| 560–760ms | Full "VANSH" scales/translates from preloader-center position into its actual Hero signature position (the same element, not a swap — this is the one continuous motion in the whole sequence) |
| 760–950ms | Preloader backdrop fades out; Hero's left/right content reveals with the same stagger pattern as your existing §23 motion tokens (no new easing curve introduced) |

**Repeat-visit rule:** set a `sessionStorage` flag on first completion; skip straight to the Hero's resting state on subsequent navigations within the session — never replay the full sequence on every route change.
**Reduced motion:** skip the letter-count-up entirely; show "VANSH" already in its final Hero position with a single ≤150ms opacity fade. No spinner, no percentage, ever, per your explicit instruction.

---

## Motion language used (all values pulled from your existing brief §4, nothing new introduced)

| Moment | Duration | Easing |
|---|---|---|
| Preloader letter steps | 110ms/step | hard cut, no easing |
| Preloader → Hero position transition | 200ms | `cubic-bezier(.65,0,.35,1)` |
| Hero content stagger reveal | 300ms (matches "swap") | `cubic-bezier(.65,0,.35,1)` |
| Ink Bloom gradient drift | 14–18s loop | linear |
| Scroll-cue nudge (About Me ↓) | 180ms (matches "micro") | `cubic-bezier(.65,0,.35,1)` |

---

## Meaningful decorative elements (each justified in one sentence, per your own rule)

- **Small "01" index mark on the right-column context block** — signals this is metadata/system-labeled content, matching the visual language already established on /work-collections' category cards.
- **A single thin brush-underline beneath "Graphic Designer" in the left column** — emphasis on the one-line role statement, nothing else.
- **Scroll-cue arrow under "About Me ↓"** — direction, literally telling the visitor where the next action goes.

Nothing else. No stickers, no scattered marks, no route/map element in the Hero — a coordinate/origin mark belongs in the About section's "03 — Based In" block if you want it there, not the Hero, since the Hero's job is identity + proof-of-direction, not backstory.

---

## Antigravity build prompts (ready to paste, per your brief §13 rules)

### Prompt 1 — Preloader + Hero

```
SCOPE: Preloader component + Hero section only.
DO NOT TOUCH: Header, Footer, Contact, /work-collections, About section, 
existing nav-wave logic, existing theme token file (read tokens, do not edit them).

GOAL:
1. Build a preloader that shows "V" then steps through VA / VAN / VANS / VANSH,
   ~110ms per step, hard cuts (no crossfade easing between steps), total 
   letter-sequence duration 560ms starting at 0ms.
2. At 560ms, the same "VANSH" text element transitions (200ms, 
   cubic-bezier(.65,0,.35,1)) from its centered preloader position into its 
   resting position as the Hero's center typographic signature — this must be 
   ONE continuous element transform (translate/scale), not a swap between two 
   separate DOM nodes.
3. At 760ms, fade out the preloader backdrop (190ms) while the Hero's left 
   and right content blocks reveal with the site's existing stagger pattern 
   (reuse the existing 300ms "swap" token and cubic-bezier(.65,0,.35,1) — 
   do not introduce a new easing curve).
4. Store a sessionStorage flag ("vd_preloader_shown") on first completion. 
   On any subsequent route render within the same session, skip directly to 
   the Hero's resting state — no preloader replay.
5. Under prefers-reduced-motion: skip the letter-step sequence entirely, 
   render "VANSH" directly in its final Hero position with a single ≤150ms 
   opacity fade only.

HERO LAYOUT (desktop):
- Section height: 80–90vh (not 100vh, not auto).
- Asymmetric 3-zone grid: LEFT (identity block), CENTER (VANSH signature), 
  RIGHT (context block). Eye path left → center → right → CTA.
- LEFT column content, top to bottom:
  - eyebrow line: "Open to Graphic Design opportunities · Available for work" 
    (Inter Mono, existing eyebrow token style)
  - "Vansh Gupta" (existing H1/name token)
  - "Graphic Designer" with a single thin brush-underline beneath it 
    (reuse existing brush-underline asset from /work-collections page, do 
    not create a new asset)
  - one-line description: "Social media, carousel, reel cover and brand 
    content design for digital-first brands."
  - CTA row: Primary pill button "Explore Selected Work ↗" (routes to #work) 
    + secondary text link "About Me ↓" (scrolls to #about) with a small 
    scroll-cue arrow, 180ms micro-interaction nudge on hover.
- CENTER: "VANSH" set large (use the same responsive clamp scale as other 
  display-level headings in the existing type scale — do not invent a new 
  size token). Fill treatment: CSS background-clip:text, two-tone gradient 
  (brand blue ↔ darker blue-black in light mode; yellow ↔ deep amber in dark 
  mode, using the existing --brand/--accent tokens per theme), animating 
  background-position on a 14–18s linear loop. Pause animation entirely 
  under prefers-reduced-motion.
- RIGHT column, stacked, small (Inter Mono metadata style):
  - "01 / GRAPHIC DESIGN" + "Social · Carousel · Poster"
  - "BASED IN" + "Raebareli, Uttar Pradesh, India"
  - "STATUS" + green-dot pulse (reuse existing pulse component from Contact 
    section's "Available for work" pill) + "Available for work"

MOBILE: stack vertically — eyebrow/name/role/description/CTA first, then 
VANSH signature (smaller clamp size, animation retained), then right-column 
context block last, full width.

REQUIRED REPORT: list every file changed, confirm light/dark theme swap 
still correct (blue↔yellow per existing accent-swap tokens), confirm 
reduced-motion fallback tested, confirm no layout shift (CLS) introduced by 
the preloader-to-hero transition, confirm mobile breakpoint stacking.
```

### Prompt 2 — About section

```
SCOPE: About section only.
DO NOT TOUCH: Hero, Header, Footer, Contact, /work-collections, nav order/wave.

GOAL: Build the About section using existing type/spacing/color tokens only 
— no new tokens, no new component patterns beyond what's listed below.

CONTENT:
- Headline: "THE PERSON BEHIND THE WORK." (existing H2 token)
- Sub-line directly beneath: "I turn ideas into visuals." (existing body-large 
  or eyebrow-adjacent style — pick whichever existing token best matches a 
  short emphasis line, do not create a new one)
- Narrative paragraph (existing body-copy token, Inter, max-width per 
  existing container-narrow rule):
  "I'm Vansh — a graphic designer based in Raebareli, Uttar Pradesh. I design 
  social media content, carousels, reel covers and brand visuals for real 
  clients, built mostly in Canva with Photoshop and Illustrator in active 
  progress. I'm currently a BCA student, and alongside design work I explore 
  AI-assisted workflows and small technical projects — but design is the 
  direction I'm building toward professionally."
- Three metadata blocks in a row (stack on mobile), each using the existing 
  index-number style (matches the "01/02/03" pattern already used on 
  /work-collections category cards):

  01 — DESIGN          02 — CURRENTLY           03 — BASED IN
  Graphic Design        BCA Student               Raebareli, Uttar Pradesh
  Visual Communication   Creative + AI-assisted    India
  Social Content         projects

SECTION ORDER: place immediately after Hero, before Work — per existing 
nav order (Home · About · Work · Skills · Experience · Kind Words · Contact). 
Do not reorder existing sections.

MOTION: entrance reveal only, on scroll into view (existing IntersectionObserver 
reveal pattern — reuse, don't reimplement), no idle/looping motion in this 
section.

REQUIRED REPORT: files changed, confirm section renders in correct nav-order 
position, confirm light/dark theme correct, confirm mobile stacking of the 
three metadata blocks, confirm reduced-motion respected.
```

---

## What I did not do
- Did not touch Header, Footer, Contact, or /work-collections.
- Did not invent metrics, testimonials, or achievements anywhere in Hero/About copy.
- Did not resolve the Work-before-About vs. About-before-Work conflict silently — flagged above, defaulted to the brief's "must stay correct" rule.
- Did not commit to Concept B (Proximity Weight) as the launch build — flagged as a real implementation risk rather than picking the most impressive-sounding option by default.
