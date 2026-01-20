// Traductions multilingues
const translations = {
    fr: {
        // Hero
        'hero.title': 'Projets vibecoding',
        'hero.subtitle': 'Apps mobiles, SaaS, automatisations & IA. En cours et à venir.',
        
        // Buttons
        'btn.newsletter': 'S\'inscrire à la newsletter',
        'btn.contact': 'Me contacter',
        
        // Featured Section
        'featured.title': 'Projets en vedette',
        'featured.subtitle': 'Découvrez mes projets phares',
        
        // Portfolio Section
        'portfolio.title': 'Portfolio complet',
        'portfolio.subtitle': 'Tous mes projets en cours et à venir',
        
        // Filters
        'filter.all': 'Tous',
        'filter.in-progress': 'En cours',
        'filter.upcoming': 'À venir',
        
        // Project Status
        'status.in-progress': 'En cours',
        'status.upcoming': 'À venir',
        
        // Newsletter
        'newsletter.title': 'Actualités IA & vibecoding',
        'newsletter.subtitle': 'Recevez des tutoriels, tips et news exclusives sur vibecoding et l\'IA. En français.',
        'newsletter.email': 'Votre email',
        'newsletter.submit': 'S\'inscrire',
        'newsletter.note': 'Pas de spam, désinscription facile.',
        
        // Footer
        'footer.tagline': 'Vibecoding projects & IA innovations',
        'footer.nav': 'Navigation',
        'footer.portfolio': 'Portfolio',
        'footer.newsletter': 'Newsletter',
        'footer.contact': 'Contact',
        'footer.copyright': '© 2026 antoinx. Tous droits réservés.',
        
        // Project Types
        'type.mobile': 'App Mobile',
        'type.saas': 'SaaS',
        'type.automation': 'Automatisation',
    },
    en: {
        // Hero
        'hero.title': 'Vibecoding Projects',
        'hero.subtitle': 'Mobile apps, SaaS, automations & AI. In progress and upcoming.',
        
        // Buttons
        'btn.newsletter': 'Subscribe to newsletter',
        'btn.contact': 'Contact me',
        
        // Featured Section
        'featured.title': 'Featured Projects',
        'featured.subtitle': 'Discover my flagship projects',
        
        // Portfolio Section
        'portfolio.title': 'Full Portfolio',
        'portfolio.subtitle': 'All my in-progress and upcoming projects',
        
        // Filters
        'filter.all': 'All',
        'filter.in-progress': 'In Progress',
        'filter.upcoming': 'Upcoming',
        
        // Project Status
        'status.in-progress': 'In Progress',
        'status.upcoming': 'Upcoming',
        
        // Newsletter
        'newsletter.title': 'AI & Vibecoding News',
        'newsletter.subtitle': 'Get exclusive tutorials, tips and news on vibecoding and AI. In French.',
        'newsletter.email': 'Your email',
        'newsletter.submit': 'Subscribe',
        'newsletter.note': 'No spam, easy unsubscribe.',
        
        // Footer
        'footer.tagline': 'Vibecoding projects & AI innovations',
        'footer.nav': 'Navigation',
        'footer.portfolio': 'Portfolio',
        'footer.newsletter': 'Newsletter',
        'footer.contact': 'Contact',
        'footer.copyright': '© 2026 antoinx. All rights reserved.',
        
        // Project Types
        'type.mobile': 'Mobile App',
        'type.saas': 'SaaS',
        'type.automation': 'Automation',
    }
};

// Gestion des traductions
class I18n {
    constructor() {
        this.currentLanguage = this.loadLanguage();
        this.init();
    }

    loadLanguage() {
        // Chercher d'abord dans localStorage
        const saved = localStorage.getItem('language');
        if (saved) return saved;
        
        // Sinon utiliser la langue du navigateur
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
            this.updateLanguageButton();
        }
    }

    getTranslation(key) {
        return translations[this.currentLanguage][key] || translations['fr'][key] || key;
    }

    updateAllText() {
        // Mettre à jour tous les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.getTranslation(key);
        });

        // Mettre à jour les placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.getTranslation(key);
        });

        // Mettre à jour les statuts des projets
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

        // Mettre à jour les types de projets
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

        // Ajouter drapeaux aux options
        langOptions.forEach(btn => {
            const lang = btn.dataset.lang;
            const flag = lang === 'en' ? '🇬🇧' : '🇫🇷';
            
            // Vérifier si le drapeau n'existe pas déjà
            if (!btn.querySelector('.lang-flag')) {
                const flagSpan = document.createElement('span');
                flagSpan.className = 'lang-flag';
                flagSpan.textContent = flag;
                btn.insertBefore(flagSpan, btn.firstChild);
            }
        });

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

        this.updateLanguageButton();
    }

    updateLanguageButton() {
        const toggleBtn = document.getElementById('language-toggle');
        const langOptions = document.querySelectorAll('.lang-option');

        // Mettre à jour le bouton principal
        if (this.currentLanguage === 'en') {
            toggleBtn.innerHTML = '<span class="lang-flag">🇬🇧</span><span class="lang-text">EN</span><span class="lang-icon">▼</span>';
        } else {
            toggleBtn.innerHTML = '<span class="lang-flag">🇫🇷</span><span class="lang-text">FR</span><span class="lang-icon">▼</span>';
        }

        // Mettre à jour les options
        langOptions.forEach(btn => {
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// Initialiser I18n au chargement
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});
