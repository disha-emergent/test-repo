# PRD — PULSE // The Kinetic Counter

## Original Problem Statement
Build a landing page: which has one button on clicking that button, the count is increased and it is visible on the page.

## User Choices
- Count does NOT persist — live counter on the page only (resets on refresh)
- Design: clean, minimal, light

## User Personas
- Casual visitor: wants a satisfying, tactile click experience
- Design-minded visitor: appreciates editorial typography, motion, and craft

## Architecture
- Frontend-only React app (no backend persistence, per user choice)
- State: count, click timestamps, sound toggle — held in App.js
- Styling: Tailwind + CSS variables (light/dark), Syne / Plus Jakarta Sans / Space Mono
- Motion: framer-motion (reveals, springs, micro-interactions), lenis (smooth scroll)
- Audio: Web Audio API synthesized click/pop/chime (no assets)
- Canvas: particle burst system (hero) + 3D fibonacci-sphere wireframe (spatial section)

## Implemented (2026-07)
- Kinetic hero with masked line-by-line headline reveal
- Giant live count readout with spring pop animation
- Tactile INCREMENT button: particle burst, spring press, synthesized click SFX
- Quick modifiers: +10, +100, Reset; live clicks/sec velocity meter
- Slow editorial marquee (pauses on hover)
- Numbered manifesto chapters (02–05) with clipped spotlight photography
- Telemetry section: total, session age, peak velocity, rhythm sparkline, milestones (10/50/100/500) with toast + chime on unlock
- Spatial 3D canvas reacting to cursor + count
- Glass header: mini counter, sound toggle, dark mode toggle, reset
- Editorial footer with live session timer
- Verified: 3 clicks → count 3, mini-counter syncs, all sections render, backend health OK

## Credentials
No auth or accounts. No credentials required.

## Backlog
- P1: Persist shared global count in MongoDB (if user changes mind)
- P1: Hold-to-accelerate press on the increment button
- P2: Keyboard support (spacebar to increment)
- P2: Share image generator (count → OG-style card)
