import { BASE_URL } from "./config";

export const createAthlete = async (athleteData) => {
  const response = await fetch(`${BASE_URL}/athletes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(athleteData),
  });
  if (!response.ok) throw new Error("Error al registrar el atleta.");
  return response.json();
};