import { AdditionalMetricCard } from "./WeatherReportUI/AdditionalMetricCard";
import { CurrentWeatherCard } from "./WeatherReportUI/CurrentWeatherCard";
import { DailyForeCastCard } from "./WeatherReportUI/DailyForeCastCard";
import { HourlyForecast } from "./WeatherReportUI/HourlyForecast";

export const WeatherReport = () => {
  return (
    <div className="flex mt-[2rem] gap-[2rem]">
      <div className="left-section grow max-w-[70%]">
        <CurrentWeatherCard />
        <div className="flex gap-[1rem]">
          <AdditionalMetricCard title={"Feels like"} value={0} />
          <AdditionalMetricCard title={"Feels like"} value={0} />
          <AdditionalMetricCard title={"Feels like"} value={0} />
          <AdditionalMetricCard title={"Feels like"} value={0} />
        </div>
        <div className="text-lg mt-[2rem]">Daily forecast</div>
        <div className="daily-forecast-section flex gap-[1rem]">
          <DailyForeCastCard title={"Tues"} value={0} />
          <DailyForeCastCard title={"Tues"} value={0} />
          <DailyForeCastCard title={"Tues"} value={0} />
          <DailyForeCastCard title={"Tues"} value={0} />
          <DailyForeCastCard title={"Tues"} value={0} />
          <DailyForeCastCard title={"Tues"} value={0} />
          <DailyForeCastCard title={"Tues"} value={0} />
        </div>
      </div>
      <HourlyForecast />
    </div>
  );
};
