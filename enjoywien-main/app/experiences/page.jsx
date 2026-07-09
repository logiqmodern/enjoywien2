import { ExperiencesRoute } from '@/components/routes.jsx';
export const metadata = { title: 'Изживявания', description: 'Шест тематични частни изживявания във Виена — полудневни и целодневни, винаги по твоето темпо.', alternates: { canonical: '/experiences', languages: { bg: '/experiences', en: '/en/experiences' } } };
export default function Page() { return <ExperiencesRoute lang="bg" />; }
