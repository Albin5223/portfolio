export const translations = {
  fr: {
    header: {
      nav: {
        home: "Présentation",
        projects: "Projets",
        experiences: "Expériences",
        formation: "Formation",
        contact: "Contact",
      },
      brandRole: "Chef de projet / Dev",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      navMenuLabel: "Menu de navigation",
      languageLabel: "Langue",
      languageSwitch: "Changer de langue",
      languageFrench: "Français",
      languageEnglish: "Anglais",
    },
    home: {
      eyebrow: "Qui suis-je ?",
      title: "Paris Albin",
      lede: "Bienvenue sur mon portfolio.",
      body:
        "Chef de projet en alternance et étudiant en master de développement informatique, je reste proche du code et des enjeux techniques, de la conception à l'amélioration des applications.",
      ctaProjects: "Voir mes projets",
      ctaContact: "Me contacter",
      imageAlt: "Photo de Paris Albin",
    },
    projects: {
      kicker: "Sélection",
      title: "Projets et réalisations",
      lede: "Une sélection récente de projets menés en contexte universitaire et personnel.",
      loading: "Chargement des projets...",
      error: "Impossible de récupérer les projets.",
      universityGroup: "Projets universitaires",
      personalGroup: "Projets personnels",
      emptyUniversity: "Aucun projet universitaire pour le moment.",
      emptyPersonal: "Aucun projet personnel pour le moment.",
      countLabel: "projet(s)",
      badgePersonal: "Personnel",
      badgeSchool: "Universitaire",
      viewGithub: "Voir sur GitHub",
      details: "Détails",
      modal: {
        kicker: "Projet",
        stack: "Stack utilisée",
        close: "Fermer",
      },
    },
    experiences: {
      kicker: "Parcours",
      title: "Expériences",
      lede: "Découvrez mes expériences professionnelles variées !",
      loading: "Chargement des expériences...",
      error: "Impossible de récupérer les expériences.",
      empty: "Aucune expérience pour le moment.",
      missionsLabel: "Missions :",
      previous: "← Précédent",
      next: "Suivant →",
      periodFallback: "Période",
    },
    formation: {
      kicker: "Parcours",
      title: "Formations et diplômes",
      lede: "Découvrez mon parcours académique et les formations que j'ai suivies.",
      loading: "Chargement des formations...",
      error: "Impossible de récupérer les formations.",
      empty: "Aucune formation disponible pour le moment.",
    },
    contact: {
      kicker: "Contact",
      title: "Restons en contact",
      lede:
        "Une opportunité, un projet ou simplement l'envie d'échanger ? Je suis disponible pour discuter de vos besoins et réfléchir ensemble à la meilleure façon d'y répondre.",
      cvSoon: "CV bientôt disponible",
      emailCta: "Écrire un email",
      loading: "Chargement des contacts...",
      error: "Impossible de récupérer les contacts.",
      empty: "Aucun contact disponible pour le moment.",
      noteTitle: "Disponibilité",
      noteBody: "Basé à Paris, mobile en Île-de-France et ouvert au télétravail. Réponse assurée sous 24h.",
    },
    common: {
      close: "Fermer",
    },
  },
  en: {
    header: {
      nav: {
        home: "Overview",
        projects: "Projects",
        experiences: "Experience",
        formation: "Education",
        contact: "Contact",
      },
      brandRole: "Project lead / Dev",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      navMenuLabel: "Navigation menu",
      languageLabel: "Language",
      languageSwitch: "Switch language",
      languageFrench: "French",
      languageEnglish: "English",
    },
    home: {
      eyebrow: "About me",
      title: "Paris Albin",
      lede: "Welcome to my portfolio.",
      body:
        "Apprentice project manager and master's student in software development, I stay close to code and technical challenges from design through continuous improvement.",
      ctaProjects: "View my projects",
      ctaContact: "Contact me",
      imageAlt: "Portrait of Paris Albin",
    },
    projects: {
      kicker: "Selection",
      title: "Projects and achievements",
      lede: "A recent selection of projects delivered in academic and personal contexts.",
      loading: "Loading projects...",
      error: "Unable to fetch projects.",
      universityGroup: "University projects",
      personalGroup: "Personal projects",
      emptyUniversity: "No university projects for now.",
      emptyPersonal: "No personal projects for now.",
      countLabel: "project(s)",
      badgePersonal: "Personal",
      badgeSchool: "University",
      viewGithub: "View on GitHub",
      details: "Details",
      modal: {
        kicker: "Project",
        stack: "Tech stack",
        close: "Close",
      },
    },
    experiences: {
      kicker: "Journey",
      title: "Experience",
      lede: "Discover my diverse professional experiences!",
      loading: "Loading experience...",
      error: "Unable to fetch experience.",
      empty: "No experience to show yet.",
      missionsLabel: "Missions:",
      previous: "← Previous",
      next: "Next →",
      periodFallback: "Period",
    },
    formation: {
      kicker: "Journey",
      title: "Education and degrees",
      lede: "Explore my academic background and the training I've completed.",
      loading: "Loading education...",
      error: "Unable to fetch education.",
      empty: "No education items available yet.",
    },
    contact: {
      kicker: "Contact",
      title: "Stay in touch",
      lede:
        "Got an opportunity or just want to chat? I'm available to discuss your needs and figure out the best way to help.",
      cvSoon: "CV available soon",
      emailCta: "Send an email",
      loading: "Loading contacts...",
      error: "Unable to fetch contacts.",
      empty: "No contact options available yet.",
      noteTitle: "Availability",
      noteBody: "Based in Paris, available in Île-de-France and open to remote work. Replies within 24h.",
    },
    common: {
      close: "Close",
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationTree = typeof translations.fr;

export type NestedKeys<T> = T extends object
  ? { [K in keyof T]: K extends string ? `${K}${DotPrefix<NestedKeys<T[K]>>}` : never }[keyof T]
  : "";

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type TranslationKey = NestedKeys<TranslationTree>;
