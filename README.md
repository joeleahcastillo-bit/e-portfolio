# Jo's Personal Portfolio & Blog

A modern, responsive personal portfolio and blog website featuring a stunning purple galaxy theme with 3D animated starfield background.

## ✨ Features

### 🧍 About Section

- Clean and modern "About Me" page
- Profile picture with animated glow effect
- Social media links (GitHub, Twitter, LinkedIn, Email)
- Skills showcase with interactive cards
- Personal interests section

### 📰 Blog Section

- Dynamic blog listing page with card layout
- Individual blog post pages with full content
- Tag-based filtering system
- Blog data loaded from `data/blogs.json`
- Syntax highlighting for code blocks
- Social sharing functionality
- Responsive design for all devices

### 🖼️ Gallery Section

- Masonry grid layout for images
- Hover effects with smooth transitions
- Full-screen lightbox with navigation
- Keyboard controls (arrow keys, ESC)
- Gallery data loaded from `data/gallery.json`

### ✉️ Contact Page

- Beautiful contact form with validation
- Ready to integrate with form services (Formspree, Netlify Forms, etc.)
- Social media links
- Contact information display

### 🌌 Design & Aesthetics

- **Purple Galaxy Theme** - Dark, immersive background
- **3D Starfield Animation** - Dynamic particle system with mouse interaction
- **Glass Morphism** - Modern UI with frosted glass effects
- **Smooth Animations** - Fade-ins, transitions, and hover effects
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with modern features
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **JavaScript (Vanilla)** - No frameworks, just pure JS
- **Font Awesome** - Icon library
- **Highlight.js** - Code syntax highlighting

## 📁 Project Structure

```
jo-portfolio/
├── index.html              # About/Home page
├── blog.html               # Blog listing page
├── blog-template.html      # Individual blog post page
├── gallery.html            # Gallery page
├── contact.html            # Contact page
├── styles/
│   └── main.css           # Custom styles
├── scripts/
│   ├── starfield.js       # 3D starfield animation
│   ├── main.js            # Common functionality
│   ├── blog.js            # Blog listing logic
│   ├── blog-template.js   # Blog post display logic
│   ├── gallery.js         # Gallery and lightbox logic
│   └── contact.js         # Contact form logic
├── data/
│   ├── blogs.json         # Blog posts data
│   └── gallery.json       # Gallery images data
└── assets/
    └── profile.jpg        # Profile picture (add your own)
```

## 🚀 Getting Started

1. **Clone or download** this project
2. **Replace placeholder content**:

   - Add your profile picture to `assets/profile.jpg`
   - Update personal information in `index.html`
   - Update social media links in all HTML files
   - Add your blog posts to `data/blogs.json`
   - Add your gallery images to `data/gallery.json`

3. **Customize the contact form**:

   - Set up a form service (Formspree, Netlify Forms, etc.)
   - Update the form submission logic in `scripts/contact.js`

4. **Open `index.html`** in your browser to view the site

## 📝 Adding Blog Posts

Edit `data/blogs.json` and add new blog posts in this format:

```json
{
  "id": "unique-post-id",
  "title": "Your Blog Post Title",
  "description": "A short description of your post",
  "thumbnail": "https://example.com/image.jpg",
  "date": "2024-11-13",
  "readTime": "5 min read",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "content": "<h2>Your HTML content here</h2><p>...</p>"
}
```

## 🖼️ Adding Gallery Images

Edit `data/gallery.json` and add new images in this format:

```json
{
  "id": 1,
  "title": "Image Title",
  "description": "Image description",
  "url": "https://example.com/image.jpg",
  "category": "Category Name"
}
```

## 🎨 Customization

### Colors

The galaxy theme uses these primary colors:

- **Dark Background**: `#0a0014`
- **Purple**: `#5b21b6`
- **Pink**: `#ec4899`
- **Blue**: `#3b82f6`

You can customize colors in the Tailwind config section of each HTML file or in `styles/main.css`.

### Starfield Animation

Adjust starfield parameters in `scripts/starfield.js`:

- `numStars`: Number of stars (default: 800)
- `speed`: Animation speed (default: 0.5)
- Star colors and sizes

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
