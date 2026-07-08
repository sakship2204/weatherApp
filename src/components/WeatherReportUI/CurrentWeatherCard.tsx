import { useSelector } from "react-redux";
import { WeatherCodeUI } from "../CustomElements/WeatherCodeUI";

export const CurrentWeatherCard = () => {
  const currentWeather = useSelector(
    (state: any) => state.weather.currentWeather,
  );

  return (
    <>
      <div
        className={` app-wide-border-radius flex items-center py-[7rem] px-[2rem]  bg-blue-500 justify-between`}
      >
        <div className="current-city-time text-white">
          <div className="text-4xl max-w-[600px]">
            {currentWeather.location}
          </div>
          <div className="text-gray-300 text-lg">
            {currentWeather.currentDateTime}
          </div>
        </div>
        <div className="flex items-center">
          <WeatherCodeUI code={currentWeather.code} />
          <span className="ps-[0.5rem] text-7xl">
            {currentWeather.temperature}&deg;
          </span>
        </div>
      </div>
    </>
  );
};
