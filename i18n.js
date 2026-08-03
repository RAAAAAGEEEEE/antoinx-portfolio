// Traductions multilingues
const translations = {
    fr: {
        'nav.siteservi': 'SiteServi',
        'nav.projects': 'Projets',
        'nav.blog': 'Blog',
        'nav.newsletter': 'Newsletter',
        'hero.kicker': 'Antoine, alias @Anto1nx',
        'hero.title': 'Je construis des SaaS en solo, avec l\'IA comme copilote.',
        'hero.subtitle': 'Seul, sans équipe ni levée de fonds. Ce que je fabrique, ses vrais statuts, et comment je bosse au quotidien : tout est sur cette page.',
        'btn.newsletter': 'Newsletter gratuite',
        'btn.siteservi': 'Essayer SiteServi - 14 j gratuits',
        'siteservi.badge': 'En lancement',
        'siteservi.title': 'SiteServi',
        'siteservi.text1': 'Google a retiré la création de site depuis les fiches d\'établissement. Le besoin est resté : sans site, un commerçant perd des clients. SiteServi part de ta fiche Google et sort un vrai site en moins d\'une minute.',
        'siteservi.text2': 'Statut réel : les sites en ligne aujourd\'hui servent surtout à la prospection, pas encore une vraie base de clients payants. Ça peut changer vite, tu le sauras dans la newsletter en premier.',
        'siteservi.cta': 'Essayer SiteServi - 14 j gratuits',
        'siteservi.imgalt': 'SiteServi',
        'siteservi.imgcaption': 'Visuel officiel SiteServi (siteservi.com)',
        'projects.title': 'Autres projets',
        'projects.subtitle': 'Statuts réels, sans enjoliver.',
        'status.live': 'Live',
        'status.paused': 'En pause',
        'status.abandoned': 'Abandonné',
        'type.saas': 'SaaS',
        'type.mobile': 'App mobile',
        'type.tool': 'Outils',
        'project.skills.desc': 'Mes skills Claude Code perso, publiques sur GitHub : ce que j\'utilise vraiment pour shipper au quotidien.',
        'project.mysterymoji.desc': 'App iOS pour ados : code tes messages en emojis, déchiffrables seulement dans l\'app.',
        'project.televerser.desc': 'Transcris tes vidéos et audios en texte avec résumé IA, gratuit et en français. Le plus avancé des projets en pause, je le reprendrai peut-être.',
        'project.woufroof.desc': 'Trouver un hébergement dog-friendly, hôtels et gîtes filtrés par poids et région. Testé, jamais vraiment lancé.',
        'link.more': 'Voir le site',
        'link.repo': 'Voir le repo',
        'posts.title': 'Ce que j\'écris',
        'posts.subtitle': 'Ce que j\'apprends en construisant, au fur et à mesure.',
        'method.title': 'Comment je bosse',
        'method.item1': 'Workflows déterministes d\'abord, l\'IA seulement là où ça a du sens.',
        'method.item2': 'Claude Code tous les jours : je ne code plus une ligne à la main.',
        'method.item3': 'J\'essaie de rester KISS, une stack simple plutôt qu\'une stack qui en jette.',
        'method.item4': 'Je documente tout sur X et dans la newsletter, fails inclus.',
        'newsletter.title': 'Reçois les prochains projets avant tout le monde',
        'newsletter.subtitle': 'Stack, fails, ce qui marche. Pas de spam, désinscription en un clic.',
        'newsletter.email': 'Votre email',
        'newsletter.submit': 'S\'inscrire',
        'newsletter.success': '✓ Inscrit !',
        'newsletter.error': '❌ Email invalide',
        'newsletter.note': 'Pas de spam, désinscription facile.',
        'footer.tagline': 'SaaS solo, avec l\'IA en copilote.',
        'footer.nav': 'Navigation',
        'footer.siteservi': 'SiteServi',
        'footer.projects': 'Projets',
        'footer.newsletter': 'Newsletter',
        'footer.social': 'Réseaux',
        'footer.legal': 'Légal',
        'footer.copyright': '© 2026 Antoinx. Une question ou une envie de collab ? DM-moi sur X.',
    },
    en: {
        'nav.siteservi': 'SiteServi',
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'nav.newsletter': 'Newsletter',
        'hero.kicker': 'Antoine, aka @Anto1nx',
        'hero.title': 'I build SaaS products solo, with AI as my copilot.',
        'hero.subtitle': 'Solo, no team, no funding. What I build, its real status, and how I work day to day: it\'s all on this page.',
        'btn.newsletter': 'Free newsletter',
        'btn.siteservi': 'Try SiteServi - 14-day free trial',
        'siteservi.badge': 'Launching',
        'siteservi.title': 'SiteServi',
        'siteservi.text1': 'Google removed website creation from business listings. The need didn\'t go away: without a site, a local business loses customers. SiteServi takes your Google listing and turns it into a real website in under a minute.',
        'siteservi.text2': 'Real status: the sites live today are mostly outreach demos, not yet a real base of paying customers. That can change fast, you\'ll hear it in the newsletter first.',
        'siteservi.cta': 'Try SiteServi - 14-day free trial',
        'siteservi.imgalt': 'SiteServi',
        'siteservi.imgcaption': 'Official SiteServi visual (siteservi.com)',
        'projects.title': 'Other projects',
        'projects.subtitle': 'Real status, no sugarcoating.',
        'status.live': 'Live',
        'status.paused': 'Paused',
        'status.abandoned': 'Discontinued',
        'type.saas': 'SaaS',
        'type.mobile': 'Mobile app',
        'type.tool': 'Tools',
        'project.skills.desc': 'My personal Claude Code skills, public on GitHub: what I actually use to ship day to day.',
        'project.mysterymoji.desc': 'iOS app for teens: encode your messages as emojis, decipherable only inside the app.',
        'project.televerser.desc': 'Transcribe your videos and audio to text with an AI summary, free and in French. The most advanced of the paused projects, might pick it back up.',
        'project.woufroof.desc': 'Find dog-friendly accommodation, hotels and cottages filtered by weight and region. Tested, never really launched.',
        'link.more': 'See site',
        'link.repo': 'See repo',
        'posts.title': 'What I write',
        'posts.subtitle': 'What I learn while building, as it happens.',
        'method.title': 'How I work',
        'method.item1': 'Deterministic workflows first, AI only where it actually makes sense.',
        'method.item2': 'Claude Code every day: I don\'t write code by hand anymore.',
        'method.item3': 'I try to keep it KISS, a simple stack over a flashy one.',
        'method.item4': 'I document everything on X and in the newsletter, fails included.',
        'newsletter.title': 'Get the next projects before anyone else',
        'newsletter.subtitle': 'Stack, fails, what works. No spam, unsubscribe in one click.',
        'newsletter.email': 'Your email',
        'newsletter.submit': 'Subscribe',
        'newsletter.success': '✓ Subscribed!',
        'newsletter.error': '❌ Invalid email',
        'newsletter.note': 'No spam, easy unsubscribe.',
        'footer.tagline': 'Solo SaaS, with AI as a copilot.',
        'footer.nav': 'Navigation',
        'footer.siteservi': 'SiteServi',
        'footer.projects': 'Projects',
        'footer.newsletter': 'Newsletter',
        'footer.social': 'Social',
        'footer.legal': 'Legal',
        'footer.copyright': '© 2026 Antoinx. Question or want to collab? DM me on X.',
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

        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            element.alt = this.getTranslation(key);
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
