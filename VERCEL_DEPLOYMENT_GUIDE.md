# 🚀 Vercel Deployment Guide

## Problem: Database sections not showing on Vercel (but working on localhost)

This happens because Vercel doesn't have access to your environment variables.

---

## ✅ Solution: Add Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Click on your project (`profile-environmental`)
3. Click on **"Settings"** tab at the top

### Step 2: Add Environment Variables
1. In Settings, click **"Environment Variables"** from left sidebar
2. Add these 3 variables one by one:

#### Variable 1: MONGODB_URI
```
Name: MONGODB_URI
Value: mongodb+srv://shumaila:shumaila12345@cluster0.bwpdzae.mongodb.net/profile-environmental?retryWrites=true&w=majority
```
- Select: ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 2: NEXTAUTH_SECRET
```
Name: NEXTAUTH_SECRET
Value: profile-env-secret-key-change-in-production-min-32-chars
```
- Select: ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 3: NEXTAUTH_URL
```
Name: NEXTAUTH_URL
Value: https://profile-environmental.vercel.app
```
(Replace with your actual Vercel URL)
- Select: ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

### Step 3: Redeploy
After adding all variables:
1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Click the **3 dots menu** (⋮) on the right
4. Click **"Redeploy"**
5. Check **"Use existing Build Cache"** (optional)
6. Click **"Redeploy"**

---

## ⏱️ Wait 2-3 Minutes
After redeployment completes, wait 2-3 minutes and refresh your site. All sections should now display properly!

---

## 🔍 How to Verify It's Working

### Check 1: Homepage
- Visit: `https://your-site.vercel.app`
- You should see:
  - ✅ 4 Service cards (Infection Prevention, Sustainability, Steam Cleaning, Green Cleaning)
  - ✅ 7 Market cards
  - ✅ 4 Special offers
  - ✅ 6 FAQs

### Check 2: Services Page
- Visit: `https://your-site.vercel.app/services`
- Should show all 4 services

### Check 3: Admin Login
- Visit: `https://your-site.vercel.app/admin/login`
- Login with:
  - Email: `admin@profilegroups.com`
  - Password: `Admin@123`

---

## 🐛 Still Not Working? Troubleshooting

### Issue 1: Environment Variables Not Saved
**Solution:** 
- Make sure you clicked "Save" for each variable
- Make sure you selected all 3 environments (Production, Preview, Development)
- Redeploy again

### Issue 2: Wrong MongoDB URI
**Solution:**
- Double-check the MongoDB URI is exactly:
```
mongodb+srv://shumaila:shumaila12345@cluster0.bwpdzae.mongodb.net/profile-environmental?retryWrites=true&w=majority
```
- No extra spaces at the beginning or end
- Password is correct: `shumaila12345`

### Issue 3: Database is Empty
**Solution:**
Run the seed script again to populate database:
```bash
npm run seed
```

### Issue 4: Vercel Function Timeout
**Solution:**
- Check Vercel logs: Go to Deployments → Click on deployment → Click "View Function Logs"
- If you see timeout errors, the database query is taking too long
- Make sure MongoDB Atlas is not paused (check Atlas dashboard)

---

## 📱 Quick Checklist

Before asking for help, verify:
- [ ] All 3 environment variables added in Vercel
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed after adding variables
- [ ] Waited 2-3 minutes after redeploy
- [ ] MongoDB Atlas cluster is active (not paused)
- [ ] Database has data (run `npm run seed` if needed)
- [ ] Cleared browser cache and refreshed

---

## 🎯 Expected Result

After following these steps, your Vercel deployment should show:

**Homepage:**
- Hero section with 3-line heading
- 4 service cards with icons
- Process section (4 steps)
- 7 market cards
- 4 special offer cards
- Sustainability section
- Calculator spotlight
- Resources preview (3 items)
- FAQ accordion (6 questions)
- CTA section

**All pages should load within 2-3 seconds!**

---

## 💡 Pro Tips

1. **Always check Vercel logs** if something isn't working:
   - Deployments → Your deployment → Function Logs

2. **Test with Preview deployments first**:
   - Make changes in a branch
   - Push to GitHub
   - Vercel creates preview deployment
   - Test before merging to main

3. **MongoDB Atlas IP Whitelist**:
   - Go to MongoDB Atlas
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` to allow all (Vercel uses dynamic IPs)

4. **Check Build Logs**:
   - If deployment fails, check build logs
   - Look for any errors related to environment variables

---

## ✅ Success!

Once everything is working, you should see:
- ✅ All database content displaying
- ✅ Admin panel accessible
- ✅ Forms submitting properly
- ✅ All pages loading fast

**Your site is now live! 🎉**
