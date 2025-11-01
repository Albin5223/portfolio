import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL+"/projects";

export const getProjects = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Erreur récupération projets :", err);
    return [];
  }
};

export const addProject = async (project: { title: string; description: string; githubUrl: string }) => {
  try {
    const res = await axios.post(API_URL, project);
    return res.data;
  } catch (err) {
    console.error("Erreur ajout projet :", err);
    return null;
  }
};
