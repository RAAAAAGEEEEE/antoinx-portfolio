// News articles data (sera alimenté par n8n automation)
const newsArticles = {
    1: {
        title_fr: "GPT-5 annonce : un bond majeur vers l'AGI",
        title_en: "GPT-5 announced: a major leap towards AGI",
        source: "OpenAI",
        date: "2026-01-20",
        category: "ai",
        content_fr: `GPT-5 marque une étape majeure dans l'évolution de l'intelligence artificielle. OpenAI a dévoilé cette nouvelle version avec des capacités de raisonnement avancées et une mémoire contextuelle considérablement étendue.

Les premiers tests montrent des performances impressionnantes en résolution de problèmes complexes, permettant à GPT-5 de traiter des tâches qui nécessitaient auparavant l'intervention humaine.

Caractéristiques principales:
- Raisonnement multi-étapes amélioré
- Mémoire contextuelle étendue (jusqu'à 1M de tokens)
- Meilleure compréhension nuancée
- Performance supérieure en code et mathématiques`,
        content_en: `GPT-5 marks a major milestone in the evolution of artificial intelligence. OpenAI unveiled this new version with advanced reasoning capabilities and significantly extended contextual memory.

Early tests show impressive performance in complex problem-solving, allowing GPT-5 to handle tasks that previously required human intervention.

Key features:
- Improved multi-step reasoning
- Extended contextual memory (up to 1M tokens)
- Better nuanced understanding
- Superior performance in code and mathematics`
    },
    2: {
        title_fr: "Claude 4 Opus : le nouveau standard du vibecoding",
        title_en: "Claude 4 Opus: the new vibecoding standard",
        source: "Anthropic",
        date: "2026-01-19",
        category: "ai",
        content_fr: `Anthropic a lancé Claude 4 Opus, une nouvelle génération de modèle d'IA spécialement optimisée pour les développeurs.

Avec des capacités de code améliorées et une compréhension contextuelle sans précédent, Claude 4 Opus devient l'outil idéal pour le vibecoding avec des sessions dépassant les 200k tokens.

Cette version offre:
- Compréhension approfondie du code legacy
- Refactoring intelligent et suggestions d'optimisation
- Gestion de projets complexes multi-fichiers
- Support natif de 50+ langages de programmation`,
        content_en: `Anthropic launched Claude 4 Opus, a new generation AI model specifically optimized for developers.

With improved coding capabilities and unprecedented contextual understanding, Claude 4 Opus becomes the ideal tool for vibecoding with sessions exceeding 200k tokens.

This version offers:
- Deep understanding of legacy code
- Intelligent refactoring and optimization suggestions
- Multi-file complex project handling
- Native support for 50+ programming languages`
    },
    3: {
        title_fr: "Cursor AI lève 100M$ pour révolutionner l'IDE",
        title_en: "Cursor AI raises $100M to revolutionize the IDE",
        source: "TechCrunch",
        date: "2026-01-18",
        category: "vibecoding",
        content_fr: `La startup derrière l'éditeur de code IA Cursor annonce une levée de fonds Series B de 100 millions de dollars.

Cet investissement majeur vise à intégrer des agents autonomes capables de refactoriser des codebases entières, d'optimiser les performances et de maintenir la qualité du code automatiquement.

Les objectifs d'expansion incluent:
- Agents autonomes pour refactoring
- Intelligence prédictive pour les bugs
- Intégration avec outils DevOps
- Support multi-plateforme avancé`,
        content_en: `The startup behind AI code editor Cursor announces a Series B funding round of $100 million.

This major investment aims to integrate autonomous agents capable of refactoring entire codebases, optimizing performance, and maintaining code quality automatically.

Expansion goals include:
- Autonomous agents for refactoring
- Predictive intelligence for bugs
- DevOps tools integration
- Advanced cross-platform support`
    },
    4: {
        title_fr: "Copilot Workspace : l'assistant qui planifie vos features",
        title_en: "Copilot Workspace: the assistant that plans your features",
        source: "GitHub",
        date: "2026-01-17",
        category: "vibecoding",
        content_fr: `GitHub lance Copilot Workspace, un environnement révolutionnaire où l'IA analyse les issues GitHub et propose des plans d'implémentation complets avant d'écrire le moindre code.

Cette innovation transforme le développement logiciel en permettant aux équipes de planifier, valider et implémenter des features 3x plus vite.

Fonctionnalités clés:
- Analyse intelligente des requirements
- Plans d'implémentation détaillés
- Estimation automatique du temps
- Génération de tests unitaires`,
        content_en: `GitHub launches Copilot Workspace, a revolutionary environment where AI analyzes GitHub issues and proposes complete implementation plans before writing any code.

This innovation transforms software development by enabling teams to plan, validate, and implement features 3x faster.

Key features:
- Intelligent requirements analysis
- Detailed implementation plans
- Automatic time estimation
- Unit test generation`
    },
    5: {
        title_fr: "Apple Intelligence enfin disponible en France",
        title_en: "Apple Intelligence finally available in France",
        source: "The Verge",
        date: "2026-01-16",
        category: "ai",
        content_fr: `Après des mois d'attente et de déploiement progressif, Apple Intelligence est maintenant disponible pour tous les utilisateurs en France.

Les fonctionnalités incluent un Siri complètement refondu avec capacités de compréhension contextuelle et intégration native avec ChatGPT.

Nouveautés majeures:
- Siri avec contexte conversationnel
- Intégration ChatGPT transparente
- Résumé intelligent des notifications
- Assistant d'écriture optimisé pour le français`,
        content_en: `After months of waiting and gradual rollout, Apple Intelligence is now available to all users in France.

Features include a completely redesigned Siri with contextual understanding capabilities and seamless ChatGPT integration.

Major updates:
- Siri with conversational context
- Seamless ChatGPT integration
- Smart notification summaries
- French-optimized writing assistant`
    },
    6: {
        title_fr: "Devin AI : premier agent développeur autonome en production",
        title_en: "Devin AI: first autonomous developer agent in production",
        source: "Hacker News",
        date: "2026-01-15",
        category: "vibecoding",
        content_fr: `Cognition Labs annonce que Devin a complété sa première mission client en totale autonomie.

Une application mobile complète a été livrée en 48 heures sans intervention humaine, marquant un tournant majeur dans l'automatisation du développement logiciel.

Capacités démontrées:
- Développement full-stack autonome
- Déploiement en production sans supervision
- Debugging et optimisation automatique
- Gestion de projet solo`,
        content_en: `Cognition Labs announces Devin completed its first client mission in full autonomy.

A complete mobile app was delivered in 48 hours without human intervention, marking a major turning point in software development automation.

Demonstrated capabilities:
- Autonomous full-stack development
- Production deployment without supervision
- Automatic debugging and optimization
- Solo project management`
    }
};
