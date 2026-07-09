'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ICONS, TRANSLATIONS } from '@/lib/data';

// Shared UI: Icon, Header, Footer, WhatsApp FAB, helpers

export function Icon({ name, size = 24, stroke = 1.5, ...rest }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d={d}></path>
    </svg>
  );
}

export function Monogram({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="29" fill="none" stroke="currentColor" strokeWidth="1"></circle>
      <text x="30" y="38" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontWeight="500" fontStyle="italic" fontSize="28" fill="currentColor">EW</text>
    </svg>
  );
}

export function FlagBG({ size = 14 }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 30 20">
      <rect width="30" height="6.66" y="0" fill="#fff"></rect>
      <rect width="30" height="6.66" y="6.66" fill="#00966E"></rect>
      <rect width="30" height="6.66" y="13.33" fill="#D62612"></rect>
      <rect width="30" height="20" fill="none" stroke="rgba(0,0,0,.15)"></rect>
    </svg>
  );
}
export function FlagEN({ size = 14 }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#012169"></rect>
      <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="3"></path>
      <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.5"></path>
      <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="5"></path>
      <path d="M15 0V20M0 10H30" stroke="#C8102E" strokeWidth="3"></path>
      <rect width="30" height="20" fill="none" stroke="rgba(0,0,0,.15)"></rect>
    </svg>
  );
}

export function Star({ filled = true, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path>
    </svg>
  );
}

// Decorative ornament line (Vienna-flavored)
export function Ornament({ width = 80 }) {
  return (
    <svg width={width} height="14" viewBox="0 0 80 14" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 7h26"></path>
      <path d="M54 7h26"></path>
      <circle cx="40" cy="7" r="3" fill="currentColor"></circle>
      <circle cx="30" cy="7" r="1.2" fill="currentColor"></circle>
      <circle cx="50" cy="7" r="1.2" fill="currentColor"></circle>
    </svg>
  );
}

// Image placeholder with subtle viennese pattern
export function ImgPlaceholder({ label = 'image', tone = 'cream', tall = false, className = '', children }) {
  // Custom striped/diagonal pattern — never an actual SVG illustration
  const tones = {
    cream:   { bg: 'var(--cream)',   stripe: 'rgba(122,35,51,.10)', text: 'var(--ink-soft)' },
    wine:    { bg: 'var(--wine)',    stripe: 'rgba(255,255,255,.10)', text: 'rgba(255,255,255,.65)' },
    gold:    { bg: 'var(--gold)',    stripe: 'rgba(0,0,0,.08)', text: 'rgba(0,0,0,.55)' },
    ink:     { bg: 'var(--ink)',     stripe: 'rgba(255,255,255,.07)', text: 'rgba(255,255,255,.55)' },
    sage:    { bg: 'var(--sage)',    stripe: 'rgba(0,0,0,.08)', text: 'rgba(0,0,0,.55)' },
    taupe:   { bg: 'var(--taupe)',   stripe: 'rgba(0,0,0,.08)', text: 'rgba(0,0,0,.55)' },
  };
  const t = tones[tone] || tones.cream;
  return (
    <div className={`img-ph ${className}`} style={{
      background: `repeating-linear-gradient(135deg, ${t.bg} 0 16px, ${t.stripe} 16px 17px)`,
      color: t.text,
      aspectRatio: tall ? '3 / 4' : '4 / 3',
    }}>
      <div className="img-ph-label">[ {label} ]</div>
      {children}
    </div>
  );
}

export function Header({ page, setPage, lang, setLang }) {
  const t = TRANSLATIONS[lang];
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'home', label: t.nav.home },
    { id: 'experiences', label: t.nav.experiences },
    { id: 'about', label: t.nav.about },
    { id: 'reviews', label: t.nav.reviews },
    { id: 'contact', label: t.nav.contact },
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" onClick={(e) => { e.preventDefault(); setPage('home'); }} href="#">
          <Monogram size={42}></Monogram>
          <div className="brand-text">
            <div className="brand-name">EnjoyWien</div>
            <div className="brand-sub">{lang === 'bg' ? 'Личен придружител · Виена' : 'Personal companion · Vienna'}</div>
          </div>
        </a>
        <nav className="nav-main">
          {items.map(it => (
            <a key={it.id} href="#" className={`nav-link ${page === it.id ? 'is-active' : ''}`} onClick={(e) => { e.preventDefault(); setPage(it.id); }}>{it.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className={`lang-btn ${lang === 'bg' ? 'is-active' : ''}`} onClick={() => setLang('bg')} aria-label="Български"><FlagBG></FlagBG> <span>БГ</span></button>
          <span className="lang-sep"></span>
          <button className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => setLang('en')} aria-label="English"><FlagEN></FlagEN> <span>EN</span></button>
          <a className="wa-pill" href="#" onClick={(e) => { e.preventDefault(); setPage('contact'); }}>
            <Icon name="whatsapp" size={16}></Icon>
            <span>WhatsApp</span>
          </a>
          <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu">
          {items.map(it => (
            <a key={it.id} href="#" className={`mm-link ${page === it.id ? 'is-active' : ''}`} onClick={(e) => { e.preventDefault(); setPage(it.id); setOpen(false); }}>{it.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer({ setPage, lang }) {
  const t = TRANSLATIONS[lang];
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-brand">
          <Monogram size={56}></Monogram>
          <div className="footer-tagline">{t.footer.tagline}</div>
          <div className="footer-built">{t.footer.built}</div>
        </div>
        <div className="footer-col">
          <div className="footer-h">{t.footer.explore}</div>
          <a onClick={() => setPage('experiences')}>{t.nav.experiences}</a>
          <a onClick={() => setPage('about')}>{t.nav.about}</a>
          <a onClick={() => setPage('reviews')}>{t.nav.reviews}</a>
          <a onClick={() => setPage('contact')}>{t.nav.contact}</a>
        </div>
        <div className="footer-col">
          <div className="footer-h">{t.footer.legal}</div>
          <span>{t.footer.legalLicense}</span>
          <a>{t.footer.legalImprint}</a>
          <a>{t.footer.legalPrivacy}</a>
        </div>
        <div className="footer-col footer-contact">
          <div className="footer-h">{lang === 'bg' ? 'Връзка' : 'Get in touch'}</div>
          <a className="wa-line">
            <Icon name="whatsapp" size={16}></Icon> +43 660 000 0000
          </a>
          <a href="mailto:booking@enjoywien.com">booking@enjoywien.com</a>
          <a>Wien · Österreich</a>
        </div>
      </div>
      <div className="footer-base">
        <div>© 2026 EnjoyWien. {t.footer.rights}</div>
        <div className="ornament-base"><Ornament width={120}></Ornament></div>
      </div>
    </footer>
  );
}

export function WhatsAppFab({ setPage }) {
  return (
    <button className="wa-fab" onClick={() => setPage('contact')} aria-label="WhatsApp">
      <Icon name="whatsapp" size={26}></Icon>
    </button>
  );
}

export function Section({ id, tone = 'cream', children, padding = 'normal', className = '' }) {
  return (
    <section id={id} className={`section section-${tone} pad-${padding} ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function Kicker({ children }) {
  return <div className="kicker"><span className="kicker-line"></span><span className="kicker-text">{children}</span></div>;
}

export function priceFor(exp, dur) {
  return dur === 'full' ? exp.full : exp.half;
}


