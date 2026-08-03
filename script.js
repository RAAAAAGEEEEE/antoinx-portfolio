// ===== CONSTANTS =====
const NEWSLETTER_RATE_LIMIT_MS = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Newsletter rate limiting
const newsletterState = {
    lastSubmission: 0
};

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggle();
    setupNewsletterForm();
});

// ===== THEME TOGGLE =====
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
                noteEl.textContent = window.i18n ? window.i18n.getTranslation('newsletter.error') : '❌ Email invalide';
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
            // Sans ce test, un 400 (deja inscrit, email refuse, rate limit) ou un
            // 500 affichait quand meme "Inscription reussie" : l'abonne etait
            // perdu sans que personne ne le sache.
            if (!response.ok) {
                throw new Error('Buttondown a repondu ' + response.status);
            }
            if (noteEl) {
                noteEl.textContent = window.i18n ? window.i18n.getTranslation('newsletter.success') : '✓ Inscription réussie !';
                noteEl.style.color = '#00cc00';
            }
            emailInput.value = '';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                if (noteEl) {
                    noteEl.textContent = window.i18n ? window.i18n.getTranslation('newsletter.note') : 'Pas de spam, désinscription facile.';
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
