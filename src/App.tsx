import "./App.css";
import { NavBar } from "./components/NavBar";
import SearchBar from "./components/SearchBar";

import { WeatherReport } from "./components/WeatherReport";
import { getCoordinates } from "./services/getLocation";
import { getWeatherData } from "./services/getWeatherData";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData, setLocationAndDate } from "./stores/weatherSlice";
import { useEffect, useState } from "react";

type RootState = {
  weather: {
    city: string;
    units: any;
  };
};

const LoadingState = {
  LOADED: 0,
  NOT_LOADED: 1,
  ERROR: 2,
  LOADING: 3,
};

function App() {
  const city = useSelector((state: RootState) => state.weather.city);
  const units = useSelector((state: RootState) => state.weather.units);
  const [searching, setSearching] = useState(LoadingState.NOT_LOADED);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const initiateSearchForLocation = async () => {
    try {
      setSearching(LoadingState.LOADING);
      const response = await getCoordinates(city);

      if (response) {
        const weatherData = await getWeatherData(
          response.latitude,
          response.longitude,
          units,
        );
        dispatch(setLocationAndDate({ location: response.location }));

        dispatch(setWeatherData(weatherData));
      }
      setSearching(LoadingState.LOADED);
    } catch (e) {
      console.error(e);
      setSearching(LoadingState.ERROR);
      setError(e.message);
    }
  };

  useEffect(() => {
    if (city !== "") {
      initiateSearchForLocation();
    }
  }, [units]);

  return (
    <>
      <div id="main-container" className="px-[6rem] py-[2rem]">
        <NavBar />

        <div className="text-center text-white mt-[4rem] text-6xl">
          How's the sky looking today?
        </div>
        <SearchBar
          searchWeather={initiateSearchForLocation}
          disabled={searching == LoadingState.LOADING}
        />

        {searching == LoadingState.LOADED && <WeatherReport />}
        {searching == LoadingState.LOADING && (
          <div className="min-h-[500px]">
            <div className="m-[4rem] bg-blue-900 p-[7rem] text-center text-2xl app-wide-border-radius">
              Search is in progress...
            </div>
          </div>
        )}
        {searching == LoadingState.NOT_LOADED && (
          <div className="min-h-[500px]">
            <div className="m-[4rem] bg-blue-900 p-[7rem] text-center text-2xl app-wide-border-radius">
              Enter the city name to see the forecast results :p
            </div>
          </div>
        )}
        {searching == LoadingState.ERROR && (
          <div className="min-h-[500px]">
            <div className="m-[4rem] bg-pink-900  p-[7rem] text-center text-2xl app-wide-border-radius">
              <div>Something went wrong</div>
              {error}
              <div>
                Please check the city entered or try again after some time .
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
