import axios from "axios";

const API_URL_PROJECTS_PERSO = import.meta.env.VITE_API_URL+"/projects/personal";
const API_URL_PROJECTS_SCHOOL = import.meta.env.VITE_API_URL+"/projects/school";
const API_URL_FORMATIONS = import.meta.env.VITE_API_URL+"/formations";

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
    return res.data;
  } catch (err) {
    console.error("Erreur récupération formations :", err);
    return [];
  }
};
