import React, { useState, useEffect } from "react";

const Dashboard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const currentDate = new Date(); // Get current date

  useEffect(() => {
    if (city) {
      if (!apiKey) {
        console.error("API key is missing. Please set VITE_WEATHER_API_KEY in your .env file.");
        return;
      }

      // Fetch current weather data
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => setWeather(data))
        .catch((err) => console.error("Error fetching current weather:", err));

      // Fetch forecast data (5 day / 3 hour forecast)
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Forecast API error: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          const middayForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
          setForecast(middayForecasts.slice(0, 3));
        })
        .catch((err) => console.error("Error fetching forecast:", err));
    }
  }, [city, apiKey]);

  if (!weather) {
    return <div className="text-center text-black text-4xl">Please enter a city to view the weather condition!</div>;
  }

  return (
    <main className="w-full p-4">
      <h1 className="text-center p-2 font-extrabold text-myblue text-4xl mx-auto">Weather Dashboard of {weather.name}</h1>
      <div className="w-full max-w-5xl bg-myblue text-white rounded-xl p-6 relative shadow-lg mx-auto">
        {/* Weather Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">{weather.name}</h2>
            <p className="text-lg sm:text-xl">{weather.weather[0].description}</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <i className="fas fa-thermometer-half text-2xl"></i>
            <p className="text-3xl font-bold">{weather.main.temp}°C</p>
          </div>
        </div>

        {/* Date Info */}
        <div className="mb-4">
          <p className="text-sm sm:text-base">
            <strong>Today:</strong> {currentDate.toLocaleDateString()} {/* Displays the current date */}
          </p>
        </div>

        {/* Current Weather Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Humidity Card */}
          <div className="bg-blue-500 rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold">Humidity</h3>
            <p className="text-2xl font-bold mt-2">{weather.main.humidity}%</p>
          </div>
          {/* Wind Speed Card */}
          <div className="bg-blue-500 rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold">Wind Speed</h3>
            <p className="text-2xl font-bold mt-2">{weather.wind.speed} m/s</p>
          </div>
          {/* Current Forecast Card */}
          <div className="bg-blue-500 rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold">Current Forecast</h3>
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-xl font-bold">26°C</p>
              <i className="fas fa-cloud-sun-rain text-xl"></i>
              <p className="text-xl font-bold">26°C</p>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast Section */}
        <section>
          <h3 className="text-2xl font-bold mb-4">3-Day Forecast</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {forecast.map((item, index) => (
              <div key={index} className="bg-blue-500 rounded-lg p-4 flex flex-col items-center">
                <h4 className="text-lg font-semibold">
                  {new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' })}
                </h4>
                <p className="text-xl font-bold mt-2">{item.main.temp}°C</p>
                <p className="capitalize">{item.weather[0].description}</p>
                {/* Icon handling can be improved based on your requirements */}
                <i className={`fas fa-${item.weather[0].icon}`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
