import { HourlyForecastCard } from "./HourlyForecastCard";

export const HourlyForecast = () => {
  return (
    <div className="grow bg-custom-gray app-wide-border-radius max-h-[652px] overflow-y-scroll">
      <div className="header px-[0.2rem] flex items-center justify-between m-[1rem] p-[0.5rem]">
        <span className="text-xl">Hourly Forecast</span>
        <button>Tuesday</button>
      </div>

      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
      <HourlyForecastCard time={"3pm"} temp={0} weatherType={"sunny"} />
    </div>
  );
};
