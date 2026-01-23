// ===== CONSTANTS =====
const ANIMATION_DELAY = 100;
const NEWSLETTER_SUCCESS_DELAY = 2000;
const NEWSLETTER_RATE_LIMIT_MS = 5000;
const CONTACT_RATE_LIMIT_MS = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TRANSLATIONS_UNAVAILABLE = 'En cours';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgoazjag';

// Newsletter & Contact rate limiting
const newsletterState = {
    lastSubmission: 0,
    isRateLimited: false
};

const contactState = {
    lastSubmission: 0,
    isRateLimited: false
};

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
    }, ANIMATION_DELAY);
});

// ===== THEME TOGGLE =====
function initTheme() {
    try {
        // Try to get saved theme from localStorage
        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {
            console.warn('localStorage not accessible:', e);
        }

        const theme = savedTheme || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    } catch (error) {
        console.warn('Theme initialization failed:', error);
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            // Always update DOM first (most critical)
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);

            // Then try to save to localStorage
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                console.warn('Could not save theme to localStorage:', e);
                // Theme will still work, just won't persist on reload
            }
        } catch (error) {
            console.error('Theme toggle failed:', error);
        }
    });
}

function updateThemeIcon(theme) {
    // Icons are now handled via CSS with [data-theme] selectors
    // No JavaScript manipulation needed
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

// ===== CREATE PROJECT CARD (XSS-SAFE) =====
function createProjectCard(project) {
    const lang = getCurrentLanguage();
    const title = project[`title_${lang}`] || project.title_fr;
    const description = project[`description_${lang}`] || project.description_fr;
    const type = project[`type_${lang}`] || project.type_fr;

    const statusKey = project.status === 'in-progress' ? 'status.in-progress' : 'status.upcoming';
    const statusText = window.i18n ? window.i18n.getTranslation(statusKey) : TRANSLATIONS_UNAVAILABLE;
    const statusClass = project.status === 'in-progress' ? 'status-in-progress' : 'status-upcoming';

    // Create card element safely
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-status', project.status);

    const header = document.createElement('div');
    header.className = 'project-header';

    const titleEl = document.createElement('h3');
    titleEl.className = 'project-title';
    titleEl.textContent = title;

    const statusEl = document.createElement('span');
    statusEl.className = `project-status ${statusClass}`;
    statusEl.textContent = statusText;

    header.appendChild(titleEl);
    header.appendChild(statusEl);

    const typeEl = document.createElement('span');
    typeEl.className = 'project-type';
    typeEl.textContent = type;

    const descEl = document.createElement('p');
    descEl.className = 'project-description';
    descEl.textContent = description;

    const linkEl = document.createElement('a');
    linkEl.href = `/projects/project-${project.id}.html`;
    linkEl.className = 'project-link';
    const linkText = lang === 'en' ? 'Learn more →' : 'En savoir plus →';
    linkEl.textContent = linkText;

    card.appendChild(header);
    card.appendChild(typeEl);
    card.appendChild(descEl);
    card.appendChild(linkEl);

    return card.outerHTML;
}

// ===== FILTER BUTTONS =====
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
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
            const cardStatus = card.getAttribute('data-status');
            card.classList.toggle('hidden', cardStatus !== filter);
        }
    });
}

// ===== NEWSLETTER FORM WITH RATE LIMITING =====
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', handleNewsletterSubmit);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();

    // Rate limiting check
    const now = Date.now();
    if (now - newsletterState.lastSubmission < NEWSLETTER_RATE_LIMIT_MS) {
        console.warn('Newsletter submission rate limited');
        return;
    }

    const emailInput = this.querySelector('.email-input');
    if (!emailInput) return;

    const email = emailInput.value.trim();

    if (!email || !isValidEmail(email)) {
        emailInput.setAttribute('aria-invalid', 'true');
        return;
    }

    emailInput.setAttribute('aria-invalid', 'false');
    submitNewsletter(this, emailInput, email);
}

function submitNewsletter(form, emailInput, email) {
    const submitBtn = form.querySelector('.submit-btn');
    if (!submitBtn) return;

    try {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = window.i18n ? window.i18n.getTranslation('newsletter.success') : '✓ Inscrit !';
        submitBtn.disabled = true;

        newsletterState.lastSubmission = Date.now();

        // Here you would send email to backend API
        console.log('Newsletter subscription:', { email, timestamp: new Date().toISOString() });

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            emailInput.value = '';
        }, NEWSLETTER_SUCCESS_DELAY);
    } catch (error) {
        console.error('Newsletter submission error:', error);
    }
}

function isValidEmail(email) {
    return EMAIL_REGEX.test(email);
}

// ===== LANGUAGE CHANGE OBSERVER =====
function setupLanguageObserver() {
    if (!window.i18n) return;

    const originalSetLanguage = window.i18n.setLanguage.bind(window.i18n);
    window.i18n.setLanguage = function(lang) {
        originalSetLanguage(lang);
        renderFeaturedProjects();
        renderAllProjects();
    };
}

document.addEventListener('DOMContentLoaded', setupLanguageObserver);

// ===== CONTACT FORM HANDLER =====
function handleContactSubmit(e) {
    e.preventDefault();

    // Rate limiting check
    const now = Date.now();
    if (now - contactState.lastSubmission < CONTACT_RATE_LIMIT_MS) {
        console.warn('Contact form submission rate limited');
        return;
    }

    const nameInput = this.querySelector('input[name="name"]');
    const emailInput = this.querySelector('input[name="email"]');
    const messageInput = this.querySelector('textarea[name="message"]');
    const statusEl = document.getElementById('form-status');

    if (!nameInput || !emailInput || !messageInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validation
    if (!name || !email || !message) {
        if (statusEl) {
            statusEl.textContent = window.i18n ? window.i18n.getTranslation('contact.error') : '❌ Veuillez remplir tous les champs';
            statusEl.style.color = '#ff4444';
        }
        return;
    }

    if (!isValidEmail(email)) {
        emailInput.setAttribute('aria-invalid', 'true');
        if (statusEl) {
            statusEl.textContent = window.i18n ? window.i18n.getTranslation('contact.error') : '❌ Email invalide';
            statusEl.style.color = '#ff4444';
        }
        return;
    }

    submitContact(this, nameInput, emailInput, messageInput, statusEl, { name, email, message });
}

function submitContact(form, nameInput, emailInput, messageInput, statusEl, data) {
    const submitBtn = form.querySelector('.submit-btn');
    if (!submitBtn) return;

    try {
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        contactState.lastSubmission = Date.now();

        // Envoi via Formspree (gratuit, pas de backend nécessaire)
        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
                _subject: `Nouveau contact de ${data.name} via antoinx.com`,
                _replyto: data.email,
            })
        })
        .then(response => {
            if (response.ok) {
                if (statusEl) {
                    statusEl.textContent = window.i18n ? window.i18n.getTranslation('contact.success') : '✓ Message envoyé !';
                    statusEl.style.color = '#00cc00';
                }
                // Clear form
                setTimeout(() => {
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    statusEl.textContent = '';
                }, 2000);
            } else {
                throw new Error('Server error');
            }
        })
        .catch(error => {
            console.error('Contact form error:', error);
            if (statusEl) {
                statusEl.textContent = window.i18n ? window.i18n.getTranslation('contact.error') : '❌ Erreur lors de l\'envoi';
                statusEl.style.color = '#ff4444';
            }
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}
