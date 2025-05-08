// Import dependencies
import * as THREE from 'three';
import { gsap } from 'gsap';
import './styles/main.css';

// Debug logging
console.log('Initializing portfolio...');

// Initialize Three.js scene
let scene, camera, renderer, particles;
const particleCount = 2000;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up...');
    initThreeJS();
    setupThemeToggle();
    setupMobileMenu();
    setupSmoothScroll();
});

function initThreeJS() {
    console.log('Initializing Three.js...');
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Create renderer
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    
    console.log('Canvas found, creating renderer...');
    renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: true,
        antialias: true 
    });
    
    // Set canvas size
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Set initial background color based on theme
    updateSceneColors();

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
                x: mouseY * 0.1,
                y: mouseX * 0.1,
                duration: 2
            });
        }
    });

    console.log('Three.js initialization complete');
    // Start animation loop
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();
    const isDarkMode = document.documentElement.classList.contains('dark');

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 50;
        positions[i3 + 1] = (Math.random() - 0.5) * 50;
        positions[i3 + 2] = (Math.random() - 0.5) * 50;

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
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
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
    const themeIcon = document.getElementById('theme-icon');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
    }
    
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        updateSceneColors();
        updateThemeIcon();
    });
    console.log('Theme toggle setup complete');
}

function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    sunIcon.classList.toggle('hidden', !isDark);
    moonIcon.classList.toggle('hidden', isDark);
}

function updateSceneColors() {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Update background color
    document.body.style.backgroundColor = isDark ? '#1a1a1a' : '#f8f9fa';
    
    // Update particle colors
    if (particles) {
        const colors = particles.geometry.attributes.color.array;
        const color = new THREE.Color();
        
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    console.log('Smooth scroll setup complete');
} 