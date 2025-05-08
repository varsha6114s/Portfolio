// Import dependencies
import * as THREE from 'three';
import { gsap } from 'gsap';
import './styles/main.css';

// Debug logging
console.log('Three.js version:', THREE.REVISION);
console.log('GSAP version:', gsap.version);

// Initialize Three.js scene
let scene, camera, renderer, particles;
const particleCount = 2000;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Setting up theme toggle...');
    setupThemeToggle();
    console.log('Initializing Three.js scene...');
    initThreeJS();
    setupMobileMenu();
    setupSmoothScroll();
});

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Create renderer
    const canvas = document.getElementById('background-3d');
    renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: true,
        antialias: true 
    });
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

        gsap.to(particles.rotation, {
            x: mouseY * 0.1,
            y: mouseX * 0.1,
            duration: 2
        });
    });

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
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        updateSceneColors();
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const isDark = document.documentElement.classList.contains('dark');
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
    }

    // Initial icon state
    updateThemeIcon();
}

function updateSceneColors() {
    const isDark = document.documentElement.classList.contains('dark');
    if (scene) {
        scene.background = new THREE.Color(isDark ? '#1a1a1a' : '#ffffff');
        
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
}

function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

function setupSmoothScroll() {
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
} 