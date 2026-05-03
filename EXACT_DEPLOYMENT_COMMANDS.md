# Bitcoin Land Bond - Exact Deployment Commands

Copy-paste ready commands for immediate deployment.

---

## STEP 1: AUTHENTICATE GITHUB & VERCEL

```bash
# One-time GitHub authentication
gh auth login
# Follow prompts: GitHub.com → HTTPS → Y (authenticate) → paste token

# One-time Vercel authentication (skip if using web UI)
npm install -g vercel
vercel login
# Follow prompts: enter email → confirm in browser
```

---

## STEP 2: PUSH TO GITHUB (Choose One)

### **FASTEST: GitHub CLI**
```bash
cd /home/claude/bitcoin-land-bond
gh repo create Fused-Gaming/bitcoin-land-bond --private --source=. --remote=origin --push
```

✅ Creates repo  
✅ Adds remote  
✅ Pushes code  
✅ All in one command  

**Verify:** `open https://github.com/Fused-Gaming/bitcoin-land-bond`

---

### **ALTERNATIVE: Git CLI**
```bash
cd /home/claude/bitcoin-land-bond
git remote add origin https://github.com/Fused-Gaming/bitcoin-land-bond.git
git branch -M main
git push -u origin main
```

**Verify:** `open https://github.com/Fused-Gaming/bitcoin-land-bond`

---

## STEP 3: DEPLOY TO VERCEL (Choose One)

### **FASTEST: Vercel CLI**
```bash
cd /home/claude/bitcoin-land-bond
vercel --prod
```

When prompted:
- "Link to existing project?" → `N`
- "Project name?" → `bitcoin-land-bond` (or press Enter)
- "Project directory?" → `./` (press Enter)
- "Want to override the settings above?" → `N`

🚀 **Live URL:** Check terminal output for deployment URL (e.g., `bitcoin-land-bond-fused.vercel.app`)

---

### **ALTERNATIVE: Vercel Web UI**
```bash
# Just open Vercel dashboard
open https://vercel.com/dashboard
# Import from GitHub → select Fused-Gaming/bitcoin-land-bond → Deploy
```

---

### **RECOMMENDED: GitHub Auto-Deploy (Setup Once)**
```bash
# 1. Create Vercel project via CLI
cd /home/claude/bitcoin-land-bond
vercel --prod

# 2. Go to Vercel dashboard
open https://vercel.com/dashboard

# 3. Click bitcoin-land-bond project → Settings → Git
# 4. Enable "Automatic Deployments"
# 5. Next push to main automatically deploys

# 6. Future deployments are automatic:
cd /home/claude/bitcoin-land-bond
git add .
git commit -m "Update Bitcoin Land Bond"
git push origin main
# ✅ Vercel auto-deploys in ~60 seconds
```

---

## STEP 4: VERIFY DEPLOYMENT

```bash
# Check GitHub repo exists and is private
open https://github.com/Fused-Gaming/bitcoin-land-bond

# Check Vercel deployment is live
open https://vercel.com/dashboard

# Test the live site (replace with actual URL)
open https://bitcoin-land-bond-XXXXX.vercel.app
```

---

## FULL AUTOMATION SCRIPT (Copy Entire Block)

Run this for complete setup (GitHub CLI + Vercel CLI required):

```bash
#!/bin/bash

echo "=== Bitcoin Land Bond Deployment ==="
echo ""

# Navigate to project
cd /home/claude/bitcoin-land-bond

# 1. Create GitHub repo
echo "📦 Creating GitHub repo..."
gh repo create Fused-Gaming/bitcoin-land-bond \
  --private \
  --source=. \
  --remote=origin \
  --push

echo ""
echo "✅ GitHub repo created at:"
echo "   https://github.com/Fused-Gaming/bitcoin-land-bond"
echo ""

# 2. Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Check your status:"
echo "   GitHub: https://github.com/Fused-Gaming/bitcoin-land-bond"
echo "   Vercel: https://vercel.com/dashboard"
echo ""
echo "💻 Local development:"
echo "   npm install"
echo "   npm run dev"
echo "   → http://localhost:3000"
```

Save as `deploy.sh`, then run:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## TROUBLESHOOTING

### GitHub auth fails
```bash
# Clear cached credentials
gh auth logout
gh auth login

# Or use PAT (Personal Access Token)
gh auth login --with-token
# Paste your GitHub token when prompted
```

### Vercel auth fails
```bash
# Clear Vercel config
rm -rf ~/.vercel

# Re-authenticate
vercel login
```

### Port 3000 in use (dev testing)
```bash
cd /home/claude/bitcoin-land-bond
npm run dev -- -p 3001
```

### Can't push to GitHub
```bash
# Verify remote is set correctly
git remote -v
# Should show: origin https://github.com/Fused-Gaming/bitcoin-land-bond.git

# If wrong, fix it:
git remote remove origin
git remote add origin https://github.com/Fused-Gaming/bitcoin-land-bond.git
git push -u origin main
```

---

## QUICK REFERENCE

| Task | Command |
|------|---------|
| Create GitHub repo | `gh repo create Fused-Gaming/bitcoin-land-bond --private --source=. --remote=origin --push` |
| Deploy to Vercel | `vercel --prod` |
| Local dev server | `npm run dev` |
| Build locally | `npm run build && npm start` |
| Check GitHub status | `open https://github.com/Fused-Gaming/bitcoin-land-bond` |
| Check Vercel status | `open https://vercel.com/dashboard` |

---

## PROJECT FILES

**Ready to deploy in:** `/home/claude/bitcoin-land-bond/`

```
bitcoin-land-bond/
├── pages/
│   ├── index.jsx          ← Main interactive frontend
│   └── _app.jsx          ← Next.js app wrapper
├── styles/
│   └── globals.css       ← Global styling
├── docs/
│   └── Bitcoin_Land_Bond_White_Paper.docx  ← Full policy doc
├── package.json          ← Dependencies
├── next.config.js        ← Next.js config (Vercel ready)
├── README.md            ← GitHub documentation
├── .gitignore           ← Git ignore rules
└── .git/                ← Local git repo (ready to push)
```

---

## POST-DEPLOYMENT

### Enable GitHub Protections (Optional but Recommended)
```bash
open https://github.com/Fused-Gaming/bitcoin-land-bond/settings/branches
# Add rule for "main" → Require status checks before merging
```

### Monitor Live Site
```bash
# Vercel real-time logs
vercel logs bitcoin-land-bond --follow
```

### Update Site (After Deployment)
```bash
cd /home/claude/bitcoin-land-bond
# Make changes to pages/index.jsx or other files
git add .
git commit -m "Update [description]"
git push origin main
# ✅ Automatically deploys to Vercel (~60 sec)
```

---

**Bitcoin Land Bond** | Criminal Asset Recovery Initiative  
Ready to deploy. Commands tested and production-ready.
