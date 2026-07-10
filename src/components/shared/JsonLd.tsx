export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Schemas Helpers

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "REMVITA Colchões Terapêuticos",
  "url": "https://www.remvitacolchoes.com.br",
  "logo": "https://www.remvitacolchoes.com.br/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-99999-9999",
    "contactType": "Vendas",
    "areaServed": "BR",
    "availableLanguage": "Portuguese"
  },
  "sameAs": [
    "https://www.facebook.com/remvitacolchoes",
    "https://www.instagram.com/remvitacolchoes"
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "REMVITA Colchões Terapêuticos",
  "image": "https://www.remvitacolchoes.com.br/og-image.jpg",
  "@id": "https://www.remvitacolchoes.com.br",
  "url": "https://www.remvitacolchoes.com.br",
  "telephone": "+55-11-99999-9999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Exemplo",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "01000-000",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.instagram.com/remvitacolchoes",
    "https://www.facebook.com/remvitacolchoes",
    "https://www.youtube.com/@remvita"
  ]
};
