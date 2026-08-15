# Profile Environmental Support Services - Implementation Plan

## Migration Manifest

### Content Discovered from https://www.profilegroups.com/

**Contact Information (Set B - Latest):**
- Email: info@environmentalservices.ca
- Phone: 1-800-251-0034
- Facebook: https://www.facebook.com/profile.php?id=100063455592689

**Jotform Links:**
- Request for Quote: https://www.jotform.com/242300808333245
- Cleaning Evaluation Calculator: https://form.jotform.com/242406303717248

**Key Content:**
- Tagline: "Your Facility Impacts Your Customers Experience"
- Focus on workplace hygiene and absenteeism costs
- Reference to restroom cleanliness study (71% of tenants)
- Assessment calculator for evaluating current cleaning services

**Routes Found:**
- Home, About, Services, Markets, Contact Us, FAQ, E-Store

**Status:** ✅ NEEDS_CLIENT_CONFIRMATION flag added for all contact data

---

## Project Architecture

### Technology Stack
- Next.js 14 (App Router) + TypeScript
- React 18 + Tailwind CSS 3.4
- MongoDB + Mongoose
- NextAuth.js (Auth.js)
- Argon2 for password hashing
- Zod validation
- React Hook Form
- GSAP + ScrollTrigger + Framer Motion
- TipTap rich text editor
- Vitest + Playwright

### File Structure
```
profile-environmental/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx (Home)
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── markets/
│   │   │   ├── offers/
│   │   │   ├── faq/
│   │   │   ├── booking/
│   │   │   ├── shop/
│   │   │   ├── resources/
│   │   │   ├── calculator/
│   │   │   ├── contact/
│   │   │   └── layout.tsx
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── markets/
│   │   │   ├── offers/
│   │   │   ├── gallery/
│   │   │   ├── testimonials/
│   │   │   ├── faqs/
│   │   │   ├── resources/
│   │   │   ├── products/
│   │   │   ├── blog/
│   │   │   ├── inquiries/
│   │   │   ├── media/
│   │   │   ├── integrations/
│   │   │   ├── settings/
│   │   │   ├── users/
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── admin/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── public/
│   │   ├── admin/
│   │   └── shared/
│   ├── lib/
│   │   ├── db/
│   │   ├── models/
│   │   ├── services/
│   │   ├── validation/
│   │   ├── auth/
│   │   └── utils/
│   ├── styles/
│   └── types/
├── public/
│   └── uploads/
├── scripts/
│   └── seed.ts
└── tests/
```

## Implementation Phases

### Phase 1: Foundation ✓
- Project initialization
- Design system & color tokens
- Typography setup
- Base components

### Phase 2: Database Layer ✓
- MongoDB models
- Validation schemas
- Repository pattern
- Seed scripts

### Phase 3: Authentication ✓
- NextAuth setup
- Admin user creation
- Protected routes
- Authorization helpers

### Phase 4: Public Routes ✓
- All public pages
- Dynamic routes
- SEO optimization
- Responsive layouts

### Phase 5: Motion & Interactions ✓
- Cinematic intro
- GSAP animations
- Scroll effects
- Page transitions

### Phase 6: Admin Portal ✓
- Complete CRUD interfaces
- Media management
- Content editors
- Settings management

### Phase 7: Integrations ✓
- Jotform embeds
- WhatsApp actions
- Contact forms
- Lead capture

### Phase 8: Testing & Deployment ✓
- Unit tests
- E2E tests
- Performance optimization
- Deployment docs

## Color System
- Deep Ink Navy: #071C33
- Profile Blue: #2F8FEA
- Electric Cyan: #49C7F5
- Clean Aqua: #DDF7F5
- Soft Ice: #F4F9FC
- Pure White: #FFFFFF
- Graphite: #17212B
- Fresh Mint: #41B883
- Warm Amber: #F5A623

## Data Models
1. SiteSettings (singleton)
2. Page (Home, About, etc.)
3. PageSection (typed sections)
4. Service (4 confirmed services)
5. Market (7 market segments)
6. Offer (Trial, Consulting, Training, Manual)
7. FAQ, FAQCategory
8. Resource (PDFs)
9. Product, ProductCategory
10. Gallery, GalleryImage
11. Testimonial
12. BlogPost
13. Inquiry (leads)
14. MediaAsset
15. AdminUser
16. Integration
17. AuditLog

## Accessibility Requirements
- WCAG 2.2 AA compliance
- Full keyboard navigation
- Screen reader support
- Focus management
- Reduced motion support
- High contrast ratios
- Semantic HTML

## Performance Targets
- Lighthouse score 90+
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1
- Optimized images (next/image)
- Code splitting
- Font optimization

## Security Measures
- Argon2 password hashing
- httpOnly secure cookies
- Rate limiting
- CSRF protection
- Input sanitization
- File validation
- No secrets in code
- Safe object access
