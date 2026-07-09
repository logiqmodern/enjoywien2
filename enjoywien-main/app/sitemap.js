import { EXPERIENCES } from '@/lib/data';
export default function sitemap() {
  const base = 'https://enjoywien.com';
  const pages = ['', '/experiences', '/about', '/reviews', '/contact'];
  const urls = [];
  for (const p of pages) {
    urls.push({ url: base + (p || '/'), changeFrequency: 'weekly', priority: p === '' ? 1 : 0.8 });
    urls.push({ url: base + '/en' + p, changeFrequency: 'weekly', priority: 0.6 });
  }
  for (const e of EXPERIENCES) {
    urls.push({ url: `${base}/experiences/${e.id}`, changeFrequency: 'weekly', priority: 0.9 });
    urls.push({ url: `${base}/en/experiences/${e.id}`, changeFrequency: 'weekly', priority: 0.7 });
  }
  return urls;
}
