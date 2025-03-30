import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    onSearch(city);
  };

  return (
    <section className="w-full p-4 mt-[26px] mb-[67px]">
       {!hasSearched && (
        <div className="text-center mb-8 animate-pulse">
          <h1 className="text-4xl font-bold text-primarys">
            Welcome to Climacast
          </h1>
          <p className="text-xl text-primarys mt-2">
            Discover the latest weather conditions for your city.
          </p>
        </div>
      )}
      <div className="flex items-center space-x-2 justify-center">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="w-[400px] max-w-full pr-4 py-2 rounded-lg text-center bg-primaryw shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)] border border-gray-300/70 focus:outline-none focus:border-primarys/50 focus:ring-1 focus:ring-primarys/50 transition-all"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-primarys text-white font-semibold rounded-md hover:bg-primarys/70 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
