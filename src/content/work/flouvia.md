---
title: "Flouvia"
subtitle: "Design & Engineering Studio for Commerce and B2B"
role: "Co-Founder & Lead Engineer"
timeline: "2024 — Present"
impact: "+12 Infrastructures Deployed"
url: "https://flouvia.com"
lang: "en"
draft: false
---

Flouvia is a design and engineering studio based in Mexico City. It builds the digital operation of established businesses — websites, online stores, private B2B portals, Shopify apps, platforms, mobile apps and AI — and hands each client the tools to see and run what was built. We work with a limited number of clients a year, by application.

## 1. Selected work

- **Cord** — the studio's own product: a closing platform from proposal to payment in a single link. It started as Flouvia's Shopify app for B2B quotes and became a standalone company.
- **El Zarco** — a wholesale distributor that has supplied restaurants, shops and cafés from Mexico City's Central de Abasto since 1992, where prices change every day. We rebuilt its site, the catalog where clients put their orders together and the portal where they track and repeat them, and built the panel the business runs on, with quotes from Cord.
- **shwcs** — a B2B discovery platform where a company searches in its own words and lands on the software, agency or service that solves its problem. We designed and built the search, listings with editorial review, the buyer's library and consent-based contact.

## 2. Flouvia OS: the client portal

Every client gets `os.flouvia.com`, a private portal to follow their project without asking for updates:

- **Home:** project status and what is waiting on them.
- **Live site:** field Core Web Vitals and the state of every deploy, read from Vercel.
- **Payments:** plan, amount, payment method and invoice history through Stripe.
- **Vault:** private file storage for the project.
- **Conversations:** one channel with the team, under the support terms agreed with each client.

Access is by invitation, with passkeys. The portal never shows sample data: what nobody has loaded appears as empty, not invented.

## 3. Flouvia Ops: the internal console

`ops.flouvia.com` is where the studio runs: overview, inbox, clients with a 360° view, leads and account access.

## 4. Brand and craft, built in-house

- **Gota** — Flouvia's own icon library, with an explorer, a guide, a license and its own MCP server, at `gota.flouvia.com`.
- **Flouvia Sans** — the studio's own typeface, drawn and generated in-house for the logo and display titles.
- **3D by script** — scenes modeled and rendered in Blender (Cycles) from code, then cut into the films that open each case study.

## 5. How it is built

Astro 6 (SSR) on Vercel, React islands where there is real state, Tailwind v4 and GSAP. Data in Neon PostgreSQL, files in private Vercel Blob, email through Resend, product analytics in PostHog. The site and the portal run in Spanish and English.
