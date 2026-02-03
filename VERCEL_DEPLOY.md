# Vercel Deployment Instructions

## Quick Start (2 minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Portfolio v1"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### 2. Connect to Vercel
Go to https://vercel.com/new and import your GitHub repository.

Vercel auto-detects Next.js:
- Framework: **Next.js**
- Build command: `npm run build`
- Output directory: `.next`

### 3. Add Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```
SITE_URL=https://yourdomai.com
JWT_SECRET=your-random-secret-key
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn
```

### 4. Deploy
Click **Deploy** button. Vercel builds and deploys in ~2 minutes.

## Custom Domain Setup

1. Vercel dashboard → Domains
2. Add `yourdomai.com`
3. Update DNS nameservers (Vercel provides them)
4. SSL auto-configures in 5 minutes

## Verify Deployment

✅ Check these after deployment:
- Homepage loads: https://yourapp.vercel.app
- Projects page: /projects (all 4 projects visible)
- API working: /api/projects returns JSON
- Theme toggle persists on refresh
- Mobile responsive (test on iPhone size)
- Performance > 90 on PageSpeed

## Continuous Deployment

Vercel auto-deploys on:
- Push to `main` branch (production)
- PR to `main` (preview URL generated)

To deploy: Just `git push`! No additional commands needed.

## Rollback

If deployment breaks:
```bash
git revert <commit-hash>
git push origin main
```
Vercel auto-redeploys within 30 seconds.

## Monitoring

- Vercel Analytics: https://vercel.com/analytics
- Plausible Analytics: https://plausible.io
- Sentry Error Tracking: https://sentry.io

## Troubleshooting

**Build fails:**
- Check Vercel logs: Dashboard → Deployments → [latest] → Build Logs
- Common issue: Missing env variables → Add in Settings → Environment Variables

**Slow performance:**
- Run audit: https://pagespeed.web.dev
- Check: Images optimized, animations performant

**API not working:**
- Verify endpoint: https://yourapp.vercel.app/api/projects
- Check: CORS headers, .env variables set

---

**Total time: 5-10 minutes** from GitHub push to live deployment!
