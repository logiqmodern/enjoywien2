// Изпращане на имейли през Resend REST API.
// Без RESEND_API_KEY заявките се логват (видими във Vercel logs) и не се губят мълчаливо.
const RESEND_URL = 'https://api.resend.com/emails';

export async function sendEmail({ to, subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL || 'EnjoyWien <onboarding@resend.dev>';
  if (!key) {
    console.warn('[email] RESEND_API_KEY not set — logging instead of sending:', { to, subject });
    console.log(html);
    return { logged: true };
  }
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, html, reply_to: replyTo }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error('[email] Resend error', res.status, body);
    throw new Error(`Resend ${res.status}`);
  }
  return res.json();
}

export function esc(s = '') {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
