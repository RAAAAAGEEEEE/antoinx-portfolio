// Cookie Banner Manager - RGPD
// Bande compacte en bas d'ecran. L'ancienne version etait une carte de 182px
// ancree en bas a droite : elle recouvrait les deux CTA du hero tant que le
// visiteur n'avait pas repondu.
const CookieConsent = (() => {
    const CONSENT_KEY = 'cookie-consent';
    const CONSENT_EXPIRY = 365 * 24 * 60 * 60 * 1000; // 1 an
    const BODY_CLASS = 'cookie-banner-open';

    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.setAttribute('role', 'complementary');
        banner.setAttribute('aria-label', 'Consentement cookies');
        banner.innerHTML = `
            <style>
                #cookie-banner {
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--bg);
                    border-top: 1px solid var(--border);
                    padding: 0.8rem 1.25rem;
                    z-index: 999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem 1.25rem;
                    flex-wrap: wrap;
                    font-size: 0.85rem;
                    line-height: 1.5;
                    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
                }

                [data-theme="dark"] #cookie-banner {
                    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.3);
                }

                /* Le bandeau est fixe : sans cette reserve, il masquerait
                   le bas de page tant qu'il est affiche. */
                body.cookie-banner-open {
                    padding-bottom: 84px;
                }

                #cookie-banner p {
                    margin: 0;
                    color: var(--text-light);
                    max-width: 62ch;
                }

                #cookie-banner a {
                    color: var(--accent);
                    font-weight: 600;
                }

                .cookie-buttons {
                    display: flex;
                    gap: 0.6rem;
                    flex-shrink: 0;
                }

                .cookie-btn {
                    padding: 0.5rem 1.1rem;
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.85rem;
                    font-family: inherit;
                    transition: all 0.2s ease;
                }

                #cookie-accept {
                    background: var(--accent);
                    border-color: var(--accent);
                    color: #fff;
                }

                #cookie-accept:hover {
                    filter: brightness(0.94);
                }

                #cookie-reject {
                    background: transparent;
                    color: var(--text);
                }

                #cookie-reject:hover {
                    border-color: var(--accent);
                    color: var(--accent);
                }

                @media (max-width: 620px) {
                    #cookie-banner {
                        justify-content: stretch;
                        text-align: left;
                    }

                    .cookie-buttons {
                        width: 100%;
                    }

                    .cookie-btn {
                        flex: 1;
                    }

                    body.cookie-banner-open {
                        padding-bottom: 132px;
                    }
                }
            </style>
            <p>Cookies essentiels et mesure d'audience. Voir la <a href="/cookies">politique des cookies</a>.</p>
            <div class="cookie-buttons">
                <button id="cookie-reject" class="cookie-btn" type="button">Refuser</button>
                <button id="cookie-accept" class="cookie-btn" type="button">Accepter</button>
            </div>
        `;
        return banner;
    }

    function getConsent() {
        try {
            const consent = localStorage.getItem(CONSENT_KEY);
            if (!consent) return null;

            const { timestamp, accepted } = JSON.parse(consent);
            if (Date.now() - timestamp > CONSENT_EXPIRY) {
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
        document.body.classList.remove(BODY_CLASS);
        if (banner) banner.remove();
    }

    function showBanner() {
        document.body.appendChild(createBanner());
        document.body.classList.add(BODY_CLASS);

        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                setConsent(true);
                removeBanner();
            });
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                setConsent(false);
                removeBanner();
            });
        }
    }

    function init() {
        if (getConsent() !== null) return;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showBanner);
        } else {
            showBanner();
        }
    }

    return { init, getConsent, setConsent };
})();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
} else {
    CookieConsent.init();
}
