#!/usr/bin/env python3
import requests, subprocess, json, os, random
from datetime import datetime

# Load key from .env
env_path = os.path.expanduser('~/.openclaw/workspace/.env')
zai_key = None
for line in open(env_path):
    if line.startswith('ZAI_API_KEY='):
        zai_key = line.strip().split('=',1)[1]
if not zai_key:
    print(f'{datetime.now()} Error: ZAI_API_KEY not found in .env')
    exit(1)

# Load random theme
themes_path = os.path.expanduser('~/antoinx-site/tweet_themes.txt')
themes = [line.strip() for line in open(themes_path) if line.strip() and not line.startswith('#')]
theme = random.choice(themes)
print(f'{datetime.now()} Theme: {theme}')

resp = requests.post(
    'https://api.z.ai/api/paas/v4/chat/completions',
    headers={
        'Authorization': f'Bearer {zai_key}',
        'Content-Type': 'application/json'
    },
    json={
        'model': 'glm-4.7-flash',
        'messages': [
            {'role': 'user', 'content': f'Ecris un tweet original en francais, max 270 caracteres. Theme: {theme}. Pas de hashtags. Juste le texte.'}
        ],
        'max_tokens': 1500,
        'temperature': 0.9
    },
    timeout=30
)

data = resp.json()

# Debug: log raw response
print(f'{datetime.now()} API status: {resp.status_code}')

if resp.status_code != 200:
    print(f'{datetime.now()} Error: API returned {resp.status_code}: {json.dumps(data)}')
    exit(1)

# Try content first, then reasoning_content
msg = data.get('choices', [{}])[0].get('message', {})
tweet_text = msg.get('content', '').strip().strip('"')
if not tweet_text:
    tweet_text = msg.get('reasoning_content', '').strip().strip('"')
if not tweet_text:
    print(f'{datetime.now()} Error: empty content. Raw: {json.dumps(data)[:500]}')
    exit(1)

tweet_text = tweet_text[:280]
print(f'{datetime.now()} Generated: {tweet_text}')

# Log to history
history_path = os.path.expanduser('~/antoinx-site/tweet_history.txt')
with open(history_path, 'a') as f:
    f.write(f'{datetime.now().strftime("%Y-%m-%d %H:%M:%S")} | {tweet_text}\n')

result = subprocess.run(
    ['python3', '/root/.openclaw/workspace/tweet.py', tweet_text],
    capture_output=True, text=True
)
if result.stdout:
    print(result.stdout.strip())
if result.stderr:
    print(f'Error: {result.stderr.strip()}')
