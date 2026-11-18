# EnjoyWien — production сайт

Next.js 15 (App Router) · статично генерирани страници · BG на root, EN на `/en` · booking + contact API през Resend.

## Пускане live (≈20 минути)

### 1. GitHub (5 мин)
```bash
cd enjoywien-site
git init && git add -A && git commit -m "EnjoyWien v1"
# създай празно repo в github.com, после:
git remote add origin https://github.com/ТВОЯ_АКАУНТ/enjoywien.git
git push -u origin main
```

### 2. Vercel (5 мин)
1. vercel.com → Sign up with GitHub
2. Add New → Project → избери repo-то → Deploy (нищо не пипаш, Next.js се разпознава автоматично)
3. Settings → Domains → добави `enjoywien.com` → Vercel ти дава DNS записи (A запис + CNAME за www) → въведи ги при регистратора на домейна

### 3. Resend — имейлите за заявки (5 мин)
1. resend.com → безплатен акаунт → API Keys → създай ключ
2. Domains → Add `enjoywien.com` → добави дадените DNS записи (SPF/DKIM) при регистратора
3. Във Vercel: Settings → Environment Variables:
   - `RESEND_API_KEY` = ключът
   - `BOOKING_TO_EMAIL` = пощата, на която искаш заявките (може личната ти в началото)
   - `BOOKING_FROM_EMAIL` = `EnjoyWien <booking@enjoywien.com>` (след верификация на домейна)
4. Redeploy (Deployments → ⋯ → Redeploy)

**Без ключ сайтът пак работи** — заявките се виждат във Vercel → Logs, не се губят.

### 4. booking@enjoywien.com като пощенска кутия (по избор)
Изпращането става през Resend. За **получаване** — най-бързо: email forwarding при регистратора на домейна (безплатно при почти всички) → препраща към личната поща. По-късно: Zoho Mail free / Google Workspace.

## Какво да смениш преди старта
- **WhatsApp номер**: `components/shell.jsx` → потърси `+43 660 600 3759`
- **Снимки**: всички изображения са placeholder-и (`ImgPlaceholder` в компонентите) — заменяш с реални снимки, когато са готови
- **Отзивите** в `lib/data.js` са примерни от дизайна — смени ги с реалните от бета изживяванията

## Структура
```
app/            → routes (BG на root, EN под /en), API, sitemap, robots
components/     → shell (Header/Footer/UI), pages, detail (booking wizard), навигация
lib/data.js     → цялото съдържание: преводи, изживявания, цени, отстъпки, FAQ
lib/email.js    → Resend изпращане
```
Всички цени/текстове се редактират на едно място — `lib/data.js`.

## Фаза 2 (когато си готов)
Supabase резервации + блокирани дати, админ панел, Google Calendar sync — архитектурата го позволява без пренаписване (API routes вече са отделени).
