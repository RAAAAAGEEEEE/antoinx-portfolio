// Traductions multilingues
const translations = {
    fr: {
        'nav.projects': 'Projets',
        'nav.blog': 'Blog',
        'nav.newsletter': 'Newsletter',
        'hero.title': 'Je lance des SaaS en solo, avec l\'IA comme co-pilote.',
        'hero.subtitle': 'Stack, fails, ce qui marche : je documente tout pour les solopreneurs qui veulent shipper, pas juste discuter d\'IA.',
        'btn.newsletter': 'S\'inscrire à la newsletter',
        'btn.siteservi': 'Essayer SiteServi',
        'bio.text': 'Je m\'appelle Antoine (@Anto1nx). Seul, en France, je construis des SaaS avec l\'IA comme copilote — pas d\'équipe, pas de levée de fonds. Ici : mes projets avec leurs vrais statuts, comment je bosse au quotidien, et une newsletter où je partage ce qui marche (et ce qui plante).',
        'siteservi.badge': 'En lancement',
        'siteservi.title': 'En ce moment : SiteServi',
        'siteservi.text1': 'Google a laissé tomber la création de site depuis les fiches d\'établissement. Le besoin, lui, est resté : sans site, un commerçant perd des clients. SiteServi part de ta fiche Google et sort un vrai site en moins d\'une minute.',
        'siteservi.text2': 'Honnêtement : les sites en ligne aujourd\'hui servent surtout à la prospection, pas encore un vrai portefeuille de clients payants. Si ça bouge, tu le sauras dans la newsletter avant tout le monde.',
        'siteservi.cta': 'Essayer SiteServi — 14 jours gratuits',
        'projects.title': 'Projets',
        'projects.subtitle': 'Ce que j\'ai shippé en solo, avec leurs vrais statuts.',
        'status.live': 'Live',
        'type.saas': 'SaaS',
        'type.mobile': 'App Mobile',
        'project.woufroof.desc': 'Trouve un hébergement dog-friendly en 2 clics : 60 000+ hôtels, gîtes et campings filtrés par poids et région.',
        'project.televerser.desc': 'Transcris tes vidéos et audios en texte avec résumé IA, gratuit et en français. Rien n\'est stocké.',
        'project.mysterymoji.desc': 'App iOS pour ados : code tes messages en emojis, déchiffrables seulement dans l\'app.',
        'link.more': 'Voir le site →',
        'method.title': 'Comment je bosse',
        'method.item1': 'Workflows déterministes d\'abord, l\'IA seulement là où ça a du sens.',
        'method.item2': 'Claude Code au quotidien — je ne code plus une ligne à la main.',
        'method.item3': 'Stack minimaliste : pas de framework que je ne comprends pas.',
        'method.item4': 'Je documente tout sur X et dans la newsletter, fails inclus.',
        'newsletter.title': 'Reçois les prochains projets avant tout le monde',
        'newsletter.subtitle': 'Stack, fails, ce qui marche. Pas de spam, désinscription en 1 clic.',
        'newsletter.email': 'Votre email',
        'newsletter.submit': 'S\'inscrire',
        'newsletter.success': '✓ Inscrit !',
        'newsletter.error': '❌ Email invalide',
        'newsletter.note': 'Pas de spam, désinscription facile.',
        'footer.tagline': 'SaaS solo, propulsés à l\'IA.',
        'footer.nav': 'Navigation',
        'footer.projects': 'Projets',
        'footer.newsletter': 'Newsletter',
        'footer.social': 'Réseaux',
        'footer.legal': 'Légal',
        'footer.copyright': '© 2026 antoinx. Une question, une envie de collab ? DM-moi sur X.',
    },
    en: {
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'nav.newsletter': 'Newsletter',
        'hero.title': 'I launch SaaS products solo, with AI as my co-pilot.',
        'hero.subtitle': 'Stack, fails, what works: I document everything for solopreneurs who want to ship, not just talk about AI.',
        'btn.newsletter': 'Subscribe to the newsletter',
        'btn.siteservi': 'Try SiteServi',
        'bio.text': 'I\'m Antoine (@Anto1nx). Solo, based in France, I build SaaS products with AI as a copilot — no team, no funding. Here: my projects with their real status, how I work day to day, and a newsletter where I share what works (and what fails).',
        'siteservi.badge': 'Launching',
        'siteservi.title': 'Right now: SiteServi',
        'siteservi.text1': 'Google dropped website creation from business listings. The need didn\'t go away: without a site, a local business loses customers. SiteServi takes your Google listing and turns it into a real website in under a minute.',
        'siteservi.text2': 'Honestly: the sites live today are mostly outreach demos, not yet a real base of paying customers. If that changes, you\'ll hear it in the newsletter first.',
        'siteservi.cta': 'Try SiteServi — 14 days free',
        'projects.title': 'Projects',
        'projects.subtitle': 'What I\'ve shipped solo, with their real status.',
        'status.live': 'Live',
        'type.saas': 'SaaS',
        'type.mobile': 'Mobile App',
        'project.woufroof.desc': 'Find dog-friendly accommodation in 2 clicks: 60,000+ hotels, cottages and campsites filtered by weight and region.',
        'project.televerser.desc': 'Transcribe your videos and audio to text with an AI summary, free and in French. Nothing is stored.',
        'project.mysterymoji.desc': 'iOS app for teens: encode your messages as emojis, decipherable only inside the app.',
        'link.more': 'See site →',
        'method.title': 'How I work',
        'method.item1': 'Deterministic workflows first, AI only where it actually makes sense.',
        'method.item2': 'Claude Code every day — I don\'t write code by hand anymore.',
        'method.item3': 'Minimal stack: no framework I don\'t understand, no lingering debt.',
        'method.item4': 'I document everything on X and in the newsletter, fails included.',
        'newsletter.title': 'Get the next projects before anyone else',
        'newsletter.subtitle': 'Stack, fails, what works. No spam, unsubscribe in one click.',
        'newsletter.email': 'Your email',
        'newsletter.submit': 'Subscribe',
        'newsletter.success': '✓ Subscribed!',
        'newsletter.error': '❌ Invalid email',
        'newsletter.note': 'No spam, easy unsubscribe.',
        'footer.tagline': 'Solo SaaS, powered by AI.',
        'footer.nav': 'Navigation',
        'footer.projects': 'Projects',
        'footer.newsletter': 'Newsletter',
        'footer.social': 'Social',
        'footer.legal': 'Legal',
        'footer.copyright': '© 2026 antoinx. Question, want to collab? DM me on X.',
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
        this.updateLanguageFlag();
        this.setupLanguageButtons();
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            this.updateAllText();
            this.updateLanguageFlag();
        }
    }

    updateLanguageFlag() {
        const toggleBtn = document.getElementById('language-toggle');
        if (!toggleBtn) return;

        const flagImg = toggleBtn.querySelector('.lang-flag-img');
        if (!flagImg) return;

        const selectedOption = document.querySelector(`.lang-option[data-lang="${this.currentLanguage}"]`);
        if (selectedOption) {
            const selectedFlag = selectedOption.querySelector('.lang-flag-img');
            if (selectedFlag) {
                flagImg.src = selectedFlag.src;
                flagImg.alt = selectedFlag.alt;
            }
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
    }

    setupLanguageButtons() {
        const toggleBtn = document.getElementById('language-toggle');
        const dropdown = document.getElementById('language-dropdown');
        const langOptions = document.querySelectorAll('.lang-option');

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
            toggleBtn.classList.remove('active');
        });

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
