# Hero Section Improvements Plan

## Checkpoint / Rollback

A git checkpoint was created at the current state so you can roll back after implementing hero changes.

- **Tag name:** `checkpoint/rollback-point`
- **To roll back to this version later:**
  ```bash
  cd "/Volumes/Sriram Naidu/Code/Portfolio"
  git checkout checkpoint/rollback-point   # view the checkpoint (detached HEAD)
  # or to discard hero changes and reset your branch to the checkpoint:
  git reset --hard checkpoint/rollback-point
  ```
- **To push the tag to remote (optional):** `git push origin checkpoint/rollback-point`

---

## Current state (summary)

- **Left:** Badge (“Available for opportunities”), name (Sriram + gradient “Divi”), typewriter roles, Download Resume (secondary) + Hire Me, social icons (GitHub, LinkedIn, Email).
- **Right (lg only):** Orbiting tech icons (Java, Python, React, Next.js, Node.js, Git, Docker) around a center object (rotating rings, glow, `</>` and `{ }`).
- **Bottom:** Scroll indicator (ChevronDown to #about).
- **No** `cn()` or shared UI primitives; no reduced-motion handling; no explicit a11y on scroll CTA or orbit.

---

## 1. Design-system alignment

- **Use `cn()`** for all conditional class names in Hero (same pattern as rest of site).
- **Optional layout tweak (design_guidelines):** Guidelines suggest “Massive ‘Full Stack Developer’ text with ‘Sriram Divi’ in a smaller mono badge.” Current hero leads with name. Consider either:
  - **A)** Keep current (name first, then typewriter) for personal brand emphasis, or  
  - **B)** Swap to role-first: large typewriter/headline (“Full Stack Developer”), with “Sriram Divi” in a mono badge above or below for stronger role-first impact.
- **Typography:** Ensure H1 uses design scale (`text-6xl md:text-8xl`) and that badge/typewriter use mono font per guidelines.

---

## 2. Accessibility

- **Reduced motion:** Use Framer Motion `useReducedMotion()` in Hero:
  - When reduced: no orbit rotation (or very slow), no floating `</>` / `{ }` bounce, no scroll-indicator bounce; typewriter can stay (or simplify to static “Full Stack Developer”).
- **Scroll indicator:** Add `aria-label="Scroll to about section"` and ensure it’s focusable (it’s already an `<a href="#about">`).
- **Social / CTAs:** Keep or add `aria-label` on icon-only links (e.g. “GitHub profile”, “LinkedIn profile”, “Email me”) so screen readers have clear labels.
- **Orbit icons:** Ensure each tech icon has `alt` (already present) and consider `loading="lazy"` if you add more assets; current CDN icons are fine.

---

## 3. Mobile and small screens

- **Right column:** Hidden below `lg`; no fallback. Options:
  - **A)** Add a compact, static “stack strip” (e.g. horizontal row of the same tech icons, no orbit) for `md` so tablet users see tech without the full orbit.
  - **B)** Keep as-is and rely on left column only on small screens.
- **Touch targets:** Confirm badge, CTAs, and social icons meet ~44px min for touch (they already look adequate; quick check in devtools).

---

## 4. Copy and CTAs

- **Badge:** “Available for opportunities” is clear; optional variants: “Open to work”, “Looking for full-time roles”.
- **Resume CTA:** Design says “Download Resume (Secondary Color)” — already using secondary; ensure label is clear (e.g. “Download Resume” with icon).
- **Optional:** Short tagline under the typewriter (e.g. “Building web apps with React & Node”) to reinforce stack before scroll; keep one line to avoid clutter.

---

## 5. Visual and performance polish

- **Orbit:** Consider pausing orbit when tab is hidden (e.g. `document.visibilityState`) to save CPU/battery.
- **Center object:** Already strong; optional: very subtle gradient or opacity pulse on the inner circle for a bit more depth (stay within “subtle mesh/glow” from guidelines).
- **Images:** Orbiting icons from CDN are fine; if you add a photo or custom graphic later, use `loading="lazy"` and appropriate `alt`.

---

## 6. Implementation order (suggested)

1. Add `cn()` and reduce conditional class strings.
2. Add `useReducedMotion()` and tone down or disable orbit, code-symbol bounce, and scroll bounce when preferred.
3. Add aria-labels for scroll indicator and social links.
4. (Optional) Add a small-screen tech strip for `md` if you want parity with desktop.
5. (Optional) Copy/layout tweaks (badge wording, tagline, or role-first layout) last.

---

## Out of scope (for this plan)

- Changing the overall structure of the site (navbar, other sections).
- Replacing the center object with 3D/WebGL (design mentions it as an option; current abstract shape is valid).
- Backend or deployment changes.
