import { sendEmail, esc } from '@/lib/email';

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return Response.json({ ok: false }, { status: 400 }); }
  if (!b.name || !b.email || !b.message) return Response.json({ ok: false }, { status: 400 });

  const owner = process.env.BOOKING_TO_EMAIL || 'booking@enjoywien.com';
  try {
    await sendEmail({
      to: owner,
      replyTo: b.email,
      subject: `Запитване от сайта: ${b.name}`,
      html: `<p><strong>${esc(b.name)}</strong> · ${esc(b.email)} · език: ${esc(b.lang)}</p><p style="white-space:pre-wrap">${esc(b.message)}</p>`,
    });
  } catch (e) {
    console.error('[contact] email failed', e);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
