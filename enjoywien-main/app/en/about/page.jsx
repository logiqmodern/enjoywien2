import { AboutRoute } from '@/components/routes.jsx';
export const metadata = { title: 'About', alternates: { canonical: '/en/about', languages: { bg: '/about', en: '/en/about' } } };
export default function Page() { return <AboutRoute lang="en" />; }
