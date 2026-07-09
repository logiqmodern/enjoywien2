import { ReviewsRoute } from '@/components/routes.jsx';
export const metadata = { title: 'Reviews', alternates: { canonical: '/en/reviews', languages: { bg: '/reviews', en: '/en/reviews' } } };
export default function Page() { return <ReviewsRoute lang="en" />; }
