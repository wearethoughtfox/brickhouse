import { error } from '@sveltejs/kit';
import { services, getService } from '$lib/content/services.js';

export function entries() {
  return services.map(({ slug }) => ({ slug }));
}

export function load({ params }) {
  const service = getService(params.slug);
  if (!service) error(404, 'Service not found');
  return { service };
}
