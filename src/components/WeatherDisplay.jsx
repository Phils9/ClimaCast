export default function WeatherDisplay({ data }) {
    if (!data) return null;
  
    const { name, main, weather, wind } = data;
    const temp = Math.round(main.temp);
    const condition = weather[0];
  
    return (
      <div className="weather-card bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`}
            alt="Weather icon"
            className="w-16 h-16"
          />
          <p className="text-4xl font-bold text-blue-600">{temp}°C</p>
        </div>
        <div className="space-y-2 text-gray-700">
          <p>Humidity: {main.humidity}%</p>
          <p>Wind Speed: {wind.speed} m/s</p>
          <p className="capitalize">Condition: {condition.description}</p>
        </div>
      </div>
    );
}