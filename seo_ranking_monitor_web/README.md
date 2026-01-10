# SEO Ranking Monitor - Google Play Store

Static Single Page Application (SPA) for monitoring app rankings on Google Play Store search results.

## 🚀 Features

- **App Information Fetching**: Automatically retrieves app title, description, and icon from Google Play Store
- **Ranking Monitoring**: Checks app position in search results for up to 10 custom search terms
- **Location Support**: Search rankings for different countries/regions
- **Color-Coded Results**: 
  - 🟢 Green: Positions 1-5
  - 🔵 Blue: Positions 6-14
  - 🟡 Yellow: Positions 15-100
  - 🔴 Red: Not found
- **Responsive Design**: Optimized for desktop and mobile devices
- **Ad-Ready**: Pre-configured spaces for advertisements

## 📦 What You Need

1. A **package name** (e.g., `com.example.myapp`)
2. A **location** (country code)
3. Up to **10 search terms** to monitor

## 🌐 Deployment to GitHub Pages

### Option 1: Direct Upload

1. Create a new repository on GitHub
2. Upload these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. Go to repository Settings → Pages
4. Select "Deploy from a branch"
5. Choose `main` branch and `/ (root)` folder
6. Click Save

### Option 2: Using Git

```bash
# Initialize git repository
git init

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then follow steps 3-6 from Option 1.

## ⚠️ CORS Considerations

Since this is a static site fetching data from Google Play Store, we use a CORS proxy. The app is configured with `corsproxy.io` by default for faster performance.

### Alternative CORS Proxies

If you experience issues, you can change the proxy in [app.js](app.js):

```javascript
// Current (line ~19) - FASTEST
const CORS_PROXY = 'https://corsproxy.io/?';

// Alternatives (slower but more reliable):
// const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
// const CORS_PROXY = 'https://api.codetabs.com/v1/proxy?quest=';
```

**Performance Note**: The speed of searches heavily depends on the CORS proxy used. `corsproxy.io` is typically the fastest, completing searches in 3-5 seconds for 10 terms.

### Self-Hosted CORS Proxy (Recommended for Production)

For better reliability, consider hosting your own CORS proxy:

1. **Using Cloudflare Workers** (Free tier available):
   ```javascript
   addEventListener('fetch', event => {
     event.respondWith(handleRequest(event.request))
   })

   async function handleRequest(request) {
     const url = new URL(request.url)
     const targetUrl = url.searchParams.get('url')
     
     if (!targetUrl) {
       return new Response('Missing url parameter', { status: 400 })
     }

     const response = await fetch(targetUrl, {
       headers: {
         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140'
       }
     })

     const newResponse = new Response(response.body, response)
     newResponse.headers.set('Access-Control-Allow-Origin', '*')
     
     return newResponse
   }
   ```

2. **Using Vercel/Netlify Functions**: Create a serverless function to proxy requests

## 🎨 Customization

### Colors

Edit [styles.css](styles.css) to change color scheme:

```css
/* Primary color (buttons, headers) */
.btn-primary {
    background: #667eea; /* Change this */
}

/* Ranking colors */
.rank-green { background-color: #e8f5e9; color: #2e7d32; }
.rank-blue { background-color: #e3f2fd; color: #1565c0; }
.rank-yellow { background-color: #fff9c4; color: #f57f17; }
.rank-not-found { background-color: #ffebee; color: #c62828; }
```

### Ad Spaces

Replace ad placeholders in [index.html](index.html) with your ad code:

```html
<!-- Example: Side ad -->
<aside class="side-ad left-ad">
    <!-- Replace this div with your ad code -->
    <div class="ad-placeholder">Anúncio Lateral Esquerdo</div>
</aside>
```

### Supported Countries

Currently configured countries (can be extended in [index.html](index.html)):

- América Latina: Brasil, Argentina, Chile, Colombia, México, Peru, Paraguay, Uruguay, Venezuela
- América do Norte: Estados Unidos, Canadá
- Europa: Portugal, Espanha, Reino Unido, Alemanha, França, Itália

## 🔧 Technical Details

### File Structure

```
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── app.js          # Application logic and API calls
├── README.md       # This file
├── example.gs      # Original Google Apps Script reference
└── ranking_service.dart  # Original Dart service reference
```

### How It Works

1. **User Input**: Collects package name, location, and search terms
2. **App Metadata Fetch**: 
   - Fetches app page from Google Play Store
   - Extracts title, description, and icon using regex
3. **Ranking Check**:
   - For each search term, performs a Play Store search
   - Parses HTML to find all app links
   - Determines position of target app (1-100+ or "Not Found")
4. **Display Results**: 
   - Shows app information
   - Color-codes rankings based on position
   - Adapts layout for mobile/desktop

### Based On

This implementation follows the logic from `example.gs` (Google Apps Script) which was originally designed for Google Sheets automation.

## 📱 Responsive Behavior

- **Desktop (>768px)**: 
  - Form hidden after search, accessible via "Realizar Nova Busca" button
  - Side ads visible
  - Footer ad visible
  - Results in table format

- **Mobile (<768px)**:
  - Form hidden after search, accessible via "Realizar Nova Busca" button
  - Mobile bottom ad visible
  - Side and footer ads hidden
  - Results in two-column format

## 🐛 Troubleshooting

### "CORS error" in console

The app needs a CORS proxy to fetch from Google Play. Try:
1. Using a different proxy (see CORS section above)
2. Setting up your own proxy
3. Checking if the proxy service is operational

### "Não foi possível obter as informações do app"

- Verify the package name is correct
- Check if the app exists in the selected region
- Ensure the app is published (not in draft/testing)

### Ranking shows "NF" (Not Found)

- App may not appear in top 100+ results for that search term
- Try more specific search terms
- Verify the app is available in the selected country

### Slow performance

- **Main cause**: CORS proxy speed varies significantly
- **Solution**: Use `corsproxy.io` (default) for fastest results
- Each search term requires a separate API call with 300ms delay between requests
- Expected time: 3-5 seconds for 10 terms with corsproxy.io
- For production: Set up your own CORS proxy for consistent performance (see above)

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

**Built with ❤️ for app developers who want to monitor their SEO rankings**
