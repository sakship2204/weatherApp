import { WeatherCodeUI } from "../CustomElements/WeatherCodeUI";

export const HourlyForecastCard = ({
  time,
  temp,
  weatherType,
}: {
  time: string;
  temp: string;
  weatherType: string;
}) => {
  return (
    <div className="flex items-center justify-between bg-custom-gray-2 app-wide-border-radius m-[1.1rem] py-[1.2rem] px-[1rem] border border-gray-400">
      <div className="flex items-center gap-[0.5rem]">
        <WeatherCodeUI code={weatherType} iconClassName="text-3xl" />
        <span>{time}</span>
      </div>
      <span>{temp}&deg;</span>
    </div>
  );
};
