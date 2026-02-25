# WashLease Style & Developer Guidelines

This file serves as the core instruction set (skills) for iterating on the WashLease landing page. Always adhere to these principles when making changes.

## 1. Design Philosophy: Clean & Professional (Niet te druk)
- **Minimalisme boven trucs:** No excessive background blobs, extreme floating animations, or heavy glassmorphism unless specifically requested. It should look premium through spacing, typography, and subtle shadows, not through overwhelming effects.
- **Geen placeholders voor dingen die we niet hebben:** Never add features, images, or "social proof" (like specific mechanics or fake people) that the client does not actually have or represent yet. Keep it realistic.
- **Witruimte is heilig:** Use generous padding and margins. Let the content breathe.

## 2. Technical Rules
- **Pure HTML/CSS/JS:** No heavy frameworks (React, Vue, Tailwind) unless agreed upon. Vanilla web standards ensure lightning-fast loading for local SEO.
- **Responsive-First:** Always ensure elements stack cleanly on mobile. Check Grid and Flexbox layouts to prevent overlapping text (e.g., hero images breaking out of boundaries on tablet/mobile).
- **Semantische HTML:** Use `<section>`, `<header>`, `<nav>`, `<footer>`, `<main>` properly for SEO.
- **Step-by-step:** Do not rewrite the entire `style.css` in one chaotic go. Make atomic, step-by-step implementations so the client can follow along.

## 3. Resolving Overlaps (Immediate Fix Rule)
If an image overlaps text:
- Check `grid-template-columns`. Ensure it scales down cleanly using media queries or `minmax`.
- Ensure images have `max-width: 100%` and `height: auto`.
- If using `aspect-ratio`, test it against long text blocks.
