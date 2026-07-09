'use client';
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, EXPERIENCES, ADDONS, PACKAGE, TESTIMONIALS, FAQS, GROUP_DISCOUNTS } from '@/lib/data';
import { Icon, Monogram, Star, Ornament, ImgPlaceholder, Section, Kicker, priceFor, FlagBG, FlagEN } from './shell.jsx';
const T2 = TRANSLATIONS;

// Page components: Home, Experiences list, About, Reviews, Contact

  // --- Reusable experience card -------------------------------------------------
  export function ExperienceCard({ exp, lang, setPage, setSelectedExp, big = false }) {
    const x = exp[lang];
    return (
      <article className={`exp-card ${big ? 'is-big' : ''}`}>
      <div className="exp-card-art">
        {exp.img
          ? <img src={exp.img} alt={x.name} className="exp-card-img" />
          : <ImgPlaceholder label={`${exp.id} · ${lang === 'bg' ? 'снимка' : 'photo'}`} tone={big ? 'wine' : 'cream'} tall={!big} />}
        <div className="exp-card-icon"><Icon name={exp.icon} size={28}></Icon></div>
      </div>
      <div className="exp-card-body">
        <div className="exp-card-tag">{x.tag}</div>
        <h3 className="exp-card-title">{x.name}</h3>
        <p className="exp-card-sub">{x.sub}</p>
        <div className="exp-card-foot">
          <div className="exp-card-price">
            <span className="price-from">{T2[lang].common.from}</span>
            <span className="price-amount">€{exp.half}</span>
            <span className="price-per">/ {T2[lang].common.perPerson}</span>
          </div>
          <button className="btn-ghost" onClick={() => {setSelectedExp(exp.id);setPage('detail');}}>
            {T2[lang].common.readMore} →
          </button>
        </div>
      </div>
    </article>);

  }

  // --- HOME ---------------------------------------------------------------------
  export function HomePage({ lang, setPage, setSelectedExp }) {
    const t = T2[lang];
    const [revIdx, setRevIdx] = useState(0);
    const [heroImgFailed, setHeroImgFailed] = useState(false);
    return (
      <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <ImgPlaceholder label={lang === 'bg' ? 'Виена · нощна снимка на Държавната опера' : 'Vienna · State Opera at night'} tone="wine"></ImgPlaceholder>
        </div>
        <div className="container hero-inner">
          <div className="hero-text">
            <div className="hero-kicker"><Ornament width={60}></Ornament><span>{t.home.kicker}</span></div>
            <h1 className="hero-title">
              {t.home.title.split('\n').map((line, i) => <span key={i} className="hero-line">{line}</span>)}
            </h1>
            <p className="hero-sub">{t.home.sub}</p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => setPage('experiences')}>{t.home.ctaPrimary}</button>
              <button className="btn-secondary" onClick={() => setPage('contact')}>
                <Icon name="whatsapp" size={16}></Icon>
                {t.home.ctaSecondary}
              </button>
            </div>
            <div className="hero-meta">
              <div className="meta-item">
                <div className="meta-stars"><Star></Star><Star></Star><Star></Star><Star></Star><Star></Star></div>
                <div className="meta-label">Google · 4.9</div>
              </div>
              <div className="meta-divider"></div>
              <div className="meta-item">
                <div className="meta-num">15</div>
                <div className="meta-label">{lang === 'bg' ? 'години във Виена' : 'years in Vienna'}</div>
              </div>
              <div className="meta-divider"></div>
              <div className="meta-item">
                <div className="meta-num">BG · DE · EN</div>
                <div className="meta-label">{lang === 'bg' ? 'свободно' : 'fluently'}</div>
              </div>
            </div>
          </div>
          <aside className="hero-card">
            <div className="hc-photo">
              {heroImgFailed
                ? <ImgPlaceholder label={lang === 'bg' ? 'Маги · портрет' : 'Magi · portrait'} tone="cream" tall />
                : <img src="/images/hero.jpg" alt={lang === 'bg' ? 'Маги · портрет' : 'Magi · portrait'}
                    style={{width:'100%',height:'100%',objectFit:'cover'}}
                    onError={() => setHeroImgFailed(true)} />}
            </div>
            <div className="hc-body">
              <div className="hc-signature">— Маги</div>
              <div className="hc-quote">
                {lang === 'bg' ?
                  '„Един номер, един човек, една среща. Това е целият бизнес.“' :
                  '"One number, one person, one meeting. That\u2019s the whole business."'}
              </div>
              <div className="hc-license">
                <span className="hc-dot"></span>
                {lang === 'bg' ? 'Лицензиран Reisebetreuer · Австрия' : 'Licensed Reisebetreuer · Austria'}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* EXPERIENCES PREVIEW */}
      <Section tone="cream" padding="lg">
        <div className="section-head section-head-row">
          <div>
            <Kicker>{t.home.experiencesKicker}</Kicker>
            <h2 className="section-title">{t.home.experiencesTitle}</h2>
          </div>
          <p className="section-sub">{t.home.experiencesSub}</p>
        </div>
        <div className="exp-grid">
          {EXPERIENCES.map((e) =>
            <ExperienceCard key={e.id} exp={e} lang={lang} setPage={setPage} setSelectedExp={setSelectedExp}></ExperienceCard>
            )}
        </div>
        <div className="section-foot-cta">
          <button className="btn-primary" onClick={() => setPage('experiences')}>{t.common.viewAll} →</button>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section tone="paper" padding="lg">
        <div className="section-head section-head-center">
          <Kicker>{t.home.howKicker}</Kicker>
          <h2 className="section-title">{t.home.howTitle}</h2>
        </div>
        <div className="how-grid">
          {[
            { n: '01', t: t.home.step1, d: t.home.step1d },
            { n: '02', t: t.home.step2, d: t.home.step2d },
            { n: '03', t: t.home.step3, d: t.home.step3d }].
            map((s) =>
            <div key={s.n} className="how-card">
              <div className="how-n">{s.n}</div>
              <div className="how-t">{s.t}</div>
              <div className="how-d">{s.d}</div>
            </div>
            )}
        </div>
      </Section>

      {/* MEET STEFAN */}
      <Section tone="ink" padding="lg" className="meet">
        <div className="meet-grid">
          <div className="meet-photo">
            <ImgPlaceholder label={lang === 'bg' ? 'Маги · във Виена' : 'Magi · in Vienna'} tone="taupe" tall></ImgPlaceholder>
            <div className="meet-photo-tag">
              <Ornament width={40}></Ornament>
              <span>Wien · 2026</span>
            </div>
          </div>
          <div className="meet-body">
            <Kicker>{t.home.meKicker}</Kicker>
            <h2 className="section-title section-title-light">{t.home.meTitle}</h2>
            <p className="meet-body-p">{t.home.meBody}</p>
            <div className="meet-stats">
              <div className="meet-stat">
                <div className="ms-num">15</div>
                <div className="ms-label">{t.home.meStat1}</div>
              </div>
              <div className="meet-stat">
                <div className="ms-num">3</div>
                <div className="ms-label">{t.home.meStat2}</div>
              </div>
              <div className="meet-stat">
                <div className="ms-num">160+</div>
                <div className="ms-label">{t.home.meStat3}</div>
              </div>
            </div>
            <button className="btn-outline-light" onClick={() => setPage('about')}>{t.home.meCta} →</button>
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section tone="cream" padding="lg">
        <div className="section-head section-head-center">
          <Kicker>{t.home.reviewsKicker}</Kicker>
          <h2 className="section-title">{t.home.reviewsTitle}</h2>
        </div>
        <div className="rev-stage">
          <button className="rev-nav rev-nav-l" onClick={() => setRevIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Prev">‹</button>
          <div className="rev-card">
            <div className="rev-stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i}></Star>)}</div>
            <blockquote className="rev-text">"{TESTIMONIALS[revIdx][lang].text}"</blockquote>
            <div className="rev-author">
              <div className="rev-author-name">{TESTIMONIALS[revIdx][lang].name}</div>
              <div className="rev-author-meta">{TESTIMONIALS[revIdx][lang].city} · {TESTIMONIALS[revIdx][lang].date} · <em>{TESTIMONIALS[revIdx].source}</em></div>
            </div>
          </div>
          <button className="rev-nav rev-nav-r" onClick={() => setRevIdx((i) => (i + 1) % TESTIMONIALS.length)} aria-label="Next">›</button>
        </div>
        <div className="rev-dots">
          {TESTIMONIALS.map((_, i) =>
            <button key={i} className={`rev-dot ${i === revIdx ? 'is-active' : ''}`} onClick={() => setRevIdx(i)}></button>
            )}
        </div>
        <div className="section-foot-cta">
          <button className="btn-ghost" onClick={() => setPage('reviews')}>{t.common.viewAll} →</button>
        </div>
      </Section>

      {/* PROMISE */}
      <section className="promise">
        <div className="container promise-inner">
          <Kicker>{t.home.promiseKicker}</Kicker>
          <h2 className="promise-title">
            {t.home.promiseTitle.split('\n').map((l, i) => <span key={i}>{l}</span>)}
          </h2>
          <div className="promise-sub">{t.home.promiseSub}</div>
          <div className="promise-cta">
            <button className="btn-primary" onClick={() => setPage('experiences')}>{t.common.book}</button>
            <button className="btn-secondary" onClick={() => setPage('contact')}>
              <Icon name="whatsapp" size={16}></Icon>
              {t.common.whatsapp}
            </button>
          </div>
        </div>
      </section>
    </main>);

  }

  // --- EXPERIENCES LIST ---------------------------------------------------------
  export function ExperiencesPage({ lang, setPage, setSelectedExp }) {
    const t = T2[lang];
    return (
      <main>
      <section className="page-hero">
        <div className="container">
          <Kicker>{t.experiences.kicker}</Kicker>
          <h1 className="page-title">{t.experiences.title}</h1>
          <p className="page-sub">{t.experiences.sub}</p>
        </div>
      </section>

      <Section tone="cream" padding="lg">
        <div className="exp-grid">
          {EXPERIENCES.map((e) =>
            <ExperienceCard key={e.id} exp={e} lang={lang} setPage={setPage} setSelectedExp={setSelectedExp}></ExperienceCard>
            )}
        </div>
      </Section>

      {/* ADD-ONS */}
      <Section tone="paper" padding="lg">
        <div className="section-head section-head-center">
          <Kicker>{t.common.addOns}</Kicker>
          <h2 className="section-title">{t.experiences.addonsTitle}</h2>
          <p className="section-sub section-sub-center">{t.experiences.addonsSub}</p>
        </div>
        <div className="addon-grid">
          {ADDONS.map((a) =>
            <div key={a.id} className="addon-card">
              <div className="addon-icon"><Icon name={a.icon} size={26}></Icon></div>
              <div className="addon-body">
                <div className="addon-name">{a[lang]}</div>
                <div className="addon-price">€{a.price} <span className="addon-per">/ {t.common.perBooking}</span></div>
              </div>
            </div>
            )}
        </div>
      </Section>

      {/* MULTI-DAY PACKAGE */}
      <Section tone="wine" padding="lg" className="pkg">
        <div className="pkg-grid">
          <div className="pkg-text">
            <Kicker>{t.experiences.packageKicker}</Kicker>
            <h2 className="section-title section-title-light">{PACKAGE[lang].name}</h2>
            <p className="pkg-sub">{t.experiences.packageSub}</p>
            <ul className="pkg-list">
              {PACKAGE[lang].items.map((it, i) =>
                <li key={i}><span className="pkg-bullet">◆</span>{it}</li>
                )}
            </ul>
            <div className="pkg-prices">
              <div className="pkg-price-block">
                <div className="pkg-price-label">{t.experiences.packageFrom}</div>
                <div className="pkg-price-amt">€{PACKAGE.fromPP}</div>
                <div className="pkg-price-sub">{t.experiences.packagePerPerson}</div>
              </div>
              <div className="pkg-price-block">
                <div className="pkg-price-label">{t.experiences.packageSolo}</div>
                <div className="pkg-price-amt">€{PACKAGE.solo}</div>
                <div className="pkg-price-sub">{t.common.perPerson}</div>
              </div>
            </div>
            <button className="btn-gold" onClick={() => setPage('contact')}>{t.common.whatsapp} →</button>
          </div>
          <div className="pkg-art">
            <ImgPlaceholder label={lang === 'bg' ? 'Шьонбрун · парк' : 'Schönbrunn · gardens'} tone="gold"></ImgPlaceholder>
            <ImgPlaceholder label={lang === 'bg' ? 'Кафене · Мелаж' : 'Café · Melange'} tone="cream"></ImgPlaceholder>
            <ImgPlaceholder label={lang === 'bg' ? 'Опера · вечер' : 'Opera · evening'} tone="ink"></ImgPlaceholder>
          </div>
        </div>
      </Section>
    </main>);

  }

  // --- ABOUT --------------------------------------------------------------------
  export function AboutPage({ lang, setPage }) {
    const t = T2[lang];
    return (
      <main>
      <Section tone="cream" padding="lg" className="about-hero">
        <div className="about-grid">
          <div className="about-text">
            <Kicker>{t.about.kicker}</Kicker>
            <h1 className="page-title">
              {t.about.title.split('\n').map((l, i) => <span key={i} className="title-line">{l}</span>)}
            </h1>
            <p className="lead">{t.about.lead}</p>
          </div>
          <div className="about-photo">
            <ImgPlaceholder label={lang === 'bg' ? 'Маги · портрет' : 'Magi · portrait'} tone="wine" tall></ImgPlaceholder>
            <div className="about-photo-stamp">
              <Ornament width={40}></Ornament>
              <div>est. 2026 · Wien</div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper" padding="lg">
        <div className="about-body">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
        <div className="lang-grid">
          <div className="lang-card"><div className="lang-flag"><FlagBG size={28}></FlagBG></div><div className="lang-name">{t.about.bg}</div><div className="lang-level">{t.about.bgN}</div></div>
          <div className="lang-card"><div className="lang-flag"><FlagEN size={28}></FlagEN></div><div className="lang-name">{t.about.en}</div><div className="lang-level">{t.about.enF}</div></div>
          <div className="lang-card">
            <div className="lang-flag">
              <svg width="42" height="28" viewBox="0 0 30 20"><rect width="30" height="6.66" fill="#000"></rect><rect width="30" height="6.66" y="6.66" fill="#ED2939"></rect><rect width="30" height="6.66" y="13.33" fill="#FFCD00"></rect></svg>
            </div>
            <div className="lang-name">{t.about.de}</div><div className="lang-level">{t.about.deF}</div>
          </div>
        </div>
      </Section>

      <Section tone="cream" padding="lg">
        <div className="license-grid">
          <div>
            <Kicker>{t.about.licenseKicker}</Kicker>
            <h2 className="section-title">{t.about.licenseTitle}</h2>
          </div>
          <p className="license-body">{t.about.licenseBody}</p>
        </div>
      </Section>
    </main>);

  }

  // --- REVIEWS ------------------------------------------------------------------
  export function ReviewsPage({ lang, setPage }) {
    const t = T2[lang];
    const [filter, setFilter] = useState('all');
    const list = filter === 'all' ? TESTIMONIALS : TESTIMONIALS.filter((x) => x.source === filter);
    return (
      <main>
      <section className="page-hero">
        <div className="container">
          <Kicker>{t.reviews.kicker}</Kicker>
          <h1 className="page-title">{t.reviews.title}</h1>
          <p className="page-sub">{t.reviews.sub}</p>
          <div className="rev-filter">
            <button className={`chip ${filter === 'all' ? 'is-on' : ''}`} onClick={() => setFilter('all')}>{lang === 'bg' ? 'Всички' : 'All'} <span>{TESTIMONIALS.length}</span></button>
            <button className={`chip ${filter === 'Google' ? 'is-on' : ''}`} onClick={() => setFilter('Google')}>Google <span>{TESTIMONIALS.filter((x) => x.source === 'Google').length}</span></button>
          </div>
        </div>
      </section>

      <Section tone="cream" padding="lg">
        <div className="rev-grid">
          {list.map((rev) =>
            <article key={rev.id} className="rev-grid-card">
              <div className="rev-grid-stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={16}></Star>)}</div>
              <blockquote>"{rev[lang].text}"</blockquote>
              <div className="rev-grid-author">
                <div className="rgc-name">{rev[lang].name}</div>
                <div className="rgc-meta">{rev[lang].city} · {rev[lang].date}</div>
              </div>
              <div className="rev-grid-source">{rev.source}</div>
            </article>
            )}
        </div>
        <div className="rev-links">
          <a className="rev-link" href="#">{t.reviews.google} →</a>
        </div>
      </Section>
    </main>);

  }

  // --- CONTACT ------------------------------------------------------------------
  export function ContactPage({ lang }) {
    const t = T2[lang];
    const [sent, setSent] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    return (
      <main>
      <Section tone="cream" padding="lg" className="contact-hero">
        <div className="contact-grid">
          <div className="contact-text">
            <Kicker>{t.contact.kicker}</Kicker>
            <h1 className="page-title">
              {t.contact.title.split('\n').map((l, i) => <span key={i} className="title-line">{l}</span>)}
            </h1>
            <p className="page-sub">{t.contact.sub}</p>
            <a className="wa-cta" href="#">
              <Icon name="whatsapp" size={20}></Icon>
              <div>
                <div className="wa-cta-1">{t.contact.whatsappCta}</div>
                <div className="wa-cta-2">+43 660 000 0000</div>
              </div>
            </a>
            <div className="contact-other">
              <div><span>Email</span><div>hello@enjoywien.com</div></div>
              <div><span>{lang === 'bg' ? 'Местоположение' : 'Location'}</span><div>Wien I, Österreich</div></div>
              <div><span>{lang === 'bg' ? 'Часове' : 'Hours'}</span><div>{lang === 'bg' ? 'Пон–Нед, 9:00–21:00' : 'Mon–Sun, 9:00–21:00'}</div></div>
            </div>
          </div>
          <div className="contact-form">
            <div className="form-h">{t.contact.orForm}</div>
            {sent ?
              <div className="form-sent">{t.contact.formSent}</div> :

              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                try {
                  await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: fd.get('name'), email: fd.get('email'), message: fd.get('message'), lang }),
                  });
                } catch (err) {}
                setSent(true);
              }}>
                <label>{t.contact.formName}<input type="text" name="name" required></input></label>
                <label>{t.contact.formEmail}<input type="email" name="email" required></input></label>
                <label>{t.contact.formMessage}<textarea rows="5" name="message" required></textarea></label>
                <button type="submit" className="btn-primary">{t.contact.formSubmit}</button>
              </form>
              }
          </div>
        </div>
      </Section>

      <Section tone="paper" padding="lg">
        <div className="section-head section-head-center">
          <Kicker>FAQ</Kicker>
          <h2 className="section-title">{t.contact.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {FAQS[lang].map((f, i) =>
            <div key={i} className={`faq-item ${openFaq === i ? 'is-open' : ''}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-icon">{openFaq === i ? '–' : '+'}</span>
              </button>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
            )}
        </div>
      </Section>
    </main>);

  }

  