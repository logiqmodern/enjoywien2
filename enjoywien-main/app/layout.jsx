import './globals.css';

export const metadata = {
  metadataBase: new URL('https://enjoywien.com'),
  title: { default: 'EnjoyWien — Виена с твой човек там', template: '%s · EnjoyWien' },
  description: 'Личен придружител във Виена за български пътешественици. Без стрес, без езикова бариера — шест частни изживявания с лицензиран Reisebetreuer.',
  openGraph: { siteName: 'EnjoyWien', type: 'website', locale: 'bg_BG', alternateLocale: 'en_US' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Karla:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
