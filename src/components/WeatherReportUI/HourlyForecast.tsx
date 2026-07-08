import { useEffect, useState } from "react";
import { HourlyForecastCard } from "./HourlyForecastCard";
import { useSelector } from "react-redux";

export const HourlyForecast = () => {
  const hourlyForecastFor7Days = useSelector(
    (state: any) => state.weather.hourlyForecastFor7Days,
  );
  const [selectedDay, setSelectedDay] = useState("");
  const selectedForecast = hourlyForecastFor7Days.find(
    (forecastDay: Record<string, any>) => forecastDay.day === selectedDay,
  );

  useEffect(() => {
    if (!selectedDay && hourlyForecastFor7Days.length > 0) {
      setSelectedDay(hourlyForecastFor7Days[0].day);
    }
  }, [hourlyForecastFor7Days]);

  return (
    <div className="grow bg-custom-gray app-wide-border-radius ">
      <div className="header px-[0.2rem] flex items-center justify-between m-[1rem] p-[0.5rem]">
        <span className="text-xl">Hourly Forecast</span>
        <select
          className="bg-custom-gray-2  py-[0.5rem] rounded-sm"
          value={selectedDay}
          onChange={(event) => setSelectedDay(event.currentTarget.value)}
        >
          {hourlyForecastFor7Days.map(
            (forecast: Record<string, any>, index: number) => (
              <option key={index} value={forecast.day}>
                {forecast.day}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="overflow-y-scroll max-h-[575px] ">
        {selectedForecast?.HourlyForecast.map(
          (forecast: Record<string, any>, index: number) => (
            <HourlyForecastCard
              time={forecast.time}
              temp={forecast.temperature}
              weatherType={forecast.code}
              key={index}
            />
          ),
        )}
      </div>
    </div>
  );
};
