# Kira Real Estate Implementation Plan

## Phase 1: Foundation

- Create repository source-of-truth documents
- Scaffold Next.js with TypeScript and Tailwind
- Add brand configuration, types, data, tokens, fonts, and image configuration

## Phase 2: Shared experience

- Build header, responsive menu, footer, buttons, section primitives, and favorite state
- Build property card, search, filters, drawer, empty state, and list/grid modes

## Reference reconstruction pass

- Use the supplied full desktop and mobile screenshots as authoritative visual targets
- Recompose Kira into the same section order and interaction language
- Replace all source branding, copy and assets with Kira-owned content
- Compare equal-size desktop and mobile captures before handoff

## Phase 3: Routes

- Build the complete homepage and services page
- Build properties catalog and dynamic property details
- Build developments, about, and contact pages

## Phase 4: Interaction

- Implement URL-backed search and sorting
- Add gallery lightbox, copy/share, favorites, visit and contact validation
- Add scroll-aware header and sticky mobile inquiry actions

## Phase 5: Quality

- Add metadata, structured data, sitemap, robots, not-found, loading, and error states
- Run lint, type checking, production build, and route/link smoke checks
- Inspect 1440px and 390px layouts in a browser
- Run final visual and accessibility audits, fix defects, and document limitations

## Phase 6: Delivery

- Publish through Sites if available
- Otherwise confirm readiness for Vercel and Netlify and provide exact commands
