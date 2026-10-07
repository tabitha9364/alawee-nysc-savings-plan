# ALAWEE

Make room for Future You. A mobile-first savings-plan concept shaped around the realities of a Nigerian NYSC service year.

ALAWEE is an independent concept project created to explore an NYSC-focused savings experience. Its product inspiration comes from Cowrywise's savings-plan concept and clean, straightforward layout. Alawee adapts those broad ideas to a 12-month NYSC service journey with its own content and visual system; it does not reproduce Cowrywise's proprietary interface and is not affiliated with or developed by Cowrywise.

## The idea

Corpers across Nigeria balance a monthly Alawee against transport to a PPA, food, data, accommodation, and unexpected costs. PPA pay can be low or inconsistent, while the service year has a clear finish line and real goals after POP: a business, relocation, or further study. Alawee explores a simple question: how much can you set aside for Future You without ignoring the month you are living now?

The prototype follows one service-year journey across three screens: an overview, a flexible monthly plan, and a 12-month progress timeline ending at POP. It is designed for corpers in all 36 states and the FCT. State does not change the allowance or savings rate; local costs could inform a future budget suggestion, but this prototype does not assume or invent state-level cost data. Cowrywise's clear savings-plan layout is an inspiration, while the NYSC cycle, split, and Reality mode are proposed concept features.

## Features

- Three connected screens with animated transitions and back/restart actions.
- Editable monthly saving amount using a slider or numeric input, including the full ₦77,000 allowance option.
- Optional 50/30/20 Alawee split concept for upkeep, locked savings, and an emergency buffer.
- Opt-in monthly automation preference for a last-week-of-month Alawee window, shown as a local simulation only.
- “Reality mode” prototype with one tracked emergency pass per quarter.
- Post-service goal selector.
- Live share-of-Alawee, 12-month contributions, estimated returns, and POP projection at an illustrative 14% p.a. rate.
- Interactive missed-month scenarios that recalculate contributions and the POP estimate.
- Clear disclosures for the estimate assumptions and simulated automation/emergency pass; no account, bank, or transfer integration is active.
- A 12-month NYSC timeline and progress view that carries the selected amount forward.
- Naira formatting, keyboard-accessible controls, responsive layouts, and reduced-motion support.
- No account, backend, payments, bank connection, or real transactions.

## Stack and approach

- Nuxt 3, Vue 3 Composition API, and TypeScript.
- ESLint and Prettier for code quality and formatting.
- Reusable Vue components, separated calculation and formatting utilities, and CSS variables for design tokens.
- Git-based project structure; all plan state stays local in the current session.

The stack and component/token approach are informed by Cowrywise's public engineering writing, including [its Nuxt 2 to Nuxt 3 migration](https://engineering.cowrywise.com/article/how-we-migrated-our-largest-app-from-nuxt-2-to-nuxt-3) and [frontend design-system article](https://engineering.cowrywise.com/article/design-systems-in-the-frontend). This portfolio project does not use Cowrywise code or internal systems and makes no claim about unpublished tools or practices.

## Financial estimate

The estimate uses a configurable 14% p.a. rate in `src/data/plan.ts` for illustration only. It is not a live or guaranteed Cowrywise rate. Cowrywise says the prevailing rate depends on the product and tenure and is shown when a plan is created; its help article describes daily calculation and proration. See the [interest-rate explanation](https://help.cowrywise.com/en/articles/1860560-how-much-interest-is-offered), [daily calculation guide](https://help.cowrywise.com/en/articles/7921379-how-to-calculate-the-interest-on-your-savings-plans), and [savings-rate endpoint](https://developers.cowrywise.com/reference/get-savings-rates). The prototype estimates simple daily accrual on each selected contribution, assuming deposits land at the start of each month. Missed-month scenarios omit those contributions from the estimate. A production integration should retrieve the current rate for the selected tenure from Cowrywise and calculate using the product's actual terms; this estimate is not financial advice or a guaranteed return.

## Design decisions

The visual system uses a restrained navy and blue fintech palette with a small khaki-green accent. An original route motif connects a posting to Future You, while a crested-cap detail, month markers, PPA references, and POP endpoint make the service year specific without mimicking an official NYSC site. The interface is mobile-first and responsive, with compact data summaries, semantic labels, visible focus states, and reduced-motion behavior.

## Run locally

Requires Node.js 20 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

Nuxt prints the local development URL. Useful checks and commands:

```sh
pnpm typecheck
pnpm lint
pnpm build
```

## Disclaimer

ALAWEE is an independent concept project created by me to explore an NYSC-focused savings experience. It is inspired by digital savings products and is not affiliated with or developed by Cowrywise. This prototype does not provide financial services, accept deposits, or guarantee returns.
