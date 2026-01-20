// Cookie Banner Manager - RGPD Compliant
const CookieConsent = (() => {
    const CONSENT_KEY = 'cookie-consent';
    const CONSENT_EXPIRY = 365 * 24 * 60 * 60 * 1000; // 1 year

    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.setAttribute('role', 'complementary');
        banner.setAttribute('aria-label', 'Cookie consent banner');
        banner.innerHTML = `
            <style>
                #cookie-banner {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    max-width: 400px;
                    background: var(--bg);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin: 1rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                    z-index: 999;
                    animation: slideUp 0.3s ease;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    backdrop-filter: blur(10px);
                }

                [data-theme="dark"] #cookie-banner {
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                }

                #cookie-banner h3 {
                    margin: 0 0 0.75rem 0;
                    font-size: 1rem;
                    color: var(--text);
                }

                #cookie-banner p {
                    margin: 0 0 1rem 0;
                    color: var(--text-light);
                }

                #cookie-banner a {
                    color: var(--accent);
                    text-decoration: none;
                    font-weight: 600;
                }

                #cookie-banner a:hover {
                    text-decoration: underline;
                }

                .cookie-buttons {
                    display: flex;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                .cookie-btn {
                    flex: 1;
                    min-width: 100px;
                    padding: 0.6rem 1rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.85rem;
                    transition: all 0.3s ease;
                }

                #cookie-accept {
                    background: var(--accent);
                    color: white;
                }

                #cookie-accept:hover {
                    box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
                    transform: translateY(-2px);
                }

                #cookie-reject {
                    background: var(--secondary);
                    color: var(--text);
                    border: 1px solid var(--border);
                }

                #cookie-reject:hover {
                    background: var(--border);
                }

                @media (max-width: 480px) {
                    #cookie-banner {
                        max-width: 100%;
                        left: 0;
                        right: 0;
                        margin: 0;
                        border-radius: 12px 12px 0 0;
                    }

                    .cookie-buttons {
                        flex-direction: column;
                    }

                    .cookie-btn {
                        width: 100%;
                    }
                }
            </style>
            <h3>🍪 Cookies & Vie Privée</h3>
            <p>Nous utilisons des cookies essentiels pour votre expérience. Consultez notre <a href="/cookies.html" target="_blank">politique des cookies</a>.</p>
            <div class="cookie-buttons">
                <button id="cookie-accept" class="cookie-btn">Accepter</button>
                <button id="cookie-reject" class="cookie-btn">Refuser</button>
            </div>
        `;
        return banner;
    }

    function getConsent() {
        try {
            const consent = localStorage.getItem(CONSENT_KEY);
            if (!consent) return null;

            const { timestamp, accepted } = JSON.parse(consent);
            const now = Date.now();

            // Check if consent has expired
            if (now - timestamp > CONSENT_EXPIRY) {
                localStorage.removeItem(CONSENT_KEY);
                return null;
            }

            return accepted;
        } catch (error) {
            console.error('Cookie consent retrieval error:', error);
            return null;
        }
    }

    function setConsent(accepted) {
        try {
            localStorage.setItem(CONSENT_KEY, JSON.stringify({
                accepted: accepted,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error('Cookie consent storage error:', error);
        }
    }

    function removeBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(() => banner.remove(), 300);
        }
    }

    function init() {
        // Don't show banner if consent already given
        if (getConsent() !== null) return;

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showBanner);
        } else {
            showBanner();
        }
    }

    function showBanner() {
        const banner = createBanner();
        document.body.appendChild(banner);

        // Add event listeners
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                setConsent(true);
                removeBanner();
                // Optional: trigger analytics if enabled
                console.log('Cookies accepted');
            });
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                setConsent(false);
                removeBanner();
                console.log('Cookies rejected');
            });
        }
    }

    return { init, getConsent, setConsent };
})();

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
} else {
    CookieConsent.init();
}
