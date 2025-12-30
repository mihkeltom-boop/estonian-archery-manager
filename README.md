# Estonian Archery Data Manager - Replit Setup

## Quick Start on Replit

### Step 1: Create New Repl
1. Go to [Replit.com](https://replit.com)
2. Click "Create Repl"
3. Select "Import from GitHub" OR "Blank Repl"
4. Choose "Node.js" or "React" template

### Step 2: Upload Files
Upload these files to your Repl:
```
/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   └── App.jsx
```

### Step 3: Install Dependencies
In the Replit Shell, run:
```bash
npm install
```

This installs:
- React 18.2
- React DOM 18.2
- Lucide React (icons)
- Recharts (charts)
- Vite (build tool)

### Step 4: Run the Application
In the Replit Shell, run:
```bash
npm start
```

The app will start on port 3000. Replit will automatically open the preview.

---

## Alternative: Use Replit Template

### Option A: React Template
1. Create Repl with "React (Vite)" template
2. Replace the default files with the ones from this project
3. Run `npm install` to add dependencies
4. Run `npm start`

### Option B: Import from GitHub
If you've pushed this to GitHub:
1. Click "Import from GitHub" in Replit
2. Enter your repository URL
3. Replit will automatically detect and install dependencies
4. Click "Run" button

---

## Project Structure

```
estonian-archery-data-manager/
│
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
│
└── src/
    ├── main.jsx           # React entry point
    └── App.jsx            # Main application (9000+ lines)
```

---

## Key Features

✅ **6-Step Workflow**: Import → Parse → Review → Database → Reports → Athletes  
✅ **17 Pre-loaded Competitions**: Estonian archery events from 2024-2025  
✅ **Smart Parsing**: Fuzzy matching, hierarchical age classes, 29 club codes  
✅ **Mobile Optimized**: Responsive design for phone and desktop  
✅ **PDF Export**: Download reports as PDF files  
✅ **Athlete Statistics**: Progress charts with logarithmic trend lines  

---

## Troubleshooting

### Issue: "Cannot find module 'lucide-react'"
**Solution**: Run `npm install` again

### Issue: Port 3000 already in use
**Solution**: Kill the process or change port in `vite.config.js`

### Issue: Tailwind CSS not loading
**Solution**: Tailwind is loaded via CDN in `index.html` - check internet connection

### Issue: Charts not displaying
**Solution**: Ensure `recharts` is installed: `npm install recharts`

### Issue: PDF download not working
**Solution**: 
- Check browser console (F12) for errors
- Use the "Print" button as backup
- jsPDF and html2canvas load from CDN automatically

---

## Configuration

### Change Port
Edit `vite.config.js`:
```javascript
server: {
  host: '0.0.0.0',
  port: 5000  // Change this
}
```

### Environment
- Node.js 18+ recommended
- Works on Replit, Vercel, Netlify, local machine
- No backend required (client-side only)

---

## Development

### Run Development Server
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Dependencies

### Production
- `react` ^18.2.0 - UI framework
- `react-dom` ^18.2.0 - React DOM renderer
- `lucide-react` ^0.263.1 - Icons
- `recharts` ^2.12.0 - Charts/graphs

### Development
- `vite` ^5.0.0 - Build tool
- `@vitejs/plugin-react` ^4.2.1 - Vite React plugin

### External (CDN)
- Tailwind CSS - Styling
- jsPDF - PDF generation
- html2canvas - PDF rendering

---

## Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  

---

## Data

### Embedded Competitions (17 files)
All competition data is embedded in `App.jsx` - no external files needed!

Click "🏆 Load All Competitions" button to load all data.

---

## Support

### Common Commands
```bash
npm install          # Install dependencies
npm start           # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

### File Sizes
- `App.jsx`: ~9,000 lines (~350KB)
- Total bundle: ~2MB (including all dependencies)

---

## Next Steps

1. ✅ Load all 17 competitions
2. ✅ Parse the data
3. ✅ Review flagged records
4. ✅ Finalize to database
5. ✅ Explore Reports and Athletes tabs

Enjoy managing Estonian archery data! 🏹
