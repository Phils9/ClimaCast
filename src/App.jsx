import { useState } from 'react';
import { fetchWeather } from './utils/api';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Error from './components/Error';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }
  
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };
  
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background.png" // Replace with your image path
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center pt-8 px-4">
        {/* Header with Logo and Title */}
        <div className="w-full max-w-md mb-8 flex items-center justify-start">
          {/* Logo (replace with your logo image) */}
          <img
            src="/logo.png" // Replace with your logo path
            alt="ClimaCast Logo"
            className="w-12 h-12 mr-4"
          />
          {/* Title */}
          <h1 className="text-4xl font-bold text-white text-center flex-grow">
            ClimaCast
          </h1>
        </div>

        {/* Search & Weather Card */}
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} />
          <Error message={error} />
          <WeatherDisplay data={weatherData} />
        </div>
      </div>
    </div>
  );
}