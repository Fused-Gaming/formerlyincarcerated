# Bitcoin Land Bond - Deployment Guide

## Quick Start (5 minutes)

### Prerequisites
- GitHub account with access to Fused-Gaming organization
- Vercel account (create free at vercel.com)
- Git CLI installed
- Node.js 16+ installed

---

## Step 1: Push to Private GitHub Repository

### Via GitHub CLI (Recommended)
```bash
cd /home/claude/bitcoin-land-bond

# Authenticate with GitHub (one-time)
gh auth login

# Create private repo under Fused-Gaming
gh repo create Fused-Gaming/bitcoin-land-bond \
  --private \
  --source=. \
  --remote=origin \
  --push
```

### Via Git CLI (Manual)
```bash
cd /home/claude/bitcoin-land-bond

# Add remote origin
git remote add origin https://github.com/Fused-Gaming/bitcoin-land-bond.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Verify:** Visit https://github.com/Fused-Gaming/bitcoin-land-bond (should be private)

---

## Step 2: Deploy to Vercel

### Option A: Via Vercel CLI (Fastest)
```bash
npm install -g vercel
cd /home/claude/bitcoin-land-bond
vercel --prod
```

Follow prompts:
- Link to existing project? No
- Set project name? `bitcoin-land-bond`
- Set project directory? `./`
- Deploy? Yes

**Result:** Live URL displayed (e.g., bitcoin-land-bond-fused.vercel.app)

### Option B: Via GitHub + Vercel Web UI
1. Go to **vercel.com** → Sign in
2. Click **"Import Project"**
3. Select **"GitHub"** → Choose `Fused-Gaming/bitcoin-land-bond`
4. Configure:
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Click **"Deploy"**

**Result:** URL sent via GitHub commit status

### Option C: Vercel GitHub Integration (Recommended)
1. Go to **vercel.com** → Dashboard
2. **Settings** → **Git** → Connect GitHub
3. Vercel automatically deploys on every push to `main`

---

## Environment Variables (If Needed Later)

Add to Vercel project settings:
```
# .env.local (local development)
# (Currently no env vars needed for MVP)
```

---

## Domain Setup (Optional)

### Add Custom Domain
1. Vercel Dashboard → Bitcoin Land Bond project
2. **Settings** → **Domains**
3. Add domain (e.g., `bitcoin-land-bond.dev`)
4. Follow DNS instructions

---

## Verification Checklist

- [ ] GitHub repo exists at `github.com/Fused-Gaming/bitcoin-land-bond` (private)
- [ ] Local repo pushed with commit history
- [ ] Vercel deployment live (check URL)
- [ ] Frontend loads at deployment URL
- [ ] Interactive phase timeline works (click phase cards)
- [ ] README displays correctly on GitHub

---

## Local Development

```bash
cd /home/claude/bitcoin-land-bond

# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

---

## Troubleshooting

### Git authentication fails
```bash
# Re-authenticate GitHub
gh auth logout
gh auth login
```

### Vercel deployment fails
- Check build logs: `vercel logs`
- Verify Next.js config: `next.config.js` exists
- Ensure all dependencies in `package.json`

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

---

## Project Info

- **Frontend:** Next.js 14, React 18
- **Deployment:** Vercel (zero config)
- **Repository:** Private, Fused-Gaming organization
- **White Paper:** `/docs/Bitcoin_Land_Bond_White_Paper.docx`
- **Documentation:** `/README.md`

---

## What's Deployed

✅ Interactive Bitcoin Land Bond platform  
✅ 4-phase implementation timeline  
✅ 13-member board governance breakdown  
✅ 5 pilot cities visualization  
✅ Capital allocation breakdown  
✅ Outcome metrics dashboard  
✅ Full policy documentation  

---

## Next Steps Post-Deployment

1. **Configure Vercel Analytics** (Vercel Settings → Analytics)
2. **Set up GitHub branch protection** (Settings → Branches → Require status checks)
3. **Add documentation** (GitHub Wiki or /docs folder)
4. **Monitor deployments** (Vercel dashboard)

---

**Bitcoin Land Bond** | Criminal Asset Recovery Initiative | May 2026
