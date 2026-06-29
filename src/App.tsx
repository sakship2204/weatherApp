import "./App.css";
import { NavBar } from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { WeatherReport } from "./components/WeatherReport";

function App() {
  const [currentCity, setCurrentCity] = useState("");

  const initiateSearchForLocation = () => {};

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
