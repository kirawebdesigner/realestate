# Kira Real Estate Data Schema

## Property

| Field | Type | Notes |
|---|---|---|
| id | string | Stable identifier |
| slug | string | Unique descriptive route key |
| title | string | Display name |
| location | string | City, normally Addis Ababa |
| neighborhood | Neighborhood | Filterable neighborhood |
| price | number | ETB numeric value |
| formattedPrice | string | User-facing ETB label |
| propertyType | PropertyType | Category enum |
| status | PropertyStatus | Available, reserved, sample listing |
| bedrooms | number | May be zero for commercial space |
| bathrooms | number | Numeric count |
| parking | number | Vehicle spaces |
| area | number | Square meters |
| description | string | Long-form detail copy |
| shortDescription | string | Card and overview copy |
| features | string[] | Distinguishing attributes |
| amenities | Amenity[] | Amenity labels and icon keys |
| images | PropertyImage[] | Centralized URL and alt text |
| featured | boolean | Homepage eligibility |
| development | string | Related development name |
| completionStatus | string | Completed, ready, or construction status |
| createdAt | string | ISO date for newest sort |

## Development

Contains slug, name, location, type, status, starting price, available unit types, image, story, and related property slugs.

## Inquiry

Contains name, phone, email, inquiry type, property interest, preferred contact method, optional message, and optional preferred visit date.

## Relationships

- One development has many properties through the development name and related slug list
- One neighborhood has many properties through the property neighborhood field
- Favorites contain property slugs only and are client-local
- Inquiries can optionally reference one property slug but are not persisted

