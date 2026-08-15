# Deployment Guide

Complete guide for deploying Profile Environmental Support Services to production.

## Prerequisites

- [x] GitHub account
- [x] Vercel account (sign up at vercel.com)
- [x] MongoDB Atlas account (sign up at mongodb.com/cloud/atlas)
- [x] Domain name (optional, Vercel provides free subdomain)

## Step 1: MongoDB Atlas Setup

### 1.1 Create Cluster

1. Go to https://mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new project: "Profile Environmental"
4. Click "Build a Database"
5. Choose "Shared" (free tier) or higher
6. Select cloud provider and region (choose closest to your users)
7. Name your cluster: `profile-cluster`
8. Click "Create"

### 1.2 Configure Network Access

1. In Atlas dashboard → Network Access
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For better security, add specific Vercel IP ranges after deployment
4. Click "Confirm"

### 1.3 Create Database User

1. In Atlas dashboard → Database Access
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `profile-admin`
5. Generate secure password (save it!)
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### 1.4 Get Connection String

1. In Atlas dashboard → Databases
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `profile-environmental`

Example:
```
mongodb+srv://profile-admin:YOUR_PASSWORD@profile-cluster.xxxxx.mongodb.net/profile-environmental?retryWrites=true&w=majority
```

## Step 2: Push to GitHub

### 2.1 Initialize Git

```bash
git init
git add .
git commit -m "Initial commit: Profile Environmental website"
```

### 2.2 Create GitHub Repository

1. Go to https://github.com
2. Click "New repository"
3. Name: `profile-environmental-website`
4. Make it private
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 2.3 Push Code

```bash
git remote add origin https://github.com/YOUR-USERNAME/profile-environmental-website.git
git branch -M main
git push -u origin main
```

## Step 3: Vercel Deployment

### 3.1 Import Project

1. Go to https://vercel.com
2. Sign up / Log in (use GitHub account)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will detect Next.js automatically

### 3.2 Configure Environment Variables

Click "Environment Variables" and add:

```
MONGODB_URI=mongodb+srv://profile-admin:YOUR_PASSWORD@profile-cluster.xxxxx.mongodb.net/profile-environmental?retryWrites=true&w=majority

NEXTAUTH_SECRET=generate-a-random-32-char-string-here

NEXTAUTH_URL=https://your-domain.vercel.app

NODE_ENV=production
```

**Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

### 3.3 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Your site will be live at: `https://your-project-name.vercel.app`

## Step 4: Seed Production Database

### Option A: Using Local Machine

```bash
# In your project directory
MONGODB_URI="mongodb+srv://..." npm run seed
```

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run seed command
vercel env pull .env.local
npm run seed
```

## Step 5: Configure File Storage

### 5.1 Set Up Vercel Blob

1. In Vercel dashboard → Your Project
2. Go to Storage tab
3. Click "Create Database"
4. Choose "Blob"
5. Name it: `profile-uploads`
6. Select region
7. Click "Create"

### 5.2 Get Blob Token

1. In Storage → Blob → profile-uploads
2. Copy the `BLOB_READ_WRITE_TOKEN`
3. Add to environment variables in Vercel

## Step 6: Custom Domain (Optional)

### 6.1 Add Domain in Vercel

1. In Vercel dashboard → Your Project → Settings
2. Go to "Domains"
3. Add your domain: `www.profilegroups.com`
4. Vercel will provide DNS records

### 6.2 Update DNS

Add these records to your domain registrar:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6.3 Update Environment Variable

After domain is active:
```
NEXTAUTH_URL=https://www.profilegroups.com
```

## Step 7: Post-Deployment Checklist

### 7.1 Verify Deployment

- [ ] Website loads: https://your-domain.vercel.app
- [ ] Homepage displays correctly
- [ ] Services pages load
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Admin dashboard displays data

### 7.2 Test Forms

- [ ] Booking form submission
- [ ] Contact form submission
- [ ] Calculator loads
- [ ] Jotform embeds work
- [ ] WhatsApp links work

### 7.3 Test Admin Portal

- [ ] Login with credentials
- [ ] Dashboard shows stats
- [ ] Can view inquiries
- [ ] Can edit services
- [ ] Can update settings
- [ ] File uploads work

### 7.4 Security

- [ ] Change admin password immediately
- [ ] Verify HTTPS is enabled
- [ ] Test authentication redirect
- [ ] Check environment variables are secret

### 7.5 Performance

- [ ] Run Lighthouse audit (target: 90+)
- [ ] Test on mobile devices
- [ ] Check image loading
- [ ] Verify animations work
- [ ] Test reduced motion mode

### 7.6 SEO

- [ ] Verify meta tags
- [ ] Check Open Graph images
- [ ] Test social media sharing
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (if desired)

## Step 8: Monitoring & Maintenance

### 8.1 Set Up Monitoring

1. **Vercel Analytics** (automatic)
   - View in Vercel dashboard → Analytics

2. **Error Tracking** (optional)
   - Consider: Sentry, LogRocket, or Vercel Error Tracking

3. **Uptime Monitoring** (optional)
   - Consider: UptimeRobot, Pingdom

### 8.2 Backups

**MongoDB Atlas Backups:**
1. In Atlas → Backup tab
2. Cloud Backups are automatic on M10+ clusters
3. For M0 free tier, use mongodump regularly:

```bash
mongodump --uri="mongodb+srv://..." --out=./backup-$(date +%Y%m%d)
```

### 8.3 Regular Updates

Weekly:
- [ ] Check and respond to inquiries
- [ ] Review analytics

Monthly:
- [ ] Update content
- [ ] Check for broken links
- [ ] Review and optimize images
- [ ] Check performance metrics

Quarterly:
- [ ] Update dependencies
- [ ] Security audit
- [ ] Backup verification
- [ ] User testing

## Troubleshooting

### Build Fails

**Error: Cannot find module**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**TypeScript errors**
```bash
npm run type-check
# Fix reported errors
```

### Database Connection Issues

**Error: Connection refused**
- Check MongoDB Atlas network access (0.0.0.0/0)
- Verify connection string has correct password
- Check IP whitelist includes Vercel IPs

### Environment Variables Not Working

- Redeploy after adding variables
- Check variable names match exactly
- No quotes needed in Vercel UI
- Restart Vercel serverless functions

### File Upload Issues

**Images not persisting**
- Public folder is not persistent on Vercel
- Must use Vercel Blob or S3
- Check BLOB_READ_WRITE_TOKEN is set

### Admin Can't Login

**Authentication failing**
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Ensure admin user exists in database
- Try password reset

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Vercel Blob Docs**: https://vercel.com/docs/storage/vercel-blob

## Rollback Procedure

If deployment has issues:

1. **Vercel Dashboard** → Your Project
2. Go to "Deployments"
3. Find previous working deployment
4. Click "..." → "Promote to Production"

Or via CLI:
```bash
vercel rollback
```

## Post-Launch

### Week 1
- Monitor error logs daily
- Respond to all inquiries within 24 hours
- Check form submissions work
- Gather user feedback

### Month 1
- Review analytics
- Optimize based on user behavior
- Update content based on feedback
- Plan content calendar

### Ongoing
- Regular content updates
- Monthly backups verification
- Quarterly security updates
- Annual design refresh consideration

---

**Deployment Date**: _________________

**Deployed By**: _________________

**Production URL**: _________________

**Notes**: _________________
