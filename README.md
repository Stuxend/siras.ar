# SIRAS Landing Page

A modern, responsive single-page application (SPA) landing page for **SIRAS** (Security Incident Response Automated Simulations). Built with HTML, CSS, and JavaScript, featuring a developer-friendly dark theme and comprehensive functionality.

## 🚀 Features

### Design & UX
- **Modern Dark Theme**: Developer-friendly aesthetic with cyberpunk-inspired colors
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: CSS transitions and JavaScript-powered animations
- **Interactive Terminal**: Animated terminal window showcasing SIRAS CLI usage
- **Parallax Effects**: Subtle parallax scrolling for enhanced visual appeal

### Functionality
- **Email Collection**: Dual email subscription forms (hero and footer)
- **Form Validation**: Real-time email validation with user feedback
- **Notification System**: Toast notifications for user interactions
- **Smooth Scrolling**: Navigation with smooth scroll to sections
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Keyboard Shortcuts**: Ctrl/Cmd+K to focus email input, Escape to close notifications

### Performance & SEO
- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation support
- **PWA Ready**: Service worker registration for offline capabilities

## 📁 Project Structure

```
siras-landing/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🛠️ Setup & Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Quick Start

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Or serve locally** using a web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

4. **Visit** `http://localhost:8000` in your browser

## 🎨 Customization

### Colors & Theme

The color scheme is defined using CSS custom properties in `styles.css`:

```css
:root {
    --bg-primary: #0a0a0a;        /* Main background */
    --bg-secondary: #111111;      /* Secondary background */
    --accent-primary: #00d4ff;    /* Primary accent (cyan) */
    --accent-secondary: #ff6b35;  /* Secondary accent (orange) */
    --text-primary: #ffffff;      /* Primary text */
    --text-secondary: #a0a0a0;    /* Secondary text */
}
```

### Content Updates

#### Hero Section
Edit the hero content in `index.html`:

```html
<h1 class="hero-title">
    <span class="gradient-text">SIRAS</span>
</h1>
<h2 class="hero-tagline">Automate, Simulate, Respond.</h2>
<p class="hero-description">
    SIRAS helps security teams simulate real-world cyber incidents...
</p>
```

#### Features Section
Update features in the features grid:

```html
<div class="feature-card">
    <div class="feature-icon">
        <i class="fas fa-book"></i>
    </div>
    <h3>Scenario Library</h3>
    <p>Pre-built scenarios covering common attack vectors...</p>
</div>
```

#### Terminal Animation
Modify the terminal content in `index.html`:

```html
<div class="terminal-line">
    <span class="prompt">$</span>
    <span class="command">siras -s ransomware -b true</span>
</div>
```

### Email Integration

To connect real email collection, replace the mock API call in `script.js`:

```javascript
// Replace this section in handleEmailSubmission()
setTimeout(() => {
    // Your actual API call here
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, source: source })
    })
    .then(response => response.json())
    .then(data => {
        // Handle success
        showNotification('Welcome to SIRAS!', 'success');
    })
    .catch(error => {
        // Handle error
        showNotification('Something went wrong. Please try again.', 'error');
    });
}, 1500);
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 Key Sections

1. **Hero Section**: Main value proposition with email capture
2. **Why SIRAS**: Three key benefits with icons
3. **How it Works**: Step-by-step process explanation
4. **Features**: Six main features with descriptions
5. **SIRAS-SaaS Dashboard**: Interactive dashboard showcasing the SaaS platform
6. **Footer CTA**: Final call-to-action with social links

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📊 Analytics Integration

The landing page includes analytics tracking hooks. Replace the mock tracking in `script.js`:

```javascript
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track(eventName, properties);
    }
    
    // Custom analytics
    console.log('Event tracked:', eventName, properties);
}
```

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a GitHub repository
- **AWS S3**: Upload files to an S3 bucket

### Custom Domain
1. Purchase a domain (e.g., `siras.dev`)
2. Configure DNS to point to your hosting provider
3. Update any absolute URLs in the code

## 🔒 Security Considerations

- Email validation on both client and server side
- HTTPS required for production deployment
- Input sanitization for user-generated content
- CSRF protection for form submissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for icons
- **Inter Font** for typography
- **GitHub** for hosting the original SIRAS project
- **Security Community** for inspiration and feedback

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Email: [santi@siras.ar]

---

Built with ❤️ for the security community
