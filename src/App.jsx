import { useState } from 'react';
import { fetchWeather } from './utils/api';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Error from './components/Error';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">ClimaCast</h1>
        <SearchBar onSearch={handleSearch} />
        <Error message={error} />
        <WeatherDisplay data={weatherData} />
      </div>
    </div>
  );
}