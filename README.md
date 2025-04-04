# ClimCast

ClimaCast is a name for my Weather Dashboard App. It's a React-based web application built with React, Vite, and Tailwind CSS that allows users to quickly view current weather conditions and forecasts for any city. It fetches data and displays it in a visually engaging and inherent dashboard from the OpenWeatherMap API.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies](#technologies)
- [API Integration](#api-integration)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features
- **Interactive Search:** Users can search for any city to view live weather data.
- Display temperature, humidity, wind speed, and weather icons
- Responsive design with Tailwind CSS
- Error handling for invalid cities

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Phils9/ClimCast.git



### **Step 5: Push Initial Code to GitHub**
1. **Stage Changes**:  
   ```bash
   git add .


### **Environment Variables:**
Create a .env file in the project root and add your OpenWeatherMap API key:
env
CopyEdit
VITE_WEATHER_API_KEY=your_api_key_here

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Usage
Development:

 Start the development server with:

 bash
CopyEdit
npm run dev
 This will launch the app in your browser. As you enter a city name in the search bar, the dashboard updates to display the current weather and forecasts.


Production Build:

 To create a production build, run:

 bash
CopyEdit
npm run build


## Deployment
Climacast can be easily deployed on platforms like Vercel. Simply connect your GitHub repository to Vercel and configure the following:
Build Command: npm run build
Output Directory: dist
Environment Variables: Add VITE_WEATHER_API_KEY in the Vercel project settings.


## Technologies
React – Front-end library for building user interfaces.
Vite – Build tool that provides a fast development server.
Tailwind CSS – Utility-first CSS framework for styling.
OpenWeatherMap API – Service used for fetching live weather data.
Font Awesome – Icon library used for displaying weather icons.


## API Integration
Climacast uses the OpenWeatherMap API to fetch:
Current Weather Data: Temperature, humidity, wind speed, and weather descriptions.
Forecast Data: Upcoming 3-hour intervals and a 3-day forecast for midday snapshots.
Ensure your API key is correctly set in your .env file as VITE_WEATHER_API_KEY.

## Future Enhancements
Improved Error Handling: Add user-friendly error messages and fallback UI when data fails to load.
Additional Weather Metrics: Include more detailed information like sunrise/sunset times, pressure, etc.
Animation Enhancements: Further refine landing animations and transitions.
Unit Testing: Implement tests for critical components to ensure robustness.


## License
This project is licensed under the MIT License.

