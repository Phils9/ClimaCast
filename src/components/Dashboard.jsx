import React, { useState, useEffect } from "react";

const Dashboard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [middayForecast, setMiddayForecast] = useState([]);
  const [upcomingForecast, setUpcomingForecast] = useState([]);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const currentDate = new Date();

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
          // Upcoming forecast: next 3 intervals (3 hours apart)
          const now = Date.now();
          const upcoming = data.list.filter(item => item.dt * 1000 > now).slice(0, 3);
          setUpcomingForecast(upcoming);

          // 3-Day Forecast: filter entries at 12:00:00
          const middayForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
          setMiddayForecast(middayForecasts.slice(0, 3));
        })
        .catch((err) => console.error("Error fetching forecast:", err));
    }
  }, [city, apiKey]);

  if (!weather) {
    return (
      <div className="text-center text-black text-4xl">
        Please enter a city to view the weather condition!
      </div>
    );
  }

  return (
    <main className="w-full p-4">
      <h1 className="text-center p-2 font-extrabold text-myblue text-4xl mx-auto">
        Weather Dashboard of {weather.name}
      </h1>
      <div className="w-full max-w-5xl bg-myblue text-white rounded-xl p-6 relative shadow-lg mx-auto">
        {/* Weather Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex flex-col items-start">
            <h2 className="text-xl sm:text-4xl font-semibold mb-2">
              <i className="fas fa-map-marker-alt mr-2 text-sm sm:text-3xl"></i>
              {weather.name}
            </h2>
            <p className="text-lg sm:text-xl capitalize">{weather.weather[0].description}</p>
            <p className="mt-2 text-3xl font-bold">{weather.main.temp}°C</p>
          </div>
          <div className="flex flex-col items-end">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-30 h-25"
            />
          </div>
        </div>

        {/* Date Info */}
        <div className="mb-4">
          <p className="text-sm sm:text-base">
            <strong>Today:</strong> {currentDate.toLocaleDateString()}
          </p>
        </div>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Humidity Card */}
          <div className="bg-white/18 rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold">Humidity</h3>
            <div className="flex-col flex items-center p-8 justify-center w-full">
              <img
                src="https://i.ibb.co/zh8JPRcS/humidity-8691565.png"
                alt="Humidity"
                className="w-40 h-40"
              />
              <p className="text-2xl font-bold mt-8">{weather.main.humidity}%</p>
            </div>
          </div>
          {/* Wind Speed Card */}
          <div className="bg-white/18 rounded-lg p-4 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold">Wind Speed</h3>
            <div className="flex-col flex items-center p-8 justify-center w-full">
              <img
                src="https://i.ibb.co/F49jhfzh/wind-direction-8691349.png"
                alt="Wind Speed"
                className="w-40 h-40"
              />
              <p className="text-2xl font-bold mt-8">{weather.wind.speed} m/s</p>
            </div>
          </div>
          {/* Upcoming Forecast Card */}
          <div className="bg-white/18 rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold">Upcoming Forecast</h3>
            {upcomingForecast.length > 0 ? (
              upcomingForecast.map((item, idx) => (
                <div key={idx} className="mt-2 text-center">
                  <p className="text-sm">
                    {new Date(item.dt * 1000).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                    className="w-12 h-12 mx-auto"
                  />
                  <p className="text-xl font-bold">{item.main.temp}°C</p>
                </div>
              ))
            ) : (
              <p className="mt-2">No forecast available</p>
            )}
          </div>
        </div>

        {/* 3-Day Forecast Section */}
        <section>
          <h3 className="text-2xl font-bold mb-4">3-Day Forecast</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {middayForecast.map((item, index) => (
              <div key={index} className="bg-white/18 rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                <h4 className="text-lg font-semibold">
                  {new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: "long" })}
                </h4>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="w-10 h-10 mt-1"
                />
                <p className="text-xl font-bold mt-2">{item.main.temp}°C</p>
                <p className="capitalize">{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
