import { ContactRoute } from '@/components/routes.jsx';
export const metadata = { title: 'Contact', alternates: { canonical: '/en/contact', languages: { bg: '/contact', en: '/en/contact' } } };
export default function Page() { return <ContactRoute lang="en" />; }
