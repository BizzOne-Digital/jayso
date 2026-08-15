# Quick Start Guide

Get Profile Environmental Support Services website running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas account)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This installs Next.js, React, MongoDB, authentication, and all required packages.

### 2. Set Up Environment

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# Use local MongoDB (easiest for development)
MONGODB_URI=mongodb://localhost:27017/profile-environmental

# Or use MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/profile-environmental

# Generate secret: openssl rand -base64 32
NEXTAUTH_SECRET=your-32-char-secret-here

# Local development URL
NEXTAUTH_URL=http://localhost:3000

NODE_ENV=development
```

### 3. Start MongoDB

**Windows:**
```bash
# MongoDB should start automatically as a service
# Check in Services app
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas** (cloud - no local install needed):
1. Sign up at mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Use in MONGODB_URI

### 4. Seed Database

```bash
npm run seed
```

This creates:
- ✅ Admin user (admin@profilegroups.com / Admin@123)
- ✅ 4 Services
- ✅ 7 Markets
- ✅ 4 Offers
- ✅ 8 FAQs
- ✅ Sample products, resources, and settings

### 5. Start Development Server

```bash
npm run dev
```

Website will be available at:
- **Public site**: http://localhost:3000
- **Admin portal**: http://localhost:3000/admin/login

## Admin Access

**Email**: admin@profilegroups.com  
**Password**: Admin@123

⚠️ **Change this password immediately in production!**

## First Steps After Login

1. **Update Settings**
   - Admin → Settings
   - Confirm contact information (currently flagged for review)
   - Update logo if different

2. **Review Content**
   - Admin → Services (review and update descriptions)
   - Admin → Markets (review market information)
   - Admin → Offers (confirm offer terms)
   - Admin → FAQs (expand with more questions)

3. **Add Real Media**
   - Admin → Gallery (upload company photos)
   - Replace stock photos throughout site

4. **Test Forms**
   - Submit test inquiry via Booking page
   - Check Admin → Inquiries to see it

## Project Structure

```
profile-environmental/
├── src/
│   ├── app/
│   │   ├── (public)/    # Public website pages
│   │   ├── admin/       # Admin portal
│   │   └── api/         # API endpoints
│   ├── components/      # React components
│   ├── lib/            # Database, models, utilities
│   └── styles/         # Global styles
├── public/             # Static files
├── scripts/            # Database seeds
└── tests/             # Test files
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run seed         # Seed database

# Code Quality
npm run lint         # Check code
npm run type-check   # TypeScript check

# Testing
npm test            # Run tests
npm run test:e2e    # Run E2E tests
```

## Key Features

### Public Website
- Homepage with cinematic intro
- Services (4 pre-configured)
- Markets (7 industry segments)
- Booking/Contact forms
- Jotform calculator integration
- WhatsApp integration
- Product catalog
- Resource library
- FAQ section

### Admin Portal
- Dashboard with statistics
- Complete content management
- Inquiry/lead management
- File uploads
- Settings management
- User management

## Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'deep-navy': '#071C33',
  'profile-blue': '#2F8FEA',
  // ... add your colors
}
```

### Update Logo
1. Go to Admin → Settings
2. Upload new logo file
3. Or update `src/components/shared/Logo.tsx`

### Modify Services
Admin → Services → Edit/Add

### Add Pages
Create files in `src/app/(public)/your-page/page.tsx`

## Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB is running
# Windows: Check Services app
# Mac: brew services list
# Linux: sudo systemctl status mongod
```

### Port 3000 Already in Use
```bash
# Kill process on port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Can't Login to Admin
1. Verify seed ran successfully
2. Check console for errors
3. Verify NEXTAUTH_SECRET is set in .env
4. Re-run seed: `npm run seed`

## Next Steps

1. **Read Full Documentation**
   - README.md - Complete documentation
   - CLIENT_CONFIRMATION_REQUIRED.md - Items needing review
   - DEPLOYMENT_GUIDE.md - Production deployment

2. **Customize Content**
   - Update all service descriptions
   - Add company information
   - Upload real photos
   - Add testimonials

3. **Test Everything**
   - Submit forms
   - Test all pages
   - Check mobile responsiveness
   - Verify accessibility

4. **Prepare for Launch**
   - Change admin password
   - Confirm contact information
   - Upload real media
   - Configure integrations

## Getting Help

- Check README.md for detailed docs
- Review code comments
- Check browser console for errors
- Verify environment variables

## Demo Accounts

**Admin Portal:**
- Email: admin@profilegroups.com
- Password: Admin@123

## Important Files

- `.env` - Environment configuration
- `src/lib/models/` - Database schemas
- `src/app/(public)/` - Public pages
- `src/app/admin/` - Admin pages
- `src/components/` - Reusable components

## Environment Variables

```env
MONGODB_URI           # Database connection
NEXTAUTH_SECRET       # Auth encryption key
NEXTAUTH_URL          # Your site URL
BLOB_READ_WRITE_TOKEN # File storage (production)
```

## Verification Checklist

After setup, verify:
- [ ] Website loads at http://localhost:3000
- [ ] Homepage displays with intro animation
- [ ] Services page shows 4 services
- [ ] Admin login works
- [ ] Dashboard shows statistics
- [ ] Booking form submits
- [ ] Inquiries appear in admin

## Ready to Deploy?

See `DEPLOYMENT_GUIDE.md` for complete production deployment instructions.

---

**Need Help?** Check README.md or console logs for errors.

**Ready for Production?** Follow DEPLOYMENT_GUIDE.md step by step.
