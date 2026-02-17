# Comment j'ai automatisé mes réseaux sociaux avec une IA gratuite

Vous avez déjà regardé quelqu'un poster régulièrement sur Twitter/X, LinkedIn, Bluesky en semblant pas lever le petit doigt ? Moi aussi. Et pendant longtemps, j'ai cru que c'était de la magie ou du temps débile. Spoiler alert : c'était juste de l'automatisation.

Le truc, c'est que l'automatisation pour les réseaux sociaux semblait compliquée et chère. Des outils SaaS à 50 balles par mois, des APIs commerciales, des secrets à garder. Jusqu'au moment où j'ai compris qu'avec une IA gratuite et un peu de Python, je pouvais faire la même chose en une soirée.

## Le setup initial : délirant simple

Mon objectif était bête : générer des tweets aléatoires tous les jours, sans que j'aie à y penser. Des tweets sur la tech, l'IA, l'automatisation, les outils dev — mes thèmes de base. Et oui, il fallait que ce soit gratuit.

J'ai trouvé Z.ai (GLM-4.7-Flash). Gratuit. Vraiment gratuit. Pas de piège à 30 jours. Pas de faux freemium. Juste une API accessible avec un token.

Ensuite, juste Python. Un script de 30 lignes. Un cron job. Boom.

### Le script (version minimaliste)

```python
import requests, subprocess, json, os, random
from datetime import datetime

# Charger la clé
env_path = os.path.expanduser('~/.openclaw/workspace/.env')
zai_key = None
for line in open(env_path):
    if line.startswith('ZAI_API_KEY='):
        zai_key = line.strip().split('=',1)[1]

# Piocher un thème aléatoire
themes_path = os.path.expanduser('~/antoinx-site/tweet_themes.txt')
themes = [line.strip() for line in open(themes_path) if line.strip()]
theme = random.choice(themes)

# Appeler Z.ai
resp = requests.post(
    'https://api.z.ai/api/paas/v4/chat/completions',
    headers={'Authorization': f'Bearer {zai_key}'},
    json={
        'model': 'glm-4.7-flash',
        'messages': [{'role': 'user', 'content': f'Tweet max 270 chars. Theme: {theme}. Pas de hashtags.'}],
        'max_tokens': 1500
    }
)

tweet_text = resp.json()['choices'][0]['message']['content'][:280]

# Poster via mon script tweet.py (ou directement via API Twitter)
subprocess.run(['python3', 'tweet.py', tweet_text])
```

Pas compliqué, hein ? Le secret, c'est que GLM-4.7-Flash est assez bon pour générer du texte court et cohérent. Et assez rapide pour répondre en moins d'une seconde.

## Escalader intelligemment

Une fois que j'ai eu le tweet brut qui marche, j'ai pensé : "Et si je lui donnais des thèmes variés pour que ce soit moins répétitif ?"

J'ai créé un fichier `tweet_themes.txt` avec 20 thèmes différents :
- IA générative et LLMs
- Automatisation avec Python
- Vibecoding et développement
- Productivité des développeurs
- APIs IA gratuites
- Outils dev sous-estimés
- Humour tech et dev
- DevOps et infrastructure
- (et 12 autres...)

À chaque exécution, le script en pioche un au hasard. Résultat ? Les tweets sont variés. Pas d'impression de bot qui recrache la même chose.

Puis j'ai dit : "Et si je trackais les tweets générés pour pas avoir de vrais doublons ?"

Une ligne de code qui log dans `tweet_history.txt` à chaque génération. Fini.

## Scheduling : cron, le meilleur ami du dev

Maintenant, le hard part : **faire tourner ce truc tous les jours sans y penser**.

```bash
0 9,14,19 * * * /usr/bin/python3 /root/.openclaw/workspace/auto_tweet.py
```

Tous les jours à 9h, 14h et 19h. Trois tweets par jour. Zéro effort de ma part.

(Oui, je peux faire ça en SSH sur mon serveur, ou via GitHub Actions, ou via ma machine locale avec cron. Peu importe. C'est trois lignes et ça marche.)

## Pourquoi ça marche

**1. IA gratuite qui fait le job** — GLM-4.7-Flash n'est pas un modèle minimaliste. Il génère du texte fluide et intelligent en moins d'une seconde.

**2. Pas de gestion d'état compliquée** — Je poste juste les tweets générés. Pas de feedback loop. Pas de metrics à tracker. Pas de ML custom. Juste du brut.

**3. Variété par thème** — En changeant le sujet, le modèle produit naturellement des résultats différents. Pas d'hallucinations bizarres. Juste du contenu solide.

**4. Logging pour la conformité mentale** — Savoir que ça tourne et que je peux regarder l'historique me donne la confiance qu'il y a pas un bot qui poste n'importe quoi.

## Ce qui pourrait être mieux

Honnêtement ? Rien de dramatique. Mais si je devais escalader :

- **Ajouter un classifier** : avant de poster, vérifier que le tweet respecte certaines règles (pas trop long, pas d'erreurs, pertinence du sujet)
- **Intégrer des feeds RSS** : au lieu de thèmes fixes, utiliser le contenu actuel (les news de la tech, par exemple) pour générer des tweets plus timely
- **Multi-platform** : même script, mais adapter la longueur et le ton pour LinkedIn, Bluesky, et autres

Mais pour un side project qui tourne en arrière-plan ? C'est parfait.

## Le secret des gens qui posten régulièrement

C'est ça. C'est juste ça. Pas de travail manuel répétitif. Pas d'inspiration à trouver. Pas de "oh merde, j'ai oublié de poster aujourd'hui".

Juste un script de 40 lignes et un cron job.

Y a pas de magie. Y a de l'automatisation. Et c'est mieux.
