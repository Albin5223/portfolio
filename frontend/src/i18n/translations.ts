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
      brandRole: "Consultant IT",
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
      description:"Futur diplômé en Génie Informatique et Consultant IT en alternance.",
      approche:"Mon approche ? Allier la rigueur du code aux enjeux de gestion pour des projets robustes et performants.",
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
      next: "Suivant →",
      previous: "← Précédent",
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
      downloadCv: "Télécharger mon CV",
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
      brandRole: "Consultant IT",
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
      description: "Future graduate in Computer Engineering and IT Consultant in work-study.",
      approche: "My approach? Combining the rigor of code with management challenges for robust and high-performing projects.",
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
      next: "Next →",
      previous: "← Previous",
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
      downloadCv: "Download my resume",
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

type Join<A extends string, B extends string> = `${A}.${B}`;

type L1 = keyof TranslationTree & string;

type L2<K extends L1> = TranslationTree[K] extends object ? keyof TranslationTree[K] & string : never;

type L3<K extends L1, K2 extends L2<K>> = TranslationTree[K] extends Record<K2, unknown>
  ? TranslationTree[K][K2] extends object
    ? keyof TranslationTree[K][K2] & string
    : never
  : never;

export type TranslationKey =
  | L1
  | { [K in L1]: L2<K> extends string ? Join<K, L2<K>> : never }[L1]
  | {
      [K in L1]: L2<K> extends string
        ? { [K2 in L2<K>]: L3<K, K2> extends string ? Join<Join<K, K2>, L3<K, K2>> : never }[L2<K>]
        : never;
    }[L1];
