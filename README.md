# ALAWEE

Make room for Future You. A mobile-first savings-plan concept shaped around the realities of a Nigerian NYSC service year.

ALAWEE is an independent concept project created to explore an NYSC-focused savings experience. It adapts the familiar principles of structured savings, goal setting, recurring contributions, and financial planning to a 12-month NYSC service journey, with its own product concept, content, calculations, and visual system.

## The idea

Corpers across Nigeria balance a monthly allowance against transport to a PPA, food, data, accommodation, and unexpected costs. PPA pay can be low or inconsistent, while the service year has a clear finish line and real goals after POP: a business, relocation, or further study.

Alawee explores a simple question:

> How much can you set aside for Future You without ignoring the month you are living now?

The prototype follows one service-year journey across three screens: an overview, a flexible monthly plan, and a 12-month progress timeline ending at POP.

It is designed for corps members across all 36 states and the FCT. State does not change the allowance or savings rate; local costs could inform a future budget suggestion, but this prototype does not assume or invent state-level cost data.

The NYSC cycle, savings split, Reality Mode, emergency pass concept, and post-service goal planning are proposed features developed specifically for this project.

## Features

* Three connected screens with animated transitions and back/restart actions.
* Editable monthly saving amount using a slider or numeric input, including the full ₦77,000 allowance option.
* Optional 50/30/20 Alawee split concept for upkeep, locked savings, and an emergency buffer.
* Opt-in monthly automation preference for a last-week-of-month Alawee window, shown as a local simulation only.
* **Reality Mode** prototype with one tracked emergency pass per quarter.
* Post-service goal selector.
* Live share-of-Alawee, 12-month contributions, estimated returns, and POP projection at an illustrative 14% p.a. rate.
* Interactive missed-month scenarios that recalculate contributions and the POP estimate.
* Clear disclosures for estimate assumptions and simulated automation/emergency-pass behaviour.
* 12-month NYSC timeline and progress view that carries the selected amount forward.
* Naira formatting, keyboard-accessible controls, responsive layouts, and reduced-motion support.
* No account, backend, payments, bank connection, or real transactions.

## Stack and approach

* Nuxt 3, Vue 3 Composition API, and TypeScript.
* ESLint and Prettier for code quality and formatting.
* Reusable Vue components, separated calculation and formatting utilities, and CSS variables for design tokens.
* Git-based project structure.
* Plan state remains local to the current session.

The project uses a component-based architecture with reusable UI elements, centralised design tokens, separated financial calculations, and a responsive mobile-first approach.

## Financial estimate

The prototype uses a configurable **14% p.a. illustrative rate** in `src/data/plan.ts`.

This rate is used solely to demonstrate how estimated savings growth could be presented within the product experience. It is **not a live market rate, guaranteed return, or representation of any financial institution's current rate**.

The prototype estimates simple daily accrual on each selected contribution, assuming deposits land at the start of each month. Missed-month scenarios omit those contributions from the estimate.

The financial calculation is intentionally simplified for demonstration purposes. A production implementation would use the applicable savings product's current rate, terms, compounding methodology, deposit timing, applicable fees, and other relevant conditions.

This estimate is not financial advice and should not be interpreted as a guaranteed return.

## Design decisions

The visual system uses a restrained navy and blue fintech palette with a small khaki-green accent.

An original route motif connects a posting to **Future You**, while a crested-cap detail, month markers, PPA references, and POP endpoint make the service year specific without mimicking an official NYSC website.

The interface is mobile-first and responsive, with:

* Compact financial summaries
* Clear contribution and projection information
* Semantic labels
* Visible focus states
* Keyboard-accessible controls
* Reduced-motion behaviour
* Responsive layouts across screen sizes

The design aims to make financial planning feel simple, approachable, and relevant to the realities of an NYSC service year.

## Run locally

Requires Node.js 20 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

Nuxt prints the local development URL.

Useful checks and commands:

```sh
pnpm typecheck
pnpm lint
pnpm build
```

## Disclaimer

ALAWEE is an independent concept project created to explore an NYSC-focused savings experience.

It is a prototype and portfolio project, not a financial service or financial product. It does not accept deposits, connect to bank accounts, initiate transfers, provide investment services, or guarantee returns.

All financial projections shown in the prototype are illustrative and based on the assumptions documented in the project. Actual savings outcomes would depend on the applicable product terms, rates, contribution timing, and other conditions.
