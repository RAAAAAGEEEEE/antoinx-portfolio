// Projets de démonstration
const projects = [
    {
        id: 1,
        title_fr: "Mobile Fit Tracker",
        title_en: "Mobile Fit Tracker",
        description_fr: "Application mobile de suivi fitness avec IA pour personnaliser les plans d'entraînement.",
        description_en: "Mobile fitness tracking app with AI to personalize workout plans.",
        type_fr: "App Mobile",
        type_en: "Mobile App",
        status: "in-progress",
        link: "#"
    },
    {
        id: 2,
        title_fr: "AutoFlow SaaS",
        title_en: "AutoFlow SaaS",
        description_fr: "Plateforme SaaS d'automatisation de workflows avec intégration IA pour optimiser les processus.",
        description_en: "SaaS platform for workflow automation with AI integration to optimize processes.",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "in-progress",
        link: "#"
    },
    {
        id: 3,
        title_fr: "AI Content Generator",
        title_en: "AI Content Generator",
        description_fr: "Outil de génération de contenu alimenté par IA, optimisé pour vibecoding et productivité.",
        description_en: "AI-powered content generation tool, optimized for vibecoding and productivity.",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "in-progress",
        link: "#"
    },
    {
        id: 4,
        title_fr: "Smart Home Automation",
        title_en: "Smart Home Automation",
        description_fr: "Système d'automatisation intelligente pour maison connectée avec contrôle par IA.",
        description_en: "Smart home automation system with AI-powered control.",
        type_fr: "Automatisation",
        type_en: "Automation",
        status: "upcoming",
        link: "#"
    },
    {
        id: 5,
        title_fr: "Real-time Analytics Dashboard",
        title_en: "Real-time Analytics Dashboard",
        description_fr: "Dashboard analytique en temps réel pour visualiser et analyser les données avec IA.",
        description_en: "Real-time analytics dashboard to visualize and analyze data with AI.",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "upcoming",
        link: "#"
    },
    {
        id: 6,
        title_fr: "Video Editor Mobile",
        title_en: "Video Editor Mobile",
        description_fr: "Éditeur vidéo mobile avec assistance IA pour montage automatique et effets intelligents.",
        description_en: "Mobile video editor with AI assistance for automatic editing and smart effects.",
        type_fr: "App Mobile",
        type_en: "Mobile App",
        status: "upcoming",
        link: "#"
    },
    {
        id: 7,
        title_fr: "Email Marketing Automation",
        title_en: "Email Marketing Automation",
        description_fr: "Plateforme d'email marketing avec automatisation IA et personnalisation avancée.",
        description_en: "Email marketing platform with AI automation and advanced personalization.",
        type_fr: "Automatisation",
        type_en: "Automation",
        status: "in-progress",
        link: "#"
    },
    {
        id: 8,
        title_fr: "Code Assistant App",
        title_en: "Code Assistant App",
        description_fr: "Assistant de codage mobile avec IA pour suggestions et optimisation de code en vibecoding.",
        description_en: "Mobile coding assistant with AI for code suggestions and optimization in vibecoding.",
        type_fr: "App Mobile",
        type_en: "Mobile App",
        status: "upcoming",
        link: "#"
    }
];

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setTimeout(() => {
        renderFeaturedProjects();
        renderAllProjects();
        setupFilterButtons();
        setupNewsletterForm();
        setupThemeToggle();
    }, 100);
});

// ===== THEME TOGGLE =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// ===== GET CURRENT LANGUAGE =====
function getCurrentLanguage() {
    return window.i18n ? window.i18n.currentLanguage : 'fr';
}

// ===== FEATURED PROJECTS =====
function renderFeaturedProjects() {
    const featured = projects.slice(0, 3);
    const container = document.getElementById('featured-projects');
    if (!container) return;
    
    container.innerHTML = featured.map(project => createProjectCard(project)).join('');
}

// ===== ALL PROJECTS =====
function renderAllProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    container.innerHTML = projects.map(project => createProjectCard(project)).join('');
}

// ===== CREATE PROJECT CARD =====
function createProjectCard(project) {
    const lang = getCurrentLanguage();
    const title = project[`title_${lang}`] || project.title_fr;
    const description = project[`description_${lang}`] || project.description_fr;
    const type = project[`type_${lang}`] || project.type_fr;
    
    const statusKey = project.status === 'in-progress' ? 'status.in-progress' : 'status.upcoming';
    const statusText = window.i18n ? window.i18n.getTranslation(statusKey) : 
                      (project.status === 'in-progress' ? 'En cours' : 'À venir');
    const statusClass = project.status === 'in-progress' ? 'status-in-progress' : 'status-upcoming';
    
    return `
        <div class="project-card" data-status="${project.status}">
            <div class="project-header">
                <h3 class="project-title">${title}</h3>
                <span class="project-status ${statusClass}">${statusText}</span>
            </div>
            <span class="project-type">${type}</span>
            <p class="project-description">${description}</p>
            <a href="${project.link}" class="project-link">En savoir plus →</a>
        </div>
    `;
}

// ===== FILTER BUTTONS =====
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const cards = document.querySelectorAll('#projects-grid .project-card');
    
    cards.forEach(card => {
        if (filter === 'all') {
            card.classList.remove('hidden');
        } else {
            const cardStatus = card.dataset.status;
            card.classList.toggle('hidden', cardStatus !== filter);
        }
    });
}

// ===== NEWSLETTER FORM =====
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('.email-input');
        const email = emailInput.value;
        
        if (email && isValidEmail(email)) {
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '✓ Inscrit !';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                emailInput.value = '';
            }, 2000);
        }
    });
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Observateur pour re-rendre les projets lors du changement de langue
const originalSetLanguage = function() {
    if (window.i18n) {
        const oldSetLanguage = window.i18n.setLanguage.bind(window.i18n);
        window.i18n.setLanguage = function(lang) {
            oldSetLanguage(lang);
            renderFeaturedProjects();
            renderAllProjects();
        };
    }
};

document.addEventListener('DOMContentLoaded', originalSetLanguage);
