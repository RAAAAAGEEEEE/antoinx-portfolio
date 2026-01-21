// Extract project ID from URL
function getProjectIdFromUrl() {
    const path = window.location.pathname;
    const match = path.match(/project-(\d+)/);
    return match ? parseInt(match[1]) : null;
}

// Initialize theme
function initTheme() {
    try {
        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {
            console.warn('localStorage not accessible:', e);
        }
        const theme = savedTheme || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    } catch (error) {
        console.warn('Theme initialization failed:', error);
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// Setup theme toggle
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);

            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                console.warn('Could not save theme to localStorage:', e);
            }
        } catch (error) {
            console.error('Theme toggle failed:', error);
        }
    });
}

// Get current language
function getCurrentLanguage() {
    return window.i18n ? window.i18n.currentLanguage : 'fr';
}

// Populate project details
function loadProjectDetails() {
    const projectId = getProjectIdFromUrl();

    if (!projectId || !projectsDetails[projectId]) {
        document.body.innerHTML = '<div class="container"><p>Projet non trouvé.</p></div>';
        return;
    }

    const project = projectsDetails[projectId];
    const lang = getCurrentLanguage();

    // Update page title
    const title = project[`title_${lang}`] || project.title_fr;
    document.title = `${title} - antoinx`;

    // Hero section
    document.getElementById('project-type').textContent = project[`type_${lang}`] || project.type_fr;
    document.getElementById('project-title').textContent = title;
    document.getElementById('project-subtitle').textContent = project[`hero_subtitle_${lang}`] || project.hero_subtitle_fr;

    // Status badge
    const statusEl = document.getElementById('project-status');
    const statusText = project.status === 'in-progress'
        ? (lang === 'en' ? 'In Progress' : 'En cours')
        : (lang === 'en' ? 'Upcoming' : 'À venir');
    statusEl.textContent = statusText;
    statusEl.className = `status-badge ${project.status === 'in-progress' ? 'in-progress' : 'upcoming'}`;

    // Content sections
    document.getElementById('about-title').textContent = lang === 'en' ? 'About' : 'À propos';
    document.getElementById('project-description').textContent = project[`long_description_${lang}`] || project.long_description_fr;

    document.getElementById('features-title').textContent = lang === 'en' ? 'Features' : 'Caractéristiques';
    const featuresList = document.getElementById('features-list');
    const features = project[`features_${lang}`] || project.features_fr;
    featuresList.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');

    // Tech stack
    document.getElementById('tech-title').textContent = lang === 'en' ? 'Tech Stack' : 'Stack Technique';
    const techTags = document.getElementById('tech-tags');
    techTags.innerHTML = project.tech_stack.map(tech => `<div class="tech-tag">${tech}</div>`).join('');

    // Timeline
    document.getElementById('timeline-title').textContent = lang === 'en' ? 'Timeline' : 'Timeline';
    document.getElementById('project-timeline').textContent = project[`timeline_${lang}`] || project.timeline_fr;

    // CTA Button
    const ctaBtn = document.getElementById('project-cta');
    ctaBtn.textContent = project[`cta_text_${lang}`] || project.cta_text_fr;
    ctaBtn.addEventListener('click', () => {
        window.location.href = 'mailto:contact@antoinx.com';
    });

    // Back button text
    const backBtn = document.getElementById('back-link');
    if (backBtn) {
        backBtn.textContent = lang === 'en' ? '← Back to portfolio' : '← Retour au portfolio';
    }
}

// Setup language observer to reload on language change
function setupLanguageObserver() {
    if (!window.i18n) return;

    const originalSetLanguage = window.i18n.setLanguage.bind(window.i18n);
    window.i18n.setLanguage = function(lang) {
        originalSetLanguage(lang);
        loadProjectDetails();
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggle();

    // Wait for i18n to be ready
    setTimeout(() => {
        setupLanguageObserver();
        loadProjectDetails();
    }, 100);
});
