export const siteConfig = {
  name: "Kira Real Estate",
  logoText: "KIRA",
  tagline: "Exceptional spaces. Thoughtfully selected.",
  description:
    "A premium demonstration property experience for apartments, residences and developments across Addis Ababa.",
  phone: "+251 11 555 0140",
  phoneHref: "+251115550140",
  whatsapp: "+251 91 200 3344",
  whatsappHref: "251912003344",
  email: "hello@kirarealestate.demo",
  address: "Bole Road, Addis Ababa, Ethiopia",
  officeHours: "Monday to Saturday, 8:30 AM to 5:30 PM",
  url: "https://kiraestate.netlify.app",
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Developments", href: "/developments" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  colors: {
    canvas: "#FFFFFF",
    surface: "#FFFBF6",
    ink: "#16171C",
    graphite: "#11131A",
    stone: "#E8DED2",
    accent: "#FF5A0A",
  },
} as const;

export const demoDisclaimer =
  "Demonstration website - properties, prices and company information are sample content.";

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`;
}
