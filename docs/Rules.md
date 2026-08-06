# Kira Real Estate Coding Guardrails

## Architecture

- Prefer Server Components; add client components only around interactivity
- Keep brand values in `config/site.ts` and imagery in the data layer
- Keep domain types explicit and avoid `any`
- Use URL parameters for shareable property filters
- Use native platform features before new dependencies

## Code style

- Components and types use clear intent-revealing names
- Small functions, guard clauses, and shallow nesting
- No speculative abstractions or one-use utility layers
- No obvious comments; comments explain only non-obvious constraints
- Preserve semantic HTML and a valid heading order

## Styling

- Use the documented color, typography, shape, and spacing tokens
- One chartreuse accent; no purple, mesh gradients, random dark section flips, or excessive pills
- Avoid repeated equal-card sections and repeated split layouts
- All responsive multi-column layouts define an explicit mobile fallback
- Visible focus states and 44px minimum interactive targets

## Interaction and errors

- Forms show labels above controls and inline errors below
- Dialogs and drawers support Escape, focus management, and accessible names
- Motion communicates hierarchy, feedback, or state; reduced-motion users receive a static equivalent
- Empty and error states provide a clear recovery action

## Content

- No unsupported awards, partnerships, returns, customer counts, or company history
- All pricing and property content is plausible sample data
- No em-dash or en-dash characters in visible copy
- Footer always includes the demonstration disclaimer

## Validation

- Required before completion: lint, TypeScript, production build, route/link smoke checks, desktop and mobile browser inspection, keyboard check, and final taste pre-flight
