# Machine Learning Portfolio Website

A modern, interactive portfolio website built with HTML, CSS, JavaScript, and Three.js. This README provides detailed information about the website structure and how to make changes.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Getting Started](#getting-started)
3. [Making Changes](#making-changes)
4. [Components Guide](#components-guide)
5. [Styling Guide](#styling-guide)
6. [Theme Customization](#theme-customization)
7. [Adding Skills and Icons](#adding-skills-and-icons)
8. [Project Updates Guide](#project-updates-guide)
9. [Deployment Guide](#deployment-guide)
10. [Troubleshooting](#troubleshooting)

## Project Structure
```
portfolio/
├── index.html          # Main HTML file with all content
├── src/
│   ├── main.js         # JavaScript for animations and theme
│   ├── styles/
│   │   └── main.css    # Custom styles
│   └── assets/         # Images and other assets
├── package.json        # Project dependencies
└── vite.config.js      # Vite configuration
```

## Getting Started

1. **Installation**
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

2. **Access the Website**
   - Open http://localhost:3000 in your browser
   - The development server will automatically reload when you make changes

## Making Changes

### 1. Text Content Changes
All text content is in `index.html`. Here's how to modify different sections:

#### Hero Section
```html
<!-- Change Name -->
<h1 class="text-4xl md:text-5xl lg:text-6xl font-modern font-bold mb-4">Your Name</h1>

<!-- Change Title -->
<p class="text-xl md:text-2xl font-handwritten mb-6">Your Title</p>
```

#### About Section
```html
<!-- Change About Text -->
<p class="text-lg leading-relaxed mb-6">
    Your about text here...
</p>

<!-- Change Statistics -->
<div class="text-center">
    <h3 class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">2+</h3>
    <p class="text-sm">Years Experience</p>
</div>
```

#### Projects Section
```html
<!-- Modify Project Card -->
<div class="project-card group bg-white/5 dark:bg-purple-900/5 rounded-2xl p-6">
    <div class="project-content">
        <h3 class="text-xl font-bold mb-3">Project Title</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">Project description...</p>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30">Tag 1</span>
        </div>
        <a href="#" class="inline-block px-4 py-2 bg-purple-600">View Project</a>
    </div>
</div>
```

#### Contact Section
```html
<!-- Update Contact Information -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
<span>Your Phone Number</span>
<span>Your Location</span>

<!-- Update Social Links -->
<a href="your-github-url">GitHub</a>
<a href="your-linkedin-url">LinkedIn</a>
```

### 2. Styling Changes

#### Color Changes
The website uses Tailwind CSS classes for colors. Common color classes:
- Text: `text-purple-600`
- Background: `bg-purple-600`
- Border: `border-purple-600`

Color shades (400-900):
- 400: Lightest
- 600: Medium
- 900: Darkest

Example:
```html
<!-- Change text color -->
<h1 class="text-purple-600">Title</h1>

<!-- Change background color -->
<div class="bg-purple-600">Content</div>
```

#### Dark Mode Colors
Dark mode classes use the `dark:` prefix:
```html
<div class="text-purple-600 dark:text-purple-400">
    This text changes color in dark mode
</div>
```

### 3. Theme Customization

#### Background Colors
In `src/main.js`, find the `updateTheme` function:
```javascript
function updateTheme(isDark) {
    scene.background = isDark 
        ? new THREE.Color(0x0a0a1a) // Dark mode color
        : new THREE.Color(0xf3e8ff); // Light mode color
}
```

#### Particle Colors
```javascript
particles.forEach(particle => {
    if (isDark) {
        particle.material.color.setHex(0x4f46e5); // Dark mode particle color
    } else {
        particle.material.color.setHex(0x9333ea); // Light mode particle color
    }
});
```

### 4. Adding New Sections

1. Copy an existing section
2. Modify the content
3. Keep the same class structure
4. Add to the appropriate location in `index.html`

Example:
```html
<!-- New Section -->
<section id="new-section" class="py-20">
    <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">Section Title</h2>
        <div class="content">
            <!-- Your content here -->
        </div>
    </div>
</section>
```

## Components Guide

### 1. Navigation
- Theme toggle button
- Smooth scrolling to sections

### 2. Hero Section
- Profile picture
- Name and title
- Call-to-action buttons

### 3. About Section
- Personal description
- Statistics/achievements

### 4. Skills Section
- Skill cards with icons
- Progress bars

### 5. Projects Section
- Project cards
- Tags
- Links

### 6. Contact Section
- Contact form
- Social links
- Contact information

## Adding Skills and Icons

### 1. Adding New Skills
To add a new skill, use this template:
```html
<div class="skill-card group">
    <div class="skill-icon"><i class="fas fa-icon-name"></i></div>
    <h3 class="skill-title">Skill Name</h3>
    <div class="skill-progress">
        <div class="progress-bar" style="width: XX%"></div>
    </div>
</div>
```

### 2. Available Icons
The website uses Font Awesome icons. Here are some useful ML/AI related icons:

#### Common Icons
```html
<!-- Programming -->
<i class="fab fa-python"></i>      <!-- Python -->
<i class="fab fa-java"></i>        <!-- Java -->
<i class="fab fa-js"></i>          <!-- JavaScript -->
<i class="fab fa-r-project"></i>   <!-- R -->

<!-- ML/AI -->
<i class="fas fa-brain"></i>       <!-- AI/ML -->
<i class="fas fa-robot"></i>       <!-- Robotics -->
<i class="fas fa-network-wired"></i> <!-- Neural Networks -->
<i class="fas fa-chart-line"></i>  <!-- Data Analysis -->
<i class="fas fa-database"></i>    <!-- Database -->
<i class="fas fa-cloud"></i>       <!-- Cloud Computing -->
<i class="fas fa-server"></i>      <!-- Server -->
<i class="fas fa-code"></i>        <!-- Programming -->
<i class="fas fa-calculator"></i>  <!-- Statistics -->
<i class="fas fa-language"></i>    <!-- NLP -->
<i class="fas fa-eye"></i>         <!-- Computer Vision -->
```

### 3. Icon Categories
- `fas` - Solid icons (e.g., `fas fa-brain`)
- `fab` - Brand icons (e.g., `fab fa-python`)
- `far` - Regular icons (e.g., `far fa-chart-bar`)

## Project Updates Guide

### 1. Content Updates

#### Hero Section
```html
<!-- Update Name -->
<h1 class="text-4xl md:text-5xl lg:text-6xl font-modern font-bold mb-4">Your Name</h1>

<!-- Update Title -->
<p class="text-xl md:text-2xl font-handwritten mb-6">Your Title</p>

<!-- Update Profile Picture -->
<img src="./src/assets/images/your-image.jpg" alt="Your Name" class="rounded-full">
```

#### About Section
```html
<!-- Update About Text -->
<p class="text-lg leading-relaxed mb-6">
    Your about text here...
</p>

<!-- Update Statistics -->
<div class="text-center">
    <h3 class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">2+</h3>
    <p class="text-sm">Years Experience</p>
</div>
```

#### Projects Section
```html
<!-- Update Project Card -->
<div class="project-card group bg-white/5 dark:bg-purple-900/5 rounded-2xl p-6">
    <div class="project-content">
        <h3 class="text-xl font-bold mb-3">Project Title</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4">Project description...</p>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30">Tag 1</span>
        </div>
        <a href="#" class="inline-block px-4 py-2 bg-purple-600">View Project</a>
    </div>
</div>
```

### 2. Styling Updates

#### Colors
```html
<!-- Text Colors -->
text-purple-600      <!-- Light mode text -->
dark:text-purple-400 <!-- Dark mode text -->

<!-- Background Colors -->
bg-purple-600        <!-- Light mode background -->
dark:bg-purple-400   <!-- Dark mode background -->

<!-- Border Colors -->
border-purple-600    <!-- Light mode border -->
dark:border-purple-400 <!-- Dark mode border -->
```

#### Spacing
```html
<!-- Padding -->
p-6    <!-- All sides -->
px-4   <!-- Horizontal -->
py-2   <!-- Vertical -->

<!-- Margin -->
m-4    <!-- All sides -->
mx-2   <!-- Horizontal -->
my-3   <!-- Vertical -->
```

### 3. Theme Updates

#### Background Colors
In `src/main.js`:
```javascript
function updateTheme(isDark) {
    scene.background = isDark 
        ? new THREE.Color(0x0a0a1a) // Dark mode color
        : new THREE.Color(0xf3e8ff); // Light mode color
}
```

#### Particle Colors
```javascript
particles.forEach(particle => {
    if (isDark) {
        particle.material.color.setHex(0x4f46e5); // Dark mode particle color
    } else {
        particle.material.color.setHex(0x9333ea); // Light mode particle color
    }
});
```

### 4. Adding New Sections

#### Basic Section Template
```html
<section id="new-section" class="py-20">
    <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">Section Title</h2>
        <div class="content">
            <!-- Your content here -->
        </div>
    </div>
</section>
```

### 5. Contact Information Updates

#### Update Contact Details
```html
<!-- Email -->
<a href="mailto:your.email@example.com">your.email@example.com</a>

<!-- Phone -->
<span>Your Phone Number</span>

<!-- Location -->
<span>Your Location</span>

<!-- Social Links -->
<a href="your-github-url">GitHub</a>
<a href="your-linkedin-url">LinkedIn</a>
```

### 6. Development Commands

```bash
# Start development server
npm run dev

# Stop server
Ctrl + C

# Clear cache and restart
npm run dev -- --force

# Build for production
npm run build
```

### 7. Testing Changes
1. Save the file you modified
2. The development server will automatically reload
3. Check http://localhost:3000 to see your changes
4. Use browser developer tools (Cmd + Option + J on Mac) to:
   - Inspect elements
   - Test responsive design
   - Check for errors

## Deployment Guide

### 1. Local Development
To run the website locally:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access the website at http://localhost:3000
```

### 2. Building for Production
To create a production build:
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### 3. Deploying to GitHub Pages
1. Create a GitHub repository
2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repository-url
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select main branch as source
   - Save changes

4. Your site will be available at: `https://your-username.github.io/repository-name`

### 4. Deploying to Netlify
1. Create a Netlify account
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy site

### 5. Deploying to Vercel
1. Create a Vercel account
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

### 6. Continuous Deployment
For automatic deployments:
1. Connect your repository to your chosen platform
2. Configure build settings
3. Enable automatic deployments
4. Your site will update automatically when you push changes

### 7. Custom Domain Setup
1. Purchase a domain from a provider (e.g., Namecheap, GoDaddy)
2. Add DNS records:
   - Add A record pointing to platform IP
   - Add CNAME record for www subdomain
3. Configure SSL certificate
4. Update platform settings with your domain

### 8. Environment Variables
For sensitive data:
1. Create `.env` file:
```env
VITE_API_KEY=your_api_key
VITE_API_URL=your_api_url
```

2. Access in code:
```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

### 9. Performance Optimization
1. Enable compression
2. Configure caching
3. Optimize images
4. Enable CDN
5. Monitor performance

### 10. Maintenance
Regular tasks:
1. Update dependencies:
```bash
npm update
```

2. Check for security vulnerabilities:
```bash
npm audit
```

3. Monitor website performance
4. Backup data regularly
5. Keep SSL certificate updated

## Troubleshooting

### Common Issues

1. **Changes Not Showing**
   - Clear browser cache
   - Restart development server
   - Check browser console for errors

2. **Theme Toggle Not Working**
   - Check browser console
   - Verify theme toggle button exists
   - Check JavaScript console logs

3. **Images Not Loading**
   - Verify image paths
   - Check image format
   - Ensure images are in the correct directory

### Development Server Commands
```bash
# Start server
npm run dev

# Stop server
Ctrl + C

# Clear cache and restart
npm run dev -- --force
```

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide)

## Support

If you need help making changes or encounter issues:
1. Check the browser console for errors
2. Verify file paths and names
3. Ensure all dependencies are installed
4. Check for syntax errors in HTML/JavaScript

Remember to:
- Keep backups of your files
- Make small changes and test frequently
- Use version control (git) to track changes
- Test in different browsers 
