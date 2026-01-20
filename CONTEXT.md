# Context de Développement - CC Website

## État Actuel du Projet
- **Framework**: HTML/CSS/JavaScript vanilla
- **Déploiement**: Vercel (repository: https://github.com/RAAAAAGEEEEE/antoinx-portfolio.git)
- **Langues**: Français (défaut) et Anglais
- **Système i18n**: Utilise `i18n.js` avec fichiers de traduction

## Architecture Principale
```
index.html          - Structure HTML
styles.css          - Styles (light & dark mode)
script.js           - Logique JavaScript
i18n.js             - Système de traduction
```

## Fonctionnalités Implémentées
✅ Navbar sticky avec logo gradient
✅ Sélecteur de langue (FR/EN) avec drapeaux SVG
✅ Theme toggle (Light/Dark mode)
✅ Hero section avec animations
✅ Featured projects section
✅ Portfolio complet avec filtres (Tous/En cours/À venir)
✅ Newsletter signup
✅ Responsive design (mobile-first)

## Design & Style
- **Palette**: Gradient bleu (#0066ff → #00d4ff), fond blanc/noir selon mode
- **Fonts**: System fonts (-apple-system, BlinkMacSystemFont, etc.)
- **Spacing**: Variables CSS (--spacing-sm, --spacing-md, --spacing-lg)
- **Breakpoints**: 768px (tablet), 480px (mobile)

## Récents Changements (Session Actuelle)

### Language Selector - CORRIGÉ (commit: 9676c5b)
**Problème**: Drapeaux trop gros, UK flag affichait juste du bleu, mauvais alignement
**Solution appliquée**:
- `.lang-flag-img`: 12px × 8px (réduit de 18×12px)
- `.language-btn` padding: 0.4rem 0.6rem (au lieu de 0.5rem 0.875rem)
- Gap réduit: 0.35rem (au lieu de 0.5rem)
- UK flag SVG: Union Jack correct avec croix blanche et rouge
- `.lang-icon` font-size: 0.5rem (au lieu de 0.6rem)
- Ajout `flex-shrink: 0` et `object-fit: contain` sur images

**Résultat**: Sélecteur compact et bien aligné, drapeaux proportionnés et corrects

## Points à Retenir
- User preference: Compact, modern, fonctionnel
- Tests locaux avec F5 refresh avant Vercel push
- Git workflow: commit descriptif → git push → Vercel déploie auto
- Mobile-first approach (iPhone 14+ testé)

## Fichiers SVG Utilisés
- **Drapeau FR**: Tricolore bleu-blanc-rouge (900×600 viewBox)
- **Drapeau EN**: Union Jack (60×30 viewBox) - croix blanche + rouge sur fond bleu

## À Faire Potentiel
- Amélioration de l'UX si feedback utilisateur
- Optimisation d'images pour plus gros projets
- Tests de performance
