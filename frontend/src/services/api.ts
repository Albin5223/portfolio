import axios from "axios";

const API_URL_PROJECTS_PERSO = import.meta.env.VITE_API_URL+"/projects/personal";
const API_URL_PROJECTS_SCHOOL = import.meta.env.VITE_API_URL+"/projects/school";
const API_URL_FORMATIONS = import.meta.env.VITE_API_URL+"/formations";
const API_URL_CONTACT = import.meta.env.VITE_API_URL+"/contact";

export const getPersonalProjects = async () => {
  try {
    const res = await axios.get(API_URL_PROJECTS_PERSO);
    return res.data;
  } catch (err) {
    console.error("Erreur récupération projets :", err);
    return [];
  }
};

export const getSchoolProjects = async () => {
  try {
    const res = await axios.get(API_URL_PROJECTS_SCHOOL);
    return res.data;
  } catch (err) {
    console.error("Erreur récupération projets :", err);
    return [];
  }
};

export const getFormations = async () => {
  try {
    const res = await axios.get(API_URL_FORMATIONS);
    //Transform date strings to Date objects
    res.data = res.data.map((formation: any) => ({
      ...formation,
      dateStart: new Date(formation.dateStart),
      dateEnd: new Date(formation.dateEnd),
    }));
    // Sort formations by dateEnd descending
    res.data.sort((a: any, b: any) => b.dateEnd - a.dateEnd);
    return res.data;
  } catch (err) {
    console.error("Erreur récupération formations :", err);
    return [];
  }
};

export const getContact = async () => {
  try {
    const res = await axios.get(API_URL_CONTACT);
    return res.data;
  } catch (err) {
    console.error("Erreur récupération formations :", err);
    return [];
  }
};
