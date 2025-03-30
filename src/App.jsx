import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";


function App() {
  const [city, setCity] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://i.ibb.co/93kHk2cx/My-Project-1.png')] bg-cover bg-center">
      <Header />
      <main className="flex-1">
        <SearchBar onSearch={setCity} />
        <Dashboard city={city}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;