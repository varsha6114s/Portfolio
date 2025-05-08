// Import dependencies
import * as THREE from 'three';
import './styles/main.css';

// Debug logging
console.log('Initializing portfolio...');

// Initialize variables
let scene, camera, renderer, particles;
let isDarkMode = false;
const particleCount = 3000; // Increased particle count

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing...');
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
    camera.position.z = 50; // Moved camera back for better view

    // Create renderer
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }

    renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Make background transparent

    // Create particles
    createParticles();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
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
                x: mouseY * 0.2, // Increased rotation effect
                y: mouseX * 0.2,
                duration: 2
            });
        }
    });

    console.log('Three.js setup complete');
    // Start animation loop
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();
    const isDarkMode = document.body.classList.contains('dark');

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Create a sphere of particles
        const radius = 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Set colors based on theme
        if (isDarkMode) {
            color.setHSL(0.6, 0.8, 0.5 + Math.random() * 0.2);
        } else {
            color.setHSL(0.6, 0.8, 0.3 + Math.random() * 0.2);
        }
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.2, // Increased particle size
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending // Add additive blending for better visibility
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
    }
    renderer.render(scene, camera);
}

function setupThemeToggle() {
    console.log('Setting up theme toggle...');
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.body.classList.remove('dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update icons
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
        
        // Update particle colors
        updateParticleColors();
    });

    console.log('Theme toggle setup complete');
}

function updateParticleColors() {
    if (!particles) return;
    
    const colors = particles.geometry.attributes.color.array;
    const color = new THREE.Color();
    const isDark = document.body.classList.contains('dark');
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        if (isDark) {
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