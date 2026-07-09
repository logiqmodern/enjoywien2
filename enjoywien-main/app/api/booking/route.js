import { sendEmail, esc } from '@/lib/email';

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return Response.json({ ok: false }, { status: 400 }); }

  const { name, email, phone, experience, date } = b;
  if (!name || !email || !phone || !experience) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const owner = process.env.BOOKING_TO_EMAIL || 'booking@enjoywien.com';
  const dur = b.duration === 'full' ? 'Целодневно (6–8 ч.)' : 'Полудневно (3–4 ч.)';
  const rows = [
    ['Изживяване', b.experience],
    ['Формат', dur],
    ['Дата', b.date || '—'],
    ['Възрастни', b.adults], ['Деца 6–12', b.children], ['Под 6 г.', b.babies],
    ['Добавки', (b.addons || []).join('; ') || '—'],
    ['Цена възрастен', `€${b.adultPrice}`], ['Общо', `€${b.total}`],
    ['Име', b.name], ['Имейл', b.email], ['Телефон', b.phone],
    ['Бележки', b.notes || '—'], ['Език', b.lang],
  ].map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`).join('');

  try {
    // 1) До собственика
    await sendEmail({
      to: owner,
      replyTo: b.email,
      subject: `Нова заявка: ${b.experience} · ${b.date || 'без дата'} · €${b.total}`,
      html: `<h2 style="font-family:Georgia,serif">Нова заявка за резервация</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    });
    // 2) Потвърждение до клиента
    const bg = b.lang !== 'en';
    await sendEmail({
      to: b.email,
      replyTo: owner,
      subject: bg ? 'EnjoyWien — получихме заявката ти' : 'EnjoyWien — we received your request',
      html: bg
        ? `<div style="font-family:Georgia,serif;max-width:520px"><h2>Благодаря, ${esc(b.name)}!</h2><p>Получих заявката ти за <strong>${esc(b.experience)}</strong> (${dur})${b.date ? ` на <strong>${esc(b.date)}</strong>` : ''} — обща сума <strong>€${esc(b.total)}</strong>.</p><p>Ще ти пиша лично в рамките на 24 часа, за да потвърдим детайлите. Няма нужда от плащане на този етап.</p><p>До скоро във Виена,<br/>Маги · EnjoyWien</p></div>`
        : `<div style="font-family:Georgia,serif;max-width:520px"><h2>Thank you, ${esc(b.name)}!</h2><p>I received your request for <strong>${esc(b.experience)}</strong> (${b.duration === 'full' ? 'full day' : 'half day'})${b.date ? ` on <strong>${esc(b.date)}</strong>` : ''} — total <strong>€${esc(b.total)}</strong>.</p><p>I will write to you personally within 24 hours to confirm the details. No payment is needed at this stage.</p><p>See you in Vienna,<br/>Magi · EnjoyWien</p></div>`,
    });
  } catch (e) {
    console.error('[booking] email failed', e);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
