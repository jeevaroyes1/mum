import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = { // eslint-disable-line react-refresh/only-export-components
  en: {
    nav: {
      whyMum: 'Why MUM',
      services: 'Services',
      projects: 'Projects',
      agency: 'Agency',
      contact: 'Contact',
      admin: 'Admin Dashboard',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      yourProject: 'Your Project',
      projectPrompt: 'An idea, a project? Let’s talk today!',
      strategy: 'Strategy',
      strategyList: ['360° Marketing Strategy', 'Web Analytics & Reporting', 'Brand Positioning & Audit'],
      creation: 'Creation',
      creationList: ['Brand Identity & Graphic Design', 'High-Performance Websites', 'Storytelling & Content Creation'],
      marketing: 'Marketing',
      marketingList: ['Search Engine Optimization (SEO/GEO)', 'Google Ads Campaigns (SEA)', 'Social Media Advertising (SMA)', 'Email Marketing & Automation'],
      applications: 'Applications',
      applicationsList: ['Custom Web Applications', 'CMS & Content Management', 'Cloud Solutions & APIs', 'AI Tools Integration'],
    },
    hero: {
      badge: 'Full-Service Agency • Luxembourg',
      titlePrefix: 'Agency of',
      titleMain: 'digital marketing',
      subFixed1: 'We make',
      subFixed2: 'your marketing',
      rotatingWords: [
        'measurable',
        'appealing',
        'effective',
        'innovative',
        'understandable',
        'authentic',
        'AI compatible',
        'sustainable',
        'scalable',
        'simple',
      ],
      discoverProjects: 'Explore our projects',
      yourProject: 'Your Project',
      experienceBadge: '25+ years experience',
      overlayTitle: 'Your goals, our mission!',
      overlayDesc: 'Hand in hand with our clients, MUM creates powerful marketing projects and high-performance advertising campaigns.',
      scroll: 'Scroll',
      discoverTag: 'Discover ↓',
    },
    pillars: {
      tag: 'Added Value',
      title: 'Why our digital marketing?',
      subtitle: 'Tailored solutions engineered to address the core growth challenges of your enterprise.',
      items: [
        {
          tag: 'Visibility',
          title: 'Maximum Visibility',
          description: 'Strong brand identity, elevated market presence & a decisive step ahead of your competition.',
        },
        {
          tag: 'Growth',
          title: 'Client Acquisition',
          description: 'High-intent leads, high-value new clients, and predictable, sustainable business growth.',
        },
        {
          tag: 'Recruiting',
          title: 'Winning Recruitment',
          description: 'An attractive employer brand and targeted campaigns that attract the industry’s best talent.',
        },
        {
          tag: 'Efficiency',
          title: 'Digital Agility',
          description: 'Maximized operational efficiency powered by intelligent tools and AI solutions that accelerate your workflows.',
        },
      ],
    },
    services: {
      tag: 'A la carte or full-service',
      title: 'Agency Services',
      leadText: 'Our in-house team masters the entire spectrum of digital marketing. From strategic planning to creative execution and sophisticated multi-channel campaigns.',
      learnMore: 'Learn more',
      items: [
        {
          number: '01',
          category: 'Strategy',
          title: 'Marketing Strategies that Deliver',
          description: 'Brand positioning, digital audits, conversion funnel mapping, and actionable data-driven roadmaps.',
          tags: ['Marketing Strategy', 'Web Analytics', 'Consulting'],
        },
        {
          number: '02',
          category: 'Creation',
          title: 'Visual Identity & UI/UX Design',
          description: 'Striking logos, comprehensive graphic guidelines, scalable design systems, and interfaces crafted to convert.',
          tags: ['Branding', 'Design System', 'Storytelling'],
        },
        {
          number: '03',
          category: 'Development',
          title: 'Website & Platform Engineering',
          description: 'Blazing-fast corporate websites, e-commerce platforms, and custom CMS solutions optimized for search engines.',
          tags: ['Corporate Sites', 'Custom CMS', 'E-Commerce'],
        },
        {
          number: '04',
          category: 'Performance',
          title: '360° Marketing & Online Advertising',
          description: 'High-ROI Google Ads (SEA), Meta Ads (SMA), local & international SEO/GEO, and social media growth.',
          tags: ['SEO & GEO', 'SEA Google Ads', 'Social Media'],
        },
        {
          number: '05',
          category: 'Innovation',
          title: 'Web Apps & AI Integration',
          description: 'Bespoke business platforms, client portals, process automations, and custom AI agent integrations.',
          tags: ['Web Apps', 'Cloud & API', 'AI Solutions'],
        },
      ],
    },
    projects: {
      tag: 'Fresh team creations',
      title: 'Recent Agency Projects',
      viewAll: 'Discover all projects',
      viewProject: 'View project',
      items: [
        {
          title: 'K-Stables',
          category: 'Web Platform • Prestige Equestrian',
          description: 'Each horse on its own stage: a trilingual platform for breeding, pedigrees, and competition achievements.',
          tag: 'Web & Pedigree',
        },
        {
          title: 'Musée rural Binsfeld',
          category: 'Tourism & Heritage • Multilingual CMS',
          description: 'A window into history open in four languages, featuring a seamless one-step group booking engine.',
          tag: 'CMS 4 Languages',
        },
        {
          title: 'LMDA',
          category: 'Branding • Corporate Identity & Web',
          description: 'From roofline to homepage: a refreshed brand identity that lives up to every promise made to clients.',
          tag: 'Visual Identity',
        },
        {
          title: 'Simaform',
          category: 'Design & Industry • Web & Exhibition',
          description: 'Comprehensive brand overhaul, ultra-responsive corporate website, and international trade fair booth design.',
          tag: 'Web & Expo',
        },
      ],
    },
    testimonials: {
      tag: 'What our clients say',
      title: 'Trust at the heart of every collaboration',
      quote: '“ MUM has been managing our 360° marketing for many years: an extraordinary team, friendly, and with rapid response times. Everything promised was delivered with precision. ”',
      author: 'Marcelo Lopes Rinnen',
      role: 'Long-standing Partner • Luxembourg',
    },
    about: {
      tag: 'Let’s get acquainted',
      title: 'About Our Agency',
      description: 'For over 25 years, our loyal clients have valued our team for its professional excellence, unwavering reliability, and results-driven work ethic.',
      locationBadge: 'Based in Weiswampach',
      values: [
        {
          code: 'thinkahead',
          title: 'We anticipate for you!',
          desc: 'With visionary insight, proactive planning, and a mindset laser-focused on sustainable solutions.',
        },
        {
          code: 'made-to-measure',
          title: 'We build custom solutions!',
          desc: 'Tailored precisely to your needs, whether on standalone projects or as your full-service 360° partner.',
        },
        {
          code: 'team-of-experts',
          title: 'We work hand in hand!',
          desc: 'Seamless collaboration guided by seasoned specialists who combine complementary skillsets for your success.',
        },
        {
          code: 'just-in-time',
          title: 'We always deliver on our promises!',
          desc: 'High responsiveness, dependable organization, and quality that consistently strives for excellence.',
        },
      ],
      stats: [
        { value: '25+', label: 'Years of Experience' },
        { value: '500+', label: 'Satisfied Clients' },
        { value: '1,200+', label: 'Digital Projects Delivered' },
        { value: '10+', label: 'In-House Specialists' },
      ],
    },
    contact: {
      tag: 'Your Project',
      title: 'Let’s discuss your next digital success',
      subtitle: 'A question, an ambitious idea, or a project? Fill in this form and our experts will get back to you promptly.',
      fullName: 'Full Name *',
      namePlaceholder: 'e.g. Jean Dupont',
      email: 'Email Address *',
      emailPlaceholder: 'e.g. jean.dupont@example.lu',
      phone: 'Phone Number *',
      phonePlaceholder: 'e.g. 98765 43210',
      phoneError: 'Please enter a valid mobile number',
      message: 'Message (min. 10 characters) *',
      messagePlaceholder: 'Tell us about your project requirements...',
      submitBtn: 'Send Enquiry',
      submitting: 'Submitting...',
      successAlert: 'Thank you! Your enquiry has been submitted successfully and saved to the database.',
      errorAlert: 'Failed to submit enquiry. Please verify the backend is running.',
    },
    footer: {
      desc: 'MUM digital agency (MUM S.A.)',
      address1: 'Om Knupp 3',
      address2: 'L-9991 Weiswampach',
      address3: 'Luxembourg',
      navTitle: 'Navigation',
      contactTitle: 'Contact Us',
      rights: '© 2026 MUM digital agency (MUM S.A.). All rights reserved.',
      privacy: 'Data Protection',
      legal: 'Legal Notice',
      cookies: 'Cookies',
    },
  },
  fr: {
    nav: {
      whyMum: 'Pourquoi MUM',
      services: 'Services',
      projects: 'Projets',
      agency: 'Agence',
      contact: 'Contact',
      admin: 'Admin Dashboard',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      yourProject: 'Votre Projet',
      projectPrompt: 'Une idée, un projet ? Parlons-en dès aujourd’hui !',
      strategy: 'Stratégie',
      strategyList: ['Stratégie marketing 360°', 'Web Analytics & Reporting', 'Positionnement & Audit de marque'],
      creation: 'Création',
      creationList: ['Identité de marque & Design graphique', 'Création de sites web haute performance', 'Storytelling & Production de contenu'],
      marketing: 'Marketing',
      marketingList: ['Référencement naturel (SEO/GEO)', 'Campagnes Google Ads (SEA)', 'Publicité sur les réseaux sociaux (SMA)', 'Email marketing & Automation'],
      applications: 'Applications',
      applicationsList: ['Applications web sur mesure', 'CMS & Gestion de contenu', 'Solutions Cloud & API', 'Intégration d’outils IA'],
    },
    hero: {
      badge: 'Agence Full-Service • Luxembourg',
      titlePrefix: 'Agence de',
      titleMain: 'marketing digital',
      subFixed1: 'Nous rendons',
      subFixed2: 'votre marketing',
      rotatingWords: [
        'simple',
        'attrayant',
        'efficace',
        'innovant',
        'compréhensible',
        'authentique',
        'compatible IA',
        'mesurable',
        'durable',
        'pérenne',
      ],
      discoverProjects: 'Découvrir nos projets',
      yourProject: 'Votre projet',
      experienceBadge: '25+ ans d’expérience',
      overlayTitle: 'Vos objectifs, notre mission !',
      overlayDesc: 'Main dans la main avec nos clients, MUM réalise des projets marketing puissants et des stratégies publicitaires performantes.',
      scroll: 'Faire défiler',
      discoverTag: 'Découvrir ↓',
    },
    pillars: {
      tag: 'Valeur ajoutée',
      title: 'Pourquoi notre marketing digital ?',
      subtitle: 'Des solutions concrètes pour répondre précisément aux enjeux clés de votre entreprise.',
      items: [
        {
          tag: 'Visibility',
          title: 'Plus de visibilité',
          description: 'Image de marque forte, notoriété renforcée & une longueur d’avance sur vos concurrents.',
        },
        {
          tag: 'Growth',
          title: 'Acquisition de clients',
          description: 'Les bons prospects, de nouveaux clients à valeur ajoutée, une croissance saine et durable.',
        },
        {
          tag: 'Recruiting',
          title: 'Recrutement gagnant',
          description: 'Une marque employeur attractive et des campagnes ciblées qui attirent les meilleurs talents.',
        },
        {
          tag: 'Efficiency',
          title: 'Agilité digitale',
          description: 'Plus d’efficacité grâce à des outils intelligents et solutions IA qui accélèrent votre quotidien.',
        },
      ],
    },
    services: {
      tag: 'À la carte ou full-service',
      title: 'Services d’agence',
      leadText: 'Notre équipe in-house maîtrise l’ensemble du spectre du marketing digital. De la stratégie à la création jusqu’aux campagnes les plus sophistiquées.',
      learnMore: 'En savoir plus',
      items: [
        {
          number: '01',
          category: 'Stratégie',
          title: 'Stratégies marketing qui fonctionnent',
          description: 'Positionnement de marque, audits digitaux, parcours utilisateurs et plans d’action mesurables.',
          tags: ['Marketing Strategy', 'Web Analytics', 'Consulting'],
        },
        {
          number: '02',
          category: 'Création',
          title: 'Identité visuelle & UI/UX Design',
          description: 'Logotypes percutants, chartes graphiques complètes, design systems et maquettes ergonomiques.',
          tags: ['Branding', 'Design System', 'Storytelling'],
        },
        {
          number: '03',
          category: 'Développement',
          title: 'Création de sites web & plateformes',
          description: 'Sites internet haute performance, plateformes e-commerce et solutions CMS sur-mesure rapides et sécurisées.',
          tags: ['Sites Corporate', 'Custom CMS', 'E-Commerce'],
        },
        {
          number: '04',
          category: 'Performance',
          title: 'Marketing 360° & Publicité en ligne',
          description: 'Campagnes Google Ads (SEA), Meta Ads (SMA), référencement naturel (SEO/GEO) et réseaux sociaux.',
          tags: ['SEO & GEO', 'SEA Google Ads', 'Social Media'],
        },
        {
          number: '05',
          category: 'Innovation',
          title: 'Applications web & Intégration IA',
          description: 'Développement d’outils métier, portails clients, automatisation de processus et modèles d’intelligence artificielle.',
          tags: ['Web Apps', 'Cloud & API', 'IA Solutions'],
        },
      ],
    },
    projects: {
      tag: 'Les créations fraîches de la team',
      title: 'Projects d’agence récents',
      viewAll: 'Découvrir tous les projets',
      viewProject: 'Voir le projet',
      items: [
        {
          title: 'K-Stables',
          category: 'Plateforme Web • Élevage de prestige',
          description: 'Chaque cheval sur sa propre scène : un site trilingue pour l\'élevage, les pedigrees et les succès en concours.',
          tag: 'Web & Pedigree',
        },
        {
          title: 'Musée rural Binsfeld',
          category: 'Tourisme & Culture • CMS Multilingue',
          description: 'Une fenêtre sur le passé, ouverte en quatre langues, avec un système de réservation de groupe en une seule étape.',
          tag: 'CMS 4 Langues',
        },
        {
          title: 'LMDA',
          category: 'Branding • Identité de marque & Web',
          description: 'Du faîtage à la page d\'accueil : une nouvelle image de marque qui tient tout ce que l\'entreprise promet.',
          tag: 'Identité Visuelle',
        },
        {
          title: 'Simaform',
          category: 'Design & Industrie • Site & Salon',
          description: 'Identité entièrement renouvelée, site web réactif et conception de stand pour salon professionnel.',
          tag: 'Web & Stand',
        },
      ],
    },
    testimonials: {
      tag: 'Ce que disent nos clients',
      title: 'La confiance au cœur de chaque collaboration',
      quote: '« MUM s’occupe de notre marketing à 360° depuis de nombreuses années : une équipe géniale, sympathique et avec un temps de réponse très rapide. Tout ce qui a été promis a été mis en place avec succès. »',
      author: 'Marcelo Lopes Rinnen',
      role: 'Partenaire de longue date • Luxembourg',
    },
    about: {
      tag: 'Faisons connaissance',
      title: 'À propos de notre agence',
      description: 'Depuis plus de 25 ans, nos clients fidèles apprécient notre équipe pour son expertise professionnelle, sa grande fiabilité et sa mentalité de travail.',
      locationBadge: 'Basé à Weiswampach',
      values: [
        {
          code: 'thinkahead',
          title: 'Nous anticipons pour vous !',
          desc: 'Avec un regard visionnaire, une planification proactive et un état d’esprit orienté solutions durables.',
        },
        {
          code: 'made-to-measure',
          title: 'Nous créons du sur-mesure !',
          desc: 'Des solutions ajustées à vos besoins, sur projets uniques ou comme partenaire full-service 360°.',
        },
        {
          code: 'team-of-experts',
          title: 'Nous travaillons main dans la main !',
          desc: 'Un accompagnement sans faille par des talents chevronnés qui conjuguent leurs expertises.',
        },
        {
          code: 'just-in-time',
          title: 'Nous tenons toujours nos promesses !',
          desc: 'Grande réactivité, organisation rigoureuse et résultats mesurables qui visent l’excellence.',
        },
      ],
      stats: [
        { value: '25+', label: 'Ans d’expérience' },
        { value: '500+', label: 'Clients satisfaits' },
        { value: '1 200+', label: 'Projets digitaux livrés' },
        { value: '10+', label: 'Talents in-house' },
      ],
    },
    contact: {
      tag: 'Votre projet',
      title: 'Parlons de votre prochain succès digital',
      subtitle: 'Une question, une idée ou un projet ambitieux ? Remplissez ce formulaire et nos experts vous répondront rapidement.',
      fullName: 'Nom complet *',
      namePlaceholder: 'ex. Jean Dupont',
      email: 'Adresse e-mail *',
      emailPlaceholder: 'ex. jean.dupont@example.lu',
      phone: 'Numéro de téléphone *',
      phonePlaceholder: 'ex. 98765 43210',
      phoneError: 'Veuillez entrer un numéro indien valide (ex. 98765 43210 ou 10 chiffres).',
      message: 'Votre message (min. 10 caractères) *',
      messagePlaceholder: 'Parlez-nous de vos besoins et objectifs...',
      submitBtn: 'Envoyer la demande',
      submitting: 'Envoi en cours...',
      successAlert: 'Merci ! Votre demande a été enregistrée avec succès.',
      errorAlert: 'Échec de l’envoi de la demande. Veuillez vérifier que le serveur backend est actif.',
    },
    footer: {
      desc: 'MUM digital agency (MUM S.A.)',
      address1: 'Om Knupp 3',
      address2: 'L-9991 Weiswampach',
      address3: 'Luxembourg',
      navTitle: 'Navigation',
      contactTitle: 'Contactez-nous',
      rights: '© 2026 MUM digital agency (MUM S.A.). Tous droits réservés.',
      privacy: 'Protection des données',
      legal: 'Mentions légales',
      cookies: 'Cookies',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  // Default is 'en' as requested
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mum_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('mum_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || translations.en;

  const toggleLang = (newLang) => {
    if (newLang === 'en' || newLang === 'fr') {
      setLang(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => { // eslint-disable-line react-refresh/only-export-components
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
