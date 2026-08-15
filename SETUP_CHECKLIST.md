# Setup Checklist

Follow this checklist to get Profile Environmental website running.

## Phase 1: Installation (15 minutes)

### Step 1: Verify Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] MongoDB installed OR MongoDB Atlas account ready

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] Installation completed without errors
- [ ] `node_modules` folder created
- [ ] No critical warnings

### Step 3: Environment Setup
```bash
cp .env.example .env
```
- [ ] `.env` file created
- [ ] Edit `.env` with your values:
  ```env
  MONGODB_URI=mongodb://localhost:27017/profile-environmental
  NEXTAUTH_SECRET=(generate with: openssl rand -base64 32)
  NEXTAUTH_URL=http://localhost:3000
  NODE_ENV=development
  ```
- [ ] Save `.env` file

### Step 4: Start MongoDB

**Option A: Local MongoDB**
- [ ] MongoDB service running
  - Windows: Check Services app
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`
- [ ] Test connection: `mongosh mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
- [ ] Created MongoDB Atlas account
- [ ] Created free cluster
- [ ] Added IP address (0.0.0.0/0 for development)
- [ ] Created database user
- [ ] Got connection string
- [ ] Updated `MONGODB_URI` in `.env`

### Step 5: Seed Database
```bash
npm run seed
```
- [ ] Seed completed successfully
- [ ] Admin user created
- [ ] Services created (4)
- [ ] Markets created (7)
- [ ] FAQs created (8)
- [ ] Settings configured

### Step 6: Start Development Server
```bash
npm run dev
```
- [ ] Server started on http://localhost:3000
- [ ] No error messages in terminal
- [ ] ✓ Ready in X ms message shown

---

## Phase 2: Verification (10 minutes)

### Public Website

- [ ] **Homepage** (http://localhost:3000)
  - [ ] Cinematic intro plays (can skip)
  - [ ] Hero section displays
  - [ ] Services preview shows 4 services
  - [ ] All sections load
  - [ ] Footer displays contact info

- [ ] **Services Page** (http://localhost:3000/services)
  - [ ] Lists 4 services
  - [ ] Service cards clickable
  
- [ ] **Service Detail** (http://localhost:3000/services/infection-prevention-control)
  - [ ] Service details display
  - [ ] Related information shows
  - [ ] CTAs present

- [ ] **Booking Page** (http://localhost:3000/booking)
  - [ ] Form displays
  - [ ] All fields present
  - [ ] Submit button works
  
- [ ] **Calculator** (http://localhost:3000/calculator)
  - [ ] Page loads
  - [ ] Jotform embed visible

### Admin Portal

- [ ] **Login Page** (http://localhost:3000/admin/login)
  - [ ] Login form displays
  - [ ] Email: admin@profilegroups.com
  - [ ] Password: Admin@123
  - [ ] Successfully logs in

- [ ] **Dashboard** (http://localhost:3000/admin/dashboard)
  - [ ] Statistics display
  - [ ] Recent inquiries table
  - [ ] Quick actions visible
  - [ ] Sidebar navigation works

### Test Form Submission

- [ ] Go to Booking page
- [ ] Fill out form with test data
- [ ] Submit form
- [ ] Success message shows
- [ ] Login to Admin → Inquiries
- [ ] New inquiry appears in list

### Browser Testing

- [ ] Chrome/Edge works
- [ ] Firefox works
- [ ] Safari works (if on Mac)
- [ ] Mobile responsive (DevTools mobile view)

---

## Phase 3: Configuration (30 minutes)

### Update Settings

- [ ] Login to Admin Portal
- [ ] Go to Settings
- [ ] **Review Contact Information**
  - [ ] Primary email confirmed
  - [ ] Primary phone confirmed
  - [ ] WhatsApp number added (if applicable)
  - [ ] Address added (if applicable)
  - [ ] Business hours added (if applicable)
  - [ ] Remove "confirmationNeeded" flag

- [ ] **Social Media**
  - [ ] Facebook URL verified
  - [ ] LinkedIn added (if applicable)
  - [ ] Twitter added (if applicable)
  - [ ] Instagram added (if applicable)

- [ ] **Integrations**
  - [ ] Jotform calculator URL verified
  - [ ] Jotform booking URL verified
  - [ ] WhatsApp message template updated

- [ ] Save all changes

### Review Content

- [ ] **Services**
  - [ ] Go to Admin → Services
  - [ ] Review each service description
  - [ ] Update any placeholders
  - [ ] Verify accuracy
  - [ ] Save changes

- [ ] **Markets**
  - [ ] Go to Admin → Markets
  - [ ] Review market descriptions
  - [ ] Update content
  - [ ] Save changes

- [ ] **Offers**
  - [ ] Go to Admin → Offers
  - [ ] Review offer terms
  - [ ] Add specific details
  - [ ] Set active dates
  - [ ] Save changes

- [ ] **FAQs**
  - [ ] Go to Admin → FAQs
  - [ ] Review answers
  - [ ] Add more questions
  - [ ] Save changes

### Add Media (if available)

- [ ] **Logo**
  - [ ] Upload company logo (Settings)
  - [ ] Verify it displays correctly

- [ ] **Photos**
  - [ ] Upload company photos (Gallery)
  - [ ] Add to service pages
  - [ ] Add to market pages
  - [ ] Replace homepage images

### Security

- [ ] **Change Admin Password**
  - [ ] Go to Admin → Admin Users
  - [ ] Update password from default
  - [ ] Save new password securely

---

## Phase 4: Testing (20 minutes)

### Functionality Tests

- [ ] **Navigation**
  - [ ] All menu links work
  - [ ] Breadcrumbs work
  - [ ] Footer links work
  - [ ] Logo links to homepage

- [ ] **Forms**
  - [ ] Booking form submits
  - [ ] Contact form submits (if separate)
  - [ ] Inquiries appear in admin
  - [ ] Validation works

- [ ] **CTAs**
  - [ ] Phone links work (click-to-call)
  - [ ] Email links work (opens email client)
  - [ ] WhatsApp links work
  - [ ] Booking buttons work
  - [ ] Calculator button works

- [ ] **Mobile**
  - [ ] Header collapses properly
  - [ ] Mobile menu works
  - [ ] Mobile action bar displays
  - [ ] Forms work on mobile
  - [ ] Images display correctly

- [ ] **Animations**
  - [ ] Cinematic intro plays
  - [ ] Skip intro works
  - [ ] Scroll animations trigger
  - [ ] Hover effects work
  - [ ] Page transitions smooth

### Accessibility Tests

- [ ] **Keyboard Navigation**
  - [ ] Tab through navigation
  - [ ] Forms accessible via keyboard
  - [ ] Skip link works
  - [ ] Focus visible

- [ ] **Screen Reader** (if possible)
  - [ ] Test with screen reader
  - [ ] Alt text present on images
  - [ ] Labels on form fields
  - [ ] Headings properly structured

- [ ] **Reduced Motion**
  - [ ] Enable in OS settings
  - [ ] Animations respect preference
  - [ ] Intro skips automatically
  - [ ] Site still usable

### Performance Tests

- [ ] **Lighthouse Audit**
  - [ ] Run in Chrome DevTools
  - [ ] Performance score
  - [ ] Accessibility score
  - [ ] Best Practices score
  - [ ] SEO score

- [ ] **Loading Speed**
  - [ ] Homepage loads quickly
  - [ ] Images lazy load
  - [ ] No layout shift
  - [ ] Smooth scrolling

---

## Phase 5: Pre-Production (Optional - when ready)

### Content Finalization

- [ ] All pages have real content
- [ ] All images are actual company photos
- [ ] All testimonials are real and approved
- [ ] All resources/PDFs uploaded
- [ ] Legal pages added (Privacy, Terms)
- [ ] About page completed

### SEO Optimization

- [ ] Meta titles optimized
- [ ] Meta descriptions written
- [ ] Open Graph images added
- [ ] Alt text on all images
- [ ] Sitemap generated
- [ ] robots.txt configured

### Security Hardening

- [ ] Admin password changed
- [ ] Environment variables secured
- [ ] MongoDB access restricted
- [ ] HTTPS enabled (production)
- [ ] Security headers configured

### Backup Plan

- [ ] Database backup created
- [ ] Code backed up to Git
- [ ] .env backed up securely
- [ ] Deployment plan reviewed

---

## Phase 6: Production Deployment (when ready)

### Pre-Deployment

- [ ] All checklist items above completed
- [ ] CLIENT_CONFIRMATION_REQUIRED.md reviewed
- [ ] All confirmations received
- [ ] Content finalized
- [ ] Tested thoroughly

### Follow DEPLOYMENT_GUIDE.md

- [ ] MongoDB Atlas configured
- [ ] Vercel account created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project imported
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Production database seeded
- [ ] Vercel Blob configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### Post-Deployment

- [ ] Production site verified
- [ ] Forms work in production
- [ ] Admin login works
- [ ] All pages load correctly
- [ ] Analytics configured (if applicable)
- [ ] Search Console configured
- [ ] Error monitoring set up

---

## Issue Tracking

Use this space to track any issues encountered:

| Issue | Status | Resolution |
|-------|--------|------------|
|       |        |            |
|       |        |            |
|       |        |            |

---

## Sign-Off

**Development Complete**: [ ] Date: __________

**Testing Complete**: [ ] Date: __________

**Client Approved**: [ ] Date: __________

**Deployed to Production**: [ ] Date: __________

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Seed database
npm run seed

# Build for production
npm run build

# Type check
npm run type-check

# Lint code
npm run lint

# Run tests
npm test
```

## Quick Links

- **Local Site**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/admin/login
- **Documentation**: README.md
- **Quick Start**: QUICK_START.md
- **Deployment**: DEPLOYMENT_GUIDE.md
- **Confirmation Items**: CLIENT_CONFIRMATION_REQUIRED.md

---

**Last Updated**: August 15, 2026
**Version**: 1.0.0
**Status**: Ready for Setup
