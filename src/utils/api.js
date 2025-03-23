// src/utils/api.js
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchWeather(city) {
 try {
    const response = await fetch(
     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    if (data.cod === "404") throw new Error("City not found");
    return data;
 } catch (error) {
    console.error("API Error:", error.message); //Log the error for debugging
    // Re-throw a user-friendly error
    throw new Error("Failed to fetch weather data. Please try again.");
   }
}