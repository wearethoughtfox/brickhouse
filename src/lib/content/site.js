import editable from './site.json';

/**
 * Site facts, formerly Jekyll's _config.yml, _data/nav.yaml and the footer include.
 * Anything the client may want to change lives in site.json, which Sveltia CMS edits
 * (Site settings in /admin). The rest stays here.
 */
export const site = {
  name: 'Brick House Fine Art Conservation',
  shortName: 'The Brick House',
  url: 'https://www.brickhouseconservation.co.uk',
  description: editable.description,
  tagline: editable.tagline,
  email: editable.email,
  areaServed: editable.area_served,
  about: { heading: editable.about_heading, text: editable.about_text },
  clientsHeading: editable.clients_heading,
  clients: editable.clients,
  conservators: editable.conservators,
  ogImage: '/images/jd_stour_d1_9957.jpg',
  nav: [
    { href: '/#about', label: 'About' },
    { href: '/#service', label: 'Services' },
    { href: '/work', label: 'Work' },
    { href: '/#contact', label: 'Contact' }
  ]
};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    email: site.email,
    logo: `${site.url}/android-chrome-512x512.png`,
    image: `${site.url}${site.ogImage}`,
    description: site.description,
    areaServed: site.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    employee: site.conservators.map((c) => ({ '@type': 'Person', name: c }))
  };
}
