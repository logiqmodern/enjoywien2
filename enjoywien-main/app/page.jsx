import { HomeRoute } from '@/components/routes.jsx';
export const metadata = { alternates: { canonical: '/', languages: { bg: '/', en: '/en' } } };
export default function Page() { return <HomeRoute lang="bg" />; }
