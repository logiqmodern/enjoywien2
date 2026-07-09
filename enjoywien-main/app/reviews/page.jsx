import { ReviewsRoute } from '@/components/routes.jsx';
export const metadata = { title: 'Отзиви', description: 'Истории от гости на EnjoyWien — реални изживявания във Виена.', alternates: { canonical: '/reviews', languages: { bg: '/reviews', en: '/en/reviews' } } };
export default function Page() { return <ReviewsRoute lang="bg" />; }
