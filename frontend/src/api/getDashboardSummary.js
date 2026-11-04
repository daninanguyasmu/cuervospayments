import {BASE_URL} from "./config";

export const getSummary = async () => {
    const response = await fetch(`${BASE_URL}/dashboard/`,{
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });
    if (!response.ok) throw new Error("Cannot get Dashboard info")
    return response.json();
}