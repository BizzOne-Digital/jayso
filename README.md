# Profile Environmental Support Services

A complete, production-ready lead-generation website and CMS-style admin portal for Profile Environmental Support Services.

## 🚀 Features

### Public Website
- **Cinematic Intro** - Premium first-visit animation with skip option
- **Responsive Design** - Mobile-first, optimized for all devices
- **Modern Motion** - GSAP + Framer Motion animations
- **SEO Optimized** - Server-side rendering, metadata, sitemap
- **Accessibility** - WCAG 2.2 AA compliant, keyboard navigation
- **Lead Generation** - Multiple CTAs, contact forms, WhatsApp integration

### Services
- Infection Prevention Control
- Sustainability
- Steam Cleaning
- Green Cleaning

### Markets
- Office Buildings & Corporate Offices
- Medical & Healthcare Facilities
- Retail & Commercial Stores
- Industrial & Warehousing
- Property Management Companies
- Hospitality
- Educational Facilities

### Special Offers
- One-Month Trial
- Housekeeping Department Setup Consulting
- Staff Training Programs
- Custom Cleaning Manual Creation

### Admin Portal
- Dashboard with real-time statistics
- Complete CRUD for all content
- Services & Markets management
- Inquiries management
- Products & Resources
- Settings & Integrations
- User management
- Secure authentication

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- MongoDB (local or Atlas)
- MongoDB Compass (optional, for database inspection)

## 🛠️ Installation

1. **Clone and Install**
```bash
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
MONGODB_URI=mongodb://localhost:27017/profile-environmental
NEXTAUTH_SECRET=your-secret-key-min-32-chars-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

3. **Start MongoDB**
- Local: Ensure MongoDB service is running
- Atlas: Use your connection string in `MONGODB_URI`

4. **Seed Database**
```bash
npm run seed
```

This creates:
- Admin user: `admin@profilegroups.com` / `Admin@123`
- 4 Services
- 7 Markets
- 4 Offers
- 8 FAQs
- 3 Products
- 3 Resources
- Site settings with contact info

5. **Start Development Server**
```bash
npm run dev
```

Visit http://localhost:3000

## 🔐 Admin Access

- URL: http://localhost:3000/admin/login
- Email: `admin@profilegroups.com`
- Password: `Admin@123`

**⚠️ IMPORTANT: Change these credentials immediately in production!**

## 📁 Project Structure

```
profile-environmental/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── markets/
│   │   │   ├── booking/
│   │   │   ├── shop/
│   │   │   ├── resources/
│   │   │   ├── calculator/
│   │   │   ├── contact/
│   │   │   └── faq/
│   │   ├── admin/             # Admin portal
│   │   │   ├── dashboard/
│   │   │   ├── services/
│   │   │   ├── markets/
│   │   │   ├── inquiries/
│   │   │   └── settings/
│   │   ├── api/               # API routes
│   │   │   ├── auth/
│   │   │   └── inquiries/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── public/            # Public components
│   │   ├── admin/             # Admin components
│   │   └── shared/            # Shared components
│   ├── lib/
│   │   ├── db/                # Database connection
│   │   ├── models/            # Mongoose models
│   │   ├── auth/              # Authentication
│   │   └── utils/             # Utilities
│   ├── styles/
│   └── types/
├── public/
│   └── uploads/               # Local file uploads (dev only)
├── scripts/
│   └── seed.ts                # Database seeding
└── tests/
```

## 🎨 Design System

### Colors
- **Deep Ink Navy** `#071C33` - Dark surfaces
- **Profile Blue** `#2F8FEA` - Primary brand
- **Electric Cyan** `#49C7F5` - Highlights
- **Clean Aqua** `#DDF7F5` - Sustainability
- **Soft Ice** `#F4F9FC` - Backgrounds
- **Graphite** `#17212B` - Body text
- **Fresh Mint** `#41B883` - Success/sustainability
- **Warm Amber** `#F5A623` - Offer badges

### Typography
- **Display**: Space Grotesk (headings)
- **Body**: Inter (content, UI)

## 📞 Contact Information

**⚠️ REQUIRES CLIENT CONFIRMATION**

The system contains two contact sets. Set B is configured as provisional:

**Primary Contact (Set B - Latest)**
- Email: info@environmentalservices.ca
- Phone: 1-800-251-0034
- Facebook: https://www.facebook.com/profile.php?id=100063455592689

**Alternate (Set A - Original)**
- Email: info@profilegroups.com
- Phone: 647-703-2900

**Update in Admin Portal**: Go to Admin → Settings to confirm/update contact information.

## 🔗 Integrations

### Jotform
- Calculator: https://form.jotform.com/242406303717248
- Booking: https://www.jotform.com/242300808333245

**Configure in**: Admin → Settings → Integrations

### WhatsApp
Set phone number in Admin → Settings

### Social Media
- Facebook configured
- LinkedIn, Twitter, Instagram - add in Admin → Settings

## 📦 File Storage

### Development
- Local uploads to `public/uploads/`
- **WARNING**: Not persistent on Vercel deployment

### Production
Use Vercel Blob or S3-compatible storage:

1. Install Vercel Blob:
```bash
npm install @vercel/blob
```

2. Add to `.env`:
```env
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

3. Get token from Vercel dashboard → Storage → Blob

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy on Vercel**
- Import your GitHub repository
- Add environment variables:
  - `MONGODB_URI` (use MongoDB Atlas)
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL` (your production URL)
  - `BLOB_READ_WRITE_TOKEN`

3. **MongoDB Atlas Setup**
- Create cluster at mongodb.com/cloud/atlas
- Whitelist Vercel IPs (0.0.0.0/0 for all)
- Get connection string
- Replace `MONGODB_URI` in Vercel

4. **Run Seed on Production**
```bash
# SSH into Vercel or run locally with production DB
MONGODB_URI=your-atlas-uri npm run seed
```

## 🧪 Testing

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Unit tests
npm test

# E2E tests
npm run test:e2e
```

## 📈 Performance

- Target: Lighthouse 90+ score
- Image optimization with next/image
- Font optimization with next/font
- Code splitting and lazy loading
- Server-side rendering

## ♿ Accessibility

- WCAG 2.2 AA compliant
- Keyboard navigation
- Screen reader support
- Skip links
- Focus management
- Reduced motion support
- Semantic HTML
- ARIA labels

## 🔒 Security

- Argon2 password hashing
- HttpOnly secure cookies
- CSRF protection
- Input sanitization
- File validation
- Rate limiting (recommended for production)
- No secrets in code

## 📝 Content Management

### Admin Portal Features
- **Dashboard**: Overview, stats, recent inquiries
- **Services**: Full CRUD, rich text editor
- **Markets**: Manage market segments
- **Offers**: Special offers and promotions
- **FAQs**: Categorized Q&A
- **Resources**: PDF uploads and management
- **Products**: Catalog management
- **Inquiries**: Lead management
- **Settings**: Site-wide configuration
- **Integrations**: Jotform, WhatsApp, analytics

### Updating Contact Information
1. Log in to Admin Portal
2. Go to Settings
3. Update Primary Email, Phone, WhatsApp
4. Save changes
5. Contact info updates across: Header, Footer, Contact page, Mobile action bar, Schema markup

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
# Windows: Services → MongoDB Server
# Mac/Linux: sudo systemctl status mongod

# Test connection
mongosh mongodb://localhost:27017
```

### Seed Fails
```bash
# Clear database and re-seed
# Connect to MongoDB and drop database, then:
npm run seed
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Image Upload Issues
- Development: Check `public/uploads/` exists and is writable
- Production: Ensure Vercel Blob is configured with valid token

## 📚 Additional Documentation

See also:
- `IMPLEMENTATION_PLAN.md` - Full technical plan
- `CLIENT_CONFIRMATION_REQUIRED.md` - Items needing client review
- `.env.example` - Environment variables reference

## 🤝 Support

For questions or issues:
1. Check this README
2. Review implementation plan
3. Check MongoDB connection
4. Verify environment variables
5. Check browser console for errors

## 📄 License

Proprietary - Profile Environmental Support Services

## ✅ Launch Checklist

Before going live:

- [ ] Update admin credentials
- [ ] Confirm contact information
- [ ] Configure MongoDB Atlas
- [ ] Set up Vercel Blob storage
- [ ] Add real testimonials (currently draft)
- [ ] Upload actual PDF resources
- [ ] Configure analytics (optional)
- [ ] Test all forms
- [ ] Test all CTAs
- [ ] Run Lighthouse audit
- [ ] Test on mobile devices
- [ ] Verify accessibility
- [ ] Set up backups
- [ ] Configure domain DNS
- [ ] Enable HTTPS
- [ ] Add sitemap to Google Search Console

---

Built with Next.js 14, TypeScript, MongoDB, Tailwind CSS, GSAP, and Framer Motion.
