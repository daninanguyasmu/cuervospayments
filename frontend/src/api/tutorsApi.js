import { BASE_URL } from "./config";

export const searchTutors = async (name) => {
  const response = await fetch(`${BASE_URL}/tutors/search?name=${name}`);
  if (!response.ok) throw new Error("Error buscando tutores");
  return response.json();
};

export const createTutor = async (tutorData) => {
  const response = await fetch(`${BASE_URL}/tutors/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutorData),
  });
  if (!response.ok) throw new Error("Error al crear el nuevo tutor en la base de datos.");
  return response.json();
};