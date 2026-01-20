# Guide de Déploiement - Vercel + OVH Domain

## Étape 1: Préparer le projet pour Git

### 1.1 Initialiser Git (si pas déjà fait)
```bash
cd C:\Users\magic\Desktop\CC website
git init
git add .
git commit -m "Initial commit: antoinx portfolio site"
```

### 1.2 Créer un repository GitHub
1. Va sur [github.com/new](https://github.com/new)
2. Nomme le repo: `antoinx-portfolio`
3. Description: `Portfolio vibecoding - projects & IA`
4. Choisis **Public** (gratuit et permet Vercel)
5. Clique **Create repository**

### 1.3 Connecter ton repo local à GitHub
```bash
git remote add origin https://github.com/TON_USERNAME/antoinx-portfolio.git
git branch -M main
git push -u origin main
```

**Remplace `TON_USERNAME` par ton vrai username GitHub!**

---

## Étape 2: Déployer sur Vercel

### 2.1 Créer compte Vercel
1. Va sur [vercel.com](https://vercel.com)
2. Clique **Sign Up**
3. Choisis **Sign up with GitHub** (plus facile)
4. Autorise Vercel à accéder à tes repos

### 2.2 Importer le projet
1. Une fois connecté, clique **+ New Project**
2. Clique **Import Git Repository**
3. Cherche `antoinx-portfolio` dans la liste
4. Clique **Import**

### 2.3 Configurer le projet
**Settings du projet:**
- **Project Name:** antoinx-portfolio
- **Framework:** Other (c'est du HTML/CSS/JS statique)
- **Root Directory:** laisse vide (c'est OK)
- **Build Command:** laisse vide
- **Output Directory:** laisse vide

Clique **Deploy** 🚀

**Attends 2-3 minutes...**

Une fois déployé, tu auras une URL du type:
```
https://antoinx-portfolio.vercel.app
```

✅ Ton site est live! Mais il faut connecter ton domaine...

---

## Étape 3: Connecter antoinx.com (OVH → Vercel)

### 3.1 Configuration chez Vercel
1. Va dans **Settings** du projet Vercel
2. Clique **Domains** (à gauche)
3. Clique **Add Domain**
4. Tape: `antoinx.com`
5. Clique **Add**

Vercel va te montrer deux options:
- **Nameservers** (recommandé mais plus compliqué)
- **DNS Records** (plus simple avec OVH)

**On va utiliser DNS Records car tu as OVH:**

---

### 3.2 Ajouter les DNS records chez OVH

1. **Connecte-toi à OVH**
   - Va sur [www.ovh.com](https://www.ovh.com)
   - Clique **Connexion** (haut-droit)
   - Entre tes identifiants

2. **Navigue vers la gestion DNS**
   - Va dans **Domaines** (menu gauche)
   - Clique sur **antoinx.com**
   - Clique **DNS** (l'onglet)
   - Clique **Ajouter une entrée** (bouton orange)

3. **Ajoute les records Vercel**

Vercel t'a donné un truc comme ça:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com.
TTL: 3600 (ou auto)
```

**Ajoute cette entrée dans OVH**

4. **Ajoute aussi un A record** (pour antoinx.com sans www)
   - Type: A
   - Name: @ (ou laisse vide)
   - Value: `76.76.19.89` (IP Vercel)
   - TTL: 3600

Clique **Valider** après chaque entrée.

---

### 3.3 Vérifier la propagation DNS

Après avoir ajouté les records OVH:

1. **Attends 15-30 minutes** (propagation DNS)

2. **Vérifie dans Vercel:**
   - Va dans **Settings > Domains**
   - Regarde le status d'`antoinx.com`
   - Doit passer de `Pending` à `Valid` ✅

3. **Test final:**
   - Va sur `https://antoinx.com`
   - Ton site doit charger! 🎉

---

## Étape 4: Déploiements futurs (automatique!)

Maintenant, **à chaque fois que tu fais un changement:**

```bash
# Fais tes modifications
# Puis:

git add .
git commit -m "Description du changement"
git push origin main
```

**Vercel détecte automatiquement le push et redéploie!** ⚡

Tu peux voir le statut du déploiement dans le dashboard Vercel.

---

## Troubleshooting

### DNS pas encore propagé?
- Attends 30min à 48h (c'est normal)
- Utilise [MXToolbox](https://mxtoolbox.com/c/dns) pour vérifier

### antoinx.com ne charge pas?
1. Clear le cache du navigateur (Ctrl+Shift+Delete)
2. Essaie en mode privé
3. Vérifie le status du domain dans Vercel (Settings > Domains)

### Vercel dit "Invalid Domain"?
- Les DNS records OVH doivent être exacts
- Pas d'espaces, pas de caractères spéciaux
- Value doit finir par un point (.) pour CNAME

### Site charge lentement?
- C'est normal les premières 48h (cache CDN se remplit)
- Après, ultra-rapide partout dans le monde

---

## Étape 5: Ajouter HTTPS (SSL)

**Vercel le fait automatiquement!** 🔒

Après que le domain soit validé:
- Vercel génère un certificat SSL gratuit
- Tout est en HTTPS automatiquement
- Pas besoin de faire quoi que ce soit

Vérifie: Va sur `https://antoinx.com` (avec le 🔒 en haut-gauche)

---

## Prochaines étapes (optionnel)

### Configurer email contact@antoinx.com
Si tu veux que les gens t'envoient des emails:
1. Ajoute un MX record chez OVH (pour le mail)
2. Utilise un service comme [Forwarder by Namecheap](https://www.namecheap.com/domains/email/) ou [ImprovMX](https://improvmx.com/)

### Analytics & Monitoring
- Vercel analytics: Settings > Analytics (gratuit)
- Voir visites, vitesse, etc.

### Intégrer Mailchimp/Brevo pour newsletter
À faire après, tu voudras un backend pour la newsletter.

---

## Checklist finale

- [ ] Git repo créé et pushé
- [ ] Compte Vercel créé
- [ ] Projet importé dans Vercel
- [ ] Deploy initial réussi (URL .vercel.app fonctionne)
- [ ] CNAME record ajouté dans OVH
- [ ] A record @ ajouté dans OVH
- [ ] antoinx.com se charge en HTTPS
- [ ] Domain status = Valid dans Vercel

**Besoin d'aide? Dis-moi où tu bloques!** 🚀
