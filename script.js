// ===== CONSTANTS =====
const ANIMATION_DELAY = 100;
const NEWSLETTER_SUCCESS_DELAY = 2000;
const NEWSLETTER_RATE_LIMIT_MS = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TRANSLATIONS_UNAVAILABLE = 'En cours';

// Newsletter rate limiting
const newsletterState = {
    lastSubmission: 0,
    isRateLimited: false
};

// News/Breves placeholders (sera remplace par n8n automation)
const newsItems = [
    {
        id: 1,
        date: '2026-01-20',
        source: 'OpenAI',
        title_fr: 'GPT-5 annonce : un bond majeur vers l\'AGI',
        title_en: 'GPT-5 announced: a major leap towards AGI',
        summary_fr: 'OpenAI devoile GPT-5 avec des capacites de raisonnement avancees et une memoire contextuelle etendue. Les premiers tests montrent des performances impressionnantes en resolution de problemes complexes.',
        summary_en: 'OpenAI unveils GPT-5 with advanced reasoning capabilities and extended contextual memory. Early tests show impressive performance in complex problem solving.',
        link: 'https://openai.com/blog',
        category: 'ai'
    },
    {
        id: 2,
        date: '2026-01-19',
        source: 'Anthropic',
        title_fr: 'Claude 4 Opus : le nouveau standard du vibecoding',
        title_en: 'Claude 4 Opus: the new vibecoding standard',
        summary_fr: 'Anthropic lance Claude 4 Opus avec des capacites de code ameliorees et une comprehension contextuelle sans precedent. Ideal pour le vibecoding avec des sessions de plus de 200k tokens.',
        summary_en: 'Anthropic launches Claude 4 Opus with improved coding capabilities and unprecedented contextual understanding. Perfect for vibecoding with 200k+ token sessions.',
        link: 'https://anthropic.com/news',
        category: 'ai'
    },
    {
        id: 3,
        date: '2026-01-18',
        source: 'TechCrunch',
        title_fr: 'Cursor AI leve 100M$ pour revolutionner l\'IDE',
        title_en: 'Cursor AI raises $100M to revolutionize the IDE',
        summary_fr: 'La startup derriere l\'editeur de code IA Cursor annonce une levee de fonds Series B. L\'objectif : integrer des agents autonomes capables de refactorer des codebases entieres.',
        summary_en: 'The startup behind AI code editor Cursor announces Series B funding. Goal: integrate autonomous agents capable of refactoring entire codebases.',
        link: 'https://techcrunch.com',
        category: 'vibecoding'
    },
    {
        id: 4,
        date: '2026-01-17',
        source: 'GitHub',
        title_fr: 'Copilot Workspace : l\'assistant qui planifie vos features',
        title_en: 'Copilot Workspace: the assistant that plans your features',
        summary_fr: 'GitHub lance Copilot Workspace, un environnement ou l\'IA analyse les issues et propose des plans d\'implementation complets avant d\'ecrire le moindre code.',
        summary_en: 'GitHub launches Copilot Workspace, an environment where AI analyzes issues and proposes complete implementation plans before writing any code.',
        link: 'https://github.blog',
        category: 'vibecoding'
    },
    {
        id: 5,
        date: '2026-01-16',
        source: 'The Verge',
        title_fr: 'Apple Intelligence enfin disponible en France',
        title_en: 'Apple Intelligence finally available in France',
        summary_fr: 'Apres des mois d\'attente, Apple deploie ses fonctionnalites IA en Europe. Siri devient enfin capable de contexte conversationnel et d\'integration avec ChatGPT.',
        summary_en: 'After months of waiting, Apple deploys its AI features in Europe. Siri finally becomes capable of conversational context and ChatGPT integration.',
        link: 'https://theverge.com',
        category: 'ai'
    },
    {
        id: 6,
        date: '2026-01-15',
        source: 'Hacker News',
        title_fr: 'Devin AI : premier agent developpeur autonome en production',
        title_en: 'Devin AI: first autonomous developer agent in production',
        summary_fr: 'Cognition Labs annonce que Devin a complete sa premiere mission client en totale autonomie. Une app mobile livree en 48h sans intervention humaine.',
        summary_en: 'Cognition Labs announces Devin completed its first client mission in full autonomy. A mobile app delivered in 48h without human intervention.',
        link: 'https://news.ycombinator.com',
        category: 'vibecoding'
    }
];

// News display state
const newsState = {
    visibleCount: 3,
    increment: 3
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
        renderNews();
        renderAllProjects();
        setupFilterButtons();
        setupNewsletterForm();
        setupThemeToggle();
        setupSeeMoreNews();
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

// ===== NEWS TIMELINE =====
function renderNews() {
    const container = document.getElementById('news-timeline');
    if (!container) return;

    container.innerHTML = newsItems.map((item, index) => createNewsItem(item, index)).join('');
    updateNewsVisibility();
}

function createNewsItem(item, index) {
    const lang = getCurrentLanguage();
    const title = item[`title_${lang}`] || item.title_fr;
    const summary = item[`summary_${lang}`] || item.summary_fr;
    const formattedDate = formatNewsDate(item.date, lang);
    const readMoreText = lang === 'en' ? 'Read more' : 'Lire l\'article';

    const newsItem = document.createElement('article');
    newsItem.className = 'news-item';
    newsItem.setAttribute('data-index', index);

    const meta = document.createElement('div');
    meta.className = 'news-meta';

    const dateEl = document.createElement('span');
    dateEl.className = 'news-date';
    dateEl.textContent = formattedDate;

    const sourceEl = document.createElement('span');
    sourceEl.className = 'news-source';
    sourceEl.textContent = item.source;

    meta.appendChild(dateEl);
    meta.appendChild(sourceEl);

    const titleEl = document.createElement('h3');
    titleEl.className = 'news-title';
    titleEl.textContent = title;

    const summaryEl = document.createElement('p');
    summaryEl.className = 'news-summary';
    summaryEl.textContent = summary;

    const linkEl = document.createElement('a');
    linkEl.className = 'news-link';
    linkEl.href = item.link;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
    linkEl.textContent = readMoreText;

    newsItem.appendChild(meta);
    newsItem.appendChild(titleEl);
    newsItem.appendChild(summaryEl);
    newsItem.appendChild(linkEl);

    return newsItem.outerHTML;
}

function formatNewsDate(dateStr, lang) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', options);
}

function updateNewsVisibility() {
    const items = document.querySelectorAll('.news-item');
    const seeMoreBtn = document.getElementById('see-more-news');

    items.forEach((item, index) => {
        if (index < newsState.visibleCount) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });

    if (seeMoreBtn) {
        if (newsState.visibleCount >= newsItems.length) {
            seeMoreBtn.style.display = 'none';
        } else {
            seeMoreBtn.style.display = 'inline-block';
        }
    }
}

function setupSeeMoreNews() {
    const btn = document.getElementById('see-more-news');
    if (!btn) return;

    btn.addEventListener('click', () => {
        newsState.visibleCount += newsState.increment;
        updateNewsVisibility();
    });
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
    linkEl.className = 'project-link';
    linkEl.textContent = 'En savoir plus →';

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
        renderNews();
        renderAllProjects();
    };
}

document.addEventListener('DOMContentLoaded', setupLanguageObserver);
