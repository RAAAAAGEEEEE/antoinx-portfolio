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
        title_fr: "Téléverser",
        title_en: "Téléverser",
        description_fr: "Transcrivez vos vidéos et audios en texte avec résumé IA. Gratuit, rapide et en français. Vos fichiers ne sont jamais stockés.",
        description_en: "Transcribe your videos and audio to text with AI summary. Free, fast, and in French. Your files are never stored.",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "in-progress",
        link: "https://televerser.fr"
    },
    {
        id: 2,
        title_fr: "SiteServi",
        title_en: "SiteServi",
        description_fr: "Créez un site professionnel grâce à l'IA, en ligne en moins d'une minute. Optimisé Google, bilingue, mobile-first. 1er mois offert.",
        description_en: "Create a professional website with AI, live in less than a minute. Google-optimized, bilingual, mobile-first. First month free.",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "in-progress",
        link: "https://siteservi.com"
    },
    {
        id: 3,
        title_fr: "MysteryMoji",
        title_en: "MysteryMoji",
        description_fr: "App iOS pour ados : codez et décodez vos messages secrets en les transformant en séries d'emojis. Déchiffrez les messages uniquement dans l'app.",
        description_en: "iOS app for teens: encode and decode secret messages by turning them into emoji sequences. Messages can only be deciphered inside the app.",
        type_fr: "App Mobile",
        type_en: "Mobile App",
        status: "in-progress",
        link: "https://mysterymoji.com"
    },
    {
        id: 4,
        title_fr: "WoofRoof",
        title_en: "WoofRoof",
        description_fr: "Trouvez l'hébergement parfait pour voyager avec votre chien. 60 000+ hôtels, gîtes et campings dog-friendly en France, filtrés par poids et région.",
        description_en: "Find the perfect accommodation to travel with your dog. 60,000+ dog-friendly hotels, cottages and campsites in France, filtered by weight and region.",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "in-progress",
        link: "https://woufroof.com"
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
    linkEl.href = project.link;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
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

// ===== NEWSLETTER FORM WITH BUTTONDOWN EMBED =====
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const now = Date.now();
        if (now - newsletterState.lastSubmission < NEWSLETTER_RATE_LIMIT_MS) {
            console.warn('Newsletter submission rate limited');
            return;
        }

        const emailInput = form.querySelector('.email-input');
        const submitBtn = form.querySelector('.submit-btn');
        const noteEl = form.querySelector('.form-note');

        if (!emailInput || !submitBtn) return;

        const email = emailInput.value.trim();

        if (!isValidEmail(email)) {
            if (noteEl) {
                noteEl.textContent = window.i18n ? window.i18n.getTranslation('newsletter.error') || '❌ Email invalide' : '❌ Email invalide';
                noteEl.style.color = '#ff4444';
            }
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '...';
        newsletterState.lastSubmission = now;

        fetch('https://buttondown.com/api/emails/embed-subscribe/Antoinx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: email,
                tag: 'antoinx.com'
            }).toString()
        })
        .then(response => {
            if (noteEl) {
                noteEl.textContent = window.i18n ? window.i18n.getTranslation('newsletter.success') || '✓ Inscription réussie !' : '✓ Inscription réussie !';
                noteEl.style.color = '#00cc00';
            }
            emailInput.value = '';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                if (noteEl) {
                    noteEl.textContent = window.i18n ? window.i18n.getTranslation('newsletter.note') || 'Pas de spam, désinscription facile.' : 'Pas de spam, désinscription facile.';
                    noteEl.style.color = '';
                }
            }, 2000);
        })
        .catch(error => {
            console.error('Newsletter error:', error);
            if (noteEl) {
                noteEl.textContent = '❌ Erreur, réessayez';
                noteEl.style.color = '#ff4444';
            }
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
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

    const form = e.target;
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
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

    submitContact(form, nameInput, emailInput, messageInput, statusEl, { name, email, message });
}

function submitContact(form, nameInput, emailInput, messageInput, statusEl, data) {
    const submitBtn = form.querySelector('.submit-btn');
    if (!submitBtn) return;

    try {
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        contactState.lastSubmission = Date.now();

        // Envoi via Formspree (gratuit, pas de backend nécessaire)
        // Utiliser FormData pour meilleure compatibilité avec Formspree
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('message', data.message);
        formData.append('_subject', `Nouveau contact de ${data.name} via antoinx.com`);
        formData.append('_replyto', data.email);

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
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
