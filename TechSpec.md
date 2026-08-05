# Kira Real Estate Technical Specification

## Stack

- Next.js App Router with TypeScript and React Server Components by default
- Tailwind CSS for tokens and responsive styling
- Lucide React for the explicitly requested icon set
- Motion only for isolated, meaningful client-side transitions
- Next/Image for local and remote optimized imagery
- Local typed data; no database or paid API

## Architecture

- `app/`: routes, metadata, sitemap, robots, error and not-found states
- `components/layout/`: header, mobile navigation, footer
- `components/home/`: page-specific editorial sections
- `components/property/`: cards, filters, gallery, inquiry and favorites
- `config/`: replaceable company identity and navigation
- `data/`: listings and developments, including centralized image URLs
- `types/`: domain models
- `lib/`: filtering, formatting, and query helpers

## Component foundation decision

Astryx was considered because KirzKit recommends it for greenfield React interfaces. It remains beta and this demo needs highly bespoke editorial composition with a small primitive surface. Native semantic elements plus Tailwind are the lower-risk production choice. No Astryx runtime dependency will be added unless compatibility testing shows a concrete accessibility or maintenance benefit.

## Reference reconstruction

The homepage is rebuilt inside the existing Next.js project rather than a second prototype folder. This preserves the already implemented property catalog, dynamic detail pages, forms, metadata and deployment setup. Source assets are not hotlinked or copied. Kira uses its own generated hero, existing open-license architectural imagery and distinct copy while matching the supplied desktop and mobile composition.

## State and data flow

- Search uses URL query parameters for shareable, progressively enhanced filtering
- Listings filters derive visible results from local data in a client island
- Favorite slugs persist under one namespaced localStorage key
- Contact and visit forms validate in the browser and simulate a local successful submission

## Security and privacy

- No authentication, payment, secrets, or persistent personal data
- Inputs are constrained, labeled, and validated at the UI boundary
- External links use safe attributes where needed
- Demo status is visible in footer and metadata avoids real-company claims

## Routes

- `/`
- `/properties`
- `/properties/[slug]`
- `/developments`
- `/about`
- `/contact`
- `/services` as a focused services landing route so the main navigation has no dead link

## Deployment

Static-friendly Next.js deployment to Vercel or Netlify. Production validation uses `npm run lint`, `npm run typecheck`, and `npm run build`.
