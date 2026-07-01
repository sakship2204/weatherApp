import "./App.css";
import { NavBar } from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { WeatherReport } from "./components/WeatherReport";
import { getCoordinates } from "./services/getLocation";
import { getWeatherData } from "./services/getWeatherData";

function App() {
  const [currentCity, setCurrentCity] = useState("");

  const initiateSearchForLocation = async () => {
    const response = await getCoordinates(currentCity);
    if (response) {
      const weatherData = getWeatherData(response.latitude, response.latitude);

      console.log(weatherData);
    }
  };

  return (
    <>
      <div id="main-container" className="px-[6rem] py-[2rem]">
        <NavBar />

        <div className="text-center text-white mt-[4rem] text-6xl">
          How's the sky looking today?
        </div>
        <SearchBar
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          searchWeather={initiateSearchForLocation}
        />

        <WeatherReport />
      </div>
    </>
  );
}

export default App;
