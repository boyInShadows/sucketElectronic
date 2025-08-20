import { getApiBase } from '@/app/libs/api';

export async function getProductsByCategory(categorySlug) {
  const base = getApiBase();
  const url = new URL(`${base}/api/products/`);
  url.searchParams.set('category', categorySlug);

  const res = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
  return res.json();
}
