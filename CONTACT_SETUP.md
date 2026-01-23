# Configuration du Formulaire de Contact

## 🚀 Setup Formspree (Gratuit)

Le formulaire de contact utilise **Formspree**, un service gratuit qui permet de recevoir les messages sans avoir besoin d'un backend.

### Étapes à suivre :

1. **Créer un compte Formspree**
   - Allez sur https://formspree.io
   - Connectez-vous ou créez un compte
   - Validez votre email

2. **Créer un formulaire**
   - Cliquez sur "Create" ou "New Form"
   - Donnez un nom au formulaire (ex: "Contact antoinx.com")
   - Copiez votre **Form ID** (ressemble à: `xyzdefgh`)

3. **Configurer le script**
   - Ouvrez `script.js`
   - Cherchez la ligne: `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzdefgh';`
   - Remplacez `xyzdefgh` par votre vrai Form ID
   - Exemple: `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/abc123def';`

4. **Tester le formulaire**
   - Remplissez le formulaire sur votre site
   - Vérifiez que vous recevez l'email sur votre adresse Formspree
   - Répondez aux emails directement depuis Formspree

### ✅ Configuration automatique

Alternative : Vous pouvez aussi configurer l'envoi automatique à votre email personnel dans le dashboard Formspree.

### 📧 Options supplémentaires

Dans le script `script.js`, fonction `submitContact()`, vous pouvez personnaliser :
- `_subject`: Sujet de l'email
- `_replyto`: Email de réponse (défaut: email du visiteur)
- Ajouter des champs personnalisés

### 🔐 Sécurité

- Formspree gère les spams automatiquement
- Les adresses emails des visiteurs ne sont pas publiques
- Votre Form ID est publié (normal, c'est une faille minimale)

### 💰 Plan gratuit vs payant

- **Gratuit** : 50 soumissions/mois, recommandé pour débuter
- **Pro** : Illimité, $25/mois, SMTP custom

Pour votre site, le plan gratuit devrait suffire !
