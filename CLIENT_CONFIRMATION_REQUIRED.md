# Client Confirmation Required

This document lists items that require client review and confirmation before launch.

## ⚠️ CRITICAL: Contact Information

Two contact sets were found. Set B (latest) is configured as provisional.

### Current Configuration (Set B - from latest source)
- **Email**: info@environmentalservices.ca
- **Phone**: 1-800-251-0034
- **Facebook**: https://www.facebook.com/profile.php?id=100063455592689

### Alternate Contact (Set A - from original brief)
- **Email**: info@profilegroups.com
- **Phone**: 647-703-2900

**ACTION REQUIRED**: 
- Confirm which contact set is correct
- Update in Admin Portal → Settings
- Flag is set: `confirmationNeeded: true` in database

---

## 🔗 Integration URLs

### Jotform
Current URLs from existing site:
- **Calculator**: https://form.jotform.com/242406303717248
- **Booking/Quote**: https://www.jotform.com/242300808333245

**ACTION REQUIRED**:
- Verify these Jotform URLs are current and functional
- Update in Admin Portal → Settings → Integrations if needed

### Social Media
- **Facebook**: https://www.facebook.com/profile.php?id=100063455592689 ✅ Confirmed from existing site
- **LinkedIn**: Not provided
- **Twitter**: Not provided
- **Instagram**: Not provided

**ACTION REQUIRED**:
- Add LinkedIn, Twitter, Instagram URLs if available
- Update in Admin Portal → Settings

### WhatsApp
- **Number**: Not provided

**ACTION REQUIRED**:
- Provide WhatsApp business number
- Update in Admin Portal → Settings → Integrations

---

## 💵 Pricing & Checkout

Currently configured:
- **Show Pricing**: Disabled (Contact for pricing)
- **Enable Checkout**: Disabled

**ACTION REQUIRED**:
- Confirm pricing should remain private
- If you want to enable e-commerce:
  1. Provide product prices
  2. Set up Stripe account
  3. Add Stripe keys to environment variables
  4. Enable checkout in Admin Portal → Settings

---

## 📄 Resources & PDFs

Three sample resources are seeded:
1. Infection Prevention Best Practices Guide
2. Green Cleaning Certification Standards
3. Facility Cleaning Checklist Template

**ACTION REQUIRED**:
- Upload actual PDF files to replace samples
- PDFs should be placed in `public/uploads/` (development)
- For production, PDFs will be stored in Vercel Blob
- Update in Admin Portal → Resources

---

## 💬 Testimonials

One demo testimonial is created in DRAFT status (not published).

**ACTION REQUIRED**:
- Provide real client testimonials with:
  - Client name
  - Company name
  - Role/title
  - Testimonial quote
  - Photo (optional)
  - Permission to publish
- Add in Admin Portal → Testimonials

---

## 📸 Images & Media

Current images use:
- Unsplash stock photos (placeholders)
- Generated logo SVG

**ACTION REQUIRED**:
- Replace with actual company photos
- Provide high-quality images of:
  - Cleaning staff in action
  - Commercial environments serviced
  - Healthcare facilities
  - Industrial/retail locations
  - Office buildings
  - Professional team photos
- Upload in Admin Portal → Gallery
- Update in Admin Portal → Services/Markets/Offers

### Logo
- Current: Generated SVG based on "PROFILE - Environmental Support Services"
- **ACTION REQUIRED**: Provide actual logo files if different
  - Formats needed: SVG (preferred), PNG with transparency
  - Upload in Admin Portal → Settings

---

## 📝 Content Verification

### Services
Four services are seeded with draft descriptions:
1. Infection Prevention Control
2. Sustainability
3. Steam Cleaning
4. Green Cleaning

**ACTION REQUIRED**:
- Review service descriptions for accuracy
- Add any missing services
- Update in Admin Portal → Services

### Markets
Seven markets are seeded with draft descriptions.

**ACTION REQUIRED**:
- Review market descriptions
- Confirm all target markets are included
- Update in Admin Portal → Markets

### Offers
Four offers are seeded:
1. One-Month Trial
2. Housekeeping Department Setup Consulting
3. Staff Training Programs
4. Custom Cleaning Manual Creation

**ACTION REQUIRED**:
- Confirm offer details
- Provide specific terms and conditions
- Add eligibility criteria
- Update in Admin Portal → Offers

### FAQs
Eight FAQs are seeded with general answers.

**ACTION REQUIRED**:
- Review and update answers
- Add more frequently asked questions
- Update in Admin Portal → FAQs

---

## 🏢 Company Information

### About Page
**ACTION REQUIRED**:
- Provide company history
- Mission and values
- Team information
- Years in business
- Certifications and credentials
- Service area geographic coverage

### Business Details
**ACTION REQUIRED** (if applicable):
- Physical address
- Business hours
- Service area details
- Industry certifications
- Regulatory compliance information
- Insurance details

---

## 🔍 SEO & Meta Information

Default meta descriptions are provided.

**ACTION REQUIRED**:
- Review and optimize meta titles
- Review and optimize meta descriptions
- Provide meta keywords
- Update in Admin Portal → Settings → SEO
- Update individual pages in Admin Portal

---

## ✅ Legal Pages

**ACTION REQUIRED**:
- Provide Privacy Policy
- Provide Terms of Service
- Provide Cookie Policy (if using analytics)
- These should be reviewed by legal counsel

---

## 📊 Analytics & Tracking

**ACTION REQUIRED** (if desired):
- Google Analytics 4 ID
- Facebook Pixel ID
- Other tracking codes
- Add in Admin Portal → Settings → Integrations

---

## 🎯 Launch Verification

Before launching, verify:

- [ ] Contact information confirmed
- [ ] Jotform URLs tested
- [ ] Social media links added and tested
- [ ] WhatsApp number configured and tested
- [ ] All images replaced with actual company photos
- [ ] Logo uploaded (if different from generated)
- [ ] Service descriptions reviewed
- [ ] Market descriptions reviewed
- [ ] Offer terms finalized
- [ ] FAQs reviewed and expanded
- [ ] About page content added
- [ ] Testimonials added and approved
- [ ] Resources PDFs uploaded
- [ ] Product catalog completed
- [ ] Legal pages added
- [ ] Analytics configured
- [ ] Admin password changed
- [ ] Production database seeded
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Mobile testing complete
- [ ] Accessibility audit passed
- [ ] Performance audit passed (Lighthouse 90+)

---

## 📋 How to Update

All items above can be updated through the Admin Portal without code changes:

1. Log in: https://your domain.com/admin/login
2. Navigate to the appropriate section
3. Make updates
4. Save/Publish changes

For technical support or questions, refer to README.md.

---

**Last Updated**: August 15, 2026
**Status**: Awaiting Client Review
