// Blog articles data
const blogArticles = {
    1: {
        id: 1,
        slug: "comment-jai-automatise-mes-reseaux-sociaux",
        title_fr: "Comment j'ai automatisé mes réseaux sociaux avec une IA gratuite",
        title_en: "How I Automated My Social Media with Free AI",
        date: "2026-02-17",
        category: "automatisation",
        excerpt_fr: "Un guide complet pour automatiser tes tweets avec une IA gratuite et un cron job. Zéro effort, résultats maximaux.",
        excerpt_en: "A complete guide to automate your tweets with free AI and a cron job. Zero effort, maximum results.",
        readTime: "8 min",
        content_fr: `<h2>Comment j'ai automatisé mes réseaux sociaux avec une IA gratuite</h2>

<p>Vous avez déjà regardé quelqu'un poster régulièrement sur Twitter/X, LinkedIn, Bluesky en semblant pas lever le petit doigt ? Moi aussi. Et pendant longtemps, j'ai cru que c'était de la magie ou du temps débile. Spoiler alert : c'était juste de l'automatisation.</p>

<p>Le truc, c'est que l'automatisation pour les réseaux sociaux semblait compliquée et chère. Des outils SaaS à 50 balles par mois, des APIs commerciales, des secrets à garder. Jusqu'au moment où j'ai compris qu'avec une IA gratuite et un peu de Python, je pouvais faire la même chose en une soirée.</p>

<h3>Le setup initial : délirant simple</h3>

<p>Mon objectif était bête : générer des tweets aléatoires tous les jours, sans que j'aie à y penser. Des tweets sur la tech, l'IA, l'automatisation, les outils dev — mes thèmes de base. Et oui, il fallait que ce soit gratuit.</p>

<p>J'ai trouvé Z.ai (GLM-4.7-Flash). Gratuit. Vraiment gratuit. Pas de piège à 30 jours. Pas de faux freemium. Juste une API accessible avec un token.</p>

<p>Ensuite, juste Python. Un script de 30 lignes. Un cron job. Boom.</p>

<h4>Le script (version minimaliste)</h4>

<pre><code class="language-python">import requests, subprocess, json, os, random
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
</code></pre>

<p>Pas compliqué, hein ? Le secret, c'est que GLM-4.7-Flash est assez bon pour générer du texte court et cohérent. Et assez rapide pour répondre en moins d'une seconde.</p>

<h3>Escalader intelligemment</h3>

<p>Une fois que j'ai eu le tweet brut qui marche, j'ai pensé : "Et si je lui donnais des thèmes variés pour que ce soit moins répétitif ?"</p>

<p>J'ai créé un fichier <code>tweet_themes.txt</code> avec 20 thèmes différents et le script pioche un thème au hasard à chaque exécution. Résultat ? Les tweets sont variés. Pas d'impression de bot qui recrache la même chose.</p>

<p>Puis j'ai dit : "Et si je trackais les tweets générés pour pas avoir de vrais doublons ?"</p>

<p>Une ligne de code qui log dans <code>tweet_history.txt</code> à chaque génération. Fini.</p>

<h3>Scheduling : cron, le meilleur ami du dev</h3>

<p>Maintenant, le hard part : <strong>faire tourner ce truc tous les jours sans y penser</strong>.</p>

<pre><code>0 9,14,19 * * * /usr/bin/python3 /root/.openclaw/workspace/auto_tweet.py
</code></pre>

<p>Tous les jours à 9h, 14h et 19h. Trois tweets par jour. Zéro effort de ma part.</p>

<h3>Pourquoi ça marche</h3>

<p><strong>1. IA gratuite qui fait le job</strong> — GLM-4.7-Flash n'est pas un modèle minimaliste. Il génère du texte fluide et intelligent en moins d'une seconde.</p>

<p><strong>2. Pas de gestion d'état compliquée</strong> — Je poste juste les tweets générés. Pas de feedback loop. Pas de metrics à tracker. Pas de ML custom. Juste du brut.</p>

<p><strong>3. Variété par thème</strong> — En changeant le sujet, le modèle produit naturellement des résultats différents. Pas d'hallucinations bizarres. Juste du contenu solide.</p>

<p><strong>4. Logging pour la conformité mentale</strong> — Savoir que ça tourne et que je peux regarder l'historique me donne la confiance qu'il y a pas un bot qui poste n'importe quoi.</p>

<h3>Le secret des gens qui posten régulièrement</h3>

<p>C'est ça. C'est juste ça. Pas de travail manuel répétitif. Pas d'inspiration à trouver. Pas de "oh merde, j'ai oublié de poster aujourd'hui".</p>

<p>Juste un script de 40 lignes et un cron job.</p>

<p>Y a pas de magie. Y a de l'automatisation. Et c'est mieux.</p>`,
        content_en: `<h2>How I Automated My Social Media with Free AI</h2>

<p>Have you ever watched someone post regularly on Twitter/X, LinkedIn, Bluesky without apparently lifting a finger? Me too. For a long time, I thought it was magic or wasted time. Spoiler alert: it was just automation.</p>

<p>The thing is, automating social media seemed complicated and expensive. SaaS tools at 50 bucks a month, commercial APIs, secrets to keep. Until I realized that with free AI and a bit of Python, I could do the same thing in an evening.</p>

<h3>The Initial Setup: Surprisingly Simple</h3>

<p>My goal was simple: generate random tweets every day without having to think about it. Tweets about tech, AI, automation, dev tools — my core themes. And yes, it had to be free.</p>

<p>I found Z.ai (GLM-4.7-Flash). Free. Really free. No 30-day trap. No false freemium. Just an accessible API with a token.</p>

<p>Then, just Python. A 30-line script. A cron job. Done.</p>

<h4>The Script (Minimalist Version)</h4>

<pre><code class="language-python">import requests, subprocess, json, os, random
from datetime import datetime

# Load the key
env_path = os.path.expanduser('~/.openclaw/workspace/.env')
zai_key = None
for line in open(env_path):
    if line.startswith('ZAI_API_KEY='):
        zai_key = line.strip().split('=',1)[1]

# Pick a random theme
themes_path = os.path.expanduser('~/antoinx-site/tweet_themes.txt')
themes = [line.strip() for line in open(themes_path) if line.strip()]
theme = random.choice(themes)

# Call Z.ai
resp = requests.post(
    'https://api.z.ai/api/paas/v4/chat/completions',
    headers={'Authorization': f'Bearer {zai_key}'},
    json={
        'model': 'glm-4.7-flash',
        'messages': [{'role': 'user', 'content': f'Tweet max 270 chars. Theme: {theme}. No hashtags.'}],
        'max_tokens': 1500
    }
)

tweet_text = resp.json()['choices'][0]['message']['content'][:280]

# Post via tweet.py (or directly via Twitter API)
subprocess.run(['python3', 'tweet.py', tweet_text])
</code></pre>

<p>Not complicated, right? The secret is that GLM-4.7-Flash is good enough to generate short, coherent text. And fast enough to respond in less than a second.</p>

<h3>Scale Intelligently</h3>

<p>Once I had the raw tweet working, I thought: "What if I gave it varied themes so it's less repetitive?"</p>

<p>I created a <code>tweet_themes.txt</code> file with 20 different themes and the script picks one at random each time. Result? Tweets are varied. No bot vibe.</p>

<p>Then I thought: "What if I tracked generated tweets to avoid real duplicates?"</p>

<p>One line of code that logs to <code>tweet_history.txt</code> each time. Done.</p>

<h3>Scheduling: Cron, Your Dev's Best Friend</h3>

<p>Now the hard part: <strong>making this run every day without thinking about it</strong>.</p>

<pre><code>0 9,14,19 * * * /usr/bin/python3 /root/.openclaw/workspace/auto_tweet.py
</code></pre>

<p>Every day at 9am, 2pm, 7pm. Three tweets per day. Zero effort on my part.</p>

<h3>Why It Works</h3>

<p><strong>1. Free AI that does the job</strong> — GLM-4.7-Flash isn't a minimalist model. It generates fluent, intelligent text in less than a second.</p>

<p><strong>2. No complicated state management</strong> — I just post the generated tweets. No feedback loops. No metrics to track. No custom ML. Just raw.</p>

<p><strong>3. Variety through themes</strong> — By changing the subject, the model naturally produces different results. No weird hallucinations. Just solid content.</p>

<p><strong>4. Logging for peace of mind</strong> — Knowing it's running and I can check the history gives me confidence that there's no bot posting garbage.</p>

<h3>The Secret of People Who Post Regularly</h3>

<p>It's this. That's it. No repetitive manual work. No inspiration to find. No "oh shit, I forgot to post today".</p>

<p>Just a 40-line script and a cron job.</p>

<p>There's no magic. There's automation. And it's better.</p>`
    },
    2: {
        id: 2,
        slug: "5-apis-ia-gratuites-2026",
        title_fr: "5 APIs IA gratuites en 2026 que personne ne connaît",
        title_en: "5 Free AI APIs in 2026 That Nobody Knows About",
        date: "2026-02-17",
        category: "ia",
        excerpt_fr: "Les meilleures APIs IA gratites en 2026 : Z.ai, Groq, Cerebras, Together.ai, HuggingFace. Des pépites que tout le monde ignore.",
        excerpt_en: "The best free AI APIs in 2026: Z.ai, Groq, Cerebras, Together.ai, HuggingFace. Hidden gems everyone overlooks.",
        readTime: "10 min",
        content_fr: `<h2>5 APIs IA gratuites en 2026 que personne ne connaît</h2>

<p>En 2026, les APIs IA gratuites sont comme les champignons après la pluie. Il y en a partout, mais 90% des gens ne savent pas regarder où il faut. Tout le monde crie sur OpenAI, sur Claude, sur Gemini. Mais personne ne parle des pépites gratuites qui font exactement le même boulot à 0 balles.</p>

<p>Je vais te donner 5 APIs que j'utilise au quotidien et que personne n'a l'air de connaître.</p>

<h3>1. Z.ai — GLM-4.7-Flash</h3>

<p><strong>Pourquoi c'est fou :</strong> C'est gratuit, vraiment gratuit. Pas de limite cachée. Pas de "ah mais après 100 requêtes ça devient payant". Non. Accès API illimité.</p>

<p><strong>Quoi faire avec :</strong> Génération de texte court et moyen (< 4000 tokens). Je l'utilise pour générer des tweets, des descriptions, des brèves. C'est assez rapide (< 1 sec) et assez intelligent pour comprendre les nuances en français.</p>

<p><strong>La vérité :</strong> GLM est fabriqué par Alibaba et testé par Z.ai. Le modèle n'est pas aussi puissant que Claude Opus pour du raisonnement deep, mais pour 90% des tâches quotidiennes (génération, extraction, reformulation), c'est blindé.</p>

<pre><code class="language-python">import requests

resp = requests.post(
    'https://api.z.ai/api/paas/v4/chat/completions',
    headers={'Authorization': f'Bearer YOUR_KEY'},
    json={
        'model': 'glm-4.7-flash',
        'messages': [{'role': 'user', 'content': 'Your prompt'}],
        'max_tokens': 2000
    }
)

print(resp.json()['choices'][0]['message']['content'])
</code></pre>

<h3>2. Groq — Llama 3.3-70B</h3>

<p><strong>Pourquoi c'est ouf :</strong> Groq c'est l'entreprise derrière les chips LPU. Leurs APIs Llama (des modèles open-source gratuits) tournent TROP VITE. On parle de 100+ tokens/sec. Honnêtement c'est dingue.</p>

<p><strong>Quoi faire :</strong> Raisonnement, coding, analyse. Llama 3.3 est le mec de 70 milliards de params de Meta. Libre. Gratuit sur Groq.</p>

<p><strong>La vérité :</strong> Y a une limite, mais elle est généreuse (quelques centaines de requêtes par mois pour le free tier). Ça se déverrouille facile.</p>

<pre><code class="language-python">from groq import Groq

client = Groq()

response = client.chat.completions.create(
    messages=[
        {"role": "user", "content": "Write a Python function to sort a list"}
    ],
    model="llama-3.3-70b-versatile"
)

print(response.choices[0].message.content)
</code></pre>

<h3>3. Cerebras — GPT-OSS-120B</h3>

<p><strong>Pourquoi c'est cinglé :</strong> Cerebras a des chips de fou (wafers entiers en GPU). Leur infra est dédiée à faire tourner des gros modèles open-source en temps réel. Et c'est GRATUIT.</p>

<p><strong>Quoi faire :</strong> Code complexe, raisonnement, architecture. C'est un 120 milliards de paramètres. C'est pas mal du tout pour du heavy lifting.</p>

<h3>4. Together.ai — LLaMA 3.1, Mistral, CodeLlama</h3>

<p><strong>Pourquoi c'est sympa :</strong> Together c'est une plateforme qui fédère les modèles open-source. Llama, Mistral, CodeLlama, Falcon, Zephyr — tous gratuits jusqu'à une limite raisonnable.</p>

<p><strong>La vérité :</strong> La limite gratuite (un million de tokens/mois) est franchement généreuse pour tester. Et après, c'est $0.75 par million de tokens. Rien à côté des autres.</p>

<h3>5. HuggingFace Inference API — Tout ce qui existe</h3>

<p><strong>Pourquoi c'est dingue :</strong> HuggingFace c'est GitHub pour les modèles IA. Et ils offrent une Inference API gratuite pour... pratiquement tous les modèles du hub.</p>

<p><strong>Quoi faire :</strong> N'importe quoi. Classification, génération, traduction, vision, audio. Des milliers de modèles. Gratuit pour les petites utilisations.</p>

<h3>Bonus : Pourquoi personne ne parle de ça</h3>

<p><strong>Raison 1 :</strong> Les capitaux de risque préfèrent les startups qui vendent du SaaS cher. Les APIs gratuites, ça rapporte pas d'argent, donc ça mérite pas l'attention.</p>

<p><strong>Raison 2 :</strong> Les big techs (OpenAI, Google, Anthropic) ont du marketing dingue. Ils crient plus fort.</p>

<p><strong>Raison 3 :</strong> Les gens ont peur des trucs trop simples. "Si c'est gratuit, ça doit être mauvais", qu'ils pensent. Non. C'est juste efficient.</p>

<h3>La vraie question : Qu'est-ce que tu en fais ?</h3>

<p>Maintenant que tu as 5 APIs gratuites et bonnes, pourquoi t'en fais rien ?</p>

<ul>
<li><strong>Génère tes tweets</strong> comme un robot.</li>
<li><strong>Crée un bot Discord</strong> qui décode les erreurs.</li>
<li><strong>Analyse les logs</strong> de tes applis en temps réel.</li>
<li><strong>Traduis ta doc tech</strong> en 5 langues.</li>
<li><strong>Résume tes mails.</strong></li>
<li><strong>Crée des images</strong> avec Stable Diffusion (aussi gratuit sur Hugging Face).</li>
</ul>

<h3>Le secret pour pas être broke</h3>

<p>Si tu utilises Z.ai pour les petites tâches (tweet, brèves), Groq pour le code rapide, et HuggingFace pour l'expérimentation, tu vas payer zéro. Littéralement zéro.</p>

<p>Personne ne parle de ça. Mais tout le monde devrait.</p>`,
        content_en: `<h2>5 Free AI APIs in 2026 That Nobody Knows About</h2>

<p>In 2026, free AI APIs are like mushrooms after rain. They're everywhere, but 90% of people don't know where to look. Everyone screams about OpenAI, Claude, Gemini. But nobody talks about the free gems that do the exact same job at $0.</p>

<p>I'll give you 5 APIs I use daily that nobody seems to know about.</p>

<h3>1. Z.ai — GLM-4.7-Flash</h3>

<p><strong>Why it's insane:</strong> It's free. Really free. No hidden limits. No "but after 100 requests it becomes paid". Nope. Unlimited API access.</p>

<p><strong>What to do:</strong> Short to medium text generation (< 4000 tokens). I use it for tweets, descriptions, briefs. Fast enough (< 1 sec) and smart enough to understand French nuances.</p>

<p><strong>The truth:</strong> GLM is built by Alibaba and tested by Z.ai. Not as powerful as Claude Opus for deep reasoning, but for 90% of daily tasks (generation, extraction, rewriting), it's solid.</p>

<h3>2. Groq — Llama 3.3-70B</h3>

<p><strong>Why it's wild:</strong> Groq is behind the LPU chips. Their Llama APIs (free open-source models) run SUPER FAST. We're talking 100+ tokens/sec. Honestly insane.</p>

<p><strong>What to do:</strong> Reasoning, coding, analysis. Llama 3.3 is Meta's 70B param beast. Free. Open. On Groq.</p>

<h3>3. Cerebras — GPT-OSS-120B</h3>

<p><strong>Why it's wild:</strong> Cerebras has crazy chips (whole GPU wafers). Their infra is dedicated to running massive open-source models in real-time. And it's FREE.</p>

<p><strong>What to do:</strong> Complex code, reasoning, architecture. It's 120 billion params. Perfect for heavy lifting.</p>

<h3>4. Together.ai — LLaMA 3.1, Mistral, CodeLlama</h3>

<p><strong>Why it's nice:</strong> Together is a platform that federates open-source models. Llama, Mistral, CodeLlama, Falcon, Zephyr — all free up to a reasonable limit.</p>

<p><strong>The truth:</strong> The free limit (one million tokens/month) is honestly generous for testing. After that, it's $0.75 per million tokens. Nothing compared to others.</p>

<h3>5. HuggingFace Inference API — Everything That Exists</h3>

<p><strong>Why it's insane:</strong> HuggingFace is GitHub for AI models. And they offer a free Inference API for... basically every model on the hub.</p>

<p><strong>What to do:</strong> Anything. Classification, generation, translation, vision, audio. Thousands of models. Free for small usage.</p>

<h3>The Real Question: What Do You Do With It?</h3>

<p>Now that you have 5 good free APIs, why aren't you using them?</p>

<ul>
<li>Generate your tweets like a bot.</li>
<li>Create a Discord bot that decodes errors.</li>
<li>Analyze your app logs in real-time.</li>
<li>Translate your tech docs into 5 languages.</li>
<li>Summarize your emails.</li>
<li>Generate images with Stable Diffusion.</li>
</ul>

<h3>The Secret to Not Going Broke</h3>

<p>If you use Z.ai for small tasks (tweets, briefs), Groq for fast code, and HuggingFace for experimentation, you'll pay zero. Literally zero.</p>

<p>Nobody talks about this. But everyone should.</p>`
    }
};
