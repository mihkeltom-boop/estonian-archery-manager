# Deployment Guide

## Replit Deployment

### Option 1: Direct on Replit
Your Repl is already live! Share the Replit URL:
```
https://[your-repl-name].[your-username].repl.co
```

### Option 2: Custom Domain (Requires Replit Hacker Plan)
1. Go to your Repl settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS instructions

---

## Deploy to Vercel (Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel auto-detects Vite configuration
6. Click "Deploy"

**Build Settings:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

---

## Deploy to Netlify (Free)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

---

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://[username].github.io/[repo-name]",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

4. Enable GitHub Pages in repository settings

---

## Local Production Server

Build and preview locally:
```bash
npm run build
npm run preview
```

The production build will be in the `dist/` folder.

---

## Environment Variables

If you need environment variables:

### Replit
Add in "Secrets" tab (Environment variables)

### Vercel/Netlify
Add in project settings → Environment Variables

### Local
Create `.env` file:
```
VITE_API_KEY=your_key_here
```

Access in code:
```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## Performance Tips

1. **Code splitting**: Already handled by Vite
2. **Lazy loading**: Consider for large components
3. **CDN**: jsPDF and html2canvas load from CDN
4. **Caching**: Vite handles this automatically

---

## Monitoring

### Check Bundle Size
```bash
npm run build
```
Look for the size report in terminal.

### Lighthouse Score
1. Build production version
2. Open Chrome DevTools
3. Go to Lighthouse tab
4. Run audit

---

## Custom Domains

### Replit
Requires Hacker plan ($7/month)

### Vercel/Netlify
Free custom domains:
1. Add domain in project settings
2. Configure DNS:
   - Type: A
   - Name: @
   - Value: [provided by platform]
   - Type: CNAME
   - Name: www
   - Value: [provided by platform]

---

## Troubleshooting Deployment

### Build Fails
- Check Node.js version (18+ required)
- Run `npm install` again
- Check for dependency conflicts

### White Screen After Deploy
- Check browser console for errors
- Verify all files copied correctly
- Check base path in `vite.config.js`

### PDF Download Not Working
- Check if CDN scripts are blocked
- Verify CORS settings
- Use Print button as backup

---

## CI/CD (Optional)

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Backup Strategy

1. **Code**: Push to GitHub regularly
2. **Data**: All embedded in code (no external data)
3. **Exports**: Users can download PDFs/CSVs

---

Ready to deploy! 🚀
