
// Récupération des données statiques depuis les fichiers JSON
import type { Contact } from "../pages/Contact";
import type { Experience } from "../pages/Experiences";
import type { Formation } from "../pages/Formation";
import type { Project } from "../pages/Projects";
import projectsJson from "../../data/projets.json";
import experiencesJson from "../../data/experiences.json";
import formationsJson from "../../data/formations.json";
import contactsJson from "../../data/contacts.json";

// Détection simple de la langue courante pour choisir la traduction fr/en
const getLocale = () => {
	if (typeof navigator === "undefined") return "fr";
	return navigator.language?.startsWith("en") ? "en" : "fr";
};

// Récupère le bloc de traduction correspondant, avec repli sur fr puis en
const pickTranslation = (translations: Record<string, any> | undefined, locale: string) => {
	if (!translations) return {};
	return translations[locale] ?? translations.fr ?? translations.en ?? {};
};

// ---- Projets ----
const mapProject = (p: any, locale: string) => {
	const tr = pickTranslation(p.translations, locale);
	return {
		id: p.id,
		title: p.titre ?? tr.title ?? "",
		description: tr.description ?? "",
		githubUrl: p.github_link ?? p.githubUrl ?? "",
		iconUrl: p.iconUrl ?? p.icon_url ?? "base-icon.png",
		imagesUrl: p.imagesUrl ?? p.images_url ?? "",
		personal: Boolean(p.is_personal ?? p.personal),
		technologies: p.technologies ?? [],
	};
};

export const getPersonalProjects = async (lang?: string): Promise<Project[]> => {
	const locale = lang ?? getLocale();
	return projectsJson.map((p: any) => mapProject(p, locale)).filter((p) => p.personal);
};

export const getSchoolProjects = async (lang?: string): Promise<Project[]> => {
	const locale = lang ?? getLocale();
	return projectsJson.map((p: any) => mapProject(p, locale)).filter((p) => !p.personal);
};


export const getAllProjects = async (lang?: string): Promise<Project[]> => {
	const locale = lang ?? getLocale();
	return projectsJson.map((p: any) => mapProject(p, locale));
};
// ---- Formations ----
export const getFormations = async (lang?: string): Promise<Formation[]> => {
	const locale = lang ?? getLocale();
	const items = formationsJson.map((formation: any) => {
		const tr = pickTranslation(formation.translations, locale);
		return {
			id: formation.id,
			typeFormation: formation.typeFormation,
			dateStart: new Date(formation.dateStart),
			dateEnd: new Date(formation.dateEnd),
			title: tr.title ?? "",
			etablissement: tr.etablissement ?? "",
			description: tr.description ?? "",
		};
	});
	return items.sort((a: any, b: any) => b.dateEnd - a.dateEnd);
};


export const getContact = async (lang?: string): Promise<Contact[]> => {
	const locale = lang ?? getLocale();
	return contactsJson.map((c: any) => {
		const tr = pickTranslation(c.translations, locale);
		return {
			id: c.id,
			label: c.label,
			value: c.contact_value,
			href: c.href,
			detail: tr.detail ?? "",
		};
	});
};

// ---- Expériences ----
export const getExperiences = async (lang?: string): Promise<Experience[]> => {
	const locale = lang ?? getLocale();
	return experiencesJson.map((exp: any) => {
		const tr = pickTranslation(exp.translations, locale);
		return {
			id: exp.id ?? exp._id,
			startDate: exp.startDate ?? null,
			endDate: exp.endDate ?? null,
			entreprise: tr.entreprise ?? exp.entreprise ?? "",
			intitule: tr.intitule ?? exp.intitule ?? "",
			missions: Array.isArray(tr.missions)
				? tr.missions.filter((m: any) => m != null).map((m: any) => String(m))
				: [],
		};
	});
};


