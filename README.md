# Portfolio Website

A modern, responsive portfolio website with dynamic animations and smooth scrolling navigation.

## Features

### ✨ **Dynamic Animations**
- Smooth fade-in and slide-in effects
- Typing animation in hero section
- Floating shapes with parallax scrolling
- Animated skill bars and counters
- Hover effects on cards and buttons

### 🧭 **Professional Navigation**
- Fixed navbar with blur effect
- Active link highlighting
- Smooth scrolling to sections
- Mobile-responsive hamburger menu
- Auto-hide navbar on scroll down

### 📱 **Projects Section**
- Filterable project gallery
- Category-based filtering (All, Web Apps, Mobile, Design)
- Hover overlays with project links
- Technology tags for each project
- Responsive grid layout

### 🎨 **Modern Design**
- Clean, professional layout
- Beautiful gradient backgrounds
- Card-based design elements
- Responsive design for all devices
- Optimized for mobile viewing

## Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **Customize content**: Edit the HTML file to add your personal information
3. **Modify styles**: Adjust colors and layouts in `styles.css`
4. **Add functionality**: Extend features in `script.js`

## Customization Guide

### Personal Information
Edit these sections in `index.html`:

- **Hero Section**: Update name, title, and description
- **About Section**: Add your background and experience
- **Skills Section**: Modify technologies and skill levels
- **Projects Section**: Add your actual projects
- **Contact Section**: Update your contact details

### Projects Section
To add a new project:

```html
<div class="project-card" data-category="web">
    <div class="project-image">
        <img src="your-image-url" alt="Project Name">
        <div class="project-overlay">
            <div class="project-links">
                <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                <a href="#" class="project-link"><i class="fab fa-github"></i></a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Project description here...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

### Colors and Styling
Main colors can be changed in `styles.css`:

- **Primary Color**: `#4f46e5` (Purple-blue)
- **Secondary Colors**: Various shades for backgrounds and text
- **Gradients**: Hero section uses a purple gradient

### Skills Section
Update skill percentages by changing the `data-width` attribute:

```html
<div class="skill-progress" data-width="90%"></div>
```

### Adding New Sections
1. Add HTML section with appropriate ID
2. Add navigation link in the navbar
3. Style the section in CSS
4. Add any JavaScript functionality needed

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Internet Explorer 11+ (with some limitations)

## Performance Features

- Optimized animations using CSS transforms
- Intersection Observer for scroll animations
- Lazy loading of animations
- Efficient event handling
- Minimal external dependencies

## Dependencies

- **Font Awesome**: Icons (loaded via CDN)
- **Google Fonts**: Modern typography (optional, loads system fonts as fallback)

## Tips for Customization

1. **Images**: Replace placeholder images with your actual project screenshots
2. **Links**: Update all `href="#"` with actual URLs
3. **Contact Form**: Connect to your preferred form handling service
4. **SEO**: Add meta tags, descriptions, and Open Graph data
5. **Analytics**: Add Google Analytics or other tracking codes

## Live Demo

Open `index.html` in your browser to see the portfolio in action!

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding!** 🚀

For any questions or customization help, feel free to reach out.
