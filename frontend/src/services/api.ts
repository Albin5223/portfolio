import axios from "axios";

const API_URL_PROJECTS = import.meta.env.VITE_API_URL+"/projects";
const API_URL_FORMATIONS = import.meta.env.VITE_API_URL+"/formations";

export const getProjects = async () => {
  try {
    const res = await axios.get(API_URL_PROJECTS);
    return res.data;
  } catch (err) {
    console.error("Erreur récupération projets :", err);
    return [];
  }
};

export const addProject = async (project: { title: string; description: string; githubUrl: string }) => {
  try {
    const res = await axios.post(API_URL_PROJECTS, project);
    return res.data;
  } catch (err) {
    console.error("Erreur ajout projet :", err);
    return null;
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
