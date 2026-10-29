# Local setup and verification

## Separate frontend and backend

This repository contains the Next.js application. Clone [the Django backend](https://github.com/boyInShadows/SucketElectronicBackend) into its own directory and follow its setup instructions. A directory named `SucketElectronic/backend` is not required. Install backend dependencies from its tracked `requirements.txt`, apply its existing migrations, and use a new local database for review. Do not copy an existing customer database or uploaded records into public examples.

The frontend uses its committed npm lockfile: run `npm ci`, then `npm run dev`. The reviewed package does not declare an engine range; this pass used Node 24.11.1/npm 11.6.2. No Node 18/20 compatibility claim was separately tested.

## API configuration

| Variable | Meaning |
|---|---|
| `NEXT_PUBLIC_API_URL` | Browser-facing Django origin; compiled into the client bundle |
| `INTERNAL_API_URL` | Server-side Django origin used by `getApiBase()` |

For a local pair, set both to `http://localhost:8000` before startup/build. Django CORS settings must allow the exact browser origin, normally `http://localhost:3000`. A different port is a different origin. The review used an isolated settings override and browser port 3459, without changing deployed settings.

`app/libs/api.js` adds `/api` and a trailing slash while preserving query parameters. In production, browser calls can use the same origin with a correctly configured reverse proxy. With a separate API origin, configure it explicitly. Selected Next route handlers also read `NEXT_PUBLIC_API_URL`; verify the precise route in use rather than assuming `INTERNAL_API_URL` controls every handler.

The application has both `next.config.js` and `next.config.mjs`. The reviewed build uses the former image-host configuration; the deprecated `images.domains` warning remains. Custom image hosts/ports must match the Next image configuration. Keep CORS, reverse-proxy paths and image URLs consistent with the API origin.

## Authentication and payments

The inspected Django-facing flow uses bearer tokens and localStorage state. Its client expiry timer is a UI mechanism, not proof of server-side token lifetime, authorization or secure storage. A bounded review of `app/libs/api.js` and its callers does not establish that all account/order operations are secure or complete.

`app/api/auth/[...nextauth].js` and `app/api/checkout/index.js` are legacy scaffold files. The production route listing does not expose them as working App Router endpoints. The checkout scaffold references a server-side `stripe` import that is not declared in the manifest. This pass did not configure OAuth, Stripe, real payment services or SMS. Avoid the previous README's PCI-compliance, confirmed-payment, wallet and email claims.

The map component contains existing browser-provider configuration. External provider requests were blocked during review to avoid contacting a live map/SMS/payment service. The screenshot is evidence of the running storefront/catalog, not provider availability.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm start
```

`npm start` requires a completed build. There is no declared automated test or TypeScript script in the original manifest. Do not describe a successful dependency install or build exit as a passing lint/security check.

## Verification and known limits

Application base: `a2eb1afbdcba`; inspected on 30 October 2026 local time. Original frontend lockfile changes and backend notes were preserved in their original checkouts. This work uses isolated worktrees.

| Check | Observed result |
|---|---|
| `npm ci --cache D:/.npm-cache` | Exit 0; 2389 packages installed from the published lockfile |
| `npm run lint` | Exit 1: parser serialization error; not a passing check |
| `npm run build` | Exit 0 and a production bundle; also prints the ESLint parser error |
| `npm audit --json` | Nonzero; 196 findings: 18 low, 106 moderate, 57 high, 15 critical |
| Local integration | Real Django API with fresh SQLite database and four synthetic products; public product/category GET returned 200 |
| Browser | Actual Next storefront rendered at 1440/390px; synthetic product visible; mobile document width matched viewport |

A bounded rendering fix removed the inner duplicate `latest-products` ID while
preserving the outer section used by navigation. The browser originally found
two matching elements; the production DOM check now finds exactly one. No layout,
authentication, payment behavior or dependency version was changed by this fix.
GET checks of `/api/auth/session` and `/api/checkout` returned 404, corroborating
that those legacy scaffold files are not verified active endpoints.

See [lint/install evidence](artifacts/verification.json), [build evidence](artifacts/build-result.json), [audit summary](artifacts/dependency-audit.json) and [browser outcomes](artifacts/browser-results.json). Build success did not suppress or fix the separate lint failure. The large dependency backlog needs a scoped maintenance/security pass; no force audit fix or mass dependency upgrade was performed as a documentation repair.

Source review used codebase-memory project `sucketElectronic-showcase`, generation `2026-10-29T20:25:01Z`, API-helper snippets, its direct callers and file coverage. Flagged metadata paths were read directly. The helper reaches public catalog and account/cart/order calls, so authentication changes must be reviewed with their actual Django endpoints. No authentication rewrite was attempted here.

Existing gaps include lint tooling, dependency advisories, unverified login/cart/order/payment flows and external provider configuration. No production deployment, commercial launch, customer publication right or complete accessibility/security audit was established. Existing imagery/ownership remain unchanged.
