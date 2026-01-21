# Comment Mettre à Jour le Site CC Website

## 📋 Vue d'ensemble

Le site est maintenant structuré avec des pages de projets individuelles (`/projects/project-X.html`). Les données sont centralisées dans un fichier unique pour faciliter les mises à jour.

## 📂 Structure des fichiers

```
/
├── index.html                    # Page d'accueil principale
├── script.js                     # Logique principale (affiche les projets)
├── i18n.js                       # Système de traduction FR/EN
├── styles.css                    # Styles globaux
│
└── /projects/
    ├── project-1.html            # Page du projet 1 (Fit Tracker)
    ├── project-2.html            # Page du projet 2 (AutoFlow)
    ├── ...
    ├── project-8.html            # Page du projet 8 (Code Assistant)
    ├── project-template.html     # Template de référence (NE PAS MODIFIER)
    ├── projects-data.js          # ✅ FICHIER À MODIFIER - Données de tous les projets
    └── project-detail.js         # Script pour charger les détails (NE PAS MODIFIER)
```

## ✏️ Comment Mettre à Jour Les Données des Projets

**Fichier à modifier:** `projects/projects-data.js`

### 1. **Modifier un projet existant**

Ouvre `projects/projects-data.js` et trouve le projet:

```javascript
const projectsDetails = {
    1: {
        title_fr: "Mobile Fit Tracker",
        title_en: "Mobile Fit Tracker",
        // ... autres données
    },
    2: {
        // Projet 2...
    }
}
```

### 2. **Structure d'un projet**

Chaque projet a cette structure:

```javascript
{
    id: 1,

    // Titres (FR et EN)
    title_fr: "Titre en français",
    title_en: "Title in English",

    // Type de projet
    type_fr: "App Mobile",
    type_en: "Mobile App",

    // Statut: "in-progress" ou "upcoming"
    status: "in-progress",

    // Description courte (pour la page d'accueil)
    description_fr: "Description courte...",
    description_en: "Short description...",

    // Titre de la page détail
    hero_title_fr: "Titre page détail",
    hero_title_en: "Detail page title",

    // Sous-titre page détail
    hero_subtitle_fr: "Sous-titre...",
    hero_subtitle_en: "Subtitle...",

    // Description longue (page détail)
    long_description_fr: "Description complète...",
    long_description_en: "Full description...",

    // Caractéristiques (liste)
    features_fr: [
        "Fonctionnalité 1",
        "Fonctionnalité 2"
    ],
    features_en: [
        "Feature 1",
        "Feature 2"
    ],

    // Stack technique
    tech_stack: ["React", "Firebase", "Python"],

    // Timeline/statut de lancement
    timeline_fr: "Lancement Q2 2026",
    timeline_en: "Launch Q2 2026",

    // Bouton d'action
    cta_text_fr: "Me contacter",
    cta_text_en: "Contact me"
}
```

## 🎯 Exemples de Mises à Jour

### Exemple 1: Mettre à jour le titre d'un projet

**Avant:**
```javascript
{
    id: 1,
    title_fr: "Mobile Fit Tracker",
    title_en: "Mobile Fit Tracker",
```

**Après:**
```javascript
{
    id: 1,
    title_fr: "Mon App Fitness Perso",
    title_en: "My Personal Fitness App",
```

### Exemple 2: Changer le statut d'un projet

```javascript
{
    id: 4,
    status: "in-progress",  // Changé de "upcoming"
    // ...
}
```

### Exemple 3: Ajouter des fonctionnalités

```javascript
{
    id: 2,
    features_fr: [
        "Nouvelle feature 1",
        "Nouvelle feature 2",
        "Nouvelle feature 3"
    ],
    features_en: [
        "New feature 1",
        "New feature 2",
        "New feature 3"
    ],
}
```

## 🖼️ Comment Ajouter des Images

Les pages de projets ont actuellement un **placeholder** pour la galerie d'images:

```html
<div class="gallery-placeholder">
    [Image gallery - À ajouter par l'utilisateur]
</div>
```

Pour ajouter des images à la page d'un projet:

1. Ouvre `projects/project-X.html` (ex: `project-1.html`)
2. Remplace le placeholder par tes images:

```html
<div class="gallery-placeholder">
    <img src="path/to/image1.jpg" alt="Screenshot 1" style="width: 100%; border-radius: 12px;">
</div>
```

Ou crée une galerie:
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
    <img src="image1.jpg" alt="Screenshot 1" style="width: 100%; border-radius: 8px;">
    <img src="image2.jpg" alt="Screenshot 2" style="width: 100%; border-radius: 8px;">
    <img src="image3.jpg" alt="Screenshot 3" style="width: 100%; border-radius: 8px;">
</div>
```

## 🔄 Workflow de Mise à Jour

1. **Ouvre** `projects/projects-data.js`
2. **Modifie** les données du projet
3. **Sauvegarde** le fichier
4. **Rafraîchis** le navigateur (F5)
5. **Teste** les modifications localement
6. **Commit et push** sur GitHub → Vercel déploie auto

## 📝 Ajouter un Nouveau Projet

Si tu veux ajouter plus de projets (>8):

1. Ajoute une nouvelle entrée dans `projects/projects-data.js`:
```javascript
const projectsDetails = {
    // ... projets existants 1-8
    9: {
        title_fr: "Nouveau projet",
        // ... reste des données
    }
}
```

2. Ajoute le projet dans `script.js` dans la liste `projects`:
```javascript
const projects = [
    // ... projets existants
    {
        id: 9,
        title_fr: "Nouveau projet",
        // ... données
    }
];
```

3. Crée `projects/project-9.html` (copie `project-template.html`)

## 🎨 Personnalisation

### Ajouter du CSS personnalisé

Édite `projects/project-template.html` dans la section `<style>`:

```html
<style>
    /* Ajoute tes styles ici */
    .mon-element {
        color: red;
    }
</style>
```

### Modifier la couleur primaire

La couleur primaire est définie dans `styles.css`:
```css
--primary: #0066ff;
--primary-light: #00d4ff;
```

## 🚀 Déploiement

Une fois tes modifications faites:

```bash
git add .
git commit -m "Update: ajouter/modifier projets"
git push
```

Vercel déploie automatiquement après le push! 🎉

## ❓ Questions Fréquentes

**Q: Où mettre les vrais textes et images?**
R: Modifie `projects-data.js` pour les textes, et remplace les placeholders d'images dans chaque `project-X.html`.

**Q: Les pages de projets en anglais se mettent à jour automatiquement?**
R: Oui! Le système i18n gère FR/EN automatiquement en lisant `projects-data.js`.

**Q: Faut-il modifier les fichiers HTML (project-1.html, etc)?**
R: Non, sauf pour ajouter des images. Tous les textes viennent de `projects-data.js`.

**Q: Que faire si j'ajoute un nouveau project type?**
R: Met à jour `i18n.js` pour ajouter la traduction, puis mets à jour `projects-data.js`.

---

**Version:** 1.0
**Dernière mise à jour:** 2026-01-21
**Auteur:** Claude Code
