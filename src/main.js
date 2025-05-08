// Import dependencies
import * as THREE from 'three';
import './styles/main.css';

// Debug logging
console.log('Initializing portfolio...');

// Initialize variables
let scene, camera, renderer, particles;
let isDarkMode = false;
const particleCount = 2000; // Reduced for better performance

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    if (typeof gsap === 'undefined') {
        console.error('GSAP not loaded!');
        return;
    }
    initThreeJS();
    setupThemeToggle();
    setupMobileMenu();
    setupSmoothScroll();
});

function initThreeJS() {
    console.log('Setting up Three.js...');
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Create renderer
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }
    console.log('Canvas found:', canvas);

    renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create particles
    createParticles();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Handle mouse movement
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        if (particles) {
            gsap.to(particles.rotation, {
                x: mouseY * 0.5,
                y: mouseX * 0.5,
                duration: 2
            });
        }
    });

    console.log('Three.js setup complete');
    // Start animation loop
    animate();
}

function createParticles() {
    console.log('Creating particles...');
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();
    const isDarkMode = document.body.classList.contains('dark');

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Create a sphere of particles
        const radius = 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Set colors based on theme
        if (isDarkMode) {
            color.setHSL(0.6, 1, 0.7); // Brighter colors for dark mode
        } else {
            color.setHSL(0.6, 1, 0.5); // Brighter colors for light mode
        }
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.5, // Larger particles
        vertexColors: true,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    console.log('Particles created and added to scene');
}

function animate() {
    requestAnimationFrame(animate);
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.001;
    }
    renderer.render(scene, camera);
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        body.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Update particle colors based on theme
    if (particles) {
        const colors = particles.geometry.attributes.color.array;
        const color = new THREE.Color();
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            if (isDark) {
                color.setHSL(0.6, 0.8, 0.5 + Math.random() * 0.2); // Brighter colors for dark mode
            } else {
                color.setHSL(0.6, 0.8, 0.3 + Math.random() * 0.2); // Darker colors for light mode
            }
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        particles.geometry.attributes.color.needsUpdate = true;
    }
}

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDarkScheme.matches);
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    setTheme(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches);
    }
});

function setupMobileMenu() {
    console.log('Setting up mobile menu...');
    const menuButton = document.querySelector('.md\\:hidden');
    const navLinks = document.querySelector('.hidden.md\\:flex');
    
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('flex-col');
            navLinks.classList.toggle('absolute');
            navLinks.classList.toggle('top-16');
            navLinks.classList.toggle('left-0');
            navLinks.classList.toggle('right-0');
            navLinks.classList.toggle('bg-white');
            navLinks.classList.toggle('dark:bg-dark-gray');
            navLinks.classList.toggle('p-4');
        });
    }
    console.log('Mobile menu setup complete');
}

function setupSmoothScroll() {
    console.log('Setting up smooth scroll...');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    console.log('Smooth scroll setup complete');
}

// Update particle color on theme change
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            if (particles) {
                const colors = particles.geometry.attributes.color.array;
                const color = new THREE.Color();
                
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    if (document.body.classList.contains('dark')) {
                        color.setHSL(0.6, 0.8, 0.5 + Math.random() * 0.2);
                    } else {
                        color.setHSL(0.6, 0.8, 0.3 + Math.random() * 0.2);
                    }
                    colors[i3] = color.r;
                    colors[i3 + 1] = color.g;
                    colors[i3 + 2] = color.b;
                }
                particles.geometry.attributes.color.needsUpdate = true;
            }
        }
    });
});

observer.observe(document.body, { attributes: true }); 