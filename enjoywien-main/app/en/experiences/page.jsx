import { ExperiencesRoute } from '@/components/routes.jsx';
export const metadata = { title: 'Experiences', description: 'Six private themed experiences in Vienna — half-day and full-day, always at your pace.', alternates: { canonical: '/en/experiences', languages: { bg: '/experiences', en: '/en/experiences' } } };
export default function Page() { return <ExperiencesRoute lang="en" />; }
