# MultiMichel — Design System & Art Direction

This document is the visual source of truth for implementing and extending MultiMichel.

It exists because the original design lives in Figma and may not be accessible to the implementation agent.

The design is intentionally restrained, unusually spacious, editorial, and rhythmic.

Do not treat this as a generic portfolio website.

Do not "improve" the design by adding conventional website UI.

---

# 1. CORE IDEA

MultiMichel is an authored personal publication.

It should feel:

- experienced
- editorial
- energetic
- human
- confident
- slightly unexpected
- rigorously composed

It should NOT feel:

- corporate
- SaaS-like
- like a portfolio template
- like a design-system demo
- like an AI-generated "senior designer website"
- excessively minimal for the sake of looking sophisticated
- busy for the sake of expressing personality

The fundamental principle is:

> **Energy comes from modulation, not noise.**

The site should constantly change its visual volume.

Quiet → loud → conversational → visual → dense → quiet → visual.

This is RHYTHM.

---

# 2. FIGMA SOURCE

The only Figma design that defines this website is node:

`1:1988`

Everything in this document describing the current homepage through WORK is derived from that node.

Do not use other Figma frames as design references.

---

# 3. DESIGN PRINCIPLES

## 3.1 Rhythm over consistency

Do not make every section behave the same way.

The site should have consistent:

- typography
- palette
- grid
- visual language
- attitude

But it should NOT have identical section cadence.

Avoid mechanical repetition of: section heading, fixed gap, content, fixed gap, repeat.

Instead use changes in:

- whitespace
- type scale
- information density
- image scale
- number of columns
- media type
- colour
- interaction
- alignment

to create rhythm.

---

## 3.2 Whitespace is an active compositional element

Large empty areas are intentional.

Do not compress whitespace because:

- "there is room"
- content could fit above the fold
- the layout feels inefficient
- conventional responsive design would use less
- a section looks empty

Empty space creates anticipation.

The opening specifically uses:

masthead → silence → enormous headline

The silence is what makes the headline hit.

Do not interpret this as "every section needs huge whitespace." Whitespace is one instrument in the rhythm.

---

## 3.3 Deep data, simple presentation

The content system can know a lot. The visitor does not need to see all of it.

Internal metadata may contain: publication date, provenance, source URLs, verification status, language, topic, event, recording, slides, press coverage, artifacts.

Do NOT automatically render those fields. The public interface should be ruthlessly edited.

For example:

`Fast ≠ Good                         Medium`

is better than:

```
Fast ≠ Good
Essay · June 2026
Design practice, speed
Read on Medium →
Language: English
```

The website is editorial, not transactional.

---

# 4. COLOUR

Use these exact colours unless a future design deliberately introduces something new.

## Main canvas
Paper: `#F8F5F2` — do not replace with pure white.

## Primary dark
Slate: `#33291D`

## Secondary dark
Oak: `#4A3A2A`
Dim: `#5C5141`
Dark headline/row text: approximately `#1A1916` / `#1C1A15`

## Secondary text
Muted brown: `#7A6D59`

## Rules
Light rule: `#ECE8DF`
Underline / stronger rule: `#C9C4B8`

## Main orange
`#FF6C00` — high-impact accent, used sparingly. Large orange blocks have more power than dozens of tiny orange interface details.

## Work label orange
The current case-study label uses `#FF5226`. Preserve where matching the existing design.

---

# 5. TYPOGRAPHY

Typography is one of the primary identity systems. Do not substitute generic fonts simply because they are easier to load.

Do NOT use: Inter, Arial, Helvetica, Archivo, Newsreader as replacements for the actual design fonts.

Michel has the font assets. Use them when available and licensed for web use.

## 5.1 Masthead
Font: **Agrandir — Tight Black**, weight 900, size 24px, tracking approx `-0.096px`, colour `#2E2C29`, uppercase.

## 5.2 Navigation and section labels
Font: **Agrandir — Tight Black**, weight 900, size 13px, line-height 1.5, letter spacing 1.3px.
Colour: `#5C5141` for navigation. Section headings: `#7A6D59`.
Examples: WRITING, SPEAKING, WORK. Deliberately small relative to the content around them.

## 5.3 Hero
Font style: **Family / Heavy**. Resolve to Michel's supplied font asset rather than guessing.
Desktop size: 148px. Tracking approx `-2.664px`. Colour `#33291D`.
Current copy: **Olá & Welcome**
Intentionally enormous. Do not shrink it merely so it behaves like a conventional hero heading.

## 5.4 Intro body
Font: **Founders Grotesk — Regular**, size 24px, line-height 1.48 (~35.5px), colour `#33291D`.
Bold emphasis: **Founders Grotesk Bold**.
Current maximum paragraph width: approximately 1030px.
Deliberately large body typography — do not reduce to generic 16–18px website body text.

## 5.5 Editorial row title
Font style: **Family / Medium**, size 18px, line-height 28.8px, colour `#1A1916`.
Used for article titles, event names.

## 5.6 Editorial row metadata
Font: **Founders Grotesk — Medium**, size 14px, line-height 18px, colour `#4A3A2A`.
Examples: Medium · A List Apart · Tokyo · Nov 2026 · London, United Kingdom · 2016

## 5.7 Quote
Font style: **Family / Medium**, size 48px, line-height 50px, tracking -0.5px, colour `#1C1A15`. Centered.
Current quote: "Design is the labour of understanding people"
The hand-drawn/highlight treatment under "understanding people" is part of the visual language.

---

# 6. GRID & DESKTOP COMPOSITION

The reference desktop canvas is approximately 1496px wide.

Main document gutter begins at approximately `72px`.

Primary content starts around `88px` because the content sits inside the larger page gutter.

The layout is intentionally left-oriented rather than conventionally centered in a narrow `max-width` wrapper. Do not convert the entire site to a simple `max-width: 1200px; margin: 0 auto;` centered layout.

---

# 7. FONT ASSET MAPPING (resolved from supplied files)

Verified by reading each file's embedded name table:

| Design system name | File | Embedded family/style |
|---|---|---|
| Agrandir — Tight Black | `Agrandir-TightBlack.ttf` | Agrandir / Tight Black |
| Family — Heavy | `family-heavy.ttf` | Family / Heavy |
| Family — Medium | `family-medium.ttf` | Family / Medium |
| Founders Grotesk — Regular | `2d0b7e287a2fa837-s.p.ttf` | Founders Grotesk / Regular |
| Founders Grotesk — Medium | `FoundersGroteskWeb-Medium.ttf` | Founders Grotesk / Medium |
| Founders Grotesk — Bold | `foundersgrotesk-700.ttf` | Founders Grotesk Bold / Regular |

`family-regular.ttf` embeds a Klim Type Foundry "Not Licensed for Desktop Use" notice — excluded from web use pending licensing confirmation. Not required by the current spec (only Heavy and Medium weights of Family are used).
