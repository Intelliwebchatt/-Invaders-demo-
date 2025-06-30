# Kelley Accounting Website Setup Guide

## 📁 File Structure

Create the following folder structure on your computer or server:

```
kelley-accounting-website/
├── index.html          (Home page)
├── about.html           (About page) 
├── services.html        (Services page)
├── contact.html         (Contact page)
├── resources.html       (Future - Resources page)
├── sw.js               (Service worker for PWA)
├── manifest.json       (PWA manifest)
├── css/
│   └── styles.css      (Future - External CSS file)
├── js/
│   └── main.js         (Future - External JavaScript)
└── images/
    ├── icon-192.png    (PWA icon 192x192)
    ├── icon-512.png    (PWA icon 512x512)
    └── logo.svg        (Company logo)
```

## 🚀 Quick Start

### Option 1: Simple Local Setup
1. Create a new folder called `kelley-accounting-website`
2. Save each HTML file in the root of this folder:
   - `index.html` (Home page)
   - `about.html` (About page)
   - `services.html` (Services page)
   - `contact.html` (Contact page)
3. Save the service worker as `sw.js`
4. Save the manifest as `manifest.json`
5. Double-click `index.html` to open in your browser

### Option 2: Local Development Server
For the best experience (PWA features, proper navigation):

**Using Python (recommended):**
```bash
cd kelley-accounting-website
python -m http.server 8000
```
Then visit: `http://localhost:8000`

**Using Node.js:**
```bash
npm install -g http-server
cd kelley-accounting-website
http-server
```

**Using PHP:**
```bash
cd kelley-accounting-website
php -S localhost:8000
```

## ✅ Navigation Fix Summary

### What Was Fixed:
1. **Changed all navigation links** from `/about` to `about.html` format
2. **Added working mobile menu** with hamburger animation
3. **Fixed internal links** throughout all pages
4. **Added proper breadcrumb navigation**
5. **Created functional contact form** with validation

### Working Features:
- ✅ **Desktop Navigation**: All links work between pages
- ✅ **Mobile Menu**: Hamburger menu slides out with working links
- ✅ **Dark/Light Theme**: Toggle works and persists across pages
- ✅ **Contact Form**: Functional form with validation
- ✅ **PWA Features**: Service worker, offline support, installable
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **SEO Optimized**: Meta tags, structured data, local SEO

## 🔧 Customization Guide

### Update Company Information
1. **Phone Number**: Replace `(334) 285-7231` throughout all files
2. **Address**: Update `3348 Main Street, Millbrook, Alabama 36054`
3. **Email**: Change `info@kelleyaccounting.com` to your email
4. **Names**: Replace "Al Kelley" and "Kathy Kelley" with actual names

### Add Real Images
Replace placeholder image URLs with your own:
- Team photos (Al & Kathy)
- Office exterior/interior photos
- Professional headshots
- Company logo

### Contact Form Integration
The contact form currently shows a demo message. To make it functional:

1. **Email Service**: Integrate with services like:
   - Netlify Forms (free)
   - Formspree
   - EmailJS
   - Custom server endpoint

2. **Example Netlify Forms Integration**:
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <!-- rest of form fields -->
</form>
```

### Google Maps Integration
Replace the map placeholder in `contact.html`:
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.123..." 
  width="100%" 
  height="400" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
```

## 🌐 Deployment Options

### Free Hosting Options:
1. **Netlify** (Recommended)
   - Drag and drop folder to deploy
   - Free SSL certificate
   - Form handling included
   - Custom domain support

2. **GitHub Pages**
   - Free hosting for static sites
   - Automatic deployments from Git

3. **Vercel**
   - Fast deployment
   - Excellent performance

### Paid Hosting Options:
- Shared hosting (GoDaddy, Bluehost, etc.)
- Cloud hosting (AWS, Google Cloud, etc.)

## 📱 PWA Features

The website includes Progressive Web App features:
- **Installable**: Users can install it like a native app
- **Offline Support**: Basic pages work without internet
- **Fast Loading**: Cached resources load instantly
- **Mobile Optimized**: App-like experience on mobile

## 🔍 SEO Features

- **Local SEO**: Optimized for Millbrook, Alabama searches
- **Structured Data**: Schema.org markup for search engines
- **Meta Tags**: Proper titles and descriptions
- **Open Graph**: Social media sharing optimization
- **Mobile-First**: Google's preferred approach

## 🎨 Design System

### Colors:
- **Primary Green**: #2E7D4A
- **Primary Blue**: #1E3B82  
- **Accent Gold**: #D4AF37
- **Text Dark**: #1A202C
- **Background**: #F7FAFC

### Fonts:
- **Headings**: Playfair Display
- **Body Text**: Inter

## 📞 Support

If you need help with:
- Setting up the website
- Customizing content
- Adding features
- Deploying to hosting

Feel free to ask for additional assistance!

## 🔄 Next Steps

1. **Save all files** in the correct structure
2. **Test locally** using a development server
3. **Customize content** with your information
4. **Add real images** and contact details
5. **Deploy to hosting** service
6. **Set up contact form** integration
7. **Add Google Maps** embed
8. **Test on mobile devices**

## 📋 File Checklist

- [ ] index.html (Home page)
- [ ] about.html (About page)
- [ ] services.html (Services page)  
- [ ] contact.html (Contact page)
- [ ] sw.js (Service worker)
- [ ] manifest.json (PWA manifest)
- [ ] Create folders: css/, js/, images/
- [ ] Test navigation between pages
- [ ] Test mobile menu functionality
- [ ] Verify theme toggle works
- [ ] Test contact form
- [ ] Update company information
- [ ] Add real images
- [ ] Deploy to hosting

Your professional accounting website is now ready with working navigation, mobile menu, and all the modern features clients expect!
