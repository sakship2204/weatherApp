import "./App.css";
import { NavBar } from "./components/NavBar";
import SearchBar from "./components/SearchBar";

import { WeatherReport } from "./components/WeatherReport";
import { getCoordinates } from "./services/getLocation";
import { getWeatherData } from "./services/getWeatherData";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData, setLocationAndDate } from "./stores/weatherSlice";

type RootState = {
  weather: {
    city: string;
  };
};

function App() {
  const city = useSelector((state: RootState) => state.weather.city);
  const dispatch = useDispatch();

  const initiateSearchForLocation = async () => {
    const response = await getCoordinates(city);

    if (response) {
      const weatherData = await getWeatherData(
        response.latitude,
        response.longitude,
      );
      dispatch(setLocationAndDate({ location: response.location }));

      dispatch(setWeatherData(weatherData));
    }
  };

  return (
    <>
      <div id="main-container" className="px-[6rem] py-[2rem]">
        <NavBar />

        <div className="text-center text-white mt-[4rem] text-6xl">
          How's the sky looking today?
        </div>
        <SearchBar searchWeather={initiateSearchForLocation} />

        <WeatherReport />
      </div>
    </>
  );
}

export default App;
