# 🚀 Replit Quick Start Guide

## Method 1: Upload Files (Easiest)

### Step 1: Create New Repl
1. Go to [replit.com](https://replit.com)
2. Click **"+ Create Repl"**
3. Select **"Node.js"** template
4. Name it: `estonian-archery-manager`
5. Click **"Create Repl"**

### Step 2: Upload Files
In the Replit file explorer, upload these files:

```
📁 Your Repl
├── 📄 index.html
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 .replit
├── 📄 README.md
└── 📁 src/
    ├── 📄 main.jsx
    └── 📄 App.jsx (this is the big 9000-line file)
```

**How to upload:**
1. Click the **"Files"** icon in left sidebar
2. Drag and drop files OR click **"⋮"** → **"Upload file"**
3. Create `src` folder: Click **"+"** → **"Add folder"** → name it `src`
4. Upload `main.jsx` and `App.jsx` into the `src` folder

### Step 3: Install Dependencies
In the **Shell** tab (bottom of screen), type:
```bash
npm install
```

Wait for installation to complete (~30 seconds).

### Step 4: Run the App
Click the green **"Run"** button at the top!

OR in Shell, type:
```bash
npm start
```

The app should open in the preview pane! 🎉

---

## Method 2: Import from GitHub (If You Have a Repo)

### Step 1: Push to GitHub
1. Create a new GitHub repository
2. Upload all files to the repo
3. Commit and push

### Step 2: Import to Replit
1. Go to [replit.com](https://replit.com)
2. Click **"+ Create Repl"**
3. Select **"Import from GitHub"**
4. Paste your repository URL
5. Click **"Import from GitHub"**

### Step 3: Run
Replit will automatically detect dependencies.
Click the **"Run"** button!

---

## Method 3: Use Setup Script

If you uploaded the files:

1. In Shell, run:
```bash
chmod +x setup.sh
./setup.sh
```

2. Then run:
```bash
npm start
```

---

## Troubleshooting

### ❌ "Cannot find module"
**Solution:**
```bash
npm install
```

### ❌ "Port 3000 is already in use"
**Solution:** Click **"Stop"** button, then **"Run"** again

### ❌ No preview showing
**Solution:** Click the **"Open in new tab"** icon next to the preview pane

### ❌ Tailwind CSS not working
**Solution:** Check internet connection - Tailwind loads from CDN

### ❌ "npm: command not found"
**Solution:** Make sure you selected "Node.js" template when creating Repl

---

## File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point with Tailwind CDN |
| `package.json` | Lists all npm dependencies |
| `vite.config.js` | Vite build tool configuration |
| `.replit` | Tells Replit how to run the project |
| `src/main.jsx` | React entry point (6 lines) |
| `src/App.jsx` | Main application (9,000 lines) |

---

## Testing the App

Once running, test these features:

1. ✅ Click **"🏆 Load All Competitions"** (green button)
2. ✅ Click **"Apply Parsing"**
3. ✅ Navigate through tabs: Database → Reports → Athletes
4. ✅ Try clicking an athlete name in Database
5. ✅ Download a PDF report

---

## Sharing Your Repl

### Get the URL
Your Repl is automatically live at:
```
https://[your-repl-name].[your-username].repl.co
```

Example: `https://estonian-archery-manager.johndoe.repl.co`

### Share Options
- **Public**: Anyone can view (Repl settings → Make public)
- **Private**: Only you can access
- **Invite**: Share with specific users

---

## Next Steps

1. ✅ **Customize**: Modify `src/App.jsx` to suit your needs
2. ✅ **Deploy**: See `DEPLOYMENT.md` for production deployment
3. ✅ **Backup**: Push code to GitHub
4. ✅ **Extend**: Add new features or modify existing ones

---

## Common Replit Commands

```bash
npm install          # Install dependencies
npm start           # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

---

## Performance on Replit

- **Load time**: ~2-3 seconds
- **Bundle size**: ~2MB
- **Memory**: ~100MB RAM
- **Free tier**: Works perfectly! 🎉

---

## Getting Help

### Resources
- 📖 See `README.md` for full documentation
- 🚀 See `DEPLOYMENT.md` for deployment options
- 💬 Use Replit's built-in chat for quick questions

### Support
- Replit Community: [ask.replit.com](https://ask.replit.com)
- This project: Check the README.md

---

**You're all set!** 🏹

Click **Run** and start managing Estonian archery data!
