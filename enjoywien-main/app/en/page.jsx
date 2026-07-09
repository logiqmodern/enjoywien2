import { HomeRoute } from '@/components/routes.jsx';
export const metadata = { title: 'EnjoyWien — Vienna with your person there', description: 'A personal companion in Vienna. No stress, no language barrier — six private experiences with a licensed Reisebetreuer.', alternates: { canonical: '/en', languages: { bg: '/', en: '/en' } } };
export default function Page() { return <HomeRoute lang="en" />; }
