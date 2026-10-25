---
title: "Cord"
subtitle: "From Proposal to Payment, in a Single Link"
role: "Founder & CEO"
timeline: "2026 — Present"
impact: "$5k MRR"
url: "https://cordhq.app"
lang: "en"
draft: false
---

Cord is a closing platform: it covers the sales cycle from the proposal to the payment — a quote with negotiated prices, a public link for the client, signature, online payment, invoicing and collections — for any business, in any of the countries it supports. It started in June 2026 as the standalone version of Flouvia's Shopify app for B2B quotes, and today it does not depend on Shopify, on B2B or on a single country.

## 1. The closing link

The whole close happens in one live web link, not in PDFs and email threads.

- **Interactive quotes:** line items, negotiated prices and per-line taxes that the client reviews on the page.
- **Signature on the same link:** terms are accepted where the quote lives.
- **Payment at the moment of yes:** approval turns into checkout without leaving the link.
- **Embeddable:** the quote builder ships as a Web Component (`<cord-cotizador>`) that any website can drop in.

## 2. Cord Payments

Cord owns the payment rail under the hood with white-label Stripe Connect.

- **Onboarding and KYC inside Cord:** multiple owners per account, requirements derived from the provider instead of country-by-country branches, and document capture with quality gates and country-specific guidance.
- **Money goes straight to the business:** Cord processes the charge but never holds the funds.
- **Payouts with history and their own schedule**, and fees per currency.
- **Mercado Pago in Latin America:** in Brazil, Colombia, Argentina, Chile and Peru, online payment runs through the business's own Mercado Pago account.

## 3. Invoicing that holds up to tax authorities

- **Mexico:** CFDI 4.0 stamped through Facturapi.
- **Spain:** Verifactu, the certified invoicing system required by RD 1007/2023 — SHA-256 chained fingerprints checked against the AEAT's official vectors and real SOAP submission validated against the official XSD. Live in production since October 14, 2026.
- **United States:** sales tax per state, and Connect onboarding that accepts US KYC.
- **One totals engine** for every quote and invoice, with per-line taxes seeded by country.

## 4. Collections with AI

An agent built on the Anthropic API chases unpaid invoices, sends reminders, tracks due dates and reconciles payments in the background, so the operator does not spend the week chasing money.

## 5. Built for any country

Signup is open in the 12 countries Cord supports end to end: Mexico, the US, Canada, Brazil, Spain, the UK, Germany, France, Colombia, Argentina, Chile and Peru. Deposit accounts use each country's format (CLABE, IBAN, routing, sort code, BSB…). The app and its emails run in Spanish and English, and the public site in five languages.

## 6. A platform for developers

- **Public REST API** (`/api/v1`) and an **MCP server**, so Cord can be operated from code or from an AI assistant.
- **Cord Workflows** to automate steps of the cycle.
- Its own documentation, developer blog, status page and community, each on its own subdomain.

## 7. Security and multi-tenancy

- **Own authentication:** Argon2id, Google and Apple sign-in, passkeys, TOTP and SAML SSO. It replaced Clerk while keeping every existing identity.
- **Real tenant isolation:** Neon PostgreSQL with row-level security enforced. The app connects with a role that cannot bypass RLS, every query that touches tenant data travels on a declared lane, and CI checks stop that debt from coming back.
- **Guards on every deploy:** a push to `main` ships to production only after security checks pass.

## 8. The business model

Two engines: a freemium subscription on Stripe Billing — five plans with monthly quotas and metered overage for AI, invoices, API calls and seats — and a share of the volume processed through Cord Payments.

## By the numbers

- **$5k MRR.**
- **1,600+ commits** since June 2026.
- **187 database tables**, **350+ API routes** and **470+ test files**.
- **12 countries** and **5 languages**.
- Built on Astro 7 (SSR) on Vercel, Neon, Stripe, Resend, Facturapi and Anthropic.
