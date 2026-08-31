# Admin CMS — Cursor Build Prompt

Use this prompt in Cursor to continue building or refining the Profile Environmental admin panel.

---

## Project Context

- **Stack:** Next.js 14 App Router, TypeScript, Tailwind, MongoDB/Mongoose, NextAuth (credentials)
- **Public site:** Profile Environmental Support Services (`/`, `/about`, `/services`, `/gallery`, `/testimonials`, `/faq`, `/contact`)
- **Admin:** `/admin/login` → `/admin/dashboard`
- **No blogs.** Pricing = shop product `priceLabel` fields.

## Admin Sidebar (required)

1. Dashboard — site stats overview
2. Pages — home, about, services, gallery, testimonials, faqs, contact
3. Services — list all services; edit listing + detail page (two tabs)
4. Pricing — shop product price labels
5. Gallery — categories + images per category
6. Testimonials — CRUD with name, company, quote, photo
7. FAQs — CRUD question/answer/category
8. Settings — contact info, social links → updates Footer + Contact page

## Image Upload (serverless / Vercel)

**Do NOT write to `public/uploads` in production.**

- `POST /api/upload` — admin auth, FormData `file` + `folder` (`products|gallery|pages|misc`), max 8MB, jpeg/png/webp/gif
- Store in MongoDB `StoredUpload` collection (folder, filename, mimeType, size, data Buffer)
- `GET /api/uploads/[folder]/[filename]` — stream with Cache-Control
- `LocalImageField` component — preview, upload, replace, remove
- Persist only URL string `/api/uploads/{folder}/{filename}` on content docs
- `deleteUploadByUrl()` when replacing/removing images
- Legacy `/uploads/...` → placeholder via `resolveImageUrl()`
- Next.js `<Image unoptimized={url.startsWith('/api/uploads/')} />`

## Pages CMS

- Model: `Page` with `slug` + `sections[]` (name, type, heading, content, imageUrl, eyebrow, ctaLabel, order, enabled)
- Defaults: `src/lib/data/pageDefaults.ts`
- Merge: `getManagedPage(slug)` — DB overrides defaults by section `name`
- Admin: `/admin/pages` list → `/admin/pages/[slug]` section-by-section editor with `LocalImageField` per image section

### Page section types

| Page | Sections |
|------|----------|
| Home | Hero, Facts Sidebar, Gallery 1–5, Absenteeism, Assessment, images |
| About | Hero, Excellence intro (+ more via defaults) |
| Services | Hero only (listing page) |
| Gallery | Hero |
| Testimonials | Hero |
| FAQs | Hero |
| Contact | Hero |

## Services CMS

- Catalog: `src/lib/data/services.ts` (slugs fixed)
- DB `Service` overrides catalog fields per slug
- Admin `/admin/services` → `/admin/services/[slug]`
- **Tab 1 — Listing:** title, excerpt, description HTML, `imageUrl` (services grid card)
- **Tab 2 — Detail:** `heroImageUrl`, challenge, approach, `detailSections[]` (heading, content, imageUrl)
- API: `PUT /api/admin/services/by-slug/[slug]` upsert

## Gallery CMS

- Models: `GalleryCategory`, `GalleryImage`
- Admin: categories list → category detail with image CRUD
- Public: `/gallery` page grouped by category

## Testimonials CMS

- Model: `Testimonial`
- Public: `/testimonials` — hero from Page CMS + `TestimonialsSlider`
- Admin: full CRUD

## FAQs CMS

- Model: `FAQ` (existing)
- Public `/faq` — hero from Page CMS + accordion list
- Admin: CRUD

## Settings CMS

- Model: `SiteSettings` (singleton)
- Fields: brandName, primaryEmail, primaryPhone, whatsappNumber, address, social URLs, footerDescription
- Public layout already loads settings for Header/Footer
- Contact page reads `SiteSettings` from DB

## Auth

- `requireAdminApi()` for API routes (admin + editor roles)
- NextAuth credentials against `AdminUser`
- Seed: `npm run seed` → `admin@profilegroups.com` / `Admin@123`

## Files Already Created

```
src/lib/models/StoredUpload.ts
src/lib/models/GalleryCategory.ts
src/lib/models/GalleryImage.ts
src/lib/uploads/constants.ts
src/lib/uploads/deleteUpload.ts
src/lib/auth/adminApi.ts
src/lib/data/pageDefaults.ts
src/lib/services/getPageContent.ts
src/app/api/upload/route.ts
src/app/api/uploads/[folder]/[filename]/route.ts
src/app/api/admin/**/*
src/components/admin/LocalImageField.tsx
src/components/admin/AdminShell.tsx
src/app/admin/pages/**, services/**, gallery/**, testimonials/**, faqs/**, settings/**, pricing/**
```

## Remaining Work (for Cursor)

1. Wire **Home page** (`HomeTopSection`) to `getManagedPage('home')` sections
2. Wire **About page** to `getManagedPage('about')` sections
3. Wire **Services listing hero** to `getManagedPage('services')`
4. Add **middleware** protecting `/admin/*` except `/admin/login`
5. **Seed script** — default Page docs, gallery categories, sample testimonials
6. **Rich text editor** (TipTap) for service `description` HTML
7. **Service create/delete** for new slugs (optional — catalog is fixed today)
8. **Dashboard** — add counts for pages, gallery images, testimonials
9. **E2E tests** for upload + admin save flows

## Acceptance Criteria

- [ ] Admin can log in at `/admin/login`
- [ ] All sidebar links work (no 404)
- [ ] Page sections save to MongoDB and reflect on public site after refresh
- [ ] Image upload works on Vercel (MongoDB storage, not disk)
- [ ] Service listing + detail edits appear on `/services` and `/services/[slug]`
- [ ] Gallery categories/images manageable; `/gallery` displays them
- [ ] Testimonials slider on `/testimonials` from DB
- [ ] FAQs editable in admin; `/faq` shows updates
- [ ] Settings change phone/email in Footer and Contact page

---

Copy the sections above into a new Cursor chat to continue implementation.
