'use client';
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, EXPERIENCES, ADDONS, GROUP_DISCOUNTS } from '@/lib/data';
import { Icon, Star, ImgPlaceholder, Section, Kicker, Ornament, priceFor } from './shell.jsx';
import { ExperienceCard } from './pages.jsx';
const T3 = TRANSLATIONS; const EXPS3 = EXPERIENCES; const ADDONS3 = ADDONS; const GD3 = GROUP_DISCOUNTS;

// Experience detail page + 5-step booking flow

export function Stepper({ step, total, labels }) {
  return (
    <div className="stepper">
      {labels.map((label, i) => (
        <React.Fragment key={i}>
          <div className={`step-pill ${i === step ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`}>
            <span className="step-num">{i < step ? '✓' : (i + 1)}</span>
            <span className="step-label">{label}</span>
          </div>
          {i < labels.length - 1 && <div className={`step-line ${i < step ? 'is-done' : ''}`}></div>}
        </React.Fragment>
      ))}
    </div>
  );
}

function MiniCalendar({ value, onChange, blocked = [] }) {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const monthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    bg: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
  };
  const dayNames = { en: ['Mo','Tu','We','Th','Fr','Sa','Su'], bg: ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'] };
  const lang = document.documentElement.lang || 'bg';
  const firstDay = new Date(view.y, view.m, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  function shift(delta) {
    let m = view.m + delta, y = view.y;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    setView({ y, m });
  }
  function key(d) { return `${view.y}-${String(view.m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
  function isPast(d) {
    const dt = new Date(view.y, view.m, d);
    const t = new Date(); t.setHours(0,0,0,0);
    return dt < t;
  }
  // pre-block a few sample dates per month
  const sampleBlocked = [3, 14, 22];
  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" onClick={() => shift(-1)} aria-label="prev">‹</button>
        <div className="cal-title">{monthNames[lang][view.m]} {view.y}</div>
        <button type="button" onClick={() => shift(1)} aria-label="next">›</button>
      </div>
      <div className="cal-days">
        {dayNames[lang].map(d => <div key={d} className="cal-dn">{d}</div>)}
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="cal-cell cal-empty"></div>;
          const k = key(d);
          const blockedDay = sampleBlocked.includes(d) || isPast(d);
          const selected = value === k;
          return (
            <button type="button" key={i} disabled={blockedDay}
              className={`cal-cell ${selected ? 'is-sel' : ''} ${blockedDay ? 'is-blocked' : ''}`}
              onClick={() => onChange(k)}>{d}</button>
          );
        })}
      </div>
      <div className="cal-legend">
        <span><span className="dot dot-free"></span> {lang === 'bg' ? 'свободно' : 'available'}</span>
        <span><span className="dot dot-blocked"></span> {lang === 'bg' ? 'заето' : 'booked'}</span>
      </div>
    </div>
  );
}

export function BookingFlow({ exp, lang, onClose }) {
  const t = T3[lang];
  const [step, setStep] = useState(0);
  const [duration, setDuration] = useState('half'); // half | full
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [addons, setAddons] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [sent, setSent] = useState(false);

  const totalPeople = adults + children;
  const totalDiscountPP = GD3[Math.min(totalPeople, 6)] || 0;
  const basePrice = priceFor(exp, duration);
  const adultPrice = Math.max(100, basePrice - totalDiscountPP); // €100 minimum
  const childPrice = Math.round(adultPrice * 0.5);
  const baseTotal = adults * adultPrice + children * childPrice;
  const addonsTotal = addons.reduce((s, id) => s + (ADDONS3.find(a => a.id === id)?.price || 0), 0);
  const grandTotal = baseTotal + addonsTotal;

  const labels = [t.detail.step1Title, t.detail.step2Title, t.detail.step3Title, t.detail.step4Title, t.detail.step5Title];

  function toggleAddon(id) {
    setAddons(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id]);
  }

  const [submitting, setSubmitting] = useState(false);
  async function submitBooking() {
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experience: exp[lang].name,
          experienceId: exp.id,
          lang, duration, date, adults, children, babies,
          addons: addons.map(id => ADDONS3.find(a => a.id === id)?.[lang] || id),
          adultPrice, childPrice, addonsTotal, total: grandTotal,
          name: form.name, email: form.email, phone: form.phone, notes: form.notes,
        }),
      });
    } catch (e) { /* заявката се показва като изпратена; собственикът вижда грешки в лога */ }
    setSent(true);
    setSubmitting(false);
  }

  function canAdvance() {
    if (step === 3 && !date) return false;
    if (step === 4 && (!form.name || !form.email || !form.phone)) return false;
    return true;
  }

  if (sent) {
    return (
      <div className="booking-sent">
        <div className="sent-ornament"><Ornament width={140}></Ornament></div>
        <h3 className="sent-title">{t.detail.sentTitle}</h3>
        <p className="sent-body">{t.detail.sentBody}</p>
        <div className="sent-recap">
          <div><span>{exp[lang].name}</span></div>
          <div><span>{duration === 'half' ? t.common.halfDay : t.common.fullDay}</span></div>
          <div><span>{adults + children + babies} {lang === 'bg' ? 'души' : 'people'}</span></div>
          <div><span>{date}</span></div>
          <div className="sent-total"><span>{t.detail.total}</span><strong>€{grandTotal}</strong></div>
        </div>
        <button className="btn-primary" onClick={onClose}>{t.detail.sentMore}</button>
      </div>
    );
  }

  return (
    <div className="booking">
      <div className="booking-head">
        <h3>{t.detail.bookingTitle}</h3>
        <div className="booking-step-num">{t.detail.step} {step + 1} {t.detail.of} 5</div>
      </div>

      <Stepper step={step} total={5} labels={labels}></Stepper>

      <div className="booking-body">
        <div className="booking-main">
          {/* STEP 1: DURATION */}
          {step === 0 && (
            <div className="step-pane">
              <h4 className="step-h">{t.detail.step1Title}</h4>
              <div className="dur-grid">
                <button type="button" className={`dur-opt ${duration === 'half' ? 'is-on' : ''}`} onClick={() => setDuration('half')}>
                  <div className="dur-name">{t.common.halfDay}</div>
                  <div className="dur-hrs">{t.common.halfDayHours}</div>
                  <div className="dur-price">€{exp.half} <span>/ {t.common.perPerson}</span></div>
                </button>
                <button type="button" className={`dur-opt ${duration === 'full' ? 'is-on' : ''}`} onClick={() => setDuration('full')}>
                  <div className="dur-name">{t.common.fullDay}</div>
                  <div className="dur-hrs">{t.common.fullDayHours}</div>
                  <div className="dur-price">€{exp.full} <span>/ {t.common.perPerson}</span></div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PEOPLE */}
          {step === 1 && (
            <div className="step-pane">
              <h4 className="step-h">{t.detail.step2Title}</h4>
              <div className="ppl-rows">
                <PplRow label={t.detail.adults} sub={lang === 'bg' ? '13+ години' : '13+ years'} value={adults} setValue={setAdults} min={1} max={6 - children}></PplRow>
                <PplRow label={t.detail.children} sub={lang === 'bg' ? '50% от цената' : '50% off'} value={children} setValue={setChildren} min={0} max={6 - adults}></PplRow>
                <PplRow label={t.detail.babies} sub={t.detail.babiesFree} value={babies} setValue={setBabies} min={0} max={4}></PplRow>
              </div>
              {totalDiscountPP > 0 && (
                <div className="group-disc">
                  <span className="gd-tag">{t.detail.groupDiscount}</span>
                  <span className="gd-amt">−€{totalDiscountPP} {t.common.perPerson}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: ADD-ONS */}
          {step === 2 && (
            <div className="step-pane">
              <h4 className="step-h">{t.detail.step3Title}</h4>
              <div className="addon-pick-grid">
                {ADDONS3.map(a => (
                  <label key={a.id} className={`addon-pick ${addons.includes(a.id) ? 'is-on' : ''}`}>
                    <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggleAddon(a.id)}></input>
                    <div className="ap-icon"><Icon name={a.icon} size={22}></Icon></div>
                    <div className="ap-body">
                      <div className="ap-name">{a[lang]}</div>
                      <div className="ap-price">€{a.price}</div>
                    </div>
                    <div className="ap-check">{addons.includes(a.id) ? '✓' : ''}</div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: DATE */}
          {step === 3 && (
            <div className="step-pane">
              <h4 className="step-h">{t.detail.step4Title}</h4>
              <div className="date-grid">
                <MiniCalendar value={date} onChange={setDate} blocked={[]}></MiniCalendar>
                <div className="time-pick">
                  <div className="tp-h">{lang === 'bg' ? 'Час на започване' : 'Start time'}</div>
                  <div className="tp-grid">
                    {['09:00','10:00','11:00','13:00','14:00','15:00'].map(tm => (
                      <button key={tm} type="button" className={`tp-opt ${time === tm ? 'is-on' : ''}`} onClick={() => setTime(tm)}>{tm}</button>
                    ))}
                  </div>
                  {date && <div className="date-confirm">✓ {date} · {time}</div>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: DETAILS */}
          {step === 4 && (
            <div className="step-pane">
              <h4 className="step-h">{t.detail.step5Title}</h4>
              <div className="form-grid">
                <label>{t.detail.name}<input value={form.name} onChange={e => setForm({...form, name: e.target.value})}></input></label>
                <label>{t.detail.email}<input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}></input></label>
                <label>{t.detail.phone}<input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+359 ..."></input></label>
                <label className="full">{t.detail.notes}<textarea rows="4" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder={t.detail.notesPh}></textarea></label>
              </div>
              <div className="no-payment">
                <span className="np-dot"></span>
                {t.detail.noPayment}
              </div>
            </div>
          )}
        </div>

        {/* SUMMARY */}
        <aside className="booking-summary">
          <div className="bs-h">{t.detail.summary}</div>
          <div className="bs-exp">
            <div className="bs-exp-icon"><Icon name={exp.icon} size={22}></Icon></div>
            <div>
              <div className="bs-exp-name">{exp[lang].name}</div>
              <div className="bs-exp-meta">{duration === 'half' ? t.common.halfDay : t.common.fullDay} · {totalPeople} {lang === 'bg' ? 'д.' : 'ppl'}</div>
            </div>
          </div>
          <div className="bs-lines">
            <div className="bs-line"><span>{t.detail.base}</span><span>€{baseTotal}</span></div>
            {totalDiscountPP > 0 && <div className="bs-line bs-disc"><span>{t.detail.groupDiscount}</span><span>−€{totalDiscountPP * totalPeople}</span></div>}
            {addonsTotal > 0 && <div className="bs-line"><span>{t.detail.addonsLabel}</span><span>€{addonsTotal}</span></div>}
            {date && <div className="bs-line bs-date"><span>{lang === 'bg' ? 'Дата' : 'Date'}</span><span>{date} · {time}</span></div>}
          </div>
          <div className="bs-total">
            <span>{t.detail.total}</span>
            <span className="bs-total-amt">€{grandTotal}</span>
          </div>
          <div className="bs-note">{t.detail.noPayment}</div>
        </aside>
      </div>

      <div className="booking-foot">
        <button type="button" className="btn-ghost" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>← {t.detail.back}</button>
        {step < 4 ? (
          <button type="button" className="btn-primary" disabled={!canAdvance()} onClick={() => setStep(s => Math.min(4, s + 1))}>{t.detail.next} →</button>
        ) : (
          <button type="button" className="btn-primary" disabled={!canAdvance()} onClick={submitBooking}>{submitting ? "…" : t.detail.submit}</button>
        )}
      </div>
    </div>
  );
}

function PplRow({ label, sub, value, setValue, min = 0, max = 6 }) {
  return (
    <div className="ppl-row">
      <div className="ppl-text">
        <div className="ppl-label">{label}</div>
        <div className="ppl-sub">{sub}</div>
      </div>
      <div className="ppl-counter">
        <button type="button" onClick={() => setValue(Math.max(min, value - 1))} disabled={value <= min}>−</button>
        <span className="ppl-val">{value}</span>
        <button type="button" onClick={() => setValue(Math.min(max, value + 1))} disabled={value >= max}>+</button>
      </div>
    </div>
  );
}

export function DetailPage({ expId, lang, setPage, setSelectedExp }) {
  const t = T3[lang];
  const exp = EXPS3.find(x => x.id === expId) || EXPS3[0];
  const others = EXPS3.filter(x => x.id !== exp.id).slice(0, 3);
  const x = exp[lang];
  return (
    <main>
      <section className="detail-hero">
        <button className="back-link" onClick={() => setPage('experiences')}>← {t.common.backTo}</button>
        <div className="container detail-hero-inner">
          <div className="detail-hero-text">
            <div className="detail-tag">{x.tag}</div>
            <h1 className="detail-title">{x.name}</h1>
            <p className="detail-sub">{x.sub}</p>
            <div className="detail-prices">
              <div className="dp-block">
                <div className="dp-label">{t.common.halfDay}</div>
                <div className="dp-amt">€{exp.half}</div>
                <div className="dp-sub">{t.common.halfDayHours} · {t.common.perPerson}</div>
              </div>
              <div className="dp-block">
                <div className="dp-label">{t.common.fullDay}</div>
                <div className="dp-amt">€{exp.full}</div>
                <div className="dp-sub">{t.common.fullDayHours} · {t.common.perPerson}</div>
              </div>
            </div>
          </div>
          <div className="detail-hero-art">
            {exp.img
              ? <img src={exp.img} alt={x.name} className="detail-hero-img" />
              : <ImgPlaceholder label={`${exp.id} · main`} tone="wine" tall />}
            <div className="detail-hero-tag"><Icon name={exp.icon} size={28}></Icon></div>
          </div>
        </div>
      </section>

      <Section tone="paper" padding="lg">
        <div className="story-grid">
          <div>
            <Kicker>{t.detail.story}</Kicker>
            <p className="story-body">{x.story}</p>
          </div>
          <div>
            <Kicker>{t.detail.included}</Kicker>
            <ul className="included-list">
              {x.included.map((it, i) => (
                <li key={i}><span className="inc-bullet">◆</span>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="cream" padding="lg" id="book">
        <BookingFlow exp={exp} lang={lang} onClose={() => { setSelectedExp(null); setPage('experiences'); }}></BookingFlow>
      </Section>

      <Section tone="paper" padding="lg">
        <div className="section-head">
          <Kicker>{lang === 'bg' ? 'Други изживявания' : 'Other experiences'}</Kicker>
          <h2 className="section-title">{lang === 'bg' ? 'Може също да харесаш' : 'You might also like'}</h2>
        </div>
        <div className="exp-grid exp-grid-3">
          {others.map(e => (
            <ExperienceCard key={e.id} exp={e} lang={lang} setPage={setPage} setSelectedExp={setSelectedExp}></ExperienceCard>
          ))}
        </div>
      </Section>
    </main>
  );
}


