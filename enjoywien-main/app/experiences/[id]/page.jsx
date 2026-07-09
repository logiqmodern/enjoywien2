import { DetailRoute } from '@/components/routes.jsx';
import { EXPERIENCES } from '@/lib/data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return EXPERIENCES.map(e => ({ id: e.id }));
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  const exp = EXPERIENCES.find(e => e.id === id);
  if (!exp) return {};
  return {
    title: exp.bg.name,
    description: exp.bg.tagline || exp.bg.desc,
    alternates: { canonical: `/experiences/${id}`, languages: { bg: `/experiences/${id}`, en: `/en/experiences/${id}` } },
  };
}
export default async function Page({ params }) {
  const { id } = await params;
  if (!EXPERIENCES.find(e => e.id === id)) notFound();
  return <DetailRoute lang="bg" expId={id} />;
}
