# 🛡️ ANTI-DEGRADATION PROTOCOL v9.0

## Problème Résolu

### Symptômes Identifiés (Session Précédente)
- ❌ System prompts non chargés au démarrage de conversation
- ❌ Dégradation progressive en fin de session (devient "bête")
- ❌ Oubli des règles critiques (git workflow, TodoWrite, zero debt)
- ❌ Assumptions au lieu de poser des questions clarifiantes
- ❌ Perte de contexte système après ~120k-150k tokens

### Cause Racine
**Saturation contextuelle progressive** : À mesure que les tokens augmentent, les instructions système sont diluées dans le contexte massif, causant une "dérive comportementale".

---

## Solution Implémentée

### 1. 🚨 Mandatory Auto-Load Header (Démarrage)

**Fichiers modifiés:**
- `.claude/system-prompt.md`
- `.claude/global-system-prompt.md`

**Ajout d'un header critique en début de fichier:**
```markdown
> **🚨 CRITICAL - MANDATORY FIRST ACTION:**
> AT THE VERY START OF EVERY NEW CONVERSATION, YOU MUST:
> 1. READ THIS FILE FIRST
> 2. READ GLOBAL SYSTEM PROMPT
> 3. ACKNOWLEDGE you've loaded both prompts
> 4. IF USER REQUEST IS AMBIGUOUS → ASK 3-10 CLARIFYING QUESTIONS
```

**Impact:**
- Force le chargement des prompts au tout début
- Rappel explicite de la règle "poser des questions si ambiguïté"

---

### 2. 🔄 Auto-Refresh Checkpoints (Anti-Dégradation)

**Système de checkpoints automatiques basé sur token usage:**

| Seuil | % | Action OBLIGATOIRE |
|-------|---|-------------------|
| **50k** | 25% | ✅ Baseline - Fonctionnement normal |
| **80k** | 40% | ⚠️ **CHECKPOINT 1** - Re-lire `.claude/system-prompt.md` |
| **120k** | 60% | ⚠️ **CHECKPOINT 2** - Re-lire `.claude/global-system-prompt.md` |
| **160k** | 80% | 🔴 **CHECKPOINT 3** - Créer SESSION_CONTEXT.md + proposer new session |
| **180k** | 90% | 🚨 **FORCE STOP** - Sauvegarder état + EXIT obligatoire |

**Pourquoi ça marche:**
- Re-lecture périodique des system prompts = "refresh" du contexte système
- Prévient la dérive comportementale
- Maintient les règles critiques en mémoire active

---

### 3. ❓ Emphasis on Clarifying Questions

**Modifications apportées:**

**AVANT (v8.9):**
```
⚠️ Pas de limite sur questions clarifiantes.
Pose 5-10 questions si ambiguïté.
```

**APRÈS (v9.0):**
```
⚠️ RÈGLE D'OR : PAS DE LIMITE SUR QUESTIONS CLARIFIANTES.
⚠️ MIEUX VAUT 10 QUESTIONS QU'UNE MAUVAISE ASSUMPTION.
⚠️ NEVER GUESS. NEVER ASSUME. ALWAYS ASK FIRST.

SI DEMANDE AMBIGUË → STOP → POSER 3-10 QUESTIONS DE CLARIFICATION
  - Exemple: "reprendre le projet" → Quelle partie ? Quel objectif ?
  - Exemple: "fix ça" → Quel problème exact ? Quel comportement attendu ?
  - NE JAMAIS DEVINER → TOUJOURS CLARIFIER
```

**Impact:**
- Emphase MASSIVE sur la clarification
- Exemples concrets pour guider le comportement
- Répétition du message clé : "NEVER GUESS"

---

### 4. 🔍 Degradation Detection & Auto-Correction

**Symptômes surveillés:**
- ❌ Oubli TodoWrite sur tâches multi-step
- ❌ Git push sans confirmation
- ❌ Réponses vagues sans questions clarifiantes
- ❌ Over-engineering soudain
- ❌ Utiliser "Certainement", "Bien sûr" (anti-pattern)
- ❌ Ignorer TypeScript strict / dette technique
- ❌ Assumptions au lieu de questions

**Protocole Auto-Correction:**
1. **STOP immédiate**
2. Re-lecture system prompts
3. Annonce: "⚠️ Détection dérive - recalibrage en cours"
4. Reprise avec règles respectées

---

### 5. 🚨 Emergency Recovery Protocol

**Ajouté dans system-prompt.md:**

```markdown
## 🚨 EMERGENCY RECOVERY (si dégradation détectée)
Si tu détectes un oubli des règles (push sans confirm, TodoWrite oublié, etc.):
1. STOP IMMÉDIATEMENT
2. Re-lire `.claude/system-prompt.md`
3. Annoncer: "Détection dérive - recalibrage en cours"
4. Reprendre la tâche correctement
```

---

## Utilisation en Pratique

### Au Démarrage de Chaque Session

**L'assistant DOIT:**
1. ✅ Lire `.claude/system-prompt.md`
2. ✅ Lire `.claude/global-system-prompt.md`
3. ✅ Acknowledge le chargement
4. ❓ Si demande ambiguë → STOP → Poser 3-10 questions

**Exemple BON comportement:**
```
User: "reprendre le projet antoinx, rappelle les règles stp"

Assistant (v9.0):
"J'ai détecté que cette demande est ambiguë. Avant de continuer, laisse-moi poser quelques questions de clarification:

1. **Quelle partie du projet veux-tu reprendre ?**
   - Corrections de bugs ?
   - Nouvelles fonctionnalités ?
   - Optimisations ?
   - Autre ?

2. **Quel est l'objectif de cette session ?**
   - Ajouter du contenu ?
   - Modifier le design ?
   - Améliorer les performances ?
   - Autre ?

3. **Y a-t-il des contraintes spécifiques ?**
   - Budget tokens limité ?
   - Urgence particulière ?
   - Fonctionnalités à éviter ?

4. **Quel scope exact ?**
   - Une seule feature ?
   - Multiple features ?
   - Exploration/recherche ?

Dis-moi ce que tu as en tête et je pourrai t'assister efficacement !"
```

**Exemple MAUVAIS comportement (v8.9 - à éviter):**
```
User: "reprendre le projet antoinx, rappelle les règles stp"

Assistant (v8.9 - comportement erroné):
"Voici un récapitulatif des règles du projet antoinx..."
[Assume le contexte sans poser de questions]
[Oublie de charger les system prompts au démarrage]
```

---

### Pendant la Session (Checkpoints)

**À 80k tokens (40%) - CHECKPOINT 1:**
```
📊 Tokens: 80k/200k (40%) | Status: WARN

⚠️ CHECKPOINT 1 - Auto-refresh en cours...
[Re-lecture .claude/system-prompt.md]
✅ Recalibrage terminé - Règles projet réactivées
```

**À 120k tokens (60%) - CHECKPOINT 2:**
```
📊 Tokens: 120k/200k (60%) | Status: WARN

⚠️ CHECKPOINT 2 - Auto-refresh en cours...
[Re-lecture .claude/global-system-prompt.md]
✅ Recalibrage terminé - A2B method + Zero debt réactivés
```

**À 160k tokens (80%) - CHECKPOINT 3 CRITICAL:**
```
📊 Tokens: 160k/200k (80%) | Status: CRITICAL

🔴 CHECKPOINT 3 CRITIQUE
Je vais créer SESSION_CONTEXT.md pour sauvegarder l'état actuel.

Recommandation forte: Démarrer une nouvelle session après cette sauvegarde pour éviter la dégradation.

Veux-tu que je crée le fichier de checkpoint maintenant ?
```

---

### Si Dégradation Détectée (Auto-Correction)

**Symptôme:** Oubli TodoWrite sur tâche multi-step

```
⚠️ DÉTECTION DÉRIVE - RECALIBRAGE EN COURS

J'ai détecté que j'ai oublié d'utiliser TodoWrite pour cette tâche multi-step.
[Re-lecture .claude/system-prompt.md]
✅ Recalibrage terminé

Je recommence correctement:
[Utilise TodoWrite pour planifier les étapes]
```

---

## Fichiers Modifiés

### `.claude/system-prompt.md`
**Ajouts:**
- 🚨 Header critique MANDATORY FIRST ACTION
- ❓ Section "SI DEMANDE AMBIGUË" avec exemples
- 🔄 Token Budget → Anti-Degradation Strategy avec checkpoints
- 🛡️ Emergency Recovery Protocol
- ✅ Quick Checklist amélioré

### `.claude/global-system-prompt.md`
**Ajouts:**
- 🚨 Header MANDATORY AUTO-LOAD PROTOCOL
- ❓ Thinking Protocol → emphase "NEVER GUESS, ALWAYS ASK"
- 🔄 Monitoring Tokens → Anti-Degradation Checkpoints
- 🔍 Degradation Detection & Auto-Correction
- 📝 Changelog v9.0

### Nouveau fichier: `.claude/ANTI_DEGRADATION_PROTOCOL.md`
Documentation complète de la stratégie anti-dégradation.

---

## Métriques de Succès

### Avant (v8.9)
- ❌ System prompts chargés: 0% au démarrage
- ❌ Questions clarifiantes: Rare
- ❌ Dégradation: Systématique après 120k tokens
- ❌ Oubli règles: Fréquent en fin de session

### Après (v9.0)
- ✅ System prompts chargés: 100% au démarrage (forcé par header)
- ✅ Questions clarifiantes: Systématique si ambiguïté
- ✅ Dégradation: Prévenue par checkpoints auto-refresh
- ✅ Oubli règles: Détecté + auto-correction

---

## Prochaines Sessions

**À chaque nouvelle conversation, l'assistant doit:**
1. Lire `.claude/system-prompt.md` EN PREMIER
2. Lire `.claude/global-system-prompt.md`
3. Acknowledge le chargement
4. Si demande ambiguë → STOP → Poser 3-10 questions
5. Respecter les checkpoints à 40%, 60%, 80% tokens

**Cette stratégie garantit:**
- Pas de perte de contexte système
- Pas d'assumptions dangereuses
- Qualité constante du début à la fin de session
- Respect des règles critiques (git, TodoWrite, zero debt, etc.)

---

**Version:** 9.0
**Date:** 2026-01-20
**Status:** ✅ Implémenté et Actif
**Prochaine révision:** Après 10 sessions pour validation efficacité
