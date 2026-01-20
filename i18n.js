// Traductions multilingues
const translations = {
    fr: {
        'hero.title': 'Projets vibecoding',
        'hero.subtitle': 'Apps mobiles, SaaS, automatisations & IA. En cours et à venir.',
        'btn.newsletter': 'S\'inscrire à la newsletter',
        'btn.contact': 'Me contacter',
        'featured.title': 'Projets en vedette',
        'featured.subtitle': 'Découvrez mes projets phares',
        'portfolio.title': 'Portfolio complet',
        'portfolio.subtitle': 'Tous mes projets en cours et à venir',
        'filter.all': 'Tous',
        'filter.in-progress': 'En cours',
        'filter.upcoming': 'À venir',
        'status.in-progress': 'En cours',
        'status.upcoming': 'À venir',
        'newsletter.title': 'Actualités IA & vibecoding',
        'newsletter.subtitle': 'Recevez des tutoriels, tips et news exclusives sur vibecoding et l\'IA. En français.',
        'newsletter.email': 'Votre email',
        'newsletter.submit': 'S\'inscrire',
        'newsletter.success': '✓ Inscrit !',
        'newsletter.note': 'Pas de spam, désinscription facile.',
        'footer.tagline': 'Vibecoding projects & IA innovations',
        'footer.nav': 'Navigation',
        'footer.portfolio': 'Portfolio',
        'footer.newsletter': 'Newsletter',
        'footer.contact': 'Contact',
        'footer.copyright': '© 2026 antoinx. Tous droits réservés.',
        'type.mobile': 'App Mobile',
        'type.saas': 'SaaS',
        'type.automation': 'Automatisation',
    },
    en: {
        'hero.title': 'Vibecoding Projects',
        'hero.subtitle': 'Mobile apps, SaaS, automations & AI. In progress and upcoming.',
        'btn.newsletter': 'Subscribe to newsletter',
        'btn.contact': 'Contact me',
        'featured.title': 'Featured Projects',
        'featured.subtitle': 'Discover my flagship projects',
        'portfolio.title': 'Full Portfolio',
        'portfolio.subtitle': 'All my in-progress and upcoming projects',
        'filter.all': 'All',
        'filter.in-progress': 'In Progress',
        'filter.upcoming': 'Upcoming',
        'status.in-progress': 'In Progress',
        'status.upcoming': 'Upcoming',
        'newsletter.title': 'AI & Vibecoding News',
        'newsletter.subtitle': 'Get exclusive tutorials, tips and news on vibecoding and AI. In French.',
        'newsletter.email': 'Your email',
        'newsletter.submit': 'Subscribe',
        'newsletter.success': '✓ Subscribed!',
        'newsletter.note': 'No spam, easy unsubscribe.',
        'footer.tagline': 'Vibecoding projects & IA innovations',
        'footer.nav': 'Navigation',
        'footer.portfolio': 'Portfolio',
        'footer.newsletter': 'Newsletter',
        'footer.contact': 'Contact',
        'footer.copyright': '© 2026 antoinx. All rights reserved.',
        'type.mobile': 'Mobile App',
        'type.saas': 'SaaS',
        'type.automation': 'Automation',
    }
};

class I18n {
    constructor() {
        this.currentLanguage = this.loadLanguage();
        this.init();
    }

    loadLanguage() {
        const saved = localStorage.getItem('language');
        if (saved) return saved;
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'en' ? 'en' : 'fr';
    }

    init() {
        document.documentElement.lang = this.currentLanguage;
        this.updateAllText();
        this.setupLanguageButtons();
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            this.updateAllText();
        }
    }

    getTranslation(key) {
        if (!key) {
            console.warn('I18n: Empty translation key requested');
            return '';
        }
        const translation = translations[this.currentLanguage]?.[key] || translations.fr?.[key];
        if (!translation) {
            console.warn(`I18n: Missing translation for key "${key}"`);
        }
        return translation || key;
    }

    updateAllText() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.getTranslation(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.getTranslation(key);
        });

        this.updateProjectStatuses();
    }

    updateProjectStatuses() {
        document.querySelectorAll('.project-status').forEach(el => {
            const parent = el.closest('.project-card');
            if (parent) {
                const status = parent.dataset.status;
                if (status === 'in-progress') {
                    el.textContent = this.getTranslation('status.in-progress');
                } else if (status === 'upcoming') {
                    el.textContent = this.getTranslation('status.upcoming');
                }
            }
        });

        document.querySelectorAll('.project-type').forEach(el => {
            const text = el.textContent.trim();
            if (text.includes('Mobile')) {
                el.textContent = this.getTranslation('type.mobile');
            } else if (text === 'SaaS') {
                el.textContent = this.getTranslation('type.saas');
            } else if (text.includes('Automatisation') || text.includes('Automation')) {
                el.textContent = this.getTranslation('type.automation');
            }
        });
    }

    setupLanguageButtons() {
        const toggleBtn = document.getElementById('language-toggle');
        const dropdown = document.getElementById('language-dropdown');
        const langOptions = document.querySelectorAll('.lang-option');

        // Toggle dropdown
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        });

        // Fermer dropdown au clic en dehors
        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
            toggleBtn.classList.remove('active');
        });

        // Sélectionner langue
        langOptions.forEach(btn => {
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
                dropdown.classList.remove('active');
                toggleBtn.classList.remove('active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});
