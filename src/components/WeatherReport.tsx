import { AdditionalMetricCard } from "./WeatherReportUI/AdditionalMetricCard";
import { CurrentWeatherCard } from "./WeatherReportUI/CurrentWeatherCard";
import { DailyForeCastCard } from "./WeatherReportUI/DailyForeCastCard";
import { HourlyForecast } from "./WeatherReportUI/HourlyForecast";
import { useSelector } from "react-redux";

type WeatherReportState = {
  weather: {
    dailyForecast: Array<Record<string, any>>;
    currentWeather: any;
    units: any;
  };
};

export const WeatherReport = () => {
  const dailyForecast = useSelector(
    (state: WeatherReportState) => state.weather.dailyForecast,
  );
  const currentWeather = useSelector(
    (state: WeatherReportState) => state.weather.currentWeather,
  );

  const unitsMap = useSelector(
    (state: WeatherReportState) => state.weather.units,
  );

  const additionalParameters = [
    {
      name: "Feels like",
      value: currentWeather.feelsLike,
      unit: "°",
    },
    {
      name: "Humidity",
      value: currentWeather.humidity,
      unit: "%",
    },
    {
      name: "Wind",
      value: currentWeather.windSpeed,
      unit: unitsMap.windUnit,
    },
    {
      name: "Precipitation",
      value: currentWeather.precipitation,
      unit: unitsMap.precipitation,
    },
  ];

  return (
    <div className="flex mt-[2rem] gap-[2rem]">
      <div className="left-section grow max-w-[70%]">
        <CurrentWeatherCard />

        <div className="flex gap-[1rem]">
          {additionalParameters.map((parameter, index) => (
            <AdditionalMetricCard
              title={parameter.name}
              value={parameter.value}
              key={index}
              unit={parameter.unit}
            />
          ))}
        </div>
        <div className="text-lg mt-[2rem]">Daily forecast</div>

        <div className="daily-forecast-section flex gap-[1rem]">
          {dailyForecast.map((forecast, index) => (
            <DailyForeCastCard
              data={{
                title: forecast.day,
                min: forecast.min,
                max: forecast.max,
                code: forecast.code,
              }}
              key={index}
            />
          ))}
        </div>
      </div>
      <HourlyForecast />
    </div>
  );
};
