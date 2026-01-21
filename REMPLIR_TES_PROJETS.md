# 📋 Feuille de Collecte - Remplis Tes Projets

Copie-colle ce template pour **chaque projet** et remplis juste les `[SECTIONS À COMPLÉTER]`.

---

## PROJET 1 - [TON NOM DE PROJET]

```javascript
{
    id: 1,

    // ============ TITRE ============
    title_fr: "[TON TITRE EN FRANÇAIS]",
    title_en: "[YOUR TITLE IN ENGLISH]",

    // ============ TYPE ============
    // Choisis parmi: "App Mobile", "SaaS", "Automatisation"
    type_fr: "[APP MOBILE / SAAS / AUTOMATISATION]",
    type_en: "[MOBILE APP / SAAS / AUTOMATION]",

    // ============ STATUT ============
    // Choisis: "in-progress" ou "upcoming"
    status: "[IN-PROGRESS OU UPCOMING]",

    // ============ DESCRIPTION COURTE (pour la page d'accueil) ============
    description_fr: "[UNE OU DEUX PHRASES]",
    description_en: "[ONE OR TWO SENTENCES]",

    // ============ TITRE PAGE DÉTAIL ============
    hero_title_fr: "[TITRE ACCROCHEUR EN FR]",
    hero_title_en: "[CATCHY TITLE IN EN]",

    // ============ SOUS-TITRE PAGE DÉTAIL ============
    hero_subtitle_fr: "[PHRASE COURTE EN FR]",
    hero_subtitle_en: "[SHORT SENTENCE IN EN]",

    // ============ DESCRIPTION LONGUE (page détail) ============
    long_description_fr: "[PARAGRAPHES - PEUX ÊTRE LONG - EN FR]",
    long_description_en: "[PARAGRAPHS - CAN BE LONG - IN EN]",

    // ============ CARACTÉRISTIQUES/FEATURES ============
    features_fr: [
        "[Feature 1 en FR]",
        "[Feature 2 en FR]",
        "[Feature 3 en FR]"
    ],
    features_en: [
        "[Feature 1 in EN]",
        "[Feature 2 in EN]",
        "[Feature 3 in EN]"
    ],

    // ============ STACK TECHNIQUE ============
    // Liste les technos utilisées
    tech_stack: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],

    // ============ TIMELINE / STATUT LANCEMENT ============
    timeline_fr: "[Ex: Lancement Q2 2026 OU Disponible maintenant]",
    timeline_en: "[Ex: Launch Q2 2026 OR Available now]",

    // ============ BOUTON D'ACTION ============
    cta_text_fr: "[Ex: Me contacter, Essayer, S'inscrire]",
    cta_text_en: "[Ex: Contact me, Try it, Subscribe]"
}
```

---

## EXEMPLE REMPLI - PROJET 1

```javascript
{
    id: 1,
    title_fr: "Mobile Fit Tracker",
    title_en: "Mobile Fit Tracker",
    type_fr: "App Mobile",
    type_en: "Mobile App",
    status: "in-progress",
    description_fr: "Application mobile de suivi fitness avec IA pour personnaliser vos plans d'entraînement",
    description_en: "Mobile fitness app with AI to personalize your workout plans",
    hero_title_fr: "Entraîne-toi avec l'IA",
    hero_title_en: "Train with AI",
    hero_subtitle_fr: "Plans d'entraînement adaptatifs et suivi en temps réel",
    hero_subtitle_en: "Adaptive workout plans and real-time tracking",
    long_description_fr: "Mobile Fit Tracker combine le suivi réel avec l'IA...",
    long_description_en: "Mobile Fit Tracker combines real-time tracking with AI...",
    features_fr: [
        "Suivi automatique des calories",
        "Plans personnalisés par IA",
        "Statistiques détaillées"
    ],
    features_en: [
        "Automatic calorie tracking",
        "AI-personalized plans",
        "Detailed statistics"
    ],
    tech_stack: ["React Native", "Firebase", "Python"],
    timeline_fr: "Lancement Q2 2026",
    timeline_en: "Launch Q2 2026",
    cta_text_fr: "Me contacter",
    cta_text_en: "Contact me"
}
```

---

## 🖼️ AJOUTER LES IMAGES

Pour **chaque projet**, ouvre le fichier `projects/project-X.html` et remplace:

```html
<div class="gallery-placeholder" id="gallery-placeholder">
    [Image gallery - À ajouter par l'utilisateur]
</div>
```

Par tes images:

### Option 1: Image simple
```html
<div style="margin-bottom: 2rem;">
    <img src="https://example.com/screenshot.jpg" alt="Screenshot" style="width: 100%; border-radius: 12px;">
</div>
```

### Option 2: Galerie 2 colonnes
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
    <img src="https://example.com/image1.jpg" alt="Screenshot 1" style="width: 100%; border-radius: 8px;">
    <img src="https://example.com/image2.jpg" alt="Screenshot 2" style="width: 100%; border-radius: 8px;">
</div>
```

### Option 3: Galerie 3 colonnes
```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
    <img src="https://example.com/image1.jpg" alt="Screenshot 1" style="width: 100%; border-radius: 8px;">
    <img src="https://example.com/image2.jpg" alt="Screenshot 2" style="width: 100%; border-radius: 8px;">
    <img src="https://example.com/image3.jpg" alt="Screenshot 3" style="width: 100%; border-radius: 8px;">
</div>
```

---

## 📝 WORKFLOW

1. **Remplis ce template** pour CHAQUE projet (1-8)
2. **Envoie-moi tous les templates remplis**
3. Je mettrai à jour automatiquement:
   - `projects/projects-data.js` avec tous tes textes
   - `projects/project-X.html` avec tes images
4. Je test, commit et push
5. Vercel déploie auto ✅

---

## 💡 CONSEILS

- Les textes peuvent être longs, pas de limite
- Les images: utilise des URLs HTTPS (pas d'images locales)
- Les emojis c'est OK: "🚀 Lancement", "⭐ Prémium", etc
- Pour les features: 3-5 c'est idéal (pas trop long)

---

**Prêt à remplir? Dis-moi quand tu as les infos!** 🚀
