import { AboutRoute } from '@/components/routes.jsx';
export const metadata = { title: 'За нас', description: 'Лицензиран Reisebetreuer с петнадесет години във Виена. Български, немски и английски — свободно.', alternates: { canonical: '/about', languages: { bg: '/about', en: '/en/about' } } };
export default function Page() { return <AboutRoute lang="bg" />; }
