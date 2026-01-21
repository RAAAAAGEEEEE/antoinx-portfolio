// Données détaillées des projets
const projectsDetails = {
    1: {
        title_fr: "Mobile Fit Tracker",
        title_en: "Mobile Fit Tracker",
        type_fr: "App Mobile",
        type_en: "Mobile App",
        status: "in-progress",
        description_fr: "Application mobile de suivi fitness avec IA pour personnaliser les plans d'entraînement.",
        description_en: "Mobile fitness tracking app with AI to personalize workout plans.",

        // Contenu détaillé (mockup)
        hero_title_fr: "Suivi Fitness Intelligent",
        hero_title_en: "Smart Fitness Tracking",
        hero_subtitle_fr: "Entraînez-vous plus intelligemment avec l'IA qui s'adapte à vos objectifs.",
        hero_subtitle_en: "Train smarter with AI that adapts to your goals.",

        long_description_fr: `
            Mobile Fit Tracker est une application de suivi fitness de nouvelle génération qui combine tracking réel
            avec intelligence artificielle pour créer des plans d'entraînement personnalisés.

            Caractéristiques:
            • Suivi en temps réel de vos activités physiques
            • Plans d'entraînement adaptatifs basés sur l'IA
            • Analyse nutritionnelle intelligente
            • Communauté de fitness interactive
            • Synchronisation avec appareils wearables
        `,
        long_description_en: `
            Mobile Fit Tracker is a next-generation fitness tracking app that combines real-time tracking
            with artificial intelligence to create personalized workout plans.

            Features:
            • Real-time activity tracking
            • AI-powered adaptive workout plans
            • Intelligent nutritional analysis
            • Interactive fitness community
            • Wearable device synchronization
        `,

        features_fr: [
            "Suivi automatique des calories brûlées",
            "Personnalisation des entraînements avec IA",
            "Notifications intelligentes basées sur vos habitudes",
            "Graphiques et statistiques détaillées"
        ],
        features_en: [
            "Automatic calorie tracking",
            "AI-powered workout personalization",
            "Smart notifications based on your habits",
            "Detailed charts and statistics"
        ],

        tech_stack: ["React Native", "Firebase", "TensorFlow Lite", "Python (backend)"],

        timeline_fr: "Lancement prévu Q2 2026",
        timeline_en: "Expected launch Q2 2026",

        cta_text_fr: "Me contacter pour partenariat",
        cta_text_en: "Contact me for partnership"
    },

    2: {
        title_fr: "AutoFlow SaaS",
        title_en: "AutoFlow SaaS",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "in-progress",
        description_fr: "Plateforme SaaS d'automatisation de workflows avec intégration IA pour optimiser les processus.",
        description_en: "SaaS platform for workflow automation with AI integration to optimize processes.",

        hero_title_fr: "Automatisation Intelligente",
        hero_title_en: "Intelligent Automation",
        hero_subtitle_fr: "Automatisez vos workflows complexes en quelques clics.",
        hero_subtitle_en: "Automate complex workflows in a few clicks.",

        long_description_fr: `
            AutoFlow est une plateforme SaaS qui permet d'automatiser n'importe quel workflow d'entreprise
            avec une interface visuelle intuitive et des capacités IA avancées.

            Utilisée par:
            • Startups pour optimiser leurs processus
            • Entreprises pour automatiser les tâches répétitives
            • Équipes marketing pour les campagnes complexes
        `,
        long_description_en: `
            AutoFlow is a SaaS platform that lets you automate any business workflow
            with an intuitive visual interface and advanced AI capabilities.

            Used by:
            • Startups to optimize their processes
            • Enterprises to automate repetitive tasks
            • Marketing teams for complex campaigns
        `,

        features_fr: [
            "Builder visuel par drag-and-drop",
            "Intégration avec 500+ applications",
            "Triggers et actions intelligentes",
            "Logs et monitoring en temps réel"
        ],
        features_en: [
            "Drag-and-drop visual builder",
            "Integration with 500+ applications",
            "Smart triggers and actions",
            "Real-time logging and monitoring"
        ],

        tech_stack: ["Next.js", "Supabase", "Node.js", "Claude API"],

        timeline_fr: "Bêta ouverte maintenant",
        timeline_en: "Open beta now",

        cta_text_fr: "Rejoindre la bêta",
        cta_text_en: "Join the beta"
    },

    3: {
        title_fr: "AI Content Generator",
        title_en: "AI Content Generator",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "in-progress",
        description_fr: "Outil de génération de contenu alimenté par IA, optimisé pour vibecoding et productivité.",
        description_en: "AI-powered content generation tool, optimized for vibecoding and productivity.",

        hero_title_fr: "Générer du Contenu en Secondes",
        hero_title_en: "Generate Content in Seconds",
        hero_subtitle_fr: "De la blog au code, l'IA s'adapte à vos besoins.",
        hero_subtitle_en: "From blogs to code, AI adapts to your needs.",

        long_description_fr: `
            AI Content Generator utilise les derniers modèles de langage pour créer du contenu
            de qualité professionnelle en quelques secondes. Parfait pour vibecoding.
        `,
        long_description_en: `
            AI Content Generator uses the latest language models to create professional-quality content
            in seconds. Perfect for vibecoding.
        `,

        features_fr: [
            "Templates de contenu pré-conçus",
            "Génération blog, social, code",
            "Tonalité personnalisable",
            "Export multi-format"
        ],
        features_en: [
            "Pre-designed content templates",
            "Blog, social, code generation",
            "Customizable tone",
            "Multi-format export"
        ],

        tech_stack: ["Next.js", "Claude API", "Vercel", "Stripe"],

        timeline_fr: "Disponible maintenant",
        timeline_en: "Available now",

        cta_text_fr: "Essayer gratuitement",
        cta_text_en: "Try for free"
    },

    4: {
        title_fr: "Smart Home Automation",
        title_en: "Smart Home Automation",
        type_fr: "Automatisation",
        type_en: "Automation",
        status: "upcoming",
        description_fr: "Système d'automatisation intelligente pour maison connectée avec contrôle par IA.",
        description_en: "Smart home automation system with AI-powered control.",

        hero_title_fr: "Maison Intelligente Autonome",
        hero_title_en: "Autonomous Smart Home",
        hero_subtitle_fr: "Contrôlez votre maison avec des commandes vocales et des scénarios IA.",
        hero_subtitle_en: "Control your home with voice commands and AI scenarios.",

        long_description_fr: "À venir - Système d'automatisation maison complètement autonome.",
        long_description_en: "Coming soon - Completely autonomous home automation system.",

        features_fr: ["Prochainement"],
        features_en: ["Coming soon"],

        tech_stack: ["IoT", "Python", "TensorFlow"],

        timeline_fr: "Lancement Q3 2026",
        timeline_en: "Launch Q3 2026",

        cta_text_fr: "Rejoindre la liste d'attente",
        cta_text_en: "Join waitlist"
    },

    5: {
        title_fr: "Real-time Analytics Dashboard",
        title_en: "Real-time Analytics Dashboard",
        type_fr: "SaaS",
        type_en: "SaaS",
        status: "upcoming",
        description_fr: "Dashboard analytique en temps réel pour visualiser et analyser les données avec IA.",
        description_en: "Real-time analytics dashboard to visualize and analyze data with AI.",

        hero_title_fr: "Insights Temps Réel",
        hero_title_en: "Real-Time Insights",
        hero_subtitle_fr: "Visualisez vos données et obtenez des insights IA instantanés.",
        hero_subtitle_en: "Visualize your data and get instant AI insights.",

        long_description_fr: "À venir - Dashboard analytics premium avec visualisations avancées.",
        long_description_en: "Coming soon - Premium analytics dashboard with advanced visualizations.",

        features_fr: ["Prochainement"],
        features_en: ["Coming soon"],

        tech_stack: ["React", "D3.js", "WebSocket", "PostgreSQL"],

        timeline_fr: "Lancement Q4 2026",
        timeline_en: "Launch Q4 2026",

        cta_text_fr: "Me contacter",
        cta_text_en: "Contact me"
    },

    6: {
        title_fr: "Video Editor Mobile",
        title_en: "Video Editor Mobile",
        type_fr: "App Mobile",
        type_en: "Mobile App",
        status: "upcoming",
        description_fr: "Éditeur vidéo mobile avec assistance IA pour montage automatique et effets intelligents.",
        description_en: "Mobile video editor with AI assistance for automatic editing and smart effects.",

        hero_title_fr: "Montage Vidéo Intelligent",
        hero_title_en: "Intelligent Video Editing",
        hero_subtitle_fr: "Créez des vidéos pro en minutes, pas en heures.",
        hero_subtitle_en: "Create pro videos in minutes, not hours.",

        long_description_fr: "À venir - Éditeur vidéo mobile révolutionnaire avec IA.",
        long_description_en: "Coming soon - Revolutionary mobile video editor with AI.",

        features_fr: ["Prochainement"],
        features_en: ["Coming soon"],

        tech_stack: ["React Native", "FFmpeg", "OpenCV"],

        timeline_fr: "Lancement 2026",
        timeline_en: "Launch 2026",

        cta_text_fr: "Notifiez-moi au lancement",
        cta_text_en: "Notify me at launch"
    },

    7: {
        title_fr: "Email Marketing Automation",
        title_en: "Email Marketing Automation",
        type_fr: "Automatisation",
        type_en: "Automation",
        status: "in-progress",
        description_fr: "Plateforme d'email marketing avec automatisation IA et personnalisation avancée.",
        description_en: "Email marketing platform with AI automation and advanced personalization.",

        hero_title_fr: "Email Marketing Autonome",
        hero_title_en: "Autonomous Email Marketing",
        hero_subtitle_fr: "Campagnes email qui se pilotent seules avec l'IA.",
        hero_subtitle_en: "Email campaigns that pilot themselves with AI.",

        long_description_fr: `
            Plateforme email marketing nouvelle génération avec automatisation complète
            et personnalisation par IA. Augmentez vos conversions sans effort.
        `,
        long_description_en: `
            Next-generation email marketing platform with complete automation
            and AI personalization. Increase conversions effortlessly.
        `,

        features_fr: [
            "Segmentation intelligente",
            "Copywriting assisté par IA",
            "A/B testing automatique",
            "Analytics avancées"
        ],
        features_en: [
            "Smart segmentation",
            "AI-assisted copywriting",
            "Automatic A/B testing",
            "Advanced analytics"
        ],

        tech_stack: ["Next.js", "Resend", "PostgreSQL", "Claude API"],

        timeline_fr: "Disponible mi-2026",
        timeline_en: "Available mid-2026",

        cta_text_fr: "S'inscrire à la liste d'attente",
        cta_text_en: "Join waitlist"
    },

    8: {
        title_fr: "Code Assistant App",
        title_en: "Code Assistant App",
        type_fr: "App Mobile",
        type_en: "Mobile App",
        status: "upcoming",
        description_fr: "Assistant de codage mobile avec IA pour suggestions et optimisation de code en vibecoding.",
        description_en: "Mobile coding assistant with AI for code suggestions and optimization in vibecoding.",

        hero_title_fr: "Vibecoding sur Mobile",
        hero_title_en: "Vibecoding on Mobile",
        hero_subtitle_fr: "Coder en déplacement avec un assistant IA intelligent.",
        hero_subtitle_en: "Code on the go with a smart AI assistant.",

        long_description_fr: "À venir - Assistant de codage mobile révolutionnaire.",
        long_description_en: "Coming soon - Revolutionary mobile coding assistant.",

        features_fr: ["Prochainement"],
        features_en: ["Coming soon"],

        tech_stack: ["React Native", "Claude API"],

        timeline_fr: "Lancement fin 2026",
        timeline_en: "Launch late 2026",

        cta_text_fr: "Rester informé",
        cta_text_en: "Stay tuned"
    }
};
