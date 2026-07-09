import { ContactRoute } from '@/components/routes.jsx';
export const metadata = { title: 'Контакт', description: 'Пиши във WhatsApp или изпрати запитване — отговор в рамките на 24 часа.', alternates: { canonical: '/contact', languages: { bg: '/contact', en: '/en/contact' } } };
export default function Page() { return <ContactRoute lang="bg" />; }
