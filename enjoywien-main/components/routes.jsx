'use client';
import PageShell from './PageShell.jsx';
import { HomePage, ExperiencesPage, AboutPage, ReviewsPage, ContactPage } from './pages.jsx';
import { DetailPage } from './detail.jsx';
import { useNav } from './useNav.js';

function withNav(Comp, extra = {}) {
  return function Wrapped({ lang }) {
    const { setPage, setSelectedExp } = useNav(lang);
    return <Comp lang={lang} setPage={setPage} setSelectedExp={setSelectedExp} {...extra} />;
  };
}

export function HomeRoute({ lang }) {
  const C = withNav(HomePage);
  return <PageShell lang={lang} page="home"><C lang={lang} /></PageShell>;
}
export function ExperiencesRoute({ lang }) {
  const C = withNav(ExperiencesPage);
  return <PageShell lang={lang} page="experiences"><C lang={lang} /></PageShell>;
}
export function AboutRoute({ lang }) {
  const C = withNav(AboutPage);
  return <PageShell lang={lang} page="about"><C lang={lang} /></PageShell>;
}
export function ReviewsRoute({ lang }) {
  const C = withNav(ReviewsPage);
  return <PageShell lang={lang} page="reviews"><C lang={lang} /></PageShell>;
}
export function ContactRoute({ lang }) {
  const C = withNav(ContactPage);
  return <PageShell lang={lang} page="contact"><C lang={lang} /></PageShell>;
}
export function DetailRoute({ lang, expId }) {
  function Inner() {
    const { setPage, setSelectedExp } = useNav(lang);
    return <DetailPage expId={expId} lang={lang} setPage={setPage} setSelectedExp={setSelectedExp} />;
  }
  return <PageShell lang={lang} page="experiences"><Inner /></PageShell>;
}
