# Kira Real Estate App Flow

## Primary journeys

### Discover a property

1. Visitor lands on the cinematic homepage.
2. Visitor sets location, type, price, and bedroom criteria.
3. Search navigates to `/properties` with URL filters applied.
4. Visitor sorts or refines results and opens a property.
5. Visitor reviews gallery, specifications, amenities, and similar listings.
6. Visitor schedules a visit or opens a prefilled WhatsApp inquiry.

### Save and compare

1. Visitor selects the heart control on any listing or property page.
2. The slug is stored locally and feedback is announced accessibly.
3. State remains consistent across cards and detail pages after refresh.

### Contact the demo company

1. Visitor opens `/contact` or a site-visit form.
2. Visitor selects inquiry type, property interest, and preferred contact method.
3. Inline validation explains missing or invalid fields.
4. A local success state confirms receipt without implying a real submission.

## Page hierarchy

```text
Root layout
|-- Compacting header and mobile menu
|-- Route content
|   |-- Home editorial sections
|   |-- Properties filter experience
|   |-- Dynamic property detail
|   |-- Developments editorial index
|   |-- Services
|   |-- About
|   `-- Contact
|-- Sticky mobile inquiry bar on property routes
`-- Global footer and demo disclaimer
```

## Data flow

```text
brand config -> header, footer, CTAs, contact links
property data -> cards, filters, detail pages, form options, structured data
URL search params -> filter state -> derived result set
localStorage -> favorite hook -> favorite controls
```

