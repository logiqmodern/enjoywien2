'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Header, Footer, WhatsAppFab } from './shell.jsx';
import { useNav, mirrorPath } from './useNav.js';

export default function PageShell({ lang, page, children }) {
  const { setPage, setSelectedExp } = useNav(lang);
  const pathname = usePathname();
  const router = useRouter();
  const setLang = (l) => { if (l !== lang) router.push(mirrorPath(pathname, l) || '/'); };

  return (
    <div className="app">
      <Header page={page} setPage={setPage} lang={lang} setLang={setLang} />
      {children}
      <Footer setPage={setPage} lang={lang} />
      <WhatsAppFab setPage={setPage} />
    </div>
  );
}
