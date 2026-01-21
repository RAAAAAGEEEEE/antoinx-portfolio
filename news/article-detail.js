function getArticleIdFromUrl() {
    const path = window.location.pathname;
    const match = path.match(/article-(\d+)/);
    return match ? parseInt(match[1]) : null;
}

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

function getCurrentLanguage() {
    return window.i18n ? window.i18n.currentLanguage : 'fr';
}

function formatDate(dateStr, lang) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', options);
}

function loadArticleDetails() {
    const articleId = getArticleIdFromUrl();

    if (!articleId || !newsArticles[articleId]) {
        document.body.innerHTML = '<div class="container"><p>Article non trouvé.</p></div>';
        return;
    }

    const article = newsArticles[articleId];
    const lang = getCurrentLanguage();

    // Title
    const title = article[`title_${lang}`] || article.title_fr;
    document.title = `${title} - antoinx`;
    document.getElementById('article-title').textContent = title;

    // Meta
    document.getElementById('article-date').textContent = formatDate(article.date, lang);
    document.getElementById('article-source').textContent = article.source;

    // Content
    const content = article[`content_${lang}`] || article.content_fr;
    const contentEl = document.getElementById('article-content');

    // Convert markdown-like content to paragraphs and lists
    const paragraphs = content.split('\n\n').map(para => {
        if (para.trim().startsWith('-')) {
            const items = para.trim().split('\n').map(line => `<li>${line.replace(/^-\s*/, '')}</li>`).join('');
            return `<ul>${items}</ul>`;
        }
        return `<p>${para.trim()}</p>`;
    });
    contentEl.innerHTML = paragraphs.join('');

    // Share buttons
    const shareUrl = window.location.href;
    const shareText = title;
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

    // Newsletter CTA
    if (lang === 'en') {
        document.getElementById('newsletter-title').textContent = 'Get AI news';
        document.getElementById('newsletter-desc').textContent = 'Subscribe to the newsletter to get all updates';
        document.getElementById('back-link').textContent = '← Back to news';
    }
}

function setupLanguageObserver() {
    if (!window.i18n) return;

    const originalSetLanguage = window.i18n.setLanguage.bind(window.i18n);
    window.i18n.setLanguage = function(lang) {
        originalSetLanguage(lang);
        loadArticleDetails();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggle();

    setTimeout(() => {
        setupLanguageObserver();
        loadArticleDetails();
    }, 100);
});
