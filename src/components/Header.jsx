import React from "react";

const Header = () => (
  <header className="flex items-center p-4 bg-primary/54 shadow">
    <div className="mr-auto">
        <img 
        src="https://i.ibb.co/fYzmVpTR/Artistly-Design-0195d9e9-ccaa-70d4-81eb-435cf7d36792.png" 
        alt="ClimaCast Logo" 
        className="h-20 w-20 object-contain"/>
    </div>
    <h1 className="text-4xl font-bold text-black absolute left-1/2 -translate-x-1/2">Climacast</h1>
  </header>
);

export default Header;
