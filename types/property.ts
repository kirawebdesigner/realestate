export type Neighborhood =
  | "Bole"
  | "CMC"
  | "Kazanchis"
  | "Old Airport"
  | "Sar Bet"
  | "Summit"
  | "Ayat";

export type PropertyType =
  | "Apartment"
  | "Penthouse"
  | "Villa"
  | "Townhouse"
  | "Commercial"
  | "Development unit";

export type PropertyStatus = "Available" | "By request" | "Sample listing";

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface Amenity {
  name: string;
  icon: "shield" | "lift" | "garden" | "power" | "fitness" | "concierge" | "balcony" | "workspace";
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  neighborhood: Neighborhood;
  price: number;
  formattedPrice: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  description: string;
  shortDescription: string;
  features: string[];
  amenities: Amenity[];
  images: PropertyImage[];
  featured: boolean;
  development: string;
  completionStatus: string;
  createdAt: string;
}

export interface Development {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: string;
  startingPrice: string;
  unitTypes: string[];
  image: PropertyImage;
  story: string;
  propertySlugs: string[];
}

export interface Inquiry {
  name: string;
  phone: string;
  email: string;
  inquiryType: string;
  propertyInterest: string;
  preferredContact: "Phone" | "Email" | "WhatsApp";
  message: string;
  visitDate?: string;
}
