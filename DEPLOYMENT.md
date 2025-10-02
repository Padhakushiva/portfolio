# 🚀 Netlify Deployment Checklist

## ✅ Pre-Deployment Verification

### Files Created
- ✅ `netlify.toml` - Netlify build configuration
- ✅ `public/_redirects` - SPA routing configuration
- ✅ `.nvmrc` - Node version specification (v18)
- ✅ `.env` - Local environment variables (not uploaded to Git)
- ✅ `.env.example` - Template for environment variables
- ✅ `.gitignore` - Updated to exclude `.env`

### Build Test
- ✅ Build completed successfully (`npm run build`)
- ✅ Output directory: `dist/`
- ✅ All assets bundled correctly

## 🔧 Netlify Configuration Details

### Build Settings (Auto-configured via netlify.toml)
```
Build command: npm run build
Publish directory: dist
Node version: 18
```

### Redirects (Configured for SPA)
- All routes redirect to `index.html` for client-side routing
- Status code: 200 (SPA mode)

## 📝 Deployment Steps

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Select "GitHub" and authorize
   - Choose repository: `Padhakushiva/portfolio`

3. **Configure Build** (Auto-detected)
   - Build command: `npm run build` ✅
   - Publish directory: `dist` ✅
   - Click "Deploy site"

4. **Add Environment Variables** (CRITICAL!)
   - Go to: Site settings → Environment variables → Add
   - Add these three variables:
     ```
     VITE_EMAILJS_PUBLIC_KEY = CdaGaWQ48SxJ-BPUS
     VITE_EMAILJS_SERVICE_ID = service_5yp4pem
     VITE_EMAILJS_TEMPLATE_ID = template_584h2ad
     ```
   - Click "Save"
   - Trigger redeploy: Deploys → Trigger deploy → Deploy site

### Method 2: Netlify CLI

```bash
# Install Netlify CLI (one-time)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod
```

### Method 3: Drag and Drop

```bash
# Build locally
npm run build

# Go to https://app.netlify.com/drop
# Drag the 'dist' folder
# IMPORTANT: Add environment variables manually after deployment
```

## ⚠️ Important Notes

1. **Environment Variables**: 
   - Must be added in Netlify dashboard for contact form to work
   - `.env` file is not uploaded to GitHub (excluded by `.gitignore`)
   - Each deployment method requires manual environment variable setup

2. **Contact Form**:
   - EmailJS will only work after environment variables are set in Netlify
   - Test contact form after deployment

3. **Custom Domain** (Optional):
   - After deployment, go to Domain settings
   - Add custom domain if you have one
   - Netlify provides free HTTPS

4. **Continuous Deployment**:
   - Every push to `main` branch auto-deploys
   - Can configure deploy previews for PRs

## 🔍 Post-Deployment Checklist

After deployment, verify:
- [ ] Site loads correctly
- [ ] All pages are accessible (routing works)
- [ ] Images and assets load properly
- [ ] Resume download works
- [ ] Contact form submits successfully
- [ ] Mobile responsiveness
- [ ] Animations work smoothly

## 🐛 Troubleshooting

### Contact Form Not Working
- Check environment variables in Netlify dashboard
- Verify variable names: `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`
- Trigger a new deployment after adding variables

### 404 Errors on Routes
- Verify `_redirects` file exists in `public/` folder
- Check `netlify.toml` has redirect rules

### Build Failures
- Check Node version (should be 18)
- Verify all dependencies in `package.json`
- Check build logs in Netlify dashboard

## 📱 Expected Deployment URL
Your site will be available at:
- `https://[random-name].netlify.app`
- You can change this to a custom subdomain in Netlify settings

## 🎉 Ready to Deploy!
Your project is fully configured for Netlify deployment. Choose your preferred deployment method and follow the steps above.
